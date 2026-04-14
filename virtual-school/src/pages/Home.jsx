import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const AnimatedSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.2} ref={meshRef}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0.2}
        metalness={0.6}
      />
    </Sphere>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#fbbf24" />
        <AnimatedSphere />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

const StatCard = ({ icon: Icon, number, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="card-hover p-8 text-center bg-white rounded-2xl shadow-lg border border-slate-100"
  >
    <Icon className="w-10 h-10 text-primary-600 mx-auto mb-4" />
    <h3 className="text-4xl font-bold text-gradient-primary mb-2">{number}</h3>
    <p className="text-slate-600 font-medium">{label}</p>
  </motion.div>
);

const Home = () => {
  const features = [
    { icon: BookOpen, title: 'Cambridge Curriculum', description: 'Internationally recognized O & A Level programs with global accreditation' },
    { icon: Award, title: 'Excellence in Education', description: 'Consistently outstanding results in Cambridge examinations worldwide' },
    { icon: Users, title: 'Expert Faculty', description: 'Highly qualified teachers dedicated to student success and growth' },
    { icon: TrendingUp, title: 'Modern Facilities', description: 'State-of-the-art laboratories, libraries, and learning environments' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Hero3D />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-2.5 bg-primary-100 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold mb-6 shadow-sm">
              ✨ Admissions Open for Academic Year 2024-25
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              Al Qalam{' '}
              <span className="text-gradient-gold">International</span>
              <br />
              <span className="text-gradient-blue">Cambridge School</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Nurturing Excellence, Building Character, Shaping Futures. 
              Join a community dedicated to academic excellence and holistic development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary inline-flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-7 h-12 border-2 border-primary-400 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-2 h-3 bg-primary-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <StatCard icon={BookOpen} number="15+" label="Years of Excellence" delay={0.1} />
            <StatCard icon={Users} number="2000+" label="Students Enrolled" delay={0.2} />
            <StatCard icon={Award} number="98%" label="Pass Rate" delay={0.3} />
            <StatCard icon={TrendingUp} number="50+" label="University Placements" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Why Choose <span className="text-gradient-gold">Al Qalam</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We provide world-class education with a focus on academic excellence and character development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover p-8 bg-white rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Join Our <span className="text-accent-300">Community</span>?
            </h2>
            <p className="text-primary-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Start your journey towards excellence. Applications are now open for the upcoming academic year.
            </p>
            <Link to="/admissions" className="btn-accent inline-flex items-center space-x-2">
              <span>Begin Application</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
