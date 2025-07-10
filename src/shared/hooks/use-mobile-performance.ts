import { useEffect, useCallback, useRef } from 'react';
import { useResponsiveBreakpoint } from './use-responsive-breakpoint';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  scrollPerformance: number;
}

interface MobilePerformanceOptions {
  enableVirtualization?: boolean;
  enableImageLazyLoading?: boolean;
  enableComponentLazyLoading?: boolean;
  debounceScrollEvents?: boolean;
  optimizeAnimations?: boolean;
  enableIntersectionObserver?: boolean;
}

export function useMobilePerformance(options: MobilePerformanceOptions = {}) {
  const { isMobile } = useResponsiveBreakpoint();
  const metricsRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    scrollPerformance: 0,
  });

  const {
    enableVirtualization = true,
    enableImageLazyLoading = true,
    enableComponentLazyLoading = true,
    debounceScrollEvents = true,
    optimizeAnimations = true,
    enableIntersectionObserver = true,
  } = options;

  // Performance monitoring
  useEffect(() => {
    if (!isMobile) return;

    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        metricsRef.current = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          interactionTime: navigation.domInteractive - navigation.fetchStart,
          scrollPerformance: 0, // Will be updated by scroll listener
        };
      }
    };

    measurePerformance();
  }, [isMobile]);

  // Optimize scroll performance
  const optimizeScrollPerformance = useCallback(() => {
    if (!isMobile || !debounceScrollEvents) return;

    let ticking = false;
    let lastScrollTime = performance.now();

    const handleScroll = () => {
      const currentTime = performance.now();
      metricsRef.current.scrollPerformance = currentTime - lastScrollTime;
      lastScrollTime = currentTime;

      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, debounceScrollEvents]);

  // Optimize animations for mobile
  const optimizeAnimationsForMobile = useCallback(() => {
    if (!isMobile || !optimizeAnimations) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0ms');
      document.documentElement.style.setProperty('--transition-duration', '0ms');
    } else {
      // Optimize animations for mobile performance
      document.documentElement.style.setProperty('--animation-duration', '200ms');
      document.documentElement.style.setProperty('--transition-duration', '150ms');
    }
  }, [isMobile, optimizeAnimations]);

  // Image lazy loading optimization
  const setupImageLazyLoading = useCallback(() => {
    if (!isMobile || !enableImageLazyLoading || !enableIntersectionObserver) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, [isMobile, enableImageLazyLoading, enableIntersectionObserver]);

  // Component lazy loading optimization
  const setupComponentLazyLoading = useCallback(() => {
    if (!isMobile || !enableComponentLazyLoading || !enableIntersectionObserver) return;

    const componentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            if (element.dataset.lazy === 'true') {
              element.dataset.lazy = 'false';
              // Trigger component loading
              element.dispatchEvent(new CustomEvent('lazyLoad'));
              componentObserver.unobserve(element);
            }
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
      }
    );

    // Observe all lazy components
    const lazyComponents = document.querySelectorAll('[data-lazy="true"]');
    lazyComponents.forEach((component) => componentObserver.observe(component));

    return () => componentObserver.disconnect();
  }, [isMobile, enableComponentLazyLoading, enableIntersectionObserver]);

  // Virtual scrolling helper
  const createVirtualScrollContainer = useCallback((
    containerHeight: number,
    itemHeight: number,
    itemCount: number,
    renderItem: (index: number, style: React.CSSProperties) => React.ReactNode
  ) => {
    if (!isMobile || !enableVirtualization) {
      // Return regular rendering for non-mobile
      return Array.from({ length: itemCount }, (_, index) => 
        renderItem(index, {})
      );
    }

    // Implement basic virtual scrolling
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const bufferCount = 5; // Buffer items outside viewport
    
    return {
      containerHeight,
      itemHeight,
      visibleCount: visibleCount + bufferCount * 2,
      renderItem,
    };
  }, [isMobile, enableVirtualization]);

  // Memory optimization
  const optimizeMemoryUsage = useCallback(() => {
    if (!isMobile) return;

    // Clear unnecessary DOM nodes
    const clearUnusedNodes = () => {
      const unusedImages = document.querySelectorAll('img[data-loaded="false"]');
      unusedImages.forEach((img) => {
        if (img.getBoundingClientRect().top > window.innerHeight * 2) {
          img.removeAttribute('src');
          img.setAttribute('data-src', img.getAttribute('src') || '');
        }
      });
    };

    // Run cleanup periodically
    const cleanup = setInterval(clearUnusedNodes, 30000); // Every 30 seconds
    return () => clearInterval(cleanup);
  }, [isMobile]);

  // Initialize all optimizations
  useEffect(() => {
    if (!isMobile) return;

    const cleanupFunctions: (() => void)[] = [];

    const scrollCleanup = optimizeScrollPerformance();
    const imageCleanup = setupImageLazyLoading();
    const componentCleanup = setupComponentLazyLoading();
    const memoryCleanup = optimizeMemoryUsage();
    
    if (scrollCleanup) cleanupFunctions.push(scrollCleanup);
    if (imageCleanup) cleanupFunctions.push(imageCleanup);
    if (componentCleanup) cleanupFunctions.push(componentCleanup);
    if (memoryCleanup) cleanupFunctions.push(memoryCleanup);

    optimizeAnimationsForMobile();

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
    };
  }, [
    isMobile,
    optimizeScrollPerformance,
    setupImageLazyLoading,
    setupComponentLazyLoading,
    optimizeMemoryUsage,
    optimizeAnimationsForMobile,
  ]);

  return {
    isMobileOptimized: isMobile,
    metrics: metricsRef.current,
    createVirtualScrollContainer,
    // Utility functions for components
    shouldUseVirtualization: isMobile && enableVirtualization,
    shouldLazyLoadImages: isMobile && enableImageLazyLoading,
    shouldOptimizeAnimations: isMobile && optimizeAnimations,
  };
}