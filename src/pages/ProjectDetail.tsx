import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/supabase';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setProject(data);
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Error fetching project:', err);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-ping" />
          <div className="absolute inset-0 border-2 border-purple-500 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-lg">
          {error || 'Project not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          to="/portfolio"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zum Portfolio
        </Link>
      </motion.div>

      <article className="space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300">{project.description}</p>
        </motion.header>

        {project.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
              
              <div className="relative group/image">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover/image:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 opacity-0 group-hover/image:opacity-100 mix-blend-overlay transition-opacity" />
              </div>
            </div>
          </motion.div>
        )}

        {project.project_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2 transform group-hover:translate-x-1 transition-transform" />
              Projekt ansehen
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
            </a>
          </motion.div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
            
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Technologien
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                >
                  <Code className="w-4 h-4 inline-block mr-1" />
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
          
          <div className="prose prose-invert max-w-none">
            {project.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default ProjectDetail;