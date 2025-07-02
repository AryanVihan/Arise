'use client';

import { motion } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

const progressItems = [
  {
    label: 'Interview Skills',
    value: 75,
    color: 'cyan' as const,
  },
  {
    label: 'Resume Quality',
    value: 60,
    color: 'purple' as const,
  },
  {
    label: 'Portfolio Completion',
    value: 45,
    color: 'pink' as const,
  },
];

export function ProgressTracker() {
  return (
    <motion.div 
      className="space-y-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">Your Progress</h3>
        <p className="text-sm text-gray-400">Track your career development journey</p>
      </div>
      
      <div className="space-y-6">
        {progressItems.map((item, index) => (
          <ProgressBar
            key={item.label}
            label={item.label}
            value={item.value}
            color={item.color}
            delay={index * 0.15}
          />
        ))}
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Keep going! You're making great progress</span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-1.5 animate-pulse"></span>
            Last updated just now
          </span>
        </div>
      </div>
    </motion.div>
  );
}
