'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

export type HighlightType = 'filler' | 'strength' | 'improvement';

export interface Highlight {
  start: number;
  end: number;
  type: HighlightType;
  note?: string;
}

interface TranscriptWord {
  text: string;
  start: number;
  end: number;
  confidence: number;
}

interface TranscriptWithHighlightsProps {
  transcript: TranscriptWord[];
  highlights: Highlight[];
  className?: string;
}

const getHighlightColor = (type: HighlightType) => {
  switch (type) {
    case 'filler':
      return 'bg-red-500/20 border-l-2 border-red-500 text-red-300';
    case 'strength':
      return 'bg-green-500/20 border-l-2 border-green-500 text-green-300';
    case 'improvement':
      return 'bg-yellow-500/20 border-l-2 border-yellow-500 text-yellow-300';
    default:
      return '';
  }
};

const getHighlightGlow = (type: HighlightType) => {
  switch (type) {
    case 'filler':
      return 'shadow-[0_0_10px_rgba(239,68,68,0.7)]';
    case 'strength':
      return 'shadow-[0_0_10px_rgba(34,197,94,0.7)]';
    case 'improvement':
      return 'shadow-[0_0_10px_rgba(234,179,8,0.7)]';
    default:
      return '';
  }
};

const getHighlightIcon = (type: HighlightType) => {
  switch (type) {
    case 'filler':
      return <AlertTriangle className="w-3.5 h-3.5" />;
    case 'strength':
      return <CheckCircle className="w-3.5 h-3.5" />;
    case 'improvement':
      return <Sparkles className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};

export default function TranscriptWithHighlights({
  transcript,
  highlights,
  className = '',
}: TranscriptWithHighlightsProps) {
  // Sort highlights by start time
  const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

  // Group words into paragraphs based on time gaps
  const paragraphs: { words: string; highlights: Highlight[] }[] = [];
  let currentParagraph = '';
  let currentHighlights: Highlight[] = [];
  let lastEndTime = 0;

  transcript.forEach((word, index) => {
    // Start new paragraph if there's a significant gap
    if (word.start - lastEndTime > 1.5 && currentParagraph) {
      paragraphs.push({
        words: currentParagraph.trim(),
        highlights: [...currentHighlights],
      });
      currentParagraph = '';
      currentHighlights = [];
    }

    // Check if this word is in any highlight
    const wordHighlights = sortedHighlights.filter(
      (h) => word.start >= h.start && word.end <= h.end
    );

    // Add word to current paragraph with appropriate styling
    const wordElement = (
      <span
        key={index}
        className={`relative inline-block px-0.5 mx-[1px] rounded-sm transition-all duration-200 ${
          wordHighlights.length > 0
            ? `${getHighlightColor(wordHighlights[0].type)} ${getHighlightGlow(
                wordHighlights[0].type
              )} px-1.5 py-0.5 -mx-0.5`
            : 'text-gray-200 hover:bg-gray-700/50 hover:rounded-md'
        }`}
      >
        {word.text}
        {wordHighlights.length > 0 && (
          <span className="absolute -top-2 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="relative">
              <span className="absolute -inset-1 bg-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative px-1.5 py-0.5 text-xs rounded-full bg-gray-900 text-pink-300 flex items-center gap-1">
                {getHighlightIcon(wordHighlights[0].type)}
                {wordHighlights[0].type.charAt(0).toUpperCase() + wordHighlights[0].type.slice(1)}
              </span>
            </span>
          </span>
        )}
      </span>
    );

    currentParagraph += (index > 0 ? ' ' : '') + word.text;
    wordHighlights.forEach((h) => {
      if (!currentHighlights.some((ch) => ch.start === h.start && ch.end === h.end)) {
        currentHighlights.push(h);
      }
    });

    lastEndTime = word.end;
  });

  // Add the last paragraph
  if (currentParagraph) {
    paragraphs.push({
      words: currentParagraph.trim(),
      highlights: currentHighlights,
    });
  }

  return (
    <div className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-mono font-bold text-pink-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Transcript Analysis
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></span>
            <span className="text-gray-400">Filler Words</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></span>
            <span className="text-gray-400">Strengths</span>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-4">
          {paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              className="font-mono text-sm leading-relaxed text-gray-300 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {para.words}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ec4899, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #db2777, #7c3aed);
        }
      `}</style>
    </div>
  );
}
