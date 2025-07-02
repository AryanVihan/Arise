'use client';

import { useState, useEffect, Fragment, useRef, useCallback } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { Menu, Transition } from '@headlessui/react';

type NavLink = {
  name: string;
  href: string;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks: NavLink[] = [
    { name: 'DASHBOARD', href: '/dashboard' },
    { name: 'INTERVIEW', href: '/interview' },
    { name: 'RESUME ANALYZER', href: '/resume-analyzer' },
    { name: 'COVER LETTER', href: '/cover-letter' },
    { name: 'CHAT AGENT', href: '/chat-agent' },
    { name: 'ROADMAP', href: '/roadmap' },
    { name: 'FEEDBACK', href: '/feedback' },
  ];
  
  // Get current path for active link highlighting
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const userNavigation = [
    { name: 'Profile', icon: FiUser, href: '#' },
    { name: 'Settings', icon: FiSettings, href: '#' },
    { name: 'Sign out', icon: FiLogOut, href: '#', className: 'text-red-400' },
  ];

  return (
    <div className="fixed top-0 w-full z-50" ref={navRef}>
      <nav className={`w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/10' 
          : 'bg-gradient-to-b from-gray-900 to-gray-900/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
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
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent font-mono tracking-wider">
                  A.R.I.S.E.
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300 group-hover:duration-300"></div>
                    <Link
                      href={link.href}
                      className="relative px-4 py-2 bg-gray-900 rounded-lg flex items-center text-sm font-mono font-medium tracking-wider text-gray-300 group-hover:text-cyan-200 transition-all duration-300 border border-gray-800 group-hover:border-cyan-500/30"
                    >
                      <span className="text-cyan-400 mr-1">/</span>
                      <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-300">
                        {link.name}
                      </span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button 
                      className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-900/80 to-gray-900 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 focus:outline-none"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <svg 
                        className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" 
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
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    show={isProfileOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items 
                      className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-900/95 backdrop-blur-sm border border-cyan-500/20 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      {navLinks.map((item) => {
                      const isActive = currentPath === item.href;
                      const isChatAgent = item.name === 'CHAT AGENT';
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                            isActive
                              ? isChatAgent
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-gray-800 text-white'
                              : isChatAgent
                              ? 'bg-gradient-to-r from-purple-600/70 to-blue-600/70 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:shadow-purple-500/20'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          {item.name}
                          {isChatAgent && (
                            <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-white/20 rounded-full">
                              NEW
                            </span>
                          )}
                        </Link>
                      );
                    })}
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                            item.className
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div 
            className="md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm border-t border-cyan-500/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-md text-base font-mono tracking-wider text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors duration-200 border border-transparent hover:border-cyan-500/20`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-cyan-400 mr-2">›</span>
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-cyan-500/10 mt-2">
                <div className="flex items-center px-4 py-2">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse"></div>
                      <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-900/80 to-gray-900 border border-cyan-500/30">
                        <svg 
                          className="w-5 h-5 text-cyan-400" 
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
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-cyan-400">AI Assistant</div>
                    <div className="text-xs text-gray-400">Connected</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  {navLinks.map((item) => {
                    const isActive = currentPath === item.href;
                    const isChatAgent = item.name === 'CHAT AGENT';
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          isActive
                            ? isChatAgent
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                              : 'text-white bg-gray-900'
                            : isChatAgent
                            ? 'bg-gradient-to-r from-purple-600/70 to-blue-600/70 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:shadow-purple-500/20'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {item.name}
                        {isChatAgent && (
                          <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-white/20 rounded-full">
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        item.className
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;