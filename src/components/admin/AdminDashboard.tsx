import { useNavigate } from 'react-router-dom';
import { User, FolderEdit, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Über Mich</h3>
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-gray-400 mb-4">
            Verwalten Sie Ihren Lebenslauf, Fähigkeiten und Spezialisierungen.
          </p>
          <button
            onClick={() => navigate('/admin/about')}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
          >
            Bearbeiten
          </button>
        </div>

        <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Projekte</h3>
            <FolderEdit className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-gray-400 mb-4">
            Verwalten Sie Ihre Projektgalerie und Case Studies.
          </p>
          <button
            onClick={() => navigate('/admin/projects')}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
          >
            Verwalten
          </button>
        </div>

        <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Nachrichten</h3>
            <MessageSquare className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-gray-400 mb-4">
            Verwalten Sie eingehende Kontaktanfragen.
          </p>
          <button
            onClick={() => navigate('/admin/messages')}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
          >
            Anzeigen
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;