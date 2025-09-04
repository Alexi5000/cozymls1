// Minimal performance utilities for production
export const simplePerformance = {
  // Measure component render time
  measureRender: <T extends any[]>(fn: (...args: T) => void, name?: string) => {
    return (...args: T) => {
      const start = performance.now();
      const result = fn(...args);
      const duration = performance.now() - start;
      
      // Only log in development
      if (process.env.NODE_ENV === 'development' && duration > 16) {
        console.warn(`Slow render: ${name || 'component'} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    };
  },

  // Simple debounce
  debounce: <T extends any[]>(fn: (...args: T) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },

  // Simple throttle  
  throttle: <T extends any[]>(fn: (...args: T) => void, limit: number) => {
    let inThrottle: boolean;
    return (...args: T) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
};