// Simplified mobile performance for instant loading

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  scrollPerformance: number;
}

export interface MobilePerformanceOptions {
  enableVirtualization?: boolean;
  enableImageLazyLoading?: boolean;
  enableComponentLazyLoading?: boolean;
  debounceScrollEvents?: boolean;
  optimizeAnimations?: boolean;
  enableIntersectionObserver?: boolean;
}

// Simplified mobile performance for instant loading
export function useMobilePerformance(options: MobilePerformanceOptions = {}) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  
  return {
    isMobileOptimized: isMobile,
    metrics: {
      loadTime: 0,
      renderTime: 0,
      interactionTime: 0,
      scrollPerformance: 0,
    } as PerformanceMetrics,
    shouldUseVirtualization: false, // Disabled for instant loading
    shouldLazyLoadImages: false, // Disabled for instant loading
    shouldOptimizeAnimations: false, // Disabled for instant loading
  };
}