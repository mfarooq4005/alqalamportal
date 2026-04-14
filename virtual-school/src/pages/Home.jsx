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
    <Sphere args={[1, 100, 200]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#2563eb"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#fbbf24" />
        <AnimatedSphere />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
    className="bg-white p-6 rounded-2xl text-center card-hover border border-blue-100 shadow-md"
  >
    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
    <h3 className="text-3xl font-bold font-heading text-blue-700 mb-2">{number}</h3>
    <p className="text-slate-600 text-sm">{label}</p>
  </motion.div>
);

const Home = () => {
  const features = [
    { icon: BookOpen, title: 'Cambridge Curriculum', description: 'Internationally recognized O & A Level programs' },
    { icon: Award, title: 'Excellence in Education', description: 'Top results in Cambridge examinations' },
    { icon: Users, title: 'Expert Faculty', description: 'Highly qualified and experienced teachers' },
    { icon: TrendingUp, title: 'Modern Facilities', description: 'State-of-the-art labs and learning spaces' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <Hero3D />
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              Admissions Open for 2024-25
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 mb-6 leading-tight">
              Al Qalam{' '}
              <span className="text-gradient-gold">International</span>
              <br />
              <span className="text-gradient-blue">Cambridge School</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Nurturing Excellence, Building Character, Shaping Futures. 
              Join a community dedicated to academic excellence and holistic development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="btn-blue inline-flex items-center justify-center space-x-2">
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-outline-blue inline-flex items-center justify-center">
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
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 bg-blue-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={BookOpen} number="15+" label="Years of Excellence" delay={0.1} />
            <StatCard icon={Users} number="2000+" label="Students Enrolled" delay={0.2} />
            <StatCard icon={Award} number="98%" label="Pass Rate" delay={0.3} />
            <StatCard icon={TrendingUp} number="50+" label="University Placements" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">
              Why Choose <span className="text-gradient-gold">Al Qalam</span>?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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
                className="bg-white p-8 rounded-2xl card-hover border border-blue-100 shadow-lg"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
              Ready to Join Our <span className="text-amber-300">Community</span>?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Start your journey towards excellence. Applications are now open for the upcoming academic year.
            </p>
            <Link to="/admissions" className="btn-gold inline-flex items-center space-x-2">
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
