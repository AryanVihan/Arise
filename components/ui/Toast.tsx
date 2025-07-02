'use client';

import { motion, AnimatePresence } from 'framer-motion';

type ToastProps = {
  message: string;
  isVisible: boolean;
  type?: 'success' | 'error' | 'info';
};

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500/90 text-white';
    case 'error':
      return 'bg-red-500/90 text-white';
    default:
      return 'bg-blue-500/90 text-white';
  }
};

export default function Toast({ message, isVisible, type = 'info' }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl ${getTypeStyles(
            type
          )} backdrop-blur-sm z-50 flex items-center space-x-2`}
        >
          <div className="flex items-center">
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
