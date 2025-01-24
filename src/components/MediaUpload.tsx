import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Film } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MediaUploadProps {
  onUploadComplete: (mediaUrl: string, mediaType: 'image' | 'video') => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onUploadComplete,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'],
  maxSize = 100
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      setError(`Ungültiger Dateityp. Erlaubt sind: ${acceptedTypes.join(', ')}`);
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`Datei zu groß. Maximale Größe ist ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Check auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Nicht authentifiziert');
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExt}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
      onUploadComplete(publicUrl, mediaType);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Upload error:', err);
      setError(error.message || 'Fehler beim Hochladen der Datei');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (!file || !validateFile(file)) return;

    await uploadFile(file);
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    await uploadFile(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-cyan-500 bg-cyan-500/10'
          : 'border-gray-600 hover:border-cyan-500/50'
      }`}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileSelect}
        accept={acceptedTypes.join(',')}
      />
      
      <div className="flex flex-col items-center">
        <Upload className={`w-12 h-12 mb-4 ${isDragging ? 'text-cyan-500' : 'text-gray-400'}`} />
        <p className="text-lg mb-2">
          Dateien hierher ziehen oder klicken zum Auswählen
        </p>
        <p className="text-sm text-gray-400">
          Maximale Dateigröße: {maxSize}MB
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center">
            <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-400">JPG, PNG, GIF</span>
          </div>
          <div className="flex items-center">
            <Film className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-400">MP4</span>
          </div>
        </div>
      </div>

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur rounded-lg">
          <div className="text-center">
            <div className="w-full max-w-xs bg-gray-800 rounded-full h-2 mb-4">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-cyan-500">Upload läuft... {Math.round(progress)}%</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur rounded-lg">
          <div className="text-center p-4">
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-4">
              {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-gray-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-2" />
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;