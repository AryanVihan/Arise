import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';

interface VoiceVisualizerProps {
  /**
   * Volume level between 0 and 1
   */
  volume: number;
  /**
   * Whether the visualizer is active
   */
  isActive: boolean;
  /**
   * Number of bars in the visualizer
   */
  barCount?: number;
  /**
   * Color for the primary glow effect
   */
  primaryColor?: string;
  /**
   * Color for the secondary glow effect
   */
  secondaryColor?: string;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  volume,
  isActive,
  barCount = 8,
  primaryColor = '#06b6d4', // cyan-500
  secondaryColor = '#8b5cf6', // purple-500
}) => {
  const controls = useAnimation();
  const prevVolume = useRef(0);
  const barHeights = useRef<number[]>([]);
  const barAnimations = useRef<Array<{ height: number; opacity: number }>>([]);
  
  // Initialize bar heights and animations
  if (barHeights.current.length === 0) {
    barHeights.current = Array(barCount).fill(0);
    barAnimations.current = Array(barCount).fill({ height: 0, opacity: 0.3 });
  }

  useEffect(() => {
    if (!isActive) {
      // Reset all bars when deactivated
      barAnimations.current = barAnimations.current.map(() => ({
        height: 0,
        opacity: 0.3,
      }));
      controls.start('hidden');
      return;
    }

    // Calculate new bar heights based on volume
    const newBarHeights = barHeights.current.map((_, index) => {
      // Add some randomness to make it more organic
      const randomFactor = 0.7 + Math.random() * 0.6;
      // Create a wave-like pattern
      const wavePattern = Math.sin((index / barCount) * Math.PI * 2) * 0.5 + 0.5;
      
      return Math.min(1, volume * randomFactor * wavePattern * 1.5);
    });

    // Update animations
    barAnimations.current = newBarHeights.map((height) => ({
      height,
      opacity: 0.3 + height * 0.7, // More visible as height increases
    }));

    // Animate the bars
    controls.start('visible');

  }, [volume, isActive, controls, barCount]);

  // Animation variants for the container
  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual bars
  const barVariants = {
    hidden: {
      height: 0,
      opacity: 0.3,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutQuint
      },
    },
    visible: (i: number) => {
      const anim = barAnimations.current[i] || { height: 0, opacity: 0.3 };
      return {
        height: `${anim.height * 100}%`,
        opacity: anim.opacity,
        transition: {
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1] as const, // easeOutQuint
        },
      };
    },
  };

  return (
    <div className="relative w-full max-w-2xl h-24 flex items-end justify-center gap-1.5 p-4">
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <motion.div 
        className="flex items-end justify-center gap-1.5 w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {Array(barCount).fill(0).map((_, i) => {
          // Calculate width based on position (wider in the middle)
          const position = i / (barCount - 1);
          const width = 0.5 + Math.sin(position * Math.PI) * 0.5;
          
          return (
            <motion.div
              key={i}
              custom={i}
              variants={barVariants}
              className={`relative rounded-full`}
              style={{
                width: `${(width * 100) / barCount}%`,
                minWidth: '0.5rem',
                background: `linear-gradient(to top, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 10px ${primaryColor}80, 0 0 20px ${secondaryColor}40`,
              }}
            />
          );
        })}
      </motion.div>
      
      {/* Center pulse effect */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
            boxShadow: `0 0 30px ${primaryColor}40, 0 0 60px ${secondaryColor}20`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
};

export default VoiceVisualizer;
