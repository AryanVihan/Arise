'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiEdit2, FiDownload, FiCheck, FiFileText, FiFile } from 'react-icons/fi';
import Toast from '../ui/Toast';

interface CoverLetterPreviewProps {
  content: string;
  onEdit: () => void;
  isGenerating?: boolean;
}

export default function CoverLetterPreview({ content, onEdit, isGenerating = false }: CoverLetterPreviewProps) {
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'info'; isVisible: boolean}>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const [displayedContent, setDisplayedContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Typewriter effect
  useEffect(() => {
    if (!content) return;
    
    let currentIndex = 0;
    setDisplayedContent('');
    
    const intervalId = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedContent(prev => prev + content[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 10); // Adjust typing speed here

    return () => clearInterval(intervalId);
  }, [content]);

  const copyToClipboard = async () => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const downloadFile = (format: 'txt' | 'pdf') => {
    if (!content) return;
    
    try {
      if (format === 'txt') {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'cover-letter.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showToast('Downloaded as TXT!', 'success');
      } else {
        // For PDF, we'll create a basic implementation
        // In a real app, you might want to use a library like jspdf or html2pdf
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'application/pdf' });
        element.href = URL.createObjectURL(file);
        element.download = 'cover-letter.pdf';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showToast('Downloaded as PDF!', 'success');
      }
    } catch (err) {
      console.error('Download failed:', err);
      showToast('Download failed', 'error');
    }
  };

  // Format content with proper line breaks
  const formattedContent = displayedContent.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Floating Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-5 right-4 flex space-x-3 z-10"
      >
        {/* Copy Button */}
        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3 rounded-xl bg-gray-800/80 backdrop-blur-md border border-cyan-400/30 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center space-x-2">
            <FiCopy className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-cyan-100 group-hover:text-white transition-colors">
              Copy
            </span>
          </div>
          <div className="absolute inset-0 rounded-xl border border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
        
        {/* Download TXT Button */}
        <motion.button
          onClick={() => downloadFile('txt')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3 rounded-xl bg-gray-800/80 backdrop-blur-md border border-purple-400/30 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center space-x-2">
            <FiFileText className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-purple-100 group-hover:text-white transition-colors">
              TXT
            </span>
          </div>
          <div className="absolute inset-0 rounded-xl border border-purple-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
        
        {/* Download PDF Button */}
        <motion.button
          onClick={() => downloadFile('pdf')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3 rounded-xl bg-gray-800/80 backdrop-blur-md border border-red-400/30 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center space-x-2">
            <FiFile className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-red-100 group-hover:text-white transition-colors">
              PDF
            </span>
          </div>
          <div className="absolute inset-0 rounded-xl border border-red-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
        
        {/* Edit Button */}
        <motion.button
          onClick={onEdit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3 rounded-xl bg-gray-800/80 backdrop-blur-md border border-blue-400/30 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center space-x-2">
            <FiEdit2 className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-blue-100 group-hover:text-white transition-colors">
              Edit
            </span>
          </div>
          <div className="absolute inset-0 rounded-xl border border-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>
      
      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        type={toast.type} 
      />

      {/* Preview Card */}
      <div 
        ref={contentRef}
        className={`
          relative bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 pt-12 pb-16
          border border-blue-400/30 shadow-2xl shadow-blue-500/10
          font-mono text-gray-200 text-sm leading-relaxed whitespace-pre-wrap
          min-h-[500px] max-h-[80vh] overflow-y-auto
          ${isGenerating ? 'animate-pulse' : ''}
        `}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400 py-8"
            >
              Generating your cover letter...
            </motion.div>
          ) : content ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-serif"
            >
              {formattedContent}
              <motion.span 
                className="inline-block w-2 h-6 bg-blue-400/80 ml-1 -mb-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-center text-gray-500 py-12"
            >
              Your generated cover letter will appear here
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
