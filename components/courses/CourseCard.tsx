import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiExternalLink, FiClock, FiAward, FiDollarSign } from 'react-icons/fi';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type PricingType = 'Free' | 'Paid' | 'Freemium';

interface CourseCardProps {
  title: string;
  platform: string;
  duration: string;
  difficulty: Difficulty;
  pricing: PricingType;
  url: string;
  isRecommended?: boolean;
  className?: string;
}

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-purple-100 text-purple-800',
};

const pricingColors = {
  Free: 'bg-emerald-100 text-emerald-800',
  Paid: 'bg-amber-100 text-amber-800',
  Freemium: 'bg-blue-100 text-blue-800',
};

const CourseCard = ({
  title,
  platform,
  duration,
  difficulty,
  pricing,
  url,
  isRecommended = false,
  className = '',
}: CourseCardProps) => {
  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Recommended Ribbon */}
      {isRecommended && (
        <div className="absolute -right-8 top-6 transform rotate-45 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold px-8 py-1 shadow-lg">
          Recommended
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{platform}</p>
          </div>
          
          {isRecommended && (
            <div className="flex-shrink-0 ml-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pricingColors[pricing]}`}>
            {pricing}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="mr-1.5 h-4 w-4" />
            {duration}
          </div>
          
          {isRecommended && (
            <div className="flex items-center text-xs text-amber-500">
              <FiAward className="mr-1 h-3.5 w-3.5" />
              Top Pick
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200"
          >
            View Course
            <FiExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
           style={{
             background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(14, 165, 233, 0.1), transparent 40%)',
           }}
      />
    </motion.div>
  );
};

export default CourseCard;
