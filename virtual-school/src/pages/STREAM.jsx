import { motion } from 'framer-motion'
import { Atom, Code, Palette, Calculator, Cpu, BookOpen } from 'lucide-react'

const STREAM = () => {
  const streamComponents = [
    { 
      letter: 'S', 
      title: 'Science', 
      icon: <Atom className="w-10 h-10" />,
      desc: 'Exploring the natural world through experiments and discovery',
      topics: ['Physics', 'Chemistry', 'Biology', 'Environmental Science']
    },
    { 
      letter: 'T', 
      title: 'Technology', 
      icon: <Code className="w-10 h-10" />,
      desc: 'Mastering digital tools and computational thinking',
      topics: ['Programming', 'Web Development', 'Data Science', 'Cybersecurity']
    },
    { 
      letter: 'R', 
      title: 'Robotics', 
      icon: <Cpu className="w-10 h-10" />,
      desc: 'Building intelligent machines and automation systems',
      topics: ['Mechanical Design', 'Electronics', 'AI Integration', 'Control Systems']
    },
    { 
      letter: 'E', 
      title: 'Engineering', 
      icon: <Calculator className="w-10 h-10" />,
      desc: 'Solving real-world problems through design and innovation',
      topics: ['Civil', 'Mechanical', 'Electrical', 'Software Engineering']
    },
    { 
      letter: 'A', 
      title: 'Arts', 
      icon: <Palette className="w-10 h-10" />,
      desc: 'Fostering creativity and aesthetic expression',
      topics: ['Visual Arts', 'Music', 'Design Thinking', 'Digital Media']
    },
    { 
      letter: 'M', 
      title: 'Mathematics', 
      icon: <BookOpen className="w-10 h-10" />,
      desc: 'Developing logical reasoning and analytical skills',
      topics: ['Algebra', 'Calculus', 'Statistics', 'Geometry']
    }
  ]

  const benefits = [
    'Interdisciplinary learning approach',
    'Real-world problem solving',
    'Enhanced critical thinking',
    'Collaborative project work',
    'Innovation and creativity',
    'Career readiness'
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
              <span className="gradient-text">STREAM</span> Education
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              An integrated approach combining Science, Technology, Robotics, 
              Engineering, Arts, and Mathematics for holistic development.
            </p>
          </motion.div>

          {/* STREAM Components */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {streamComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-morphism p-8 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-accent group-hover:scale-110 transition-transform">
                    {component.icon}
                  </div>
                  <div className="text-5xl font-bold gradient-text opacity-30">
                    {component.letter}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3">{component.title}</h2>
                <p className="text-gray-400 mb-4">{component.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {component.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-primary/30 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Integration Approach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 glass-morphism rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Why STREAM?</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  STREAM education goes beyond traditional subject boundaries. By integrating 
                  these disciplines, students learn to think critically, solve complex problems, 
                  and approach challenges from multiple perspectives. This holistic approach 
                  prepares them for the interconnected world of tomorrow.
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative h-80 glass-morphism rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-8">
                    {streamComponents.map((comp, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ 
                          y: [0, -10, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2, 
                          delay: idx * 0.2 
                        }}
                        className="text-center"
                      >
                        <div className="text-accent opacity-70">{comp.icon}</div>
                        <div className="text-xs mt-1 text-gray-400">{comp.letter}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Student Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Smart City Model', desc: 'IoT-based urban planning solution', subjects: ['T', 'E', 'M'] },
                { title: 'Robotic Arm', desc: 'AI-powered precision manipulation', subjects: ['R', 'E', 'S'] },
                { title: 'Digital Art Gallery', desc: 'VR museum experience', subjects: ['A', 'T', 'E'] }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-morphism p-6 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl mb-4 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white/50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.desc}</p>
                  <div className="flex gap-2">
                    {project.subjects.map((subject, idx) => (
                      <span key={idx} className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center text-xs font-bold">
                        {subject}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default STREAM
