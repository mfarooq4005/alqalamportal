import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Award, Users, Building, BookOpen } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: Camera },
    { id: 'campus', name: 'Campus', icon: Building },
    { id: 'events', name: 'Events', icon: Users },
    { id: 'academics', name: 'Academics', icon: BookOpen },
    { id: 'sports', name: 'Sports', icon: Award },
  ];

  const galleryItems = [
    { id: 1, category: 'campus', title: 'Main Building', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' },
    { id: 2, category: 'campus', title: 'Science Lab', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800' },
    { id: 3, category: 'events', title: 'Annual Day', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800' },
    { id: 4, category: 'events', title: 'Prize Distribution', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800' },
    { id: 5, category: 'academics', title: 'Classroom Session', image: 'https://images.unsplash.com/photo-1427504743050-e5bafe3bb0f7?w=800' },
    { id: 6, category: 'academics', title: 'Library', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800' },
    { id: 7, category: 'sports', title: 'Cricket Match', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800' },
    { id: 8, category: 'sports', title: 'Sports Day', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800' },
    { id: 9, category: 'campus', title: 'Computer Lab', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800' },
    { id: 10, category: 'events', title: 'Science Fair', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800' },
    { id: 11, category: 'academics', title: 'Robotics Lab', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=800' },
    { id: 12, category: 'sports', title: 'Football Tournament', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

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
              Life at Al Qalam
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              Photo <span className="text-gradient-gold">Gallery</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore moments that define our vibrant school community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-dark-900 sticky top-20 z-40 glass-nav">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'glass text-gray-300 hover:text-primary-400 hover:border-primary-500/50'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-primary-400 text-sm capitalize">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Virtual <span className="text-gradient-gold">Tour</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Experience our campus through an immersive video tour
            </p>
            <div className="aspect-video bg-dark-800 rounded-2xl border border-primary-500/20 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <p className="text-gray-400">Video tour coming soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
