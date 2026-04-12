import { motion } from 'framer-motion'
import { BookOpen, Video, FileText, Award } from 'lucide-react'

const Academics = () => {
  const programs = [
    {
      level: 'Primary School',
      grades: 'Grades 1-5',
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Arts', 'Physical Education'],
      description: 'Building strong foundations with interactive and engaging learning methods.'
    },
    {
      level: 'Middle School',
      grades: 'Grades 6-8',
      subjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'History', 'Computer Science'],
      description: 'Developing critical thinking and preparing for advanced studies.'
    },
    {
      level: 'High School',
      grades: 'Grades 9-12',
      subjects: ['Calculus', 'Advanced Sciences', 'Literature', 'Economics', 'Psychology', 'AP Courses', 'Career Prep'],
      description: 'College preparatory curriculum with specialization options.'
    }
  ]

  const features = [
    { icon: <BookOpen className="w-6 h-6" />, title: 'Interactive Curriculum', desc: 'Engaging digital content with multimedia resources' },
    { icon: <Video className="w-6 h-6" />, title: 'Live Classes', desc: 'Real-time interaction with expert teachers' },
    { icon: <FileText className="w-6 h-6" />, title: 'Personalized Learning', desc: 'AI-driven adaptive learning paths' },
    { icon: <Award className="w-6 h-6" />, title: 'Certified Programs', desc: 'Recognized certifications upon completion' }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Academic <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive curriculum designed to challenge and inspire students 
              at every level of their educational journey.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-morphism p-6 rounded-2xl text-center hover:bg-white/10 transition-all"
              >
                <div className="text-accent mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Programs */}
          <div className="space-y-12">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-morphism rounded-3xl p-8 hover:bg-white/5 transition-all"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2 gradient-text">{program.level}</h2>
                    <p className="text-accent font-semibold mb-4">{program.grades}</p>
                    <p className="text-gray-300">{program.description}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Core Subjects:</h3>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-primary/30 transition-colors cursor-default"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LMS Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 glass-morphism rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Powered by Advanced LMS</h2>
                <p className="text-gray-300 mb-6">
                  Our Learning Management System provides a seamless experience for students, 
                  teachers, and parents. Track progress, access resources, and collaborate 
                  in real-time.
                </p>
                <ul className="space-y-3">
                  {['Video lessons & recordings', 'Interactive quizzes & assignments', 'Progress tracking & analytics', 'Discussion forums', 'Certificate generation'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-morphism rounded-2xl p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-accent mx-auto mb-4" />
                  <p className="text-gray-400">LMS Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Academics
