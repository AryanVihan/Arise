'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState, useMemo, Suspense, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Lazy load heavy components
const Navbar = dynamic(() => import('./Navbar'), { 
  ssr: false,
  loading: () => (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-sm z-40 border-b border-gray-800 flex items-center px-6">
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded-full bg-gray-700/50" />
        <div className="h-6 w-24 bg-gray-700/50 rounded" />
      </div>
      <div className="flex-1 flex justify-end space-x-4">
        <div className="h-8 w-8 rounded-full bg-gray-700/50" />
        <div className="h-8 w-24 bg-gray-700/50 rounded" />
      </div>
    </header>
  )
});

interface LayoutWrapperProps {
  children: ReactNode;
}

// Memoize the component to prevent unnecessary re-renders
const LayoutWrapper = memo(({ children }: LayoutWrapperProps) => {
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

  // Memoize animation variants to prevent recreation on each render
  const containerVariants = useMemo(() => ({
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
  }), []);

  const childVariants = useMemo(() => ({
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
  }), []);

  // Memoize shimmer animation variants
  const shimmerVariants = useMemo(() => ({
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }), []);

  // Memoize the CyberGlyphs component to prevent re-renders
  const CyberGlyphs = useMemo(() => {
    const bgSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMGgxMDB2MTAwSC0xMDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1IDI1bDUwIDUwTTEwMCAyNXY1MG0tNzUgMGgxMDB2NTAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=';
    
    return function CyberGlyphs() {
      return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url('${bgSvg}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,_102,_241,_0.03)_0%,_transparent_70%)]" />
        </div>
      );
    };
  }, []);

  // Prefetch high-priority routes
  const router = useRouter();
  useEffect(() => {
    const highPriorityRoutes = ['/dashboard', '/interview', '/profile'];
    highPriorityRoutes.forEach(route => {
      router.prefetch(route);
    });
  }, [router]);

  // Memoize the main content to prevent unnecessary re-renders
  const mainContent = useMemo(() => (
    <motion.main
      key={pathname}
      className="relative z-10 min-h-[calc(100vh-5rem)] pt-20"
      variants={mounted ? containerVariants : {}}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      exit="hidden"
      custom={0}
    >
      {children}
    </motion.main>
  ), [children, containerVariants, mounted, pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#111827" />
      </Head>
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
            />
          )}
        </AnimatePresence>

        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        
        <AnimatePresence mode="wait" initial={false}>
          {mainContent}
        </AnimatePresence>

        {/* Subtle animated grid overlay */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik02MCAwSDIwdjYwaDQweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAyMGgyME0yMCA0MGgyME0yMCA2MGgyME02MCAyMGgyME02MCA0MGgyME02MCA2MGgyME0wIDIwaDBNMCA0MGgwTTAgNjBoMCIgc3Ryb2tlPSJyZ2JhKDE2NSwgMTgwLCAyNTIsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-5"></div>
        </div>
      </div>
    </>
  );
});

// Add display name for better debugging
LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;
