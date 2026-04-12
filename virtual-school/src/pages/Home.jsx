import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="container-custom mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="gradient-text">Future of</span>
              <br />
              <span className="text-white">Education</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience world-class virtual learning with AI-powered education, 
              cutting-edge robotics, and STREAM curriculum designed for tomorrow's leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="btn-primary inline-flex items-center justify-center">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary inline-flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-black/20">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Virtual School?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine technology, innovation, and excellence to create the perfect learning environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Learning',
                description: 'Personalized education paths powered by advanced AI technology.',
                icon: '🤖'
              },
              {
                title: 'Robotics Lab',
                description: 'State-of-the-art robotics facilities for hands-on engineering experience.',
                icon: '⚙️'
              },
              {
                title: 'STREAM Curriculum',
                description: 'Integrated approach combining Science, Technology, Robotics, Engineering, Arts & Mathematics.',
                icon: '🔬'
              },
              {
                title: 'Global Community',
                description: 'Connect with students and educators from around the world.',
                icon: '🌍'
              },
              {
                title: 'Flexible Learning',
                description: 'Learn at your own pace with our adaptive LMS platform.',
                icon: '📚'
              },
              {
                title: 'Expert Instructors',
                description: 'Learn from industry professionals and certified educators.',
                icon: '👨‍🏫'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-morphism p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-morphism rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students already experiencing the future of education.
              </p>
              <Link to="/admissions" className="btn-primary inline-flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
