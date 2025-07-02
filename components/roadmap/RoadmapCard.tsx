'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type RoadmapCardProps = {
  title: string;
  duration: string;
  description: string;
  stepNumber?: number;
  isCompleted?: boolean;
  className?: string;
};

export default function RoadmapCard({
  title,
  duration,
  description,
  stepNumber,
  isCompleted = false,
  className,
}: RoadmapCardProps) {
  return (
    <motion.div
      className={cn(
        'relative p-6 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm',
        'transition-all duration-300 hover:border-blue-400/50',
        'group hover:shadow-lg hover:shadow-blue-500/10',
        className
      )}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Tech scroll effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-70 blur-md transition duration-500 group-hover:duration-200 -z-20" />
      
      <div className="relative z-10">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-4">
          {stepNumber && !isCompleted && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg">
              {stepNumber}
            </div>
          )}
          {isCompleted && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}
          <span className="text-sm font-medium text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
            {duration}
          </span>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Tech scroll bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-400/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

// Example usage:
/*
<RoadmapCard 
  title="Learn React Fundamentals"
  duration="2 weeks"
  description="Master the core concepts of React including components, props, state, and hooks."
  stepNumber={1}
/>
*/
