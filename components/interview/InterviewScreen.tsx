'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import VoiceVisualizer from './VoiceVisualizer';

interface InterviewScreenProps {
  question: string;
  isListening: boolean;
  volume: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  question,
  isListening,
  volume,
  currentQuestionIndex,
  totalQuestions,
}) => {
  // Animation variants for the question text
  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeInOut'
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  } as const;

  // Animation for the microphone status indicator
  const micStatusVariants = {
    listening: { 
      scale: [1, 1.1, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse' as const
      } 
    },
    idle: { 
      scale: 1,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Question Card */}
      <motion.div 
        className="relative p-8 mb-8 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-magenta-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative">
          {/* Question counter */}
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold">
              {currentQuestionIndex + 1}
            </div>
            <span className="ml-3 text-sm font-medium text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          
          {/* Question text */}
          <AnimatePresence mode="wait">
            <motion.h2 
              key={`question-${currentQuestionIndex}`}
              className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed"
              variants={questionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {question}
            </motion.h2>
          </AnimatePresence>
          
          {/* Microphone status */}
          <div className="flex items-center justify-center py-8">
            <div className="relative">
              {/* Animated voice visualizer */}
              <div className="absolute inset-0">
                <VoiceVisualizer 
                  volume={volume} 
                  isActive={isListening}
                />
              </div>
              
              {/* Microphone icon with animation */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gray-900/80 border border-cyan-500/30 shadow-lg"
                animate={isListening ? 'listening' : 'idle'}
                variants={micStatusVariants}
              >
                {isListening ? (
                  <FaMicrophone className="w-8 h-8 text-cyan-400" />
                ) : (
                  <FaMicrophoneSlash className="w-8 h-8 text-gray-500" />
                )}
              </motion.div>
              
              {/* Status text */}
              <div className="mt-4 text-center">
                <span className={`text-sm font-medium ${isListening ? 'text-cyan-400' : 'text-gray-500'} transition-colors duration-300`}>
                  {isListening ? 'Listening...' : 'Microphone is off'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewScreen;
