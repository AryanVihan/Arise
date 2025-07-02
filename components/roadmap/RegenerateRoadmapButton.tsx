'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface RegenerateRoadmapButtonProps {
  onClick: () => Promise<void> | void;
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export default function RegenerateRoadmapButton({ 
  onClick, 
  className = '',
  children = 'Regenerate Roadmap',
  isLoading: externalIsLoading = false
}: RegenerateRoadmapButtonProps) {
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const isLoading = externalIsLoading || internalIsLoading;

  const handleClick = async () => {
    if (isLoading) return;
    
    setInternalIsLoading(true);
    try {
      await Promise.resolve(onClick());
    } finally {
      setInternalIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'relative overflow-hidden group px-6 py-3 rounded-lg font-medium text-white',
        'bg-gradient-to-r from-blue-600 to-purple-600',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900',
        'disabled:opacity-70 disabled:cursor-not-allowed',
        'transition-all duration-300',
        'shadow-lg',
        className
      )}
      whileHover={!isLoading ? {
        scale: 1.03,
        boxShadow: '0 0 20px 5px rgba(99, 102, 241, 0.5)'
      } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isLoading ? {
          x: '100%',
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        } : { x: '-100%' }}
      />

      {/* Glow effect */}
      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg filter blur opacity-0 group-hover:opacity-70 transition duration-500 group-hover:duration-200"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 1,
            ease: 'linear',
            repeat: isLoading ? Infinity : 0,
          }}
        >
          <RefreshCw className={cn("w-5 h-5", isLoading ? 'animate-spin' : '')} />
        </motion.span>
        
        <AnimatePresence mode="wait">
          <motion.span
            key={isLoading ? 'loading' : 'idle'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? 'Regenerating...' : children}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

// Utility function to merge class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
