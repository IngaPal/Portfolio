// src/components/DocumentViewer.tsx
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

interface DocumentViewerProps {
  title: string;
  fileUrl: string;
  isDownloadable?: boolean;
  icon?: React.ReactNode;
  className?: string; 
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  title, 
  fileUrl, 
  isDownloadable = false,
  icon,
  className
}) => {
  const handleClick = () => {
    if (isDownloadable) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = title.replace(/\s+/g, '_') + '.pdf';
      link.click();
    } else {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-lg text-cyan-400 ${className || ''}`}
    >
      {isDownloadable ? (
        <Download className="w-4 h-4" />
      ) : (
        icon || <FileText className="w-4 h-4" />
      )}
      {title}
    </motion.button>
  );
};

export default DocumentViewer;