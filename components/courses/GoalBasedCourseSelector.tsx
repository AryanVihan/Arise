'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';

type LearningGoal = {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  icon: string;
};

const learningGoals: LearningGoal[] = [
  {
    id: 'react',
    title: 'Learn React',
    description: 'Master the React library for building modern web applications',
    category: 'Frontend',
    color: 'from-cyan-400 to-blue-500',
    icon: '⚛️',
  },
  {
    id: 'devops',
    title: 'Become DevOps Engineer',
    description: 'Learn CI/CD, Docker, Kubernetes and cloud infrastructure',
    category: 'DevOps',
    color: 'from-emerald-400 to-green-500',
    icon: '🛠️',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Master both frontend and backend development',
    category: 'Full Stack',
    color: 'from-purple-400 to-indigo-500',
    icon: '💻',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Dive into artificial intelligence and machine learning',
    category: 'AI/ML',
    color: 'from-pink-400 to-rose-500',
    icon: '🧠',
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Learn to secure applications and infrastructure',
    category: 'Security',
    color: 'from-amber-400 to-orange-500',
    icon: '🔒',
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Build cross-platform mobile applications',
    category: 'Mobile',
    color: 'from-blue-400 to-indigo-500',
    icon: '📱',
  },
];

const categories = ['All', ...new Set(learningGoals.map(goal => goal.category))];

interface GoalBasedCourseSelectorProps {
  onGoalSelect?: (goal: string) => void;
}

export const GoalBasedCourseSelector: React.FC<GoalBasedCourseSelectorProps> = ({ onGoalSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);

  const filteredGoals = useMemo(() => {
    return learningGoals.filter(goal => {
      const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || goal.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleGoalSelect = (goal: LearningGoal) => {
    setSelectedGoal(goal);
    if (onGoalSelect) {
      onGoalSelect(goal.title);
    }
  };

  const clearSelection = () => {
    setSelectedGoal(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          What do you want to learn today?
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select a learning goal and we'll create a personalized learning path just for you
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            placeholder="Search learning goals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-500 hover:text-white transition-colors" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedGoal ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 mb-3">
                    {selectedGoal.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedGoal.title}</h2>
                  <p className="text-gray-300">{selectedGoal.description}</p>
                </div>
                <button
                  onClick={clearSelection}
                  className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                  aria-label="Close"
                >
                  <FiX className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center">
                  Start Learning Path
                  <FiArrowRight className="ml-2" />
                </button>
                <button className="px-6 py-3 bg-gray-700/50 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  Explore Courses
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGoals.map((goal) => (
              <motion.div
                key={goal.id}
                layoutId={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${goal.color} cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-${goal.color.split(' ')[0]}/20`}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{goal.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{goal.title}</h3>
                  <p className="text-gray-200 text-sm">{goal.description}</p>
                  <div className="mt-4 flex items-center text-sm text-cyan-200 group-hover:text-white transition-colors">
                    Start learning
                    <FiArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
