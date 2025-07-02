'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon?: React.ReactNode;
}

interface RoadmapTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function RoadmapTimeline({ items, className }: RoadmapTimelineProps) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getStatusColor = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-500';
      case 'in-progress':
        return 'bg-blue-500 border-blue-500 animate-pulse';
      default:
        return 'bg-gray-700 border-gray-600';
    }
  };

  const getStatusText = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Upcoming';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden',
        isMobile ? 'h-[500px]' : 'min-h-screen',
        className
      )}
    >
      <motion.div
        className={cn(
          'relative',
          isMobile 
            ? 'flex h-full w-max items-center px-4 py-12' 
            : 'flex flex-col items-center justify-center space-y-12 px-4 py-12 md:px-12'
        )}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={cn(
              'relative z-10 flex-shrink-0',
              isMobile ? 'w-72 mx-4' : 'w-full max-w-3xl mx-auto'
            )}
            variants={itemVariants}
          >
            <div className="relative">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    getStatusColor(item.status)
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.status === 'completed' && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                className={cn(
                  'relative p-6 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm',
                  'transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10',
                  isMobile ? 'ml-8' : 'ml-12'
                )}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <span className={cn(
                    'text-xs font-medium px-2 py-1 rounded-full',
                    item.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                    item.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-gray-700/50 text-gray-400'
                  )}>
                    {getStatusText(item.status)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
                
                {item.icon && (
                  <div className="mt-4 text-blue-400">
                    {item.icon}
                  </div>
                )}
              </motion.div>

              {/* Connector line */}
              {index < items.length - 1 && (
                <div className={cn(
                  'absolute bg-gradient-to-b from-blue-500 to-purple-600',
                  isMobile 
                    ? 'w-12 h-1 top-1/2 -right-12 transform -translate-y-1/2' 
                    : 'w-1 h-16 -bottom-16 left-0 transform -translate-x-1/2',
                  'rounded-full'
                )}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
          }}
        />
      </motion.div>
    </div>
  );
}

// Example usage:
/*
const timelineItems = [
  {
    id: '1',
    title: 'Learn the Basics',
    description: 'Master the fundamentals of web development including HTML, CSS, and JavaScript.',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Frontend Frameworks',
    description: 'Dive into React and learn about components, state, and props.',
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Backend Development',
    description: 'Learn about APIs, databases, and server-side programming with Node.js.',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Full Stack Projects',
    description: 'Build complete applications using both frontend and backend technologies.',
    status: 'upcoming',
  },
];

<RoadmapTimeline items={timelineItems} />
*/
