'use client';

import { motion, Variants } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  example?: string;
}

const suggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Use Action Verbs',
    description: 'Start bullet points with strong action verbs to make your experience more impactful.',
    severity: 'high',
    example: 'Instead of "Responsible for managing a team", use "Led a team of 5 developers"'
  },
  {
    id: '2',
    title: 'Add Metrics',
    description: 'Quantify your achievements with specific numbers and metrics.',
    severity: 'high',
    example: 'Increased revenue by 30% over 6 months'
  },
  {
    id: '3',
    title: 'Remove Irrelevant Experience',
    description: 'Focus on the most relevant experience for the job you\'re applying to.',
    severity: 'medium',
    example: 'Remove high school achievements if you have professional experience'
  },
  {
    id: '4',
    title: 'Use Consistent Formatting',
    description: 'Maintain consistent spacing, bullet points, and date formats throughout.',
    severity: 'medium'
  },
  {
    id: '5',
    title: 'Include Keywords',
    description: 'Incorporate keywords from the job description to pass ATS systems.',
    severity: 'high'
  },
  {
    id: '6',
    title: 'Keep it Concise',
    description: 'Limit your resume to 1-2 pages maximum.',
    severity: 'low'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const getSeverityStyles = (severity: Suggestion['severity']) => {
  switch (severity) {
    case 'high':
      return 'bg-red-500/10 text-red-500';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'low':
      return 'bg-green-500/10 text-green-500';
  }
};

const getSeverityIcon = (severity: Suggestion['severity']) => {
  switch (severity) {
    case 'high':
      return <AlertCircle className="w-5 h-5" />;
    case 'medium':
      return <AlertTriangle className="w-5 h-5" />;
    case 'low':
      return <CheckCircle2 className="w-5 h-5" />;
  }
};

export default function ResumeSuggestionsList() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">AI-Powered Resume Tips</h2>
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {suggestions.map((suggestion) => (
          <motion.div
            key={suggestion.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-colors"
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg text-white">{suggestion.title}</h3>
              <span className={`${getSeverityStyles(suggestion.severity)} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                {getSeverityIcon(suggestion.severity)}
                {suggestion.severity}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{suggestion.description}</p>
            {suggestion.example && (
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <p className="text-xs text-gray-400 mb-1">Example:</p>
                <p className="text-xs bg-gray-900/50 p-2 rounded text-gray-300 font-mono">
                  {suggestion.example}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
