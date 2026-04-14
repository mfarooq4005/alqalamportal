import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, DollarSign, Calendar, Users, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    email: '',
    phone: '',
    grade: '',
    session: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! We will contact you within 24 hours.');
    setFormData({ studentName: '', fatherName: '', email: '', phone: '', grade: '', session: '', message: '' });
  };

  const steps = [
    { icon: FileText, title: 'Submit Application', desc: 'Fill out the online admission form' },
    { icon: Calendar, title: 'Assessment Test', desc: 'Student appears for entry test' },
    { icon: Users, title: 'Interview', desc: 'Parents and student interview' },
    { icon: CheckCircle, title: 'Admission Offer', desc: 'Receive admission confirmation' },
  ];

  const requirements = [
    'Previous academic transcripts/report cards',
    'Birth certificate copy',
    'CNIC/B-Form copy of parents',
    '2 passport-size photographs',
    'Transfer certificate (if applicable)'
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
              Join Our Community
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              Admissions <span className="text-gradient-gold">Open</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards excellence. Applications are now open 
              for the 2024-25 academic year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
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
              Admission <span className="text-gradient-gold">Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple four-step process to join Al Qalam
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass p-8 rounded-2xl border border-primary-500/20 text-center card-hover h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Form */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
              Required <span className="text-gradient-gold">Documents</span>
            </h2>
            <div className="glass p-8 rounded-2xl border border-primary-500/20">
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Contact Admissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-5 h-5 text-primary-400" />
                    <span>+92-XXX-XXXXXXX</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-5 h-5 text-primary-400" />
                    <span>admissions@alqalamschool.edu.pk</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span>School Address, City, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
              Apply <span className="text-gradient-gold">Now</span>
            </h2>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-primary-500/20 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Father's Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Father's name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Grade Applying For *</label>
                  <select
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Grade</option>
                    <option value="9">Grade 9 (O Level)</option>
                    <option value="10">Grade 10 (O Level)</option>
                    <option value="11">Grade 11 (O Level)</option>
                    <option value="12">Grade 12 (A Level)</option>
                    <option value="13">Grade 13 (A Level)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Academic Session *</label>
                  <select
                    required
                    value={formData.session}
                    onChange={(e) => setFormData({...formData, session: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Session</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Message</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Any additional information..."
                />
              </div>

              <button type="submit" className="btn-gold w-full">
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Fee Info */}
      <section className="py-20 px-4 bg-dark-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Fee <span className="text-gradient-gold">Structure</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Competitive fee structure with sibling discounts and scholarship opportunities available.
              Contact our admissions office for detailed fee information.
            </p>
            <a href="/contact" className="btn-outline-gold inline-flex items-center space-x-2">
              <span>Contact for Fee Details</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
