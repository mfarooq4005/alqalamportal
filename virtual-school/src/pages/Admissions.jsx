import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Upload, Calendar, DollarSign, User } from 'lucide-react'

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const steps = [
    { icon: <User className="w-8 h-8" />, title: 'Fill Application', desc: 'Complete the online form with student details' },
    { icon: <Calendar className="w-8 h-8" />, title: 'Schedule Assessment', desc: 'Book an assessment or interview slot' },
    { icon: <DollarSign className="w-8 h-8" />, title: 'Pay Fees', desc: 'Submit admission and tuition fees' },
    { icon: <CheckCircle className="w-8 h-8" />, title: 'Get Admission', desc: 'Receive confirmation and welcome kit' }
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
              Admissions <span className="gradient-text">Open</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our community of learners. Simple process, rolling admissions 
              throughout the year for all grades.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-morphism rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Application Form</h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                    <p className="text-gray-400">
                      Thank you! Our admissions team will contact you within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Student Name</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter student's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Parent/Guardian Name</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter parent's full name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                          placeholder="+1 (234) 567-8900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Grade Applying For</label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select Grade</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Any special requirements or questions..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      Submit Application
                      <Send className="ml-2 w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Process Steps & Info */}
            <div className="space-y-8">
              {/* Steps */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">Admission Process</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-morphism p-6 rounded-2xl flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Documents Required */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-morphism rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Documents Required</h2>
                <ul className="space-y-3">
                  {[
                    'Birth Certificate',
                    'Previous School Records/Transcripts',
                    'Passport-sized Photographs',
                    'Parent ID Proof',
                    'Medical Records',
                    'Transfer Certificate (if applicable)'
                  ].map((doc, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Upload className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-morphism rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <p className="text-gray-300 mb-4">
                  Our admissions counselors are here to assist you.
                </p>
                <div className="space-y-2 text-gray-400">
                  <p>📧 admissions@virtualschool.com</p>
                  <p>📞 +1 (234) 567-8900</p>
                  <p>🕒 Mon-Fri: 9AM - 6PM</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admissions
