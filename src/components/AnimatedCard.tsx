// src/components/AnimatedCard.tsx
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group ${className}`}
    >
      {/* Фоновая анимация */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      {/* Контент */}
      <div className="relative bg-black/30 backdrop-blur p-6 rounded-xl border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;