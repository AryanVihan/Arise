import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * A custom hook that tracks the window size and provides responsive breakpoints
 * @returns An object containing window dimensions and breakpoint flags
 */
function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return;
    }

    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth;
      const isMobile = width < 640; // sm breakpoint
      const isTablet = width >= 640 && width < 1024; // sm to lg breakpoint
      const isDesktop = width >= 1024; // lg breakpoint and up

      setWindowSize({
        width,
        height: window.innerHeight,
        isMobile,
        isTablet,
        isDesktop,
      });
    }

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
