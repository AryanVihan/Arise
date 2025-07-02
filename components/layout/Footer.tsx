'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, MessageSquare, Info, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Privacy', href: '/privacy', icon: <Shield className="w-4 h-4" /> },
    { 
      name: 'GitHub', 
      href: 'https://github.com/yourusername/arise', 
      icon: <Github className="w-4 h-4" />,
      external: true 
    },
    { 
      name: 'Discord', 
      href: 'https://discord.gg/yourinvite', 
      icon: <MessageSquare className="w-4 h-4" />,
      external: true 
    },
  ];

  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50 mt-24">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or brand */}
          <div className="flex items-center mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-80 transition-opacity">
              A.R.I.S.E.
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {links.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Copyright and tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {currentYear} A.R.I.S.E. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 italic">
            Built by the egoists, for the egoists. Open-source. Ever-evolving.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
    </footer>
  );
}
