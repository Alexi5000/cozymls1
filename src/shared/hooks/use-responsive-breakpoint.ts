import * as React from "react";

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsiveBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<Breakpoint>('lg');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const isBreakpoint = React.useCallback((bp: Breakpoint) => {
    return currentBreakpoint === bp;
  }, [currentBreakpoint]);

  const isAboveBreakpoint = React.useCallback((bp: Breakpoint) => {
    return breakpoints[currentBreakpoint] >= breakpoints[bp];
  }, [currentBreakpoint]);

  const isBelowBreakpoint = React.useCallback((bp: Breakpoint) => {
    return breakpoints[currentBreakpoint] < breakpoints[bp];
  }, [currentBreakpoint]);

  return {
    currentBreakpoint,
    isBreakpoint,
    isAboveBreakpoint,
    isBelowBreakpoint,
    isMobile: isBelowBreakpoint('md'),
    isTablet: isBreakpoint('md'),
    isDesktop: isAboveBreakpoint('lg'),
  };
}