-- Al Qalam International Cambridge School Database Schema
-- PostgreSQL Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- School Branches Table
CREATE TABLE IF NOT EXISTS school_branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_name VARCHAR(100) NOT NULL,
    branch_code VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table (Admins, Teachers, Students, Parents)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
    branch_id UUID REFERENCES school_branches(id),
    phone VARCHAR(20),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Profiles
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(20) UNIQUE,
    class_grade VARCHAR(20),
    section VARCHAR(10),
    admission_date DATE,
    parent_id UUID REFERENCES users(id),
    date_of_birth DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    medical_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parent-Student Relationship
CREATE TABLE IF NOT EXISTS parent_student_relation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    relationship VARCHAR(20) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(parent_id, student_id)
);

-- Admission Cycles
CREATE TABLE IF NOT EXISTS admission_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_year VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    total_seats INTEGER,
    filled_seats INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admission Applications
CREATE TABLE IF NOT EXISTS admission_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cycle_id UUID REFERENCES admission_cycles(id),
    applicant_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100) NOT NULL,
    mother_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    applicant_dob DATE NOT NULL,
    applying_class VARCHAR(20) NOT NULL,
    previous_school VARCHAR(100),
    address TEXT,
    documents_json JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'shortlisted', 'admitted', 'rejected')),
    remarks TEXT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    description TEXT,
    category VARCHAR(50),
    class_grade VARCHAR(20),
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modules Table
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    module_title VARCHAR(100) NOT NULL,
    module_order INTEGER NOT NULL,
    description TEXT,
    duration_minutes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    lesson_title VARCHAR(100) NOT NULL,
    lesson_order INTEGER NOT NULL,
    lesson_type VARCHAR(20) CHECK (lesson_type IN ('video', 'text', 'quiz', 'assignment')),
    content_url TEXT,
    content_text TEXT,
    duration_minutes INTEGER,
    is_free BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress_percentage INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    completed_at TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- Lesson Completions
CREATE TABLE IF NOT EXISTS lesson_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_spent_seconds INTEGER,
    UNIQUE(enrollment_id, lesson_id)
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    total_marks INTEGER,
    attachment_url TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignment Submissions
CREATE TABLE IF NOT EXISTS assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    submission_text TEXT,
    file_url TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    marks_obtained INTEGER,
    feedback TEXT,
    graded_by UUID REFERENCES users(id),
    graded_at TIMESTAMP
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    remarks TEXT,
    marked_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, date)
);

-- Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_name VARCHAR(100) NOT NULL,
    exam_type VARCHAR(50),
    session_year VARCHAR(20),
    start_date DATE,
    end_date DATE,
    total_marks INTEGER,
    passing_marks INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam Results
CREATE TABLE IF NOT EXISTS exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    marks_obtained INTEGER,
    total_marks INTEGER,
    percentage DECIMAL(5,2),
    grade VARCHAR(5),
    remarks TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    UNIQUE(exam_id, student_id)
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100),
    description TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(50),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by UUID REFERENCES users(id),
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0
);

-- News & Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    published_by UUID REFERENCES users(id),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- AI Chat Logs
CREATE TABLE IF NOT EXISTS ai_chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(100),
    question TEXT NOT NULL,
    answer TEXT,
    sentiment VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Structure
CREATE TABLE IF NOT EXISTS fee_structure (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_grade VARCHAR(20) NOT NULL,
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    session_year VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Payments
CREATE TABLE IF NOT EXISTS fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_structure_id UUID REFERENCES fee_structure(id),
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(20),
    transaction_id VARCHAR(100),
    receipt_number VARCHAR(50) UNIQUE,
    status VARCHAR(20) DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'failed', 'refunded')),
    remarks TEXT,
    paid_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timetable
CREATE TABLE IF NOT EXISTS timetables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_grade VARCHAR(20) NOT NULL,
    section VARCHAR(10),
    day_of_week VARCHAR(10) NOT NULL,
    period_number INTEGER NOT NULL,
    subject VARCHAR(50),
    teacher_id UUID REFERENCES users(id),
    room_number VARCHAR(20),
    start_time TIME,
    end_time TIME,
    session_year VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(class_grade, section, day_of_week, period_number)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_admission_applications_status ON admission_applications(status);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_exam_results_student_id ON exam_results(student_id);
CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_announcements_priority ON announcements(priority);

-- Insert default admin user (password: admin123 - change immediately!)
INSERT INTO users (email, password_hash, full_name, role) 
VALUES ('admin@alqalam.edu.pk', '$2a$10$YourHashedPasswordHere', 'Administrator', 'admin');

COMMENT ON TABLE users IS 'Central user table for all roles in Al Qalam International Cambridge School';
COMMENT ON TABLE students IS 'Extended student profiles linked to users';
COMMENT ON TABLE admission_applications IS 'Online admission applications tracking';
COMMENT ON TABLE courses IS 'LMS courses for online learning';
COMMENT ON TABLE gallery_images IS 'School photo gallery management';
COMMENT ON TABLE announcements IS 'News and announcements for parents/students';
