'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Volume2, 
  Clock, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Mic,
  Pause,
  ArrowRight
} from 'lucide-react';

type TipCategory = 'clarity' | 'pace' | 'vocabulary' | 'delivery' | 'engagement';

interface ImprovementTip {
  id: string;
  title: string;
  description: string;
  category: TipCategory;
  icon: React.ReactNode;
}

const categoryColors = {
  clarity: 'from-blue-500 to-cyan-400',
  pace: 'from-purple-500 to-pink-500',
  vocabulary: 'from-amber-500 to-yellow-400',
  delivery: 'from-emerald-500 to-teal-400',
  engagement: 'from-rose-500 to-pink-500',
};

const categoryIcons = {
  clarity: <Volume2 className="w-5 h-5" />,
  pace: <Clock className="w-5 h-5" />,
  vocabulary: <TrendingUp className="w-5 h-5" />,
  delivery: <Mic className="w-5 h-5" />,
  engagement: <Zap className="w-5 h-5" />,
};

// Sample tips data
const sampleTips: ImprovementTip[] = [
  {
    id: '1',
    title: 'Reduce Filler Words',
    description: 'You used 12 filler words like "um" and "uh". Try pausing briefly instead.',
    category: 'clarity',
    icon: <Volume2 className="w-5 h-5" />
  },
  {
    id: '2',
    title: 'Vary Your Pace',
    description: 'Your speaking speed was consistent. Try varying your pace to emphasize key points.',
    category: 'pace',
    icon: <Clock className="w-5 h-5" />
  },
  {
    id: '3',
    title: 'Use Stronger Verbs',
    description: 'Incorporate more action verbs to make your speech more dynamic and engaging.',
    category: 'vocabulary',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: '4',
    title: 'Pause for Impact',
    description: 'Strategic pauses can make your speech more powerful and easier to follow.',
    category: 'delivery',
    icon: <Pause className="w-5 h-5" />
  },
  {
    id: '5',
    title: 'Engage with Examples',
    description: 'Use relevant examples to make abstract concepts more relatable and memorable.',
    category: 'engagement',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '6',
    title: 'Improve Diction',
    description: 'Enunciate clearly to ensure every word is understood, especially in virtual settings.',
    category: 'clarity',
    icon: <Volume2 className="w-5 h-5" />
  },
];

import { Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    } as const,
  },
};

export default function ImprovementTipsList() {
  const [tips, setTips] = useState<ImprovementTip[]>(sampleTips);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const regenerateTips = () => {
    setIsRegenerating(true);
    
    // Simulate API call or data processing
    setTimeout(() => {
      // Shuffle and get a new set of tips (in a real app, this would be an API call)
      const shuffled = [...sampleTips].sort(() => 0.5 - Math.random());
      setTips(shuffled.slice(0, 5)); // Get 5 random tips
      setIsRegenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-mono font-bold text-pink-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI-Powered Improvement Tips
        </h3>
        <motion.button
          onClick={regenerateTips}
          disabled={isRegenerating}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700/80 transition-colors border border-gray-700/50 hover:border-pink-500/50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Generating...' : 'Regenerate Tips'}
        </motion.button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              variants={item}
              className={`group relative p-5 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 overflow-hidden`}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity ${categoryColors[tip.category]}`} />
              
              <div className="relative z-10">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg mb-3 bg-gradient-to-br ${categoryColors[tip.category]} text-white`}>
                  {tip.icon}
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                  {tip.title}
                  {tip.category === 'clarity' && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300">
                      High Impact
                    </span>
                  )}
                </h4>
                
                <p className="text-gray-300 text-sm mb-4">{tip.description}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                  <span className="text-xs font-medium text-gray-400 flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${categoryColors[tip.category]}`}></span>
                    {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                  </span>
                  <button className="text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center group">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
