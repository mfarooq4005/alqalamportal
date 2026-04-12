import { motion } from 'framer-motion'
import { Award, Target, Clock, Users } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: '5000+', label: 'Students' },
    { icon: <Award className="w-8 h-8" />, value: '200+', label: 'Expert Teachers' },
    { icon: <Clock className="w-8 h-8" />, value: '15+', label: 'Years Experience' },
    { icon: <Target className="w-8 h-8" />, value: '98%', label: 'Success Rate' },
  ]

  const timeline = [
    { year: '2010', title: 'Foundation', description: 'Virtual School was established with a vision to revolutionize education.' },
    { year: '2015', title: 'Digital Transformation', description: 'Launched our first fully online learning platform.' },
    { year: '2018', title: 'AI Integration', description: 'Introduced AI-powered personalized learning paths.' },
    { year: '2020', title: 'Global Expansion', description: 'Expanded to 50+ countries worldwide.' },
    { year: '2024', title: 'Robotics & STREAM', description: 'Opened state-of-the-art robotics labs and STREAM centers.' },
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
              About <span className="gradient-text">Virtual School</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are pioneers in virtual education, combining cutting-edge technology 
              with proven pedagogical methods to create exceptional learning experiences.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-morphism p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-4 gradient-text">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To provide accessible, high-quality education to students worldwide through 
                innovative technology, personalized learning approaches, and a commitment to 
                excellence that prepares every student for success in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-morphism p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-4 gradient-text">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To be the global leader in virtual education, recognized for transforming 
                how students learn, teachers teach, and communities engage with knowledge 
                in an increasingly connected world.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
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

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} mb-4 md:mb-0`}>
                      <div className="glass-morphism p-6 rounded-2xl">
                        <div className="text-accent font-bold text-xl mb-2">{item.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full items-center justify-center flex-shrink-0 z-10">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
