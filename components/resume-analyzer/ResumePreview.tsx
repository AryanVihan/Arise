'use client';

import { cn } from '@/lib/utils';
import { FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';

export type HighlightType = 'issue' | 'warning' | 'suggestion';

export interface Highlight {
  text: string;
  type: HighlightType;
  message: string;
  start: number;
  end: number;
}

interface ResumePreviewProps {
  content: string;
  highlights?: Highlight[];
  onClose?: () => void;
  className?: string;
}

const highlightColors = {
  issue: 'bg-red-500/10 text-red-400 border-red-500/30',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  suggestion: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
};

const highlightIcons = {
  issue: '🚫',
  warning: '⚠️',
  suggestion: '💡',
};

export function ResumePreview({ content, highlights = [], onClose, className }: ResumePreviewProps) {
  const renderHighlightedText = () => {
    if (!highlights.length) {
      return (
        <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
          {content}
        </div>
      );
    }

    // Sort highlights by start position
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
    
    const parts = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        parts.push({
          text: content.slice(lastIndex, highlight.start),
          highlight: null,
        });
      }

      // Add highlighted text
      parts.push({
        text: content.slice(highlight.start, highlight.end),
        highlight,
      });

      lastIndex = highlight.end;
    });

    // Add remaining text after last highlight
    if (lastIndex < content.length) {
      parts.push({
        text: content.slice(lastIndex),
        highlight: null,
      });
    }

    return (
      <div className="relative">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
          {parts.map((part, i) => {
            if (!part.highlight) {
              return <span key={i}>{part.text}</span>;
            }
            
            const { type, message } = part.highlight;
            return (
              <span 
                key={i}
                className={cn(
                  'relative group cursor-help border-b-2',
                  highlightColors[type],
                  'transition-all duration-200 hover:bg-opacity-20',
                )}
                data-tooltip-id={`tooltip-${i}`}
                data-tooltip-content={message}
              >
                {part.text}
                <span className="absolute -top-2 -right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {highlightIcons[type]}
                </span>
              </span>
            );
          })}
        </pre>
      </div>
    );
  };

  return (
    <motion.div 
      className={cn(
        'relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50',
        'p-6 overflow-hidden',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Resume Preview</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10 pointer-events-none" />
        <div className="max-h-[60vh] overflow-y-auto pr-4 -mr-4 custom-scrollbar">
          {renderHighlightedText()}
        </div>
      </div>

      {/* Summary of issues */}
      {highlights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Issues Found</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(
              highlights.reduce((acc, h) => {
                acc[h.type] = (acc[h.type] || 0) + 1;
                return acc;
              }, {} as Record<HighlightType, number>)
            ).map(([type, count]) => (
              <span
                key={type}
                className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1',
                  highlightColors[type as HighlightType]
                )}
              >
                <span>{highlightIcons[type as HighlightType]}</span>
                <span>{count} {type}s</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full filter blur-3xl -z-10" />
    </motion.div>
  );
}

export default ResumePreview;
