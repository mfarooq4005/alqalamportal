import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs and documents are allowed.'));
    }
  }
});

// Database connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'alqalam_school',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release();
  }
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        phone: user.phone,
        profileImageUrl: user.profile_image_url
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Register (for parents/students - admin approval required)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, role, phone } = req.body;

    if (!email || !password || !fullName || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, role, phone, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, full_name, role, phone`,
      [email, passwordHash, fullName, role, phone, role === 'parent' || role === 'student']
    );

    res.status(201).json({
      message: 'Registration successful. Please login.',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ==================== PORTAL ROUTES ====================

// Get student dashboard data
app.get('/api/portal/student/dashboard', authenticateToken, authorize('student'), async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student profile
    const studentResult = await pool.query(
      'SELECT * FROM students WHERE user_id = $1',
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student profile not found.' });
    }

    const student = studentResult.rows[0];

    // Get recent attendance
    const attendanceResult = await pool.query(
      `SELECT date, status, remarks 
       FROM attendance 
       WHERE student_id = $1 
       ORDER BY date DESC 
       LIMIT 10`,
      [studentId]
    );

    // Get upcoming assignments
    const assignmentsResult = await pool.query(
      `SELECT a.title, a.description, a.due_date, c.course_name
       FROM assignments a
       JOIN courses c ON a.course_id = c.id
       LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.student_id = $1
       WHERE s.id IS NULL AND a.due_date > NOW()
       ORDER BY a.due_date ASC
       LIMIT 5`,
      [studentId]
    );

    // Get recent results
    const resultsResult = await pool.query(
      `SELECT e.exam_name, er.marks_obtained, er.total_marks, er.percentage, er.grade
       FROM exam_results er
       JOIN exams e ON er.exam_id = e.id
       WHERE er.student_id = $1 AND er.published = true
       ORDER BY er.published_at DESC
       LIMIT 5`,
      [studentId]
    );

    // Get enrolled courses
    const coursesResult = await pool.query(
      `SELECT c.course_name, c.thumbnail_url, en.progress_percentage, en.status
       FROM enrollments en
       JOIN courses c ON en.course_id = c.id
       WHERE en.student_id = $1
       ORDER BY en.enrollment_date DESC`,
      [studentId]
    );

    res.json({
      student: {
        id: student.id,
        rollNumber: student.roll_number,
        classGrade: student.class_grade,
        section: student.section,
        admissionDate: student.admission_date,
        dateOfBirth: student.date_of_birth,
        gender: student.gender,
        bloodGroup: student.blood_group
      },
      attendance: attendanceResult.rows,
      upcomingAssignments: assignmentsResult.rows,
      recentResults: resultsResult.rows,
      enrolledCourses: coursesResult.rows
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get parent dashboard data
app.get('/api/portal/parent/dashboard', authenticateToken, authorize('parent'), async (req, res) => {
  try {
    const parentId = req.user.id;

    // Get linked students
    const studentsResult = await pool.query(
      `SELECT s.*, u.full_name, u.email, u.phone
       FROM parent_student_relation psr
       JOIN students s ON psr.student_id = s.id
       JOIN users u ON s.user_id = u.id
       WHERE psr.parent_id = $1`,
      [parentId]
    );

    const students = studentsResult.rows;

    if (students.length === 0) {
      return res.status(404).json({ error: 'No students linked to this parent account.' });
    }

    // Get attendance summary for each student
    const studentsWithAttendance = await Promise.all(
      students.map(async (student) => {
        const attendanceStats = await pool.query(
          `SELECT 
            COUNT(*) FILTER (WHERE status = 'present') as present_count,
            COUNT(*) FILTER (WHERE status = 'absent') as absent_count,
            COUNT(*) FILTER (WHERE status = 'late') as late_count,
            COUNT(*) as total_days
           FROM attendance
           WHERE student_id = $1 AND date >= DATE_TRUNC('month', CURRENT_DATE)`,
          [student.id]
        );

        const recentAttendance = await pool.query(
          `SELECT date, status, remarks
           FROM attendance
           WHERE student_id = $1
           ORDER BY date DESC
           LIMIT 7`,
          [student.id]
        );

        return {
          ...student,
          attendanceStats: attendanceStats.rows[0],
          recentAttendance: recentAttendance.rows
        };
      })
    );

    res.json({
      students: studentsWithAttendance
    });
  } catch (error) {
    console.error('Parent dashboard error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get teacher dashboard data
app.get('/api/portal/teacher/dashboard', authenticateToken, authorize('teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Get classes assigned
    const classesResult = await pool.query(
      `SELECT DISTINCT class_grade, section
       FROM timetables
       WHERE teacher_id = $1 AND is_active = true`,
      [teacherId]
    );

    // Get courses teaching
    const coursesResult = await pool.query(
      `SELECT c.id, c.course_name, c.class_grade, COUNT(DISTINCT e.student_id) as enrolled_students
       FROM courses c
       LEFT JOIN enrollments e ON c.id = e.course_id
       WHERE c.created_by = $1
       GROUP BY c.id, c.course_name, c.class_grade`,
      [teacherId]
    );

    // Get pending assignments to grade
    const pendingGradingResult = await pool.query(
      `SELECT s.id, s.submitted_at, a.title, u.full_name as student_name
       FROM assignment_submissions s
       JOIN assignments a ON s.assignment_id = a.id
       JOIN students st ON s.student_id = st.id
       JOIN users u ON st.user_id = u.id
       WHERE a.created_by = $1 AND s.marks_obtained IS NULL
       ORDER BY s.submitted_at DESC`,
      [teacherId]
    );

    res.json({
      classes: classesResult.rows,
      courses: coursesResult.rows,
      pendingGrading: pendingGradingResult.rows
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ==================== ADMISSION ROUTES ====================

// Submit admission application
app.post('/api/admissions/apply', upload.array('documents', 5), async (req, res) => {
  try {
    const {
      applicantName,
      fatherName,
      motherName,
      phone,
      email,
      applicantDob,
      applyingClass,
      previousSchool,
      address,
      sessionId
    } = req.body;

    // Validate required fields
    if (!applicantName || !fatherName || !phone || !applicantDob || !applyingClass) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    // Process uploaded documents
    const documents = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    // Get active admission cycle if session not provided
    let cycleId = sessionId;
    if (!cycleId) {
      const cycleResult = await pool.query(
        'SELECT id FROM admission_cycles WHERE is_active = true AND end_date >= CURRENT_DATE LIMIT 1'
      );
      if (cycleResult.rows.length > 0) {
        cycleId = cycleResult.rows[0].id;
      }
    }

    const result = await pool.query(
      `INSERT INTO admission_applications 
       (cycle_id, applicant_name, father_name, mother_name, phone, email, 
        applicant_dob, applying_class, previous_school, address, documents_json)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        cycleId,
        applicantName,
        fatherName,
        motherName,
        phone,
        email,
        applicantDob,
        applyingClass,
        previousSchool,
        address,
        JSON.stringify(documents)
      ]
    );

    res.status(201).json({
      message: 'Admission application submitted successfully.',
      application: result.rows[0],
      applicationId: result.rows[0].id
    });
  } catch (error) {
    console.error('Admission application error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get all applications (Admin only)
app.get('/api/admissions/applications', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM admission_applications';
    const params = [];
    const conditions = [];

    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY application_date DESC';
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM admission_applications' + (conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : ''),
      params
    );

    res.json({
      applications: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult.rows[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update application status (Admin only)
app.patch('/api/admissions/applications/:id/status', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    if (!status || !['pending', 'under_review', 'shortlisted', 'admitted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const result = await pool.query(
      `UPDATE admission_applications 
       SET status = $1, remarks = $2, reviewed_by = $3, reviewed_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [status, remarks, req.user.id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    res.json({
      message: 'Application status updated successfully.',
      application: result.rows[0]
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ==================== GALLERY ROUTES ====================

// Get gallery images
app.get('/api/gallery', async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM gallery_images WHERE is_published = true';
    const params = [];

    if (category) {
      query += ' AND category = $1';
      params.push(category);
    }

    query += ' ORDER BY display_order ASC, upload_date DESC';
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    const countQuery = 'SELECT COUNT(*) FROM gallery_images WHERE is_published = true' + (category ? ' AND category = $1' : '');
    const countResult = await pool.query(countQuery, category ? [category] : []);

    res.json({
      images: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Upload gallery image (Admin only)
app.post('/api/gallery', authenticateToken, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const thumbnailUrl = imageUrl; // In production, generate actual thumbnail

    const result = await pool.query(
      `INSERT INTO gallery_images (title, description, image_url, thumbnail_url, category, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, imageUrl, thumbnailUrl, category, req.user.id]
    );

    res.status(201).json({
      message: 'Image uploaded successfully.',
      image: result.rows[0]
    });
  } catch (error) {
    console.error('Upload gallery image error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ==================== ANNOUNCEMENTS ROUTES ====================

// Get announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const { priority, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT a.*, u.full_name as published_by_name
      FROM announcements a
      LEFT JOIN users u ON a.published_by = u.id
      WHERE a.is_active = true AND (a.expires_at IS NULL OR a.expires_at > NOW())
    `;
    const params = [];

    if (priority) {
      query += ' AND a.priority = $1';
      params.push(priority);
    }

    query += ' ORDER BY a.priority DESC, a.published_at DESC';
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    res.json({
      announcements: result.rows
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Create announcement (Admin only)
app.post('/api/announcements', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { title, content, category, priority, expiresAt } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const result = await pool.query(
      `INSERT INTO announcements (title, content, category, priority, expires_at, published_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, content, category, priority || 'normal', expiresAt, req.user.id]
    );

    res.status(201).json({
      message: 'Announcement created successfully.',
      announcement: result.rows[0]
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ==================== AI CHAT ROUTE ====================

// Simple AI chat endpoint (can be integrated with OpenAI/Claude API)
app.post('/api/chat/ask', async (req, res) => {
  try {
    const { question, sessionId } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    // Simple rule-based responses for common queries
    let answer = '';
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('admission') || lowerQuestion.includes('apply')) {
      answer = 'Admissions are open for the 2024-2025 academic session! You can apply online through our Admissions page. Required documents include: Birth Certificate, Previous School Report Cards, CNIC copies of parents, and 2 passport-size photographs. Application fee is Rs. 5000 (non-refundable).';
    } else if (lowerQuestion.includes('fee') || lowerQuestion.includes('payment')) {
      answer = 'Monthly tuition fees vary by class: Playgroup/Nursery: Rs. 8,000, KG-Class 5: Rs. 10,000, O Level: Rs. 15,000, A Level: Rs. 18,000. Fee payment can be made at school office or through bank transfer. Late fee applies after 10th of each month.';
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('phone')) {
      answer = 'You can reach us at +92 340 0078000 or visit us at D-Block Muhafiz Town, Gujranwala. Office hours: Monday-Saturday 8:00 AM - 3:00 PM.';
    } else if (lowerQuestion.includes('timetable') || lowerQuestion.includes('schedule')) {
      answer = 'School timings are 8:00 AM to 2:00 PM for most classes. Parents can access detailed timetables through the Parent Portal after logging in with their credentials.';
    } else if (lowerQuestion.includes('result') || lowerQuestion.includes('exam')) {
      answer = 'Exam results are published on the Student Portal within 2 weeks of exam completion. Parents receive SMS notifications when results are available. Annual reports are issued at the end of each academic year.';
    } else if (lowerQuestion.includes('robotic') || lowerQuestion.includes('stem') || lowerQuestion.includes('stream')) {
      answer = 'Al Qalam offers state-of-the-art Robotics and STEM labs. Our STREAM program integrates Science, Technology, Reading, Engineering, Arts, and Mathematics. Students participate in national and international robotics competitions.';
    } else if (lowerQuestion.includes('location') || lowerQuestion.includes('address') || lowerQuestion.includes('where')) {
      answer = 'Our campus is located at D-Block Muhafiz Town, Gujranwala, Punjab, Pakistan. We have ample parking space and easy access from main GT Road.';
    } else {
      answer = 'Thank you for your query! For more specific information, please contact our office at +92 340 0078000 or visit the relevant section on our website. Our staff will be happy to assist you during office hours (8 AM - 3 PM, Monday-Saturday).';
    }

    // Log the chat interaction
    await pool.query(
      `INSERT INTO ai_chat_logs (session_id, question, answer)
       VALUES ($1, $2, $3)`,
      [sessionId || 'anonymous', question, answer]
    );

    res.json({
      question,
      answer,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Al Qalam International Cambridge School API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Al Qalam Backend Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏫 School: Al Qalam International Cambridge School`);
  console.log(`📞 Contact: +92 340 0078000`);
  console.log(`📍 Address: D-Block Muhafiz Town, Gujranwala`);
});

export default app;
