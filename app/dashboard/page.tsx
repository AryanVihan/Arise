'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DashboardWelcomeCard from '@/components/dashboard/DashboardWelcomeCard';

// Loading Components
const QuickAccessGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
    {[...Array(4)].map((_, i) => (
      <motion.div 
        key={i} 
        className="h-40 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl overflow-hidden"
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="h-full w-full bg-gray-800/30 backdrop-blur-sm" />
      </motion.div>
    ))}
  </div>
);

const ProgressTrackerSkeleton = () => (
  <div className="space-y-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
    <motion.div 
      className="h-6 w-48 bg-gradient-to-r from-gray-700 to-gray-600 rounded"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.div 
      className="h-4 w-64 bg-gradient-to-r from-gray-700 to-gray-600 rounded"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    />
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <motion.div 
              className="h-4 w-32 bg-gradient-to-r from-gray-700 to-gray-600 rounded"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
            <motion.div 
              className="h-4 w-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.1 }}
            />
          </div>
          <motion.div 
            className="h-2 w-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-full"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.2 }}
          />
        </div>
      ))}
    </div>
  </div>
);

// Dynamically import heavy components with no SSR
const DynamicQuickAccessGrid = dynamic<{}>(
  () => import('@/components/dashboard/QuickAccessGrid').then(mod => mod.QuickAccessGrid),
  { ssr: false, loading: () => <QuickAccessGridSkeleton /> }
);

const DynamicProgressTracker = dynamic<{}>(
  () => import('@/components/dashboard/ProgressTracker').then(mod => mod.ProgressTracker),
  { ssr: false, loading: () => <ProgressTrackerSkeleton /> }
);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardWelcomeCard userName="Alex" />
      
      <div className="space-y-6">
        <motion.h2 
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Quick Access
        </motion.h2>
        
        <Suspense fallback={<QuickAccessGridSkeleton />}>
          <DynamicQuickAccessGrid />
        </Suspense>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-2"
      >
        <Suspense fallback={<ProgressTrackerSkeleton />}>
          <DynamicProgressTracker />
        </Suspense>
      </motion.div>
    </div>
  );
}
