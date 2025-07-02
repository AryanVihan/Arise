'use client';

import { useState } from 'react';
import { FiSearch, FiX, FiChevronDown, FiChevronUp, FiBookOpen, FiCode, FiServer, FiCpu, FiShield, FiSmartphone } from 'react-icons/fi';

type LearningGoal = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const learningGoals: LearningGoal[] = [
  {
    id: 'react',
    title: 'Learn React',
    icon: <FiCode className="w-4 h-4" />,
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: <FiServer className="w-4 h-4" />,
  },
  {
    id: 'fullstack',
    title: 'Full Stack',
    icon: <FiCode className="w-4 h-4" />,
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    icon: <FiCpu className="w-4 h-4" />,
  },
  {
    id: 'cyber',
    title: 'Security',
    icon: <FiShield className="w-4 h-4" />,
  },
  {
    id: 'mobile',
    title: 'Mobile Dev',
    icon: <FiSmartphone className="w-4 h-4" />,
  },
];

export default function CompactGoalSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);

  const filteredGoals = learningGoals.filter(goal =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleSelect = (goal: LearningGoal) => {
    setSelectedGoal(goal);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSelection = () => {
    setSelectedGoal(null);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Learning Goals</h3>
      <div className="relative">
        {!selectedGoal ? (
          <button
            onClick={toggleDropdown}
            className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <span className="flex items-center">
              <FiBookOpen className="mr-3 h-5 w-5 text-cyan-400" />
              <span>Select Goal</span>
            </span>
            {isOpen ? (
              <FiChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <FiChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between px-3 py-2 bg-gray-800/50 rounded-lg">
            <div className="flex items-center">
              <span className="text-cyan-400 mr-2">{selectedGoal.icon}</span>
              <span className="text-sm font-medium text-gray-200 truncate">
                {selectedGoal.title}
              </span>
            </div>
            <button
              onClick={clearSelection}
              className="text-gray-400 hover:text-white"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        )}

        {isOpen && (
          <div className="absolute bottom-full mb-1 w-full bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10 overflow-hidden">
            <div className="p-2 border-b border-gray-700">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-gray-900 text-sm text-white rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="Search goals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredGoals.length > 0 ? (
                filteredGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleSelect(goal)}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-left text-gray-200 hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-cyan-400 mr-3">{goal.icon}</span>
                    {goal.title}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">
                  No goals found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedGoal && (
        <div className="mt-3">
          <button className="w-full flex items-center justify-center px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
            View Learning Path
          </button>
        </div>
      )}
    </div>
  );
}
