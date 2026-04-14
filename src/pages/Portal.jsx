import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, User, Lock, ArrowRight, BookOpen, Calendar, FileText, MessageSquare, BarChart, Settings, CheckCircle, TrendingUp, DollarSign, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Portal = () => {
  const [loginType, setLoginType] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert(`${data.user.fullName} (${data.user.role}) login successful!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const portals = [
    {
      id: 'student',
      icon: GraduationCap,
      title: 'Student Portal',
      desc: 'Access your classes, assignments, and grades',
      features: ['View timetable', 'Submit assignments', 'Check results', 'Download resources']
    },
    {
      id: 'parent',
      icon: User,
      title: 'Parent Portal',
      desc: 'Monitor your child\'s progress and attendance',
      features: ['View attendance', 'Check grades', 'Pay fees', 'Communicate with teachers']
    },
    {
      id: 'teacher',
      icon: BookOpen,
      title: 'Teacher Portal',
      desc: 'Manage classes, assignments, and student records',
      features: ['Upload materials', 'Grade assignments', 'Take attendance', 'Student analytics']
    },
  ];

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
              Secure Access
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              School <span className="text-gradient-gold">Portals</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Access your personalized dashboard for academics, attendance, and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {portals.map((portal, index) => (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setLoginType(portal.id)}
                className={`portal-card cursor-pointer ${
                  loginType === portal.id ? 'bg-primary-500/10 border-primary-500' : ''
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <portal.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white text-center mb-2">{portal.title}</h3>
                <p className="text-gray-400 text-center text-sm mb-4">{portal.desc}</p>
                <ul className="space-y-2">
                  {portal.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                      <ArrowRight className="w-4 h-4 text-primary-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Login Form */}
          <motion.div
            key={loginType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto"
          >
            <div className="glass p-8 rounded-3xl border border-primary-500/30">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-heading text-white mb-2">
                  {portals.find(p => p.id === loginType)?.title} Login
                </h2>
                <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Forgot password?</a>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-gold w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm mb-2">
                  Default Demo Credentials:
                </p>
                <p className="text-xs text-gray-500">
                  Email: admin@alqalam.edu.pk | Password: admin123
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  Need help? Contact IT Support at{' '}
                  <a href="mailto:support@alqalam.edu.pk" className="text-primary-400 hover:text-primary-300">
                    support@alqalam.edu.pk
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📞 +92 340 0078000 | 📍 D-Block Muhafiz Town, Gujranwala
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Portal <span className="text-gradient-gold">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: 'Timetable', desc: 'View your class schedule' },
              { icon: FileText, title: 'Assignments', desc: 'Submit and track work' },
              { icon: BarChart, title: 'Results', desc: 'Check grades and reports' },
              { icon: MessageSquare, title: 'Communication', desc: 'Connect with teachers' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-primary-500/20 text-center"
              >
                <feature.icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portal;
