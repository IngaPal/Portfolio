import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { LayoutDashboard, User, FolderEdit, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProjectsManager from '../components/admin/ProjectsManager';
import AboutManager from '../components/admin/AboutManager';
import MessagesManager from '../components/admin/MessagesManager';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (!isAdmin) {
        navigate('/', { replace: true });
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center justify-center p-4 bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 mr-2 text-cyan-400" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/about')}
            className="flex items-center justify-center p-4 bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
          >
            <User className="w-5 h-5 mr-2 text-cyan-400" />
            <span>Über Mich</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/projects')}
            className="flex items-center justify-center p-4 bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
          >
            <FolderEdit className="w-5 h-5 mr-2 text-cyan-400" />
            <span>Projekte</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/messages')}
            className="flex items-center justify-center p-4 bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
          >
            <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
            <span>Nachrichten</span>
          </button>
        </div>
      </div>

      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="about" element={<AboutManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="messages" element={<MessagesManager />} />
      </Routes>
    </div>
  );
};

export default Admin;