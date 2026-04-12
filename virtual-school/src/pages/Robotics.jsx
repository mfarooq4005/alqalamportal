import { motion } from 'framer-motion'
import { Cpu, Trophy, Zap, Users, Globe, Award } from 'lucide-react'

const Robotics = () => {
  const labs = [
    { name: 'AI & Machine Learning Lab', icon: <Cpu className="w-8 h-8" />, desc: 'Explore neural networks and AI algorithms' },
    { name: 'Robotics Assembly Lab', icon: <Zap className="w-8 h-8" />, desc: 'Build and program autonomous robots' },
    { name: 'VR/AR Innovation Lab', icon: <Globe className="w-8 h-8" />, desc: 'Create immersive virtual experiences' },
    { name: 'Competition Arena', icon: <Trophy className="w-8 h-8" />, desc: 'Practice for international competitions' }
  ]

  const achievements = [
    { title: 'First Place - International Robotics Olympiad 2024', level: 'Global' },
    { title: 'Best Innovation Award - Tech Summit 2023', level: 'National' },
    { title: 'Gold Medal - AI Challenge 2023', level: 'Global' },
    { title: 'Champions - Regional Robotics League', level: 'Regional' }
  ]

  const courses = [
    'Introduction to Robotics',
    'Advanced Programming with Python',
    'Machine Learning Fundamentals',
    'Computer Vision Applications',
    'Autonomous Systems Design',
    'IoT and Smart Devices',
    '3D Modeling & Printing',
    'Competition Preparation'
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
              Robotics & <span className="gradient-text">Innovation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              State-of-the-art facilities and expert guidance to nurture the 
              next generation of engineers, programmers, and innovators.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: '10+', label: 'Advanced Labs', icon: <Users /> },
              { value: '500+', label: 'Robots Built', icon: <Cpu /> },
              { value: '50+', label: 'Awards Won', icon: <Trophy /> },
              { value: '100%', label: 'Hands-on Learning', icon: <Zap /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-morphism p-6 rounded-2xl text-center"
              >
                <div className="text-accent mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Labs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Our Laboratories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {labs.map((lab, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-morphism p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform">{lab.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{lab.name}</h3>
                  <p className="text-gray-400 text-sm">{lab.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 glass-morphism rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-8">Course Curriculum</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-gray-300">{course}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Achievements & Recognition</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-morphism p-6 rounded-2xl flex items-start space-x-4"
                >
                  <Award className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                    <span className="inline-block px-3 py-1 bg-primary/30 rounded-full text-xs text-primary">
                      {achievement.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass-morphism rounded-3xl p-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Robotics Program</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Start your journey in robotics and innovation. Limited seats available for our upcoming batch.
              </p>
              <a href="/admissions" className="btn-primary inline-flex items-center">
                Apply Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Robotics
