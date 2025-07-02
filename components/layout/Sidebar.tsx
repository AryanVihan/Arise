'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiMessageSquare, 
  FiFileText, 
  FiMail, 
  FiMessageCircle, 
  FiMap, 
  FiBook, 
  FiMessageSquare as FiFeedback 
} from 'react-icons/fi';


type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const Sidebar = () => {
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { name: 'DASHBOARD', href: '/dashboard', icon: FiHome },
    { name: 'INTERVIEW', href: '/interview', icon: FiMessageSquare },
    { name: 'RESUME ANALYZER', href: '/resume-analyzer', icon: FiFileText },
    { name: 'COVER LETTER', href: '/cover-letter', icon: FiMail },
    { name: 'CHAT AGENT', href: '/chat-agent', icon: FiMessageCircle },
    { name: 'ROADMAP', href: '/roadmap', icon: FiMap },
    { name: 'COURSE GENERATOR', href: '/course-generator', icon: FiBook },
    { name: 'FEEDBACK', href: '/feedback', icon: FiFeedback },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-800 bg-gray-900/95 backdrop-blur-sm h-screen sticky top-0">
        <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1 mb-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const isChatAgent = item.name === 'CHAT AGENT';
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-800 text-cyan-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-300'
                  }`}
                >
                  <item.icon 
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-300'
                    }`} 
                    aria-hidden="true" 
                  />
                  <span className="font-mono text-xs tracking-wider">
                    {item.name}
                  </span>
                  {isChatAgent && (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300">
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-900/80 to-gray-900 border border-cyan-500/30 flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-cyan-400" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200">User Name</p>
              <Link href="#" className="text-xs font-medium text-cyan-400 hover:text-cyan-300">
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
