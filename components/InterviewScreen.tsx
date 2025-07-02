import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import VoiceVisualizer from './VoiceVisualizer';

interface InterviewScreenProps {
  questions: string[];
  currentQuestionIndex: number;
  isListening: boolean;
  volume?: number;
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  questions,
  currentQuestionIndex,
  isListening,
  volume = 0,
}) => {
  const [showRipple, setShowRipple] = useState(false);
  const currentQuestion = questions[currentQuestionIndex] || 'No questions available';

  // Ripple effect for the microphone
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setShowRipple(true);
        setTimeout(() => setShowRipple(false), 1000);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  // Calculate scale based on volume (0-1)
  const micScale = 1 + (volume * 0.5);
  const rippleScale = 1.5 + (volume * 2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Question Card */}
      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative p-8 mb-16 w-full max-w-3xl rounded-xl border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-75 blur-sm"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-cyan-100 mb-4">Interview Question</h2>
          <p className="text-xl md:text-2xl text-center text-gray-200">{currentQuestion}</p>
        </div>
      </motion.div>

      {/* Voice Visualizer */}
      <div className="relative flex flex-col items-center w-full">
        <div className="relative w-full max-w-md">
          {/* Voice Visualizer */}
          <div className="relative h-32 -mt-8 mb-4">
            <VoiceVisualizer
              volume={volume}
              isActive={isListening}
              barCount={12}
              primaryColor="#06b6d4"
              secondaryColor="#8b5cf6"
            />
          </div>
          
          {/* Microphone icon with pulse effect */}
          <div className="relative z-10 flex justify-center -mt-16">
            <motion.div
              animate={{
                scale: isListening ? 1.1 : 1,
                color: isListening ? '#06b6d4' : '#9ca3af',
              }}
              transition={{ 
                scale: { type: 'spring', damping: 10, stiffness: 100 },
                color: { duration: 0.3 }
              }}
              className="p-4 rounded-full bg-gray-800/80 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 backdrop-blur-sm"
            >
              {isListening ? (
                <FaMicrophone className="w-8 h-8 text-cyan-400" />
              ) : (
                <FaMicrophoneSlash className="w-8 h-8 text-gray-400" />
              )}
            </motion.div>
            
            {/* Glowing ring when active */}
            {isListening && (
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </div>
          
          {/* Status text */}
          <motion.p 
            className="mt-6 text-lg font-medium text-center"
            animate={{ color: isListening ? '#06b6d4' : '#9ca3af' }}
          >
            {isListening ? 'Listening...' : 'Click to start speaking'}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default InterviewScreen;
