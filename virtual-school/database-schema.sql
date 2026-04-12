-- Virtual School Database Schema
-- PostgreSQL Database for AWS RDS
-- Complete schema for Multi-branch Virtual School with LMS, Admissions, and AI Chat

-- Enable UUID extension for secure primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SCHOOL BRANCHES TABLE
-- ============================================
CREATE TABLE school_branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_name VARCHAR(255) NOT NULL,
    branch_code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    phone VARCHAR(50),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. USERS TABLE (Centralized Authentication)
-- ============================================
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student', 'parent', 'staff');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id UUID REFERENCES school_branches(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    role user_role NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. ADMISSION CYCLES TABLE
-- ============================================
CREATE TABLE admission_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id UUID REFERENCES school_branches(id),
    cycle_name VARCHAR(255) NOT NULL,
    academic_year VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    max_applications INTEGER,
    application_fee DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. APPLICATIONS TABLE (Admission Forms)
-- ============================================
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'shortlisted', 'admitted', 'rejected', 'withdrawn');

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cycle_id UUID REFERENCES admission_cycles(id),
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_email VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(50) NOT NULL,
    grade_applying INTEGER NOT NULL,
    date_of_birth DATE,
    previous_school VARCHAR(255),
    form_data JSONB, -- Flexible form fields
    documents JSONB, -- Document URLs
    status application_status DEFAULT 'pending',
    review_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. COURSES TABLE (LMS)
-- ============================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id UUID REFERENCES school_branches(id),
    course_name VARCHAR(255) NOT NULL,
    course_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100),
    grade_level INTEGER,
    duration_weeks INTEGER,
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT false,
    instructor_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. MODULES TABLE (Course Sections)
-- ============================================
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    module_name VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. LESSONS TABLE (Individual Lessons)
-- ============================================
CREATE TYPE lesson_type AS ENUM ('video', 'text', 'quiz', 'assignment', 'live_class', 'resource');

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    lesson_name VARCHAR(255) NOT NULL,
    lesson_type lesson_type NOT NULL,
    content_url TEXT,
    content_text TEXT,
    duration_minutes INTEGER,
    order_index INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT false,
    resources JSONB, -- Additional resources/attachments
    quiz_data JSONB, -- Quiz questions if applicable
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. ENROLLMENTS TABLE
-- ============================================
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped', 'paused');

CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id),
    course_id UUID REFERENCES courses(id),
    status enrollment_status DEFAULT 'active',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    progress_percentage DECIMAL(5, 2) DEFAULT 0.00,
    final_grade DECIMAL(5, 2),
    certificate_issued BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- ============================================
-- 9. LESSON COMPLETIONS TABLE
-- ============================================
CREATE TABLE lesson_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time_spent_minutes INTEGER,
    quiz_score DECIMAL(5, 2),
    attempts INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(enrollment_id, lesson_id)
);

-- ============================================
-- 10. AI CHAT LOGS TABLE
-- ============================================
CREATE TABLE ai_chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    message_text TEXT NOT NULL,
    response_text TEXT NOT NULL,
    sentiment VARCHAR(50),
    category VARCHAR(100),
    is_helpful BOOLEAN,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_branch ON users(branch_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_cycle ON applications(cycle_id);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_lesson_completions_enrollment ON lesson_completions(enrollment_id);
CREATE INDEX idx_ai_chat_logs_user ON ai_chat_logs(user_id);
CREATE INDEX idx_ai_chat_logs_created ON ai_chat_logs(created_at);

-- ============================================
-- TRIGGER FOR UPDATED_AT TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_school_branches_updated_at BEFORE UPDATE ON school_branches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admission_cycles_updated_at BEFORE UPDATE ON admission_cycles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (FOR TESTING)
-- ============================================
INSERT INTO school_branches (branch_name, branch_code, city, country) 
VALUES ('Main Campus', 'MAIN', 'Virtual City', 'USA');

INSERT INTO users (email, password_hash, first_name, last_name, role, branch_id) 
VALUES 
    ('admin@virtualschool.com', '$2b$10$examplehash', 'Admin', 'User', 'admin', (SELECT id FROM school_branches WHERE branch_code = 'MAIN')),
    ('teacher@virtualschool.com', '$2b$10$examplehash', 'John', 'Doe', 'teacher', (SELECT id FROM school_branches WHERE branch_code = 'MAIN'));

COMMENT ON TABLE school_branches IS 'Stores information about different school branches/campuses';
COMMENT ON TABLE users IS 'Centralized user authentication with role-based access control';
COMMENT ON TABLE applications IS 'Student admission applications with flexible JSONB form data';
COMMENT ON TABLE courses IS 'LMS course catalog with Udemy-style structure';
COMMENT ON TABLE enrollments IS 'Tracks student course enrollments and progress';
COMMENT ON TABLE ai_chat_logs IS 'Logs AI assistant interactions for improvement and analytics';
