import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import AIChatWidget from './components/AIChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import Academics from './pages/Academics'
import Robotics from './pages/Robotics'
import STREAM from './pages/STREAM'
import Admissions from './pages/Admissions'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/stream" element={<STREAM />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <AIChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </Router>
  )
}

export default App
