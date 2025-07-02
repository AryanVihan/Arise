'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import AIResponseBubble from './AIResponseBubble';

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
};

type ChatWindowProps = {
  messages: Message[];
  className?: string;
};

const ChatWindow = ({ messages, className = '' }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {message.isUser ? (
                <motion.div
                  className="max-w-[85%] rounded-2xl px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-80 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </motion.div>
              ) : (
                <AIResponseBubble
                  content={message.content}
                  isTyping={message.isTyping}
                  className={index === messages.length - 1 ? 'mb-2' : ''}
                />
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatWindow;
