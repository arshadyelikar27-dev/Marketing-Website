import { useState, useEffect } from 'react';

// Define standard breakpoints
const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
};

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Create matchMedia instances
    const mobileQuery = window.matchMedia(BREAKPOINTS.mobile);
    const tabletQuery = window.matchMedia(BREAKPOINTS.tablet);
    const desktopQuery = window.matchMedia(BREAKPOINTS.desktop);

    // Update state function
    const updateSize = () => {
      setScreenSize({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
      });
    };

    // Initial check
    updateSize();

    // The 'change' event on matchMedia only fires when the breakpoint is CROSSED.
    // This is extremely performant compared to listening to 'resize' on the window,
    // guaranteeing NO LAG during window resizing.
    mobileQuery.addEventListener('change', updateSize);
    tabletQuery.addEventListener('change', updateSize);
    desktopQuery.addEventListener('change', updateSize);

    return () => {
      mobileQuery.removeEventListener('change', updateSize);
      tabletQuery.removeEventListener('change', updateSize);
      desktopQuery.removeEventListener('change', updateSize);
    };
  }, []);

  return screenSize;
}
