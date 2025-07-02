'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Clock, AlertCircle, MessageSquare } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
  decimalPlaces?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  suffix = '',
  decimalPlaces = 0
}) => {
  return (
    <motion.div 
      className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
      }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <motion.p 
            className="text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value.toFixed(decimalPlaces)}{suffix}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

interface FeedbackOverviewCardProps {
  confidence: number; // 0-100
  speakingTime: number; // in seconds
  fillerWordCount: number;
  questionsAnswered: number;
}

const FeedbackOverviewCard: React.FC<FeedbackOverviewCardProps> = ({
  confidence,
  speakingTime,
  fillerWordCount,
  questionsAnswered,
}) => {
  // Format speaking time to minutes and seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <StatCard
        title="Confidence"
        value={confidence}
        icon={<Mic className="w-5 h-5" />}
        suffix="%"
        decimalPlaces={1}
      />
      <StatCard
        title="Speaking Time"
        value={speakingTime}
        icon={<Clock className="w-5 h-5" />}
        suffix=""
      />
      <StatCard
        title="Filler Words"
        value={fillerWordCount}
        icon={<AlertCircle className="w-5 h-5" />}
      />
      <StatCard
        title="Questions Answered"
        value={questionsAnswered}
        icon={<MessageSquare className="w-5 h-5" />}
      />
    </div>
  );
};

export default FeedbackOverviewCard;
