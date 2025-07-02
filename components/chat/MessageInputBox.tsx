'use client';

import { forwardRef, useState, KeyboardEvent, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Send } from 'lucide-react';

type MessageInputBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileUpload?: (file: File) => void;
  className?: string;
  placeholder?: string;
};

const MessageInputBox = forwardRef<HTMLTextAreaElement, MessageInputBoxProps>(
  ({ value, onChange, onSend, onFileUpload, className = '', placeholder = 'Type your message...' }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileUpload) {
        onFileUpload(file);
      }
      // Reset the input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    return (
      <div className={`relative ${className}`}>
        <div className="relative flex items-end gap-2">
          {/* File Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-gray-700/50"
            aria-label="Upload file"
          >
            <Paperclip className="w-5 h-5" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              aria-hidden="true"
            />
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <AnimatePresence>
              {!value && !isFocused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center pl-4 pointer-events-none text-gray-400"
                >
                  {placeholder}
                </motion.div>
              )}
            </AnimatePresence>
            <textarea
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full bg-gray-800 text-white rounded-xl pl-4 pr-12 py-3 resize-none focus:outline-none min-h-[48px] max-h-32 overflow-y-auto ${
                isFocused ? 'ring-2 ring-cyan-500/50' : ''
              } transition-all duration-200`}
              rows={1}
              style={{
                boxShadow: isFocused ? '0 0 0 1px rgba(34, 211, 238, 0.5)' : 'none',
              }}
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={onSend}
            disabled={!value.trim()}
            className={`p-2 rounded-full ${
              value.trim()
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            } transition-all duration-200`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Glow effect */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-xl rounded-xl"
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);

MessageInputBox.displayName = 'MessageInputBox';

export default MessageInputBox;
