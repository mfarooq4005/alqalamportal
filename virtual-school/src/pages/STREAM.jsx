import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Dna, Palette, Calculator, Globe, BookOpen, Lightbulb, Users } from 'lucide-react';

const STREAM = () => {
  const streamComponents = [
    { icon: Dna, letter: 'S', name: 'Science', desc: 'Biology, Chemistry, Physics - Understanding the natural world' },
    { icon: Calculator, letter: 'T', name: 'Technology', desc: 'Digital literacy, coding, and tech innovation' },
    { icon: Atom, letter: 'R', name: 'Reading', desc: 'Critical reading, comprehension, and literature' },
    { icon: Palette, letter: 'E', name: 'Engineering', desc: 'Design thinking, problem-solving, and creation' },
    { icon: BookOpen, letter: 'A', name: 'Arts', desc: 'Creative expression, visual and performing arts' },
    { icon: Calculator, letter: 'M', name: 'Mathematics', desc: 'Logical reasoning, patterns, and quantitative skills' },
  ];

  const benefits = [
    { title: 'Holistic Learning', desc: 'Integrated approach connecting all subjects' },
    { title: 'Critical Thinking', desc: 'Problem-solving across disciplines' },
    { title: 'Creativity', desc: 'Innovation through arts and sciences' },
    { title: 'Real-World Application', desc: 'Practical projects and experiments' },
  ];

  const projects = [
    { title: 'Smart Garden System', category: 'STEM + Arts', desc: 'IoT-based automated garden with artistic design' },
    { title: 'Math in Nature', category: 'Math + Science', desc: 'Exploring Fibonacci sequence in plants' },
    { title: 'Historical Timeline App', category: 'Tech + Reading', desc: 'Interactive app for history learning' },
    { title: 'Sustainable City Model', category: 'Engineering + Science', desc: 'Eco-friendly city planning project' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-dark-950 to-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/30 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
              Integrated Learning
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              <span className="text-gradient-gold">STREAM</span> Education
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Science, Technology, Reading, Engineering, Arts, and Mathematics - 
              An integrated approach to 21st-century learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STREAM Components */}
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
              The <span className="text-gradient-gold">STREAM</span> Framework
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Six interconnected disciplines forming a comprehensive education
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {streamComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-primary-500/20 text-center card-hover group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <component.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gradient-gold mb-2">{component.letter}</div>
                <h3 className="text-lg font-bold text-white mb-2">{component.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{component.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              Why <span className="text-gradient-gold">STREAM</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Preparing students for the challenges of tomorrow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-primary-500/20 text-center"
              >
                <Lightbulb className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-4 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Student <span className="text-gradient-gold">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real-world applications of STREAM learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl border border-primary-500/20 card-hover"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Atom className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-900/50 to-dark-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-primary-500/30"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                How We Implement <span className="text-gradient-gold">STREAM</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Interdisciplinary Lessons', desc: 'Teachers collaborate to create connected curriculum' },
                { step: '02', title: 'Project-Based Learning', desc: 'Students work on real-world challenges' },
                { step: '03', title: 'Assessment & Reflection', desc: 'Continuous evaluation and improvement' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-gradient-gold mb-4 opacity-50">{item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
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

export default STREAM;
