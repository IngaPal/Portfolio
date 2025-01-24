import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../lib/supabase';

const getImageUrl = (fileName: string) => {
  return `/images/${fileName}`;
};
const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (import.meta.env.DEV) {
          console.log('Fetching projects...');
        }

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching projects:', error);
          throw error;
        }

        if (import.meta.env.DEV) {
          console.log('Projects fetched:', data?.length || 0);
        }

        setProjects(data || []);
      } catch (error) {
        console.error('Error:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:projects')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'projects',
          filter: 'status=eq.published'
        }, 
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Projekte
      </motion.h1>

      {projects.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          Keine Projekte gefunden
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            console.log('All projects:', projects);
            const imageUrl = project.image_url ? getImageUrl(project.image_url) : undefined;
            console.log('Image URL for', project.title, ':', imageUrl);
    
            return (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={imageUrl}
              projectUrl={project.project_url || undefined}
              technologies={project.technologies}
            />
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Portfolio;