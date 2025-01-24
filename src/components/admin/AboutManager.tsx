import { useState, useEffect } from 'react';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MediaUpload from '../MediaUpload';
import RichTextEditor from '../RichTextEditor';

interface AboutContent {
  id: string;
  profile_video_url: string | null;
  introduction: string;
  skills: string[];
  specializations: {
    title: string;
    description: string;
  }[];
  updated_at: string;
}

const AboutManager = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMediaUpload, setShowMediaUpload] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .single();

      if (error) throw error;
      setContent(data);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('about_content')
        .upsert({
          ...content,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleVideoUpload = (url: string) => {
    if (!content) return;
    setContent({
      ...content,
      profile_video_url: url
    });
    setShowMediaUpload(false);
  };

  const addSpecialization = () => {
    if (!content) return;
    setContent({
      ...content,
      specializations: [
        ...content.specializations,
        { title: '', description: '' }
      ]
    });
  };

  const removeSpecialization = (index: number) => {
    if (!content) return;
    const newSpecializations = [...content.specializations];
    newSpecializations.splice(index, 1);
    setContent({
      ...content,
      specializations: newSpecializations
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Über Mich Bearbeiten</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? 'Wird gespeichert...' : 'Speichern'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Profile Video Section */}
      <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
        <h3 className="text-xl font-semibold mb-4">Profil Video</h3>
        {content?.profile_video_url ? (
          <div className="relative">
            <video
              src={content.profile_video_url}
              controls
              className="w-full max-w-2xl rounded-lg"
            />
            <button
              onClick={() => setContent({ ...content, profile_video_url: null })}
              className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowMediaUpload(true)}
            className="flex items-center px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Video hochladen
          </button>
        )}

        {showMediaUpload && (
          <div className="mt-4">
            <MediaUpload
              onUploadComplete={(url) => handleVideoUpload(url)}
              acceptedTypes={['video/mp4']}
              maxSize={100}
            />
          </div>
        )}
      </div>

      {/* Introduction Section */}
      <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
        <h3 className="text-xl font-semibold mb-4">Einleitung</h3>
        <RichTextEditor
          value={content?.introduction || ''}
          onChange={(value) => setContent(content ? { ...content, introduction: value } : null)}
        />
      </div>

      {/* Skills Section */}
      <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
        <h3 className="text-xl font-semibold mb-4">Fähigkeiten</h3>
        <div className="space-y-4">
          {content?.skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...content.skills];
                  newSkills[index] = e.target.value;
                  setContent({ ...content, skills: newSkills });
                }}
                className="flex-1 px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={() => {
                  const newSkills = content.skills.filter((_, i) => i !== index);
                  setContent({ ...content, skills: newSkills });
                }}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setContent(content ? { ...content, skills: [...content.skills, ''] } : null)}
            className="flex items-center px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Fähigkeit hinzufügen
          </button>
        </div>
      </div>

      {/* Specializations Section */}
      <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-6">
        <h3 className="text-xl font-semibold mb-4">Spezialisierungen</h3>
        <div className="space-y-6">
          {content?.specializations.map((spec, index) => (
            <div key={index} className="space-y-4 pb-6 border-b border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    value={spec.title}
                    onChange={(e) => {
                      const newSpecs = [...content.specializations];
                      newSpecs[index] = { ...spec, title: e.target.value };
                      setContent({ ...content, specializations: newSpecs });
                    }}
                    placeholder="Titel"
                    className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:border-cyan-500 transition-colors"
                  />
                  <textarea
                    value={spec.description}
                    onChange={(e) => {
                      const newSpecs = [...content.specializations];
                      newSpecs[index] = { ...spec, description: e.target.value };
                      setContent({ ...content, specializations: newSpecs });
                    }}
                    placeholder="Beschreibung"
                    rows={3}
                    className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:border-cyan-500 transition-colors"
                  />
                </div>
                <button
                  onClick={() => removeSpecialization(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors ml-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addSpecialization}
            className="flex items-center px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Spezialisierung hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutManager;