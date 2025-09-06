import { useCallback } from 'react';

// Simplified performance hook for instant loading
export function useInstantPerformance() {
  // Simple debounce without heavy performance tracking
  const debounce = useCallback(<T extends any[]>(
    fn: (...args: T) => void,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }, []);

  // Simple throttle without metrics
  const throttle = useCallback(<T extends any[]>(
    fn: (...args: T) => void,
    limit: number
  ) => {
    let inThrottle: boolean;
    return (...args: T) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  return {
    debounce,
    throttle,
    // Remove all complex performance monitoring
    renderCount: 0,
    measureFunction: (fn: any) => fn, // No-op wrapper
  };
}