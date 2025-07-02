'use client';

import { useState } from 'react';
import GoalSelector from "@/components/roadmap/GoalSelector";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import RegenerateRoadmapButton from "@/components/roadmap/RegenerateRoadmapButton";
import { Code, BookOpen, Book, GraduationCap, Briefcase } from 'lucide-react';

const learningPath = [
  {
    id: '1',
    title: 'Foundations',
    description: 'Master the fundamentals of programming including data structures, algorithms, and problem-solving.',
    status: 'completed' as const,
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'Learn HTML, CSS, and JavaScript to build interactive and responsive websites.',
    status: 'completed' as const,
    icon: <Code className="w-5 h-5" />
  },
  {
    id: '3',
    title: 'Frontend Frameworks',
    description: 'Dive into React, Vue, or Angular to build modern, component-based user interfaces.',
    status: 'in-progress' as const,
    icon: <Code className="w-5 h-5" />
  },
  {
    id: '4',
    title: 'Backend Development',
    description: 'Learn server-side programming with Node.js, databases, and API development.',
    status: 'upcoming' as const,
    icon: <Book className="w-5 h-5" />
  },
  {
    id: '5',
    title: 'Full Stack Projects',
    description: 'Build complete applications using both frontend and backend technologies.',
    status: 'upcoming' as const,
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    id: '6',
    title: 'Career Preparation',
    description: 'Prepare for technical interviews, build your portfolio, and start applying for jobs.',
    status: 'upcoming' as const,
    icon: <Briefcase className="w-5 h-5" />
  }
];

export default function RoadmapClient() {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentPath, setCurrentPath] = useState(learningPath);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate API call or data processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In a real app, you would fetch new data here
    setIsRegenerating(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Your Career Journey
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Select your desired role and follow the personalized learning path
          </p>
        </div>

        {/* Role Selection */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Choose Your Path
          </h2>
          <GoalSelector />
        </section>

        {/* Learning Path Timeline */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center text-white mb-12">
            Your Learning Path
          </h2>
          <RoadmapTimeline items={currentPath} />
          
          <div className="mt-12 flex justify-center">
            <RegenerateRoadmapButton 
              onClick={handleRegenerate}
              isLoading={isRegenerating}
              className="mt-8"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
