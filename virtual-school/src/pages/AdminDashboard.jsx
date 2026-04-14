import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Image as ImageIcon, BookOpen, Cpu, Bell, 
  FileText, Users, Settings, LogOut, Menu, X, Plus, 
  Edit, Trash2, CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [projects] = useState([
    { id: 1, title: 'Solar System Model', category: 'STREAM', status: 'published' },
    { id: 2, title: 'Line Follower Robot', category: 'Robotics', status: 'published' },
    { id: 3, title: 'Water Purification', category: 'STREAM', status: 'draft' }
  ]);
  
  const [news] = useState([
    { id: 1, title: 'Annual Science Fair 2024', date: '2024-01-15', status: 'published' },
    { id: 2, title: 'Robotics Workshop', date: '2024-01-20', status: 'published' }
  ]);
  
  const [notifications] = useState([
    { id: 1, message: 'New admission applications received', time: '2 hours ago', read: false },
    { id: 2, message: 'Server backup completed', time: '5 hours ago', read: true }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'alqalam2024') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try: admin / alqalam2024');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'stream', label: 'STREAM Projects', icon: BookOpen },
    { id: 'robotics', label: 'Robotics', icon: Cpu },
    { id: 'news', label: 'News', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Al Qalam International Cambridge School</p>
            <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <p className="text-sm text-blue-200"><strong>Demo Credentials:</strong></p>
              <p className="text-xs text-blue-300">Username: <code className="bg-blue-900/50 px-2 py-1 rounded">admin</code></p>
              <p className="text-xs text-blue-300">Password: <code className="bg-blue-900/50 px-2 py-1 rounded">alqalam2024</code></p>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && (
              <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-cyan-400 transition-colors">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-300">Content Management System</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 hover:bg-red-500/30 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/20 min-h-[calc(100vh-80px)] p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Projects" value={projects.length} color="from-cyan-500 to-blue-500" />
                <StatCard title="Published News" value={news.filter(n => n.status === 'published').length} color="from-purple-500 to-pink-500" />
                <StatCard title="Draft Items" value={projects.filter(p => p.status === 'draft').length} color="from-orange-500 to-red-500" />
                <StatCard title="Unread" value={notifications.filter(n => !n.read).length} color="from-green-500 to-teal-500" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Projects</h3>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-sm text-gray-400">{project.category}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${project.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Notifications</h3>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notif) => (
                      <div key={notif.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className={`w-2 h-2 mt-2 rounded-full ${notif.read ? 'bg-gray-500' : 'bg-cyan-400'}`} />
                        <div className="flex-1">
                          <p className="text-white text-sm">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'gallery' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-cyan-400" />
                  Gallery Management
                </h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90">
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 rounded-lg overflow-hidden group">
                    <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-500" />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-white text-sm">Image {i}</span>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeSection === 'stream' || activeSection === 'robotics') && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-purple-400" />
                  {activeSection === 'stream' ? 'STREAM' : 'Robotics'} Projects
                </h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90">
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
              <div className="space-y-4">
                {projects.filter(p => p.category.toLowerCase() === activeSection).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-400">{project.category} Project</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${project.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                        {project.status}
                      </span>
                      <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {projects.filter(p => p.category.toLowerCase() === activeSection).length === 0 && (
                  <p className="text-gray-400 text-center py-8">No projects found. Click "Add Project" to create one.</p>
                )}
              </div>
            </div>
          )}

          {activeSection === 'news' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-400" />
                  News & Updates
                </h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90">
                  <Plus className="w-4 h-4" />
                  <span>Add News</span>
                </button>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs ${item.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                        {item.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 rounded-lg ${notif.read ? 'bg-white/5' : 'bg-cyan-500/10 border border-cyan-400/30'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${notif.read ? 'bg-gray-500' : 'bg-cyan-400'}`} />
                        <div>
                          <p className="text-white">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-400" />
                Settings
              </h3>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">School Name</label>
                  <input type="text" defaultValue="Al Qalam International Cambridge School" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                  <input type="email" defaultValue="info@alqalamschool.edu.pk" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Phone</label>
                  <input type="tel" defaultValue="+92 340 0078000" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-300 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-full flex items-center justify-center`}>
        <CheckCircle className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

export default AdminDashboard;
