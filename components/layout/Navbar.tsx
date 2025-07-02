'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiBook } from 'react-icons/fi';
import Sidebar from './Sidebar';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed top-0 w-full z-50" ref={navRef}>
      <nav className={`w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/10' 
          : 'bg-gradient-to-b from-gray-900 to-gray-900/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={onMenuClick}
                className="mr-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 md:hidden"
                aria-label="Toggle sidebar"
              >
                <span className="sr-only">Open main menu</span>
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              </button>
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 group-hover:duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                    <svg 
                      className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M19 12a9 9 0 0 1-11 6.5m-4.5-14.5a9 9 0 0 1 6.5-2.5" />
                      <path d="M12 2v4" />
                      <path d="m2 2 20 20" className="group-hover:opacity-0 transition-opacity duration-300" />
                    </svg>
                  </div>
                </div>
                <span className="ml-3 text-xl font-bold bg-cyan-400 bg-clip-text text-transparent font-mono tracking-wider">
                  A.R.I.S.E.
                </span>
              </Link>
            </div>

            {/* Mobile menu */}
            <div className={`fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-40 transform ${false ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
              <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 border-r border-gray-800 z-50 overflow-y-auto">
                <div className="pt-5 pb-4 px-4">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center group" onClick={onMenuClick}>
                      <div className="relative">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-cyan-500/30">
                          <svg 
                            className="w-6 h-6 text-cyan-400" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M19 12a9 9 0 0 1-11 6.5m-4.5-14.5a9 9 0 0 1 6.5-2.5" />
                            <path d="M12 2v4" />
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 text-lg font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent font-mono tracking-wider">
                        A.R.I.S.E.
                      </span>
                    </Link>
                    <button
                      onClick={onMenuClick}
                      className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
                      aria-label="Close sidebar"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'DASHBOARD', href: '/dashboard' },
                      { name: 'INTERVIEW', href: '/interview' },
                      { name: 'RESUME ANALYZER', href: '/resume-analyzer' },
                      { name: 'COVER LETTER', href: '/cover-letter' },
                      { name: 'CHAT AGENT', href: '/chat-agent' },
                      { name: 'ROADMAP', href: '/roadmap' },
                      { name: 'COURSE GENERATOR', href: '/course-generator', icon: FiBook },
                      { name: 'FEEDBACK', href: '/feedback' },
                    ].map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block py-2 pr-4 pl-3 text-base text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                      >
                        {link.icon && <link.icon className="mr-4 h-6 w-6" />}
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar Toggle - Removed */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;