import { motion } from 'framer-motion'
import { Image, Video, Award, Users } from 'lucide-react'

const Gallery = () => {
  const images = [
    { id: 1, type: 'image', title: 'Campus View', category: 'Infrastructure' },
    { id: 2, type: 'image', title: 'Robotics Lab', category: 'Facilities' },
    { id: 3, type: 'image', title: 'Students Learning', category: 'Academics' },
    { id: 4, type: 'video', title: 'Virtual Classroom', category: 'Technology' },
    { id: 5, type: 'image', title: 'Science Experiment', category: 'Academics' },
    { id: 6, type: 'image', title: 'Sports Day', category: 'Events' },
    { id: 7, type: 'video', title: 'Annual Function', category: 'Events' },
    { id: 8, type: 'image', title: 'Art Exhibition', category: 'Creative' },
    { id: 9, type: 'image', title: 'Graduation Ceremony', category: 'Events' },
    { id: 10, type: 'image', title: 'Computer Lab', category: 'Facilities' },
    { id: 11, type: 'video', title: 'Project Demo', category: 'Innovation' },
    { id: 12, type: 'image', title: 'Group Discussion', category: 'Academics' }
  ]

  const categories = ['All', 'Infrastructure', 'Facilities', 'Academics', 'Events', 'Technology', 'Creative', 'Innovation']

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
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore moments that define our vibrant learning community. 
              From state-of-the-art facilities to memorable events.
            </p>
          </motion.div>

          {/* Filter Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'glass-morphism hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-square glass-morphism rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all"
              >
                {/* Placeholder for actual image/video */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Video className="w-12 h-12 text-white/70 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Image className="w-12 h-12 text-white/70 group-hover:scale-110 transition-transform" />
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-xs text-accent mb-1">{item.category}</span>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>

                {/* Type Badge */}
                {item.type === 'video' && (
                  <div className="absolute top-3 right-3 glass-morphism px-2 py-1 rounded-full">
                    <Video className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Image className="w-8 h-8" />, value: '500+', label: 'Photos' },
              { icon: <Video className="w-8 h-8" />, value: '50+', label: 'Videos' },
              { icon: <Award className="w-8 h-8" />, value: '100+', label: 'Events Covered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-morphism p-8 rounded-2xl text-center"
              >
                <div className="text-accent mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 glass-morphism rounded-3xl p-12 text-center"
          >
            <Users className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Be Part of Our Story</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community and create memories that last a lifetime. 
              Schedule a virtual tour or visit us in person.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center">
              Schedule a Tour
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
