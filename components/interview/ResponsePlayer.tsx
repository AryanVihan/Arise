import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTrash, FaThumbsUp, FaThumbsDown, FaRegCopy } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';

interface ResponsePlayerProps {
  /**
   * The transcribed text to display
   */
  text: string;
  /**
   * Callback when replay is requested
   */
  onReplay?: () => void;
  /**
   * Callback when delete is requested
   */
  onDelete?: () => void;
  /**
   * Callback when feedback is provided
   */
  onFeedback?: (isPositive: boolean) => void;
  /**
   * Optional class name for the container
   */
  className?: string;
}

const ResponsePlayer: React.FC<ResponsePlayerProps> = ({
  text,
  onReplay,
  onDelete,
  onFeedback,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const textAreaRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    if (onReplay) {
      setIsPlaying(true);
      onReplay();
      // Simulate replay animation
      setTimeout(() => setIsPlaying(false), 1500);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleFeedback = (isPositive: boolean) => {
    setFeedback(isPositive ? 'positive' : 'negative');
    if (onFeedback) {
      onFeedback(isPositive);
    }
  };

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn' as const,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  if (!text) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`relative ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Main card */}
        <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-cyan-400/30">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
              <span className="text-sm font-medium text-cyan-300">Your Response</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <motion.button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                title="Copy to clipboard"
              >
                {isCopied ? (
                  <FiCopy className="w-4 h-4 text-green-400" />
                ) : (
                  <FaRegCopy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <div 
              ref={textAreaRef}
              className="font-mono text-gray-200 text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-40 pr-2"
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#06b6d4 #1f2937',
              }}
            >
              {text}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-700/50">
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleReplay}
                  className={`p-2 rounded-lg flex items-center space-x-1.5 text-sm font-medium transition-colors ${
                    isPlaying
                      ? 'text-cyan-400 bg-cyan-900/30'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50'
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isPlaying}
                >
                  <FaPlay className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                  <span>Replay</span>
                </motion.button>
                
                <motion.button
                  onClick={handleDelete}
                  className="p-2 rounded-lg flex items-center space-x-1.5 text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-gray-700/50 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </motion.button>
              </div>
              
              <div className="flex space-x-1">
                <motion.button
                  onClick={() => handleFeedback(true)}
                  className={`p-2 rounded-lg ${
                    feedback === 'positive'
                      ? 'text-green-400 bg-green-900/30'
                      : 'text-gray-400 hover:text-green-400 hover:bg-gray-700/50'
                  } transition-colors`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaThumbsUp className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleFeedback(false)}
                  className={`p-2 rounded-lg ${
                    feedback === 'negative'
                      ? 'text-red-400 bg-red-900/30'
                      : 'text-gray-400 hover:text-red-400 hover:bg-gray-700/50'
                  } transition-colors`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaThumbsDown className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Glow border effect */}
          <div className={`absolute inset-0 rounded-xl pointer-events-none border border-transparent ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          style={{
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4)',
            backgroundSize: '200% 100%',
            animation: isHovered ? 'gradient 3s linear infinite' : 'none',
          }}></div>
        </div>
      </motion.div>
      
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 100% 50%; }
          100% { background-position: -100% 50%; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #06b6d4;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #0891b2;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default ResponsePlayer;
