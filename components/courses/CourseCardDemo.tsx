'use client';

import { useState } from 'react';
import CourseCard from './CourseCard';

const CourseCardDemo = () => {
  const [showRecommended, setShowRecommended] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'The Complete React Developer Course',
      platform: 'Udemy',
      duration: '30 hours',
      difficulty: 'Intermediate' as const,
      pricing: 'Paid' as const,
      url: 'https://udemy.com/react-course',
      isRecommended: true,
    },
    {
      id: 2,
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      platform: 'Udemy',
      duration: '48 hours',
      difficulty: 'Beginner' as const,
      pricing: 'Paid' as const,
      url: 'https://udemy.com/react-complete-guide',
      isRecommended: false,
    },
    {
      id: 3,
      title: 'Learn React for Free',
      platform: 'Scrimba',
      duration: '20 hours',
      difficulty: 'Beginner' as const,
      pricing: 'Free' as const,
      url: 'https://scrimba.com/learn/learnreact',
      isRecommended: true,
    },
    {
      id: 4,
      title: 'Advanced React Patterns',
      platform: 'Frontend Masters',
      duration: '15 hours',
      difficulty: 'Advanced' as const,
      pricing: 'Freemium' as const,
      url: 'https://frontendmasters.com/courses/advanced-react-patterns',
      isRecommended: true,
    },
  ];

  const filteredCourses = showRecommended 
    ? courses.filter(course => course.isRecommended)
    : courses;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recommended Courses
        </h2>
        <button
          onClick={() => setShowRecommended(!showRecommended)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showRecommended
              ? 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {showRecommended ? 'Show All Courses' : 'Show Recommended Only'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            platform={course.platform}
            duration={course.duration}
            difficulty={course.difficulty}
            pricing={course.pricing}
            url={course.url}
            isRecommended={course.isRecommended}
            className="group"
            onMouseMove={(e) => {
              // Update the mouse position for the hover glow effect
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCardDemo;
