'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const isPageChange = prevPathname !== pathname;

  // Ensure animations only run after component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    return () => {
      setPrevPathname(pathname);
    };
  }, [pathname]);

  // Page load animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + custom * 0.05,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  // Shimmer animation for route changes
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: (custom: any) => ({
      x: '100%',
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  // Cyber glyph overlay component
  const CyberGlyphs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMGgxMDB2MTAwSC0xMDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1IDI1bDUwIDUwTTEwMCAyNXY1MG0tNzUgMGgxMDB2NTAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,_102,_241,_0.03)_0%,_transparent_70%)]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent">
        <CyberGlyphs />
      </div>

      {/* Shimmer effect on route change */}
      <AnimatePresence>
        {isPageChange && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none z-50"
            initial="initial"
            animate="animate"
            variants={shimmerVariants}
            custom={0}
          />
        )}
      </AnimatePresence>

      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="relative z-10 min-h-[calc(100vh-5rem)] pt-20"
          variants={mounted ? containerVariants : {}}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={mounted ? childVariants : {}}
            custom={0}
          >
            {children}
          </motion.div>
        </motion.main>
      </AnimatePresence>

      {/* Subtle animated grid overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik02MCAwSDIwdjYwaDQweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAyMGgyME0yMCA0MGgyME0yMCA2MGgyME02MCAyMGgyME02MCA0MGgyME02MCA2MGgyME0wIDIwaDBNMCA0MGgwTTAgNjBoMCIgc3Ryb2tlPSJyZ2JhKDE2NSwgMTgwLCAyNTIsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-5"></div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
