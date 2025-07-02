'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

interface RegenerateCoursesButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export function RegenerateCoursesButton({
  onClick,
  isLoading = false,
  className = '',
}: RegenerateCoursesButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!isLoading) {
      onClick();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isLoading}
      className={`relative overflow-hidden group px-6 py-3 rounded-xl font-medium text-white ${
        isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      whileHover={!isLoading ? { scale: 1.03 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      initial={false}
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl"
        animate={{
          opacity: isLoading ? 0.8 : 1,
          scale: isLoading ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isLoading ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      
      {/* Shimmer overlay */}
      {!isLoading && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
      )}

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <FiRefreshCw className="w-5 h-5 animate-spin" />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <FiRefreshCw className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="font-medium">
          {isLoading ? 'Generating...' : 'Regenerate Courses'}
        </span>
      </div>

      {/* Click effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl opacity-0"
        whileTap={!isLoading ? { opacity: 1, scale: 1.1 } : {}}
        transition={{ duration: 0.1 }}
      />
    </motion.button>
  );
}
