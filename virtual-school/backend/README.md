# Al Qalam International Cambridge School - Backend API

Complete backend system for managing school portals, admissions, gallery, announcements, and AI chat.

## 🏫 School Information
- **Name**: Al Qalam International Cambridge School
- **Address**: D-Block Muhafiz Town, Gujranwala
- **Phone**: +92 340 0078000
- **Email**: info@alqalam.edu.pk

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Teacher, Student, Parent)
- Secure password hashing with bcrypt

### Portal Dashboards
- **Student Portal**: Attendance, assignments, results, courses
- **Parent Portal**: Multiple children tracking, attendance stats, fee payments
- **Teacher Portal**: Class management, grading, analytics

### Admission Management
- Online application submission with document upload
- Application status tracking (Pending → Under Review → Shortlisted → Admitted/Rejected)
- Admin dashboard for reviewing applications

### Gallery Management
- Image upload with categories
- Admin-controlled publishing
- Pagination support

### Announcements
- Priority-based notifications (Low, Normal, High, Urgent)
- Expiry date support
- Targeted communications

### AI Chat Assistant
- Rule-based responses for common queries
- Chat logging for improvement
- Customizable responses

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- PostgreSQL 13+
- npm or yarn

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup Database**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE alqalam_school;

# Run schema
\i database-schema.sql
```

4. **Start Server**
```bash
# Development
npm run dev

# Production
npm start
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration

### Portals
- `GET /api/portal/student/dashboard` - Student dashboard data
- `GET /api/portal/parent/dashboard` - Parent dashboard data  
- `GET /api/portal/teacher/dashboard` - Teacher dashboard data

### Admissions
- `POST /api/admissions/apply` - Submit application
- `GET /api/admissions/applications` - Get all applications (Admin)
- `PATCH /api/admissions/applications/:id/status` - Update status (Admin)

### Gallery
- `GET /api/gallery` - Get published images
- `POST /api/gallery` - Upload image (Admin)

### Announcements
- `GET /api/announcements` - Get active announcements
- `POST /api/announcements` - Create announcement (Admin)

### AI Chat
- `POST /api/chat/ask` - Ask a question

## 🗄️ Database Schema

### Core Tables
- `users` - All user accounts with roles
- `students` - Extended student profiles
- `school_branches` - Multi-campus support

### Academic Tables
- `courses`, `modules`, `lessons` - LMS structure
- `enrollments`, `lesson_completions` - Progress tracking
- `assignments`, `assignment_submissions` - Homework system
- `exams`, `exam_results` - Examination system
- `attendance` - Daily attendance
- `timetables` - Class schedules

### Administrative Tables
- `admission_cycles`, `admission_applications` - Admissions
- `gallery_images` - Photo gallery
- `announcements` - News & notifications
- `fee_structure`, `fee_payments` - Fee management
- `ai_chat_logs` - Chat history

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- SQL injection prevention (parameterized queries)
- File upload validation
- CORS configuration

## 📝 Default Credentials

After running the database schema:
- **Email**: admin@alqalam.edu.pk
- **Password**: admin123 (change immediately!)

## 🌐 Deployment

### Environment Variables
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alqalam_school
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
PORT=5000
```

### Production Checklist
- [ ] Change default admin password
- [ ] Set strong JWT secret
- [ ] Enable SSL for database
- [ ] Configure CORS for production domain
- [ ] Set up backup strategy
- [ ] Enable logging and monitoring

## 📞 Support

For technical support:
- Email: support@alqalam.edu.pk
- Phone: +92 340 0078000

---

**Al Qalam International Cambridge School** © 2024
