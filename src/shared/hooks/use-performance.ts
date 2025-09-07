import { useCallback } from 'react';

// No-op performance monitor for instant loading
export function usePerformanceMonitor(componentName: string) {
  const measureFunction = useCallback(<T extends any[], R>(
    fn: (...args: T) => R,
    functionName: string
  ) => {
    return fn; // No-op wrapper for instant performance
  }, []);

  return { 
    measureFunction, 
    renderCount: 0 // No tracking for instant performance
  };
}

// No-op intersection observer for instant loading
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  return { current: null }; // No-op ref for instant loading
}

// Simplified performance utilities for instant loading
export const performanceUtils = {
  // Simple debounce without tracking
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Simple throttle without tracking
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // No-op measure render for instant loading
  measureRender: (componentName: string, renderFn: () => void) => {
    renderFn(); // Just execute without measurement
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  },

  // Simple device capabilities
  getDeviceCapabilities: () => ({
    hardwareConcurrency: 4,
    deviceMemory: 4,
    connection: null,
  }),
};