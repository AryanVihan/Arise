'use client';

import { motion } from 'framer-motion';
import DashboardWelcomeCard from '@/components/DashboardWelcomeCard';
import { QuickAccessGrid } from '@/components/QuickAccessGrid';
import { ProgressTracker } from '@/components/ProgressTracker';

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
        
        <QuickAccessGrid />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-2"
      >
        <ProgressTracker />
      </motion.div>
    </div>
  );
}
