import { generatePageMetadata } from "@/utils/page-utils";
import RoadmapCard from "@/components/roadmap/RoadmapCard";

export const metadata = generatePageMetadata("Roadmap Card Demo");

export default function RoadmapCardDemo() {
  const learningPath = [
    {
      title: "Master JavaScript Fundamentals",
      duration: "3 weeks",
      description: "Deep dive into JavaScript concepts like closures, promises, async/await, and ES6+ features.",
      isCompleted: true,
    },
    {
      title: "Learn React Core Concepts",
      duration: "4 weeks",
      description: "Understand React components, hooks, context API, and component lifecycle methods.",
      isCompleted: true,
    },
    {
      title: "State Management with Redux",
      duration: "3 weeks",
      description: "Implement Redux for predictable state management in your React applications.",
      stepNumber: 3,
    },
    {
      title: "Advanced React Patterns",
      duration: "3 weeks",
      description: "Explore advanced patterns like render props, higher-order components, and compound components.",
      stepNumber: 4,
    },
    {
      title: "Testing React Applications",
      duration: "2 weeks",
      description: "Write unit and integration tests using Jest and React Testing Library.",
      stepNumber: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
            Learning Path
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow this structured path to master modern web development
          </p>
        </div>
        
        <div className="space-y-6">
          {learningPath.map((step, index) => (
            <RoadmapCard
              key={step.title}
              title={step.title}
              duration={step.duration}
              description={step.description}
              stepNumber={step.stepNumber}
              isCompleted={step.isCompleted}
              className={index % 2 === 0 ? 'ml-auto' : 'mr-auto'}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
