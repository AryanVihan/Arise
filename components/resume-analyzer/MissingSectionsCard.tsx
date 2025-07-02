'use client';

import { motion } from 'framer-motion';
import { AlertCircle, PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

type MissingSection = {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  fixed?: boolean;
};

type MissingSectionsCardProps = {
  className?: string;
  onAutoFix?: (sectionId: string) => Promise<void>;
};

export default function MissingSectionsCard({ className = '', onAutoFix }: MissingSectionsCardProps) {
  const [sections, setSections] = useState<MissingSection[]>([
    {
      id: 'projects',
      title: 'Projects',
      description: 'Showcase your work with detailed project descriptions',
      severity: 'high',
    },
    {
      id: 'objective',
      title: 'Career Objective',
      description: 'Add a clear career objective or summary',
      severity: 'medium',
    },
    {
      id: 'skills',
      title: 'Skills Section',
      description: 'List your key technical and soft skills',
      severity: 'high',
    },
    {
      id: 'education',
      title: 'Education Details',
      description: 'Include your educational background',
      severity: 'medium',
    },
    {
      id: 'certifications',
      title: 'Certifications',
      description: 'Add relevant certifications',
      severity: 'low',
    },
  ]);

  const handleAutoFix = async (sectionId: string) => {
    if (onAutoFix) {
      try {
        await onAutoFix(sectionId);
        // Update UI to show section as fixed
        setSections(prev =>
          prev.map(section =>
            section.id === sectionId ? { ...section, fixed: true } : section
          )
        );
      } catch (error) {
        console.error('Failed to auto-fix section:', error);
      }
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4" />;
      case 'low':
        return <PlusCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (sections.every(section => section.fixed)) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm ${className}`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-100">Complete Resume</h3>
            <p className="text-sm text-green-300 mt-1">Your resume includes all recommended sections. Great job!</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`bg-gradient-to-br from-gray-900/70 to-gray-800/70 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-white">Missing Sections</h3>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
          {sections.filter(s => !s.fixed).length} remaining
        </span>
      </div>

      <div className="space-y-3 mt-4">
        {sections
          .filter(section => !section.fixed)
          .map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`p-3 rounded-lg border ${getSeverityStyles(section.severity)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(section.severity)}
                    <h4 className="font-medium text-sm">{section.title}</h4>
                  </div>
                  <p className="text-xs mt-1 text-gray-300">{section.description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAutoFix(section.id)}
                  className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Fix with AI
                </motion.button>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
