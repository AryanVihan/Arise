import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

type FeedbackType = 'positive' | 'negative' | 'neutral';

interface FeedbackItem {
  id: string;
  message: string;
  type: FeedbackType;
  timestamp: number;
  intensity?: number; // 0-1 for animation intensity
}

interface LiveFeedbackPanelProps {
  /**
   * Whether feedback should be shown
   */
  isActive?: boolean;
  /**
   * Maximum number of feedback items to show
   */
  maxItems?: number;
  /**
   * Custom class name for the container
   */
  className?: string;
}

const LiveFeedbackPanel: React.FC<LiveFeedbackPanelProps> = ({
  isActive = true,
  maxItems = 3,
  className = '',
}) => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [lastActivity, setLastActivity] = useState<number>(0);

  // Generate sample feedback (in a real app, this would come from props or context)
  useEffect(() => {
    if (!isActive) return;

    const sampleFeedbacks: Omit<FeedbackItem, 'id' | 'timestamp'>[] = [
      { message: 'Great job maintaining eye contact!', type: 'positive', intensity: 0.8 },
      { message: 'Try to speak a bit slower', type: 'negative', intensity: 0.6 },
      { message: 'Good use of technical terms', type: 'positive', intensity: 0.7 },
      { message: 'Avoid using filler words', type: 'negative', intensity: 0.8 },
      { message: 'Excellent explanation', type: 'positive', intensity: 0.9 },
      { message: 'Consider pausing between points', type: 'neutral', intensity: 0.5 },
    ];

    const interval = setInterval(() => {
      // Only add new feedback if panel is active and we have space
      if (feedbackItems.length >= maxItems) return;
      
      // Add some randomness to feedback timing
      if (Math.random() > 0.6) {
        const randomFeedback = sampleFeedbacks[Math.floor(Math.random() * sampleFeedbacks.length)];
        
        setFeedbackItems(prev => [
          ...prev,
          {
            ...randomFeedback,
            id: Date.now().toString(),
            timestamp: Date.now(),
          },
        ].slice(-maxItems)); // Keep only the most recent items

        setLastActivity(Date.now());
      }
    }, 3000); // Check every 3 seconds

    // Auto-remove feedback after some time
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setFeedbackItems(prev => 
        prev.filter(item => now - item.timestamp < 10000) // Keep items for 10 seconds
      );
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [isActive, feedbackItems.length, maxItems]);

  const getFeedbackConfig = (type: FeedbackType) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-green-900/30',
          border: 'border-green-500/50',
          text: 'text-green-300',
          icon: <FiCheckCircle className="w-4 h-4" />,
          glow: 'shadow-[0_0_10px_rgba(74,222,128,0.5)]',
        };
      case 'negative':
        return {
          bg: 'bg-red-900/30',
          border: 'border-red-500/50',
          text: 'text-red-300',
          icon: <FiAlertCircle className="w-4 h-4" />,
          glow: 'shadow-[0_0_10px_rgba(248,113,113,0.5)]',
        };
      default: // neutral
        return {
          bg: 'bg-blue-900/30',
          border: 'border-blue-500/50',
          text: 'text-blue-300',
          icon: <FiInfo className="w-4 h-4" />,
          glow: 'shadow-[0_0_10px_rgba(96,165,250,0.5)]',
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = (intensity = 0.5) => {
    const mass = 0.5 + (intensity * 0.5);
    return {
      hidden: { 
        opacity: 0, 
        y: 20 * (1 + intensity),
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring' as const,
          damping: 15,
          stiffness: 300,
          mass,
        },
      },
      exit: {
        opacity: 0,
        x: -20,
        transition: {
          duration: 0.2,
          ease: 'easeIn' as const,
        },
      },
    } as const;
  };

  if (!isActive) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 max-w-xs w-full ${className}`}>
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {feedbackItems.map((item) => {
            const config = getFeedbackConfig(item.type);
            return (
              <motion.div
                key={item.id}
                className={`p-3 pr-4 rounded-xl backdrop-blur-sm border ${config.bg} ${config.border} ${config.glow} flex items-start space-x-2`}
                variants={itemVariants(item.intensity || 0.5)}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 15px rgba(255,255,255,0.1)'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <div className={`mt-0.5 ${config.text}`}>
                  {config.icon}
                </div>
                <p className={`text-sm ${config.text} font-medium`}>
                  {item.message}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LiveFeedbackPanel;
