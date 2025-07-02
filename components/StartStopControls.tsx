import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaStop } from 'react-icons/fa';

interface StartStopControlsProps {
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
  className?: string;
}

const StartStopControls: React.FC<StartStopControlsProps> = ({
  onStart,
  onStop,
  isRunning,
  className = '',
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      const start = Date.now() - elapsedTime * 1000;
      setStartTime(start);
      
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - start) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, elapsedTime]);

  const handleClick = () => {
    setAnimationKey(prev => prev + 1);
    if (isRunning) {
      onStop();
    } else {
      onStart();
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  };

  const pulseVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0, 0.7, 0],
      scale: [1, 1.2, 1.5],
      transition: { duration: 1.5, repeat: Infinity }
    },
    exit: { opacity: 0, scale: 1.5 }
  };

  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {/* Timer display */}
      <div className="relative">
        <div className="text-2xl font-mono font-bold text-gray-200 bg-gray-800/50 px-4 py-2 rounded-lg min-w-[100px] text-center">
          {formatTime(elapsedTime)}
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg -z-10 opacity-75 blur"></div>
      </div>

      {/* Start/Stop button */}
      <motion.div
        key={animationKey}
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isRunning && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/20"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${
            isRunning 
              ? 'bg-red-600 hover:bg-red-700 shadow-red-500/50' 
              : 'bg-green-600 hover:bg-green-700 shadow-green-500/50'
          } transition-all duration-300`}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          {isRunning ? (
            <FaStop className="w-6 h-6" />
          ) : (
            <FaPlay className="w-6 h-6 ml-1" />
          )}
        </motion.button>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full -z-10 blur-md opacity-75 transition-opacity ${
          isRunning ? 'bg-red-500/40' : 'bg-green-500/40'
        }`}></div>
      </motion.div>
    </div>
  );
};

export default StartStopControls;
