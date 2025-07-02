'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const isPageChange = prevPathname.current !== pathname;

  // Update previous pathname on route change
  useEffect(() => {
    prevPathname.current = pathname;
  }, [pathname]);

  // Cyber glyph overlay component
  const CyberGlyphs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMGgxMDB2MTAwSC0xMDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1IDI1bDUwIDUwTTEwMCAyNXY1MG0tNzUgMGgxMDB2NTAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,_102,_241,_0.03)_0%,_transparent_70%)]"></div>
    </div>
  );

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: (custom: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
    exit: (custom: any) => ({
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1] as const,
      },
    }),
  };

  // Shimmer animation for route changes
  const shimmerVariants = {
    initial: {
      x: '-100%',
    },
    animate: (custom: any) => ({
      x: '100%',
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

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
            onAnimationEnd={() => {
              // Reset the flag after animation completes
              // We use a small timeout to ensure the animation completes
              setTimeout(() => {
                // This will be handled by the next render cycle
              }, 100);
            }}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-5rem)] pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="max-w-7xl mx-auto px-6 w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Subtle animated grid overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik02MCAwSDIwdjYwaDQweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAyMGgyME0yMCA0MGgyME0yMCA2MGgyME02MCAyMGgyME02MCA0MGgyME02MCA2MGgyME0wIDIwaDBNMCA0MGgwTTAgNjBoMCIgc3Ryb2tlPSJyZ2JhKDE2NSwgMTgwLCAyNTIsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-5"></div>
      </div>
    </div>
  );
};

export default Layout;
