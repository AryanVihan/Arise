'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const ChatWindow = dynamic(() => import('@/components/chat/ChatWindow'), { ssr: false });
const MessageInputBox = dynamic(() => import('@/components/chat/MessageInputBox'), { ssr: false });
const SuggestedPromptsBar = dynamic(() => import('@/components/chat/SuggestedPromptsBar'), { ssr: false });

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    // Add typing indicator
    const typingIndicator: Message = {
      id: 'typing-' + Date.now(),
      content: '',
      isUser: false,
      isTyping: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, typingIndicator]);
    setInputValue('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${inputValue}". This is a simulated response.\n\nHere's some **Markdown** examples:\n- Bullet points\n- _Italic_ and **bold** text\n- [Links](https://example.com)\n\n\`\`\`javascript\n// Code blocks\nfunction hello() {\n  console.log('Hello, world!');\n}\n\`\`\``,
        isUser: false,
        isTyping: false,
        timestamp: new Date(),
      };
      
      // Remove typing indicator and add AI response
      setMessages((prev) => {
        const newMessages = prev.filter(msg => !msg.id.startsWith('typing-'));
        return [...newMessages, aiResponse];
      });
    }, 1500);
  };

  const handleFileUpload = (file: File) => {
    // Handle file upload logic here
    console.log('File uploaded:', file.name);
    
    // Add a message about the uploaded file
    const fileMessage: Message = {
      id: `file-${Date.now()}`,
      content: `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, fileMessage]);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    // Auto-focus the input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const suggestedPrompts = [
    {
      id: 'mock-interview',
      label: '💼 Mock Interview',
      onClick: () => handleQuickPrompt('Can we do a mock interview for a frontend developer position?')
    },
    {
      id: 'resume-tips',
      label: '📄 Resume Tips',
      onClick: () => handleQuickPrompt('Can you review my resume and suggest improvements?')
    },
    {
      id: 'career-advice',
      label: '🎯 Career Advice',
      onClick: () => handleQuickPrompt('What are the most in-demand skills for a senior developer in 2023?')
    },
    {
      id: 'code-review',
      label: '👨‍💻 Code Review',
      onClick: () => handleQuickPrompt('Can you review this code for best practices?')
    },
    {
      id: 'salary-negotiation',
      label: '💰 Salary Negotiation',
      onClick: () => handleQuickPrompt('How should I negotiate my salary for a new job offer?')
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            AI Career Assistant
          </h1>
          <p className="text-gray-400">Ask me anything about your career development</p>
        </header>

        <div className="flex-1 overflow-hidden mb-4">
          <ChatWindow messages={messages} className="h-full" />
        </div>

        <div className="space-y-3">
          <SuggestedPromptsBar prompts={suggestedPrompts} className="px-1" />
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50">
            <MessageInputBox
              ref={inputRef}
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              onFileUpload={handleFileUpload}
              placeholder="Type your message..."
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
