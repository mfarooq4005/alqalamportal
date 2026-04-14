import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import AIChatWidget from './components/AIChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Robotics from './pages/Robotics';
import STREAM from './pages/STREAM';
import Admissions from './pages/Admissions';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import AdminDashboard from './pages/AdminDashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><AIChatWidget /></>} />
          <Route path="/about" element={<><Navbar /><About /><AIChatWidget /></>} />
          <Route path="/academics" element={<><Navbar /><Academics /><AIChatWidget /></>} />
          <Route path="/robotics" element={<><Navbar /><Robotics /><AIChatWidget /></>} />
          <Route path="/stream" element={<><Navbar /><STREAM /><AIChatWidget /></>} />
          <Route path="/admissions" element={<><Navbar /><Admissions /><AIChatWidget /></>} />
          <Route path="/gallery" element={<><Navbar /><Gallery /><AIChatWidget /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><AIChatWidget /></>} />
          <Route path="/portal" element={<><Navbar /><Portal /><AIChatWidget /></>} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
