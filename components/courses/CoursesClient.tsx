'use client';

import dynamic from 'next/dynamic';

// Import with SSR disabled since this is a client component
const GoalBasedCourseSelector = dynamic(
  () => import('./GoalBasedCourseSelector'),
  { ssr: false }
);

export default function CoursesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <GoalBasedCourseSelector />
    </div>
  );
}
