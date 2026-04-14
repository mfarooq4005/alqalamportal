import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, BookOpen, TrendingUp, Cpu, Atom } from 'lucide-react';

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
      <MeshDistortMaterial color="#14b8a6" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
    </Sphere>
  );
};

const FloatingShape = ({ position, color, scale }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere args={[0.5, 32, 32]} scale={scale} position={position}>
      <MeshDistortMaterial color={color} attach="material" distort={0.3} speed={1.5} roughness={0.3} metalness={0.6} transparent opacity={0.6} />
    </Sphere>
  </Float>
);

const Hero3D = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} />
      <pointLight position={[-10, -10, -5]} intensity={1.0} color="#f97316" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#a855f7" />
      <AnimatedSphere />
      <FloatingShape position={[-3, 2, -2]} color="#a855f7" scale={0.8} />
      <FloatingShape position={[3, -2, -1]} color="#f97316" scale={0.6} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={2} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  </div>
);

const StatCard = ({ icon: Icon, number, label, delay, gradient }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }} viewport={{ once: true }} className="card-tech p-8 text-center group">
    <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className={`text-4xl font-bold ${gradient} bg-clip-text text-transparent mb-2`}>{number}</h3>
    <p className="text-slate-600 font-medium">{label}</p>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, index, gradient }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="card-tech p-8 group hover:shadow-2xl transition-all duration-500">
    <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  const features = [
    { icon: BookOpen, title: 'Cambridge Curriculum', description: 'Internationally recognized O & A Level programs with global accreditation', gradient: 'bg-gradient-to-br from-primary-500 to-primary-700' },
    { icon: Cpu, title: 'Robotics & AI', description: 'Cutting-edge robotics lab with AI integration for future-ready learning', gradient: 'bg-gradient-to-br from-secondary-500 to-secondary-700' },
    { icon: Atom, title: 'STREAM Education', description: 'Science, Technology, Robotics, Engineering, Arts & Mathematics combined', gradient: 'bg-gradient-to-br from-accent-500 to-accent-700' },
    { icon: Users, title: 'Expert Faculty', description: 'Highly qualified teachers dedicated to student success and holistic growth', gradient: 'bg-gradient-to-br from-primary-500 to-secondary-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <Hero3D />
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-6 py-2.5 bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold mb-6 shadow-sm animate-pulse">✨ Admissions Open for Academic Year 2024-25</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">Al Qalam{' '}<span className="text-gradient-tech block mt-2">International</span><br /><span className="text-gradient-primary">Cambridge School</span></h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-light">Nurturing Excellence in Robotics & STREAM Education. Building Character, Shaping Futures with Innovation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="btn-gradient inline-flex items-center justify-center space-x-2"><span>Apply Now</span><ArrowRight className="w-5 h-5" /></Link>
              <Link to="/robotics" className="btn-secondary inline-flex items-center justify-center">Explore Robotics</Link>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-7 h-12 border-2 border-primary-400 rounded-full flex justify-center pt-2">
            <motion.div className="w-2 h-3 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <StatCard icon={BookOpen} number="15+" label="Years of Excellence" delay={0.1} gradient="bg-gradient-to-br from-primary-500 to-primary-700" />
            <StatCard icon={Users} number="2000+" label="Students Enrolled" delay={0.2} gradient="bg-gradient-to-br from-secondary-500 to-secondary-700" />
            <StatCard icon={Award} number="98%" label="Pass Rate" delay={0.3} gradient="bg-gradient-to-br from-accent-500 to-accent-700" />
            <StatCard icon={TrendingUp} number="50+" label="University Placements" delay={0.4} gradient="bg-gradient-to-br from-primary-500 to-secondary-600" />
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-gradient-tech">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-primary-100 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold mb-4">Why Choose Al Qalam?</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Excellence in{' '}<span className="text-gradient-tech">Education</span></h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">We provide world-class education with focus on Robotics, STREAM, and holistic development</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (<FeatureCard key={index} icon={feature.icon} title={feature.title} description={featu