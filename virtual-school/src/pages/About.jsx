import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Clock, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Clock, number: '15+', label: 'Years of Excellence' },
    { icon: Users, number: '2000+', label: 'Students' },
    { icon: Award, number: '98%', label: 'Pass Rate' },
    { icon: TrendingUp, number: '50+', label: 'University Placements' },
  ];

  const timeline = [
    { year: '2009', title: 'Foundation', description: 'Al Qalam International Cambridge School was established with a vision to provide world-class education.' },
    { year: '2012', title: 'First Graduating Class', description: 'Our first O Level batch achieved remarkable 95% pass rate with distinction.' },
    { year: '2015', title: 'A Levels Introduction', description: 'Expanded curriculum to include A Levels program with Science and Commerce streams.' },
    { year: '2018', title: 'New Campus', description: 'Moved to state-of-the-art facility with modern laboratories and sports complex.' },
    { year: '2021', title: 'Digital Transformation', description: 'Launched comprehensive LMS and hybrid learning capabilities.' },
    { year: '2024', title: 'Excellence Continues', description: 'Recognized as top Cambridge school in the region with outstanding results.' },
  ];

  const values = [
    { 
      icon: Target, 
      title: 'Our Mission', 
      content: 'To provide excellence in education through Cambridge curriculum, fostering critical thinking, creativity, and character development in every student.' 
    },
    { 
      icon: Eye, 
      title: 'Our Vision', 
      content: 'To be a leading educational institution that produces future leaders, innovators, and responsible global citizens.' 
    },
    { 
      icon: Award, 
      title: 'Our Values', 
      content: 'Integrity, Excellence, Respect, Innovation, and Community Service guide everything we do at Al Qalam.' 
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-dark-950 to-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              Building <span className="text-gradient-gold">Legacies</span> Since 2009
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Al Qalam International Cambridge School is committed to nurturing young minds 
              and preparing them for success in a rapidly changing world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl text-center card-hover border border-primary-500/20"
              >
                <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-3xl font-bold font-heading text-gradient-gold mb-2">{stat.number}</h3>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl card-hover border border-primary-500/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Our <span className="text-gradient-gold">Journey</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to becoming a beacon of educational excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 to-primary-700" />

            {/* Timeline Items */}
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-950 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass p-6 rounded-2xl border border-primary-500/20 card-hover">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-semibold rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-primary-500/30 text-center"
          >
            <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 leading-relaxed">
              "At Al Qalam, we believe every child has unlimited potential. Our mission is to 
              unlock that potential through quality education, moral guidance, and holistic 
              development. We don't just teach subjects; we build character and prepare 
              students for life."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold font-heading text-white">Principal Name</p>
                <p className="text-primary-400">Al Qalam International Cambridge School</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
