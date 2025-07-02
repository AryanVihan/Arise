import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

/**
 * A reusable loading indicator component with multiple variants
 */
export function Loader({ 
  size = 'md', 
  variant = 'spinner',
  className = '' 
}: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        {[0, 0.2, 0.4].map((delay) => (
          <motion.div
            key={delay}
            className={`${sizeClasses[size]} rounded-full bg-cyan-400`}
            animate={{
              y: ['0%', '-50%', '0%'],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div 
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ${className}`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  // Default spinner
  return (
    <motion.div 
      className={`${sizeClasses[size]} rounded-full border-2 border-cyan-400 border-t-transparent ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

/**
 * A shimmer effect component for loading states
 */
export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-800/50 rounded ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * A skeleton loader component for content placeholders
 */
export function Skeleton({
  className = '',
  lines = 1,
  variant = 'text',
}: {
  className?: string;
  lines?: number;
  variant?: 'text' | 'card' | 'image';
}) {
  if (variant === 'card') {
    return (
      <div className={`rounded-lg bg-gray-800/50 overflow-hidden ${className}`}>
        <Shimmer className="h-40 w-full" />
        <div className="p-4 space-y-3">
          <Shimmer className="h-5 w-3/4" />
          <Shimmer className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={`aspect-square bg-gray-800/50 rounded-lg overflow-hidden ${className}`}>
        <Shimmer className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
}
