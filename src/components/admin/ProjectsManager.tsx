import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Project } from '../../lib/supabase';
import MediaUpload from '../MediaUpload';
import RichTextEditor from '../RichTextEditor';

interface EditingProject extends Partial<Project> {
  isNew?: boolean;
}

const ProjectsManager = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<EditingProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMediaUpload, setShowMediaUpload] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true });
      return;
    }
    fetchProjects();
  }, [isAdmin, navigate]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Fehler beim Laden der Projekte');
      return;
    }

    setProjects(data || []);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleAdd = () => {
    setEditingProject({
      isNew: true,
      title: '',
      description: '',
      content: '',
      technologies: [],
      status: 'draft',
      category: '',
      media: []
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Sind Sie sicher, dass Sie dieses Projekt löschen möchten?')) {
      return;
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      setError('Fehler beim Löschen des Projekts');
      return;
    }

    await fetchProjects();
  };

  const handleSave = async () => {
    if (!editingProject) return;

    const { isNew, ...projectData } = editingProject;

    try {
      if (isNew) {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectData.id);

        if (error) throw error;
      }

      setEditingProject(null);
      await fetchProjects();
    } catch (error: unknown) {
      console.error('Error saving project:', error);
      setError('Fehler beim Speichern des Projekts');
    }
  };

  const handleMediaUpload = (url: string, type: 'image' | 'video') => {
    if (!editingProject) return;

    setEditingProject({
      ...editingProject,
      media: [
        ...(editingProject.media || []),
        {
          url,
          type,
          title: ''
        }
      ]
    });
    setShowMediaUpload(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projekte verwalten</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Neues Projekt
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {editingProject ? (
        <div className="bg-black/30 backdrop-blur border border-cyan-500/20 rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-md focus:ring-cyan-500 focus:border-cyan-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Beschreibung
              </label>
              <input
                type="text"
                value={editingProject.description || ''}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-md focus:ring-cyan-500 focus:border-cyan-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Inhalt
              </label>
              <RichTextEditor
                value={editingProject.content || ''}
                onChange={(value) => setEditingProject({ ...editingProject, content: value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Kategorie
              </label>
              <input
                type="text"
                value={editingProject.category || ''}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-md focus:ring-cyan-500 focus:border-cyan-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                value={editingProject.status || 'draft'}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as 'draft' | 'published' })}
                className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-md focus:ring-cyan-500 focus:border-cyan-500 text-white"
              >
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Technologien
              </label>
              <div className="flex flex-wrap gap-2">
                {editingProject.technologies?.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-black/30 border border-cyan-500/20 rounded-full px-3 py-1"
                  >
                    <span className="mr-2">{tech}</span>
                    <button
                      onClick={() => {
                        const newTech = [...(editingProject.technologies || [])];
                        newTech.splice(index, 1);
                        setEditingProject({ ...editingProject, technologies: newTech });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Neue Technologie"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      const value = input.value.trim();
                      if (value) {
                        setEditingProject({
                          ...editingProject,
                          technologies: [...(editingProject.technologies || []), value]
                        });
                        input.value = '';
                      }
                    }
                  }}
                  className="px-3 py-1 bg-black/30 border border-cyan-500/20 rounded-full focus:ring-cyan-500 focus:border-cyan-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Medien
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {editingProject.media?.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-48 object-cover rounded-lg"
                          controls
                        />
                      )}
                      <button
                        onClick={() => {
                          const newMedia = [...(editingProject.media || [])];
                          newMedia.splice(index, 1);
                          setEditingProject({ ...editingProject, media: newMedia });
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowMediaUpload(true)}
                  className="flex items-center px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Medium hinzufügen
                </button>
                {showMediaUpload && (
                  <MediaUpload
                    onUploadComplete={handleMediaUpload}
                    acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'video/mp4']}
                    maxSize={100}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingProject(null)}
                className="flex items-center px-4 py-2 border border-cyan-500/20 rounded-lg text-white hover:bg-cyan-500/10 transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Speichern
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black/30 backdrop-blur border border-cyan-500/20 rounded-lg p-6 flex justify-between items-start"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'published'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {project.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;