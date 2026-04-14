import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Trophy, FlaskConical, Code, Lightbulb, Users } from 'lucide-react';

const Robotics = () => {
  const labs = [
    { icon: Cpu, title: 'Robotics Lab', desc: 'Advanced robotics kits and programming stations' },
    { icon: FlaskConical, title: 'AI & ML Lab', desc: 'Machine learning development environment' },
    { icon: Code, title: 'Coding Hub', desc: 'Software development and app creation' },
    { icon: Lightbulb, title: 'Innovation Center', desc: 'Prototyping and project development' },
  ];

  const achievements = [
    { year: '2024', title: 'National Robotics Championship', position: '1st Place', desc: 'Gold medal in autonomous robot category' },
    { year: '2023', title: 'International Science Fair', position: 'Silver Medal', desc: 'Recognition for AI-powered waste sorting system' },
    { year: '2023', title: 'Pakistan Tech Olympiad', position: 'Top 5', desc: 'Among top 5 teams nationwide' },
    { year: '2022', title: 'Regional Innovation Challenge', position: 'Winner', desc: 'Best IoT solution award' },
  ];

  const courses = [
    { name: 'Introduction to Robotics', level: 'Beginner', duration: '6 months' },
    { name: 'Arduino Programming', level: 'Intermediate', duration: '4 months' },
    { name: 'Python for AI', level: 'Advanced', duration: '8 months' },
    { name: '3D Design & Printing', level: 'All Levels', duration: '3 months' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-dark-950 to-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
              Innovation & Technology
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              Robotics & <span className="text-gradient-gold">STEM</span> Excellence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge facilities and programs to nurture future innovators, 
              engineers, and technology leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Labs */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              State-of-the-Art <span className="text-gradient-gold">Labs</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              World-class facilities for hands-on learning and experimentation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labs.map((lab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl card-hover border border-primary-500/20 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <lab.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-3">{lab.title}</h3>
                <p className="text-gray-400">{lab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
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
              Our <span className="text-gradient-gold">Achievements</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Recognized excellence in national and international competitions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-primary-500/20 flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full mb-2">
                    {achievement.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                  <p className="text-primary-400 font-semibold text-sm mb-2">{achievement.position}</p>
                  <p className="text-gray-400 text-sm">{achievement.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-4 bg-dark-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Specialized <span className="text-gradient-gold">Courses</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive programs for all skill levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-white/10 card-hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{course.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    course.level === 'Advanced' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-400 text-sm flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Duration: {course.duration}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-900/50 to-dark-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
              Join Our <span className="text-gradient-gold">Robotics Program</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Enroll in our robotics and STEM programs to unlock your potential
            </p>
            <a href="/admissions" className="btn-gold inline-flex items-center space-x-2">
              <span>Apply Now</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Robotics;
