import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Film, Trash2, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Media = Database['public']['Tables']['media']['Row'];

interface MediaLibraryProps {
  onSelect?: (media: Media) => void;
  selectedMedia?: string[];
  projectId?: string;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onSelect,
  selectedMedia = [],
  projectId
}) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [projectId]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      let query = supabase.from('media').select('*');
      
      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setMedia(data || []);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Möchten Sie diese Datei wirklich löschen?')) return;

    try {
      const mediaItem = media.find(m => m.id === id);
      if (!mediaItem) return;

      // Delete from storage
      const fileName = mediaItem.url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('media').remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMedia(media.filter(m => m.id !== id));
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item) => (
        <div
          key={item.id}
          className={`relative group rounded-lg overflow-hidden border border-gray-700 ${
            selectedMedia.includes(item.id)
              ? 'ring-2 ring-cyan-500'
              : 'hover:border-cyan-500/50'
          }`}
        >
          {item.type === 'image' ? (
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <video
              src={item.url}
              className="w-full h-48 object-cover"
              controls
            />
          )}
          
          <div className="absolute inset-0 bg-black/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex space-x-2">
              {onSelect && (
                <button
                  onClick={() => onSelect(item)}
                  className="p-2 bg-cyan-500 rounded-full text-white hover:bg-cyan-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute top-2 left-2">
            {item.type === 'image' ? (
              <ImageIcon className="w-5 h-5 text-white drop-shadow" />
            ) : (
              <Film className="w-5 h-5 text-white drop-shadow" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaLibrary;