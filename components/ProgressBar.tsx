'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  value: number;
  color: 'cyan' | 'purple' | 'pink' | 'yellow';
  delay: number;
}

const colorMap = {
  cyan: {
    bg: 'bg-cyan-500/20',
    fill: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
    glow: 'shadow-[0_0_8px_rgba(34,211,238,0.6)]',
  },
  purple: {
    bg: 'bg-purple-500/20',
    fill: 'bg-gradient-to-r from-purple-400 to-purple-600',
    glow: 'shadow-[0_0_8px_rgba(168,85,247,0.6)]',
  },
  pink: {
    bg: 'bg-pink-500/20',
    fill: 'bg-gradient-to-r from-pink-400 to-pink-600',
    glow: 'shadow-[0_0_8px_rgba(236,72,153,0.6)]',
  },
  yellow: {
    bg: 'bg-yellow-500/20',
    fill: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    glow: 'shadow-[0_0_8px_rgba(234,179,8,0.6)]',
  },
};

export function ProgressBar({ label, value, color, delay }: ProgressBarProps) {
  const colors = colorMap[color];
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-xs font-mono text-gray-400">{percentage}%</span>
      </div>
      <div className={`h-2.5 rounded-full overflow-hidden ${colors.bg}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            delay: 0.2 + delay * 0.1,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`h-full rounded-full ${colors.fill} ${colors.glow} transition-all duration-300`}
        />
      </div>
    </div>
  );
}
