import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies?: string[];
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  projectUrl,
  technologies,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative h-full ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden h-full flex flex-col">
        {imageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity" />
            
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  <ExternalLink className="w-4 h-4" />
                  <span>Projekt öffnen</span>
                </span>
              </a>
            )}
          </div>
        )}

        <div className="p-6 flex-grow flex flex-col">
          <Link to={`/portfolio/${id}`} className="block group/title">
            <h3 className="text-xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </span>
              <div className="h-0.5 w-0 group-hover/title:w-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300" />
            </h3>
          </Link>
          
          <p className="text-gray-300 mb-4 flex-grow">{description}</p>

          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors"
                >
                  <Code className="w-3 h-3 inline-block mr-1" />
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;