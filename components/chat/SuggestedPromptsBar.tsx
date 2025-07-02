'use client';

import { motion } from 'framer-motion';

type PromptButton = {
  id: string;
  label: string;
  onClick: () => void;
};

type SuggestedPromptsBarProps = {
  prompts: PromptButton[];
  className?: string;
};

const SuggestedPromptsBar = ({ prompts, className = '' }: SuggestedPromptsBarProps) => {
  return (
    <div className={`w-full overflow-x-auto pb-3 ${className}`}>
      <div className="flex space-x-3 px-1 w-max min-w-full">
        {prompts.map((prompt) => (
          <motion.button
            key={prompt.id}
            onClick={prompt.onClick}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="whitespace-nowrap px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-sm font-medium text-white border border-purple-500/30 backdrop-blur-sm
                      hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400/50 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {prompt.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPromptsBar;
