import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 5000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { icon: <MapPin className="w-6 h-6" />, title: 'Address', details: ['123 Education Street', 'Virtual City, VC 12345', 'United States'] },
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', details: ['+1 (234) 567-8900', '+1 (234) 567-8901'] },
    { icon: <Mail className="w-6 h-6" />, title: 'Email', details: ['info@virtualschool.com', 'admissions@virtualschool.com'] },
    { icon: <Clock className="w-6 h-6" />, title: 'Office Hours', details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'] }
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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us and 
              we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-morphism rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <MessageCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400">
                      Thank you! We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-morphism p-6 rounded-2xl"
                  >
                    <div className="text-accent mb-4">{info.icon}</div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-400 text-sm">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-morphism rounded-3xl overflow-hidden h-80 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <p className="text-gray-400">Interactive Map</p>
                    <p className="text-sm text-gray-500">123 Education Street, Virtual City</p>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-morphism rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <p className="text-gray-300 mb-6">
                  Stay connected with our latest updates and announcements.
                </p>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social, index) => (
                    <motion.button
                      key={social}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="glass-morphism px-6 py-3 rounded-full hover:bg-white/20 transition-all"
                    >
                      {social}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
