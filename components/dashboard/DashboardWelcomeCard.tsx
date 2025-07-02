'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiZap, FiClock, FiCalendar, FiStar } from 'react-icons/fi';

// Array of motivational quotes
const motivationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Your time is limited, don't waste it living someone else's life.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
];

const DashboardWelcomeCard = ({ userName = 'Valued User' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote] = useState(
    () => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // Animation variants with proper types
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  } as const;

  return (
    <motion.div
      className="relative p-6 rounded-xl overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl" />
      <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl blur opacity-30" />
      
      {/* Main content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <motion.div 
              className="flex items-center gap-2 text-cyan-400"
              variants={childVariants}
              custom={1}
            >
              <FiZap className="animate-pulse" />
              <span className="text-sm font-medium">Welcome back,</span>
            </motion.div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              variants={childVariants}
              custom={2}
            >
              {userName}!
            </motion.h1>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-300"
              variants={childVariants}
              custom={3}
            >
              <FiCalendar className="text-purple-400" />
              <span>{formattedDate}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-300"
              variants={childVariants}
              custom={4}
            >
              <FiClock className="text-cyan-400" />
              <span>{formattedTime}</span>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 relative overflow-hidden"
          variants={childVariants}
          custom={5}
        >
          <div className="absolute -right-2 -top-2 text-yellow-400 opacity-30">
            <FiStar className="w-12 h-12 animate-spin-slow" />
          </div>
          <div className="relative z-10 flex items-start gap-3">
            <div className="text-purple-400 mt-0.5">
              <FiStar className="w-5 h-5" />
            </div>
            <p className="text-gray-300 italic">"{quote}"</p>
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
    </motion.div>
  );
};

export default DashboardWelcomeCard;
