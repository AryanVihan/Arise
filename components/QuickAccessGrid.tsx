'use client';

import { FiMic, FiFileText, FiMap, FiMessageSquare } from 'react-icons/fi';
import { QuickAccessCard } from './QuickAccessCard';

export function QuickAccessGrid() {
  const quickLinks = [
    {
      title: 'Start Interview',
      description: 'Practice with AI-powered mock interviews',
      icon: <FiMic />,
      href: '/interview',
      color: 'cyan' as const,
    },
    {
      title: 'Analyze Resume',
      description: 'Get feedback on your resume',
      icon: <FiFileText />,
      href: '/resume-analyzer',
      color: 'purple' as const,
    },
    {
      title: 'Generate Roadmap',
      description: 'Create a personalized career path',
      icon: <FiMap />,
      href: '/roadmap',
      color: 'pink' as const,
    },
    {
      title: 'Chat Agent',
      description: 'Get instant career advice',
      icon: <FiMessageSquare />,
      href: '/chat-agent',
      color: 'yellow' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {quickLinks.map((link, index) => (
        <QuickAccessCard
          key={link.title}
          title={link.title}
          description={link.description}
          icon={link.icon}
          href={link.href}
          color={link.color}
          delay={0.1 * index}
        />
      ))}
    </div>
  );
}
