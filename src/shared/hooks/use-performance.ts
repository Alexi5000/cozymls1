import { useCallback, useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

interface NavigatorConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

interface NavigatorWithCapabilities extends Navigator {
  deviceMemory?: number;
  connection?: NavigatorConnectionInfo;
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters: Record<string, unknown>
    ) => void;
  }
}

export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>();
  const renderCount = useRef(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
    renderCount.current += 1;
  });

  useEffect(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;

      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        // Slow render detected. Metrics are available for analytics below.
      }

      const metrics: PerformanceMetrics = {
        renderTime,
        componentName,
        timestamp: Date.now(),
      };

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'component_render', {
          custom_component_name: metrics.componentName,
          custom_render_time: metrics.renderTime,
          custom_render_count: renderCount.current,
          custom_timestamp: metrics.timestamp,
        });
      }
    }
  });

  const measureFunction = useCallback(
    <TArgs extends unknown[], TResult>(
      fn: (...args: TArgs) => TResult,
      functionName: string
    ) => {
      return (...args: TArgs): TResult => {
        const start = performance.now();
        const result = fn(...args);
        const duration = performance.now() - start;

        if (process.env.NODE_ENV === 'development' && duration > 5) {
          void functionName;
        }

        return result;
      };
    },
    []
  );

  return { measureFunction, renderCount: renderCount.current };
}

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('in-viewport');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [options]);

  return elementRef;
}

export const performanceUtils = {
  debounce: <TArgs extends unknown[], TResult>(
    func: (...args: TArgs) => TResult,
    wait: number
  ): ((...args: TArgs) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: TArgs) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  throttle: <TArgs extends unknown[], TResult>(
    func: (...args: TArgs) => TResult,
    limit: number
  ): ((...args: TArgs) => void) => {
    let inThrottle = false;
    return (...args: TArgs) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  },

  measureRender: (componentName: string, renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    void componentName;
    return end - start;
  },

  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  getDeviceCapabilities: () => {
    const navigatorWithCapabilities =
      window.navigator as NavigatorWithCapabilities;

    return {
      hardwareConcurrency: navigatorWithCapabilities.hardwareConcurrency || 4,
      deviceMemory: navigatorWithCapabilities.deviceMemory || 4,
      connection: navigatorWithCapabilities.connection || null,
    };
  },
};
