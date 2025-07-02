'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import the components with SSR disabled
const CourseCardDemo = dynamic(
  () => import('@/components/courses/CourseCardDemo'),
  { ssr: false }
);

// Import the component directly since we're using named export
import { GoalBasedCourseSelector } from '@/components/courses/GoalBasedCourseSelector';
import { RegenerateCoursesButton } from '@/components/ui/RegenerateCoursesButton';

export default function CourseGeneratorClient() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleRegenerate = () => {
    if (!selectedGoal) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Course Generator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Select a learning goal to discover personalized course recommendations
          </p>
        </div>
        
        <div className="mb-16">
          <GoalBasedCourseSelector onGoalSelect={setSelectedGoal} />
        </div>

        {selectedGoal && (
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white">
                Recommended Courses for {selectedGoal}
              </h2>
              <RegenerateCoursesButton 
                onClick={handleRegenerate} 
                isLoading={isGenerating}
                className="w-full sm:w-auto"
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGoal + (isGenerating ? '-loading' : '')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCardDemo />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
