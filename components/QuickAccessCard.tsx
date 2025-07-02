'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: 'cyan' | 'purple' | 'pink' | 'yellow';
  delay: number;
}

const colorMap = {
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-500/5',
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-400/60',
    glow: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    icon: 'text-cyan-400',
  },
  purple: {
    bg: 'from-purple-500/10 to-purple-500/5',
    border: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-400/60',
    glow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    icon: 'text-purple-400',
  },
  pink: {
    bg: 'from-pink-500/10 to-pink-500/5',
    border: 'border-pink-500/30',
    hoverBorder: 'hover:border-pink-400/60',
    glow: 'hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    icon: 'text-pink-400',
  },
  yellow: {
    bg: 'from-yellow-500/10 to-yellow-500/5',
    border: 'border-yellow-500/30',
    hoverBorder: 'hover:border-yellow-400/60',
    glow: 'hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]',
    icon: 'text-yellow-400',
  },
};

export function QuickAccessCard({
  title,
  description,
  icon,
  href,
  color,
  delay,
}: QuickAccessCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link href={href} className="h-full block">
        <motion.div
          whileHover={{ y: -5 }}
          className={`h-full flex flex-col p-6 rounded-xl border ${colors.border} ${colors.hoverBorder} ${colors.glow} bg-gradient-to-br ${colors.bg} backdrop-blur-sm transition-all duration-300`}
        >
          <div className={`text-3xl mb-4 ${colors.icon} transition-colors`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center text-sm font-medium group">
              <span className="group-hover:underline">Get started</span>
              <svg
                className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
