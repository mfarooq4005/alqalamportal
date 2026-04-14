import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, Microscope, Calculator, PenTool, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Academics = () => {
  const programs = [
    {
      icon: BookOpen,
      title: 'O Level Programme',
      grades: 'Grades 9-11',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Urdu', 'Pakistan Studies'],
      description: 'Cambridge International O Levels provide a balanced curriculum with rigorous assessment.'
    },
    {
      icon: Laptop,
      title: 'A Level Programme',
      grades: 'Grades 12-13',
      streams: [
        { name: 'Science (Pre-Medical)', subjects: ['Biology', 'Chemistry', 'Physics', 'Mathematics'] },
        { name: 'Science (Pre-Engineering)', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'] },
        { name: 'Commerce', subjects: ['Accounting', 'Business Studies', 'Economics', 'Mathematics'] }
      ],
      description: 'Specialized streams preparing students for university and professional careers.'
    }
  ];

  const lmsFeatures = [
    { icon: Laptop, title: 'Online Classes', desc: 'Live interactive sessions' },
    { icon: BookOpen, title: 'Digital Library', desc: 'E-books and resources' },
    { icon: Calculator, title: 'Assignments', desc: 'Submit and track work' },
    { icon: Microscope, title: 'Virtual Labs', desc: 'Interactive experiments' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
              Academic Excellence
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              Our <span className="text-gradient-gold">Programs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cambridge International curriculum designed to develop critical thinking, 
              creativity, and lifelong learning skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto space-y-16">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-3xl border border-primary-500/20"
            >
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">{program.title}</h2>
                  <p className="text-primary-400 font-semibold">{program.grades}</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{program.description}</p>
              
              {program.subjects && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Core Subjects:</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, idx) => (
                      <span key={idx} className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {program.streams && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Specialization Streams:</h3>
                  {program.streams.map((stream, idx) => (
                    <div key={idx} className="glass p-4 rounded-xl border border-white/10">
                      <h4 className="font-semibold text-white mb-2">{stream.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {stream.subjects.map((subject, sIdx) => (
                          <span key={sIdx} className="px-3 py-1 bg-white/5 rounded-full text-gray-300 text-sm">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* LMS Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Digital Learning <span className="text-gradient-gold">Platform</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access our comprehensive Learning Management System for seamless education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {lmsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl text-center card-hover border border-primary-500/20"
              >
                <feature.icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/portal" className="btn-gold inline-flex items-center space-x-2">
              <Laptop className="w-5 h-5" />
              <span>Access Student Portal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-20 px-4 bg-dark-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-primary-500/20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                Assessment & <span className="text-gradient-gold">Evaluation</span>
              </h2>
              <p className="text-gray-300">
                Continuous assessment through quizzes, assignments, projects, and terminal examinations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Formative Assessment', desc: 'Regular quizzes and class participation' },
                { title: 'Summative Assessment', desc: 'Mid-term and final examinations' },
                { title: 'Practical Evaluation', desc: 'Lab work and project presentations' }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 glass rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
