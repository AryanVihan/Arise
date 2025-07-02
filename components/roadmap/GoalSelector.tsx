'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCode, FaDatabase, FaMobile, FaRobot, FaLaptopCode } from 'react-icons/fa';

type Role = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
};

const roles: Role[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: <FaCode className="w-8 h-8" />,
    description: 'Build beautiful and responsive user interfaces',
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: <FaDatabase className="w-8 h-8" />,
    description: 'Develop robust server-side applications and APIs',
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    icon: <FaMobile className="w-8 h-8" />,
    description: 'Create cross-platform mobile applications',
  },
  {
    id: 'data-science',
    title: 'Data Scientist',
    icon: <FaRobot className="w-8 h-8" />,
    description: 'Extract insights from complex data',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: <FaLaptopCode className="w-8 h-8" />,
    description: 'Handle both frontend and backend development',
  },
];

export default function GoalSelector() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Choose Your Career Path
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              selectedRole === role.id
                ? 'border-blue-500 bg-gradient-to-br from-blue-900/20 to-purple-900/20'
                : 'border-gray-700 hover:border-blue-400/50 bg-gray-800/50'
            }`}
            onClick={() => setSelectedRole(role.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedRole === role.id && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-blue-500/20 -z-10"
                layoutId="selectedRole"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-blue-500/10 text-blue-400">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-gray-400 text-sm">{role.description}</p>
            </div>
            {selectedRole === role.id && (
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      {selectedRole && (
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Get Started with {roles.find(r => r.id === selectedRole)?.title}
          </button>
        </motion.div>
      )}
    </div>
  );
}
