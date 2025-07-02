'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type AIResponseBubbleProps = {
  content: string;
  isTyping?: boolean;
  className?: string;
};

const TypingIndicator = () => (
  <div className="flex space-x-1">
    {[...Array(3)].map((_, i) => (
      <motion.span
        key={i}
        className="inline-block w-2 h-2 bg-purple-400 rounded-full"
        animate={{
          y: ['0%', '-50%', '0%'],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className="rounded-lg overflow-hidden my-2">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-700/50 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  p: ({ node, ...props }: any) => <p className="mb-3 last:mb-0" {...props} />,
  h1: ({ node, ...props }: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h2: ({ node, ...props }: any) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  h3: ({ node, ...props }: any) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
  li: ({ node, ...props }: any) => <li className="mb-1" {...props} />,
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="border-l-4 border-purple-500 pl-4 italic my-3 text-gray-300"
      {...props}
    />
  ),
  a: ({ node, ...props }: any) => (
    <a
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-semibold text-purple-300" {...props} />
  ),
  em: ({ node, ...props }: any) => <em className="italic" {...props} />,
};

const AIResponseBubble = ({
  content,
  isTyping = false,
  className = '',
}: AIResponseBubbleProps) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (isTyping) {
      setDisplayedContent('');
      setIsTypingComplete(false);
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < content.length) {
          setDisplayedContent((prev) => prev + content.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedContent(content);
      setIsTypingComplete(true);
    }
  }, [content, isTyping]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative max-w-[85%] w-fit rounded-2xl px-4 py-3 text-sm ${
          isTypingComplete
            ? 'bg-gray-800/80 backdrop-blur-sm border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
            : 'bg-gray-800/50 border border-purple-500/10'
        } ${className}`}
      >
        <div className="prose prose-invert max-w-none prose-sm">
          <ReactMarkdown components={MarkdownComponents}>
            {displayedContent}
          </ReactMarkdown>
        </div>
        
        {!isTypingComplete && (
          <motion.div
            className="absolute -bottom-2 right-4 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700/50"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none -z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIResponseBubble;
