// Bundle analysis utilities for performance monitoring

interface BundleAnalytics {
  totalSize: number;
  chunkSizes: Record<string, number>;
  loadTimes: Record<string, number>;
  moduleCount: number;
}

export const bundleAnalyzer = {
  // Analyze current bundle performance
  analyzeBundlePerformance: (): BundleAnalytics => {
    const performance = window.performance;
    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let totalSize = 0;
    const chunkSizes: Record<string, number> = {};
    const loadTimes: Record<string, number> = {};
    let moduleCount = 0;

    entries.forEach(entry => {
      if (entry.name.includes('.js') || entry.name.includes('.css')) {
        const size = entry.transferSize || 0;
        const loadTime = entry.responseEnd - entry.requestStart;
        const fileName = entry.name.split('/').pop() || 'unknown';
        
        totalSize += size;
        chunkSizes[fileName] = size;
        loadTimes[fileName] = loadTime;
        moduleCount++;
      }
    });

    return {
      totalSize,
      chunkSizes,
      loadTimes,
      moduleCount,
    };
  },

  // Monitor bundle loading performance
  monitorBundleLoading: () => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource' && 
            (entry.name.includes('.js') || entry.name.includes('.css'))) {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          // Log slow loading resources
          if (resourceEntry.duration > 1000) {
            console.warn(`Slow resource loading: ${entry.name} took ${resourceEntry.duration}ms`);
          }
          
          // Send to analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'resource_timing', {
              event_category: 'Performance',
              event_label: entry.name,
              value: Math.round(resourceEntry.duration),
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
    return () => observer.disconnect();
  },

  // Detect unused JavaScript
  detectUnusedCode: () => {
    if ('coverage' in window && typeof (window as any).coverage === 'object') {
      const coverage = (window as any).coverage;
      const unusedCode: string[] = [];
      
      Object.keys(coverage).forEach(file => {
        const fileCoverage = coverage[file];
        if (fileCoverage.s) {
          const statements = Object.values(fileCoverage.s) as number[];
          const unusedStatements = statements.filter(count => count === 0).length;
          const totalStatements = statements.length;
          const unusedPercentage = (unusedStatements / totalStatements) * 100;
          
          if (unusedPercentage > 50) {
            unusedCode.push(`${file}: ${unusedPercentage.toFixed(1)}% unused`);
          }
        }
      });
      
      return unusedCode;
    }
    
    return [];
  },

  // Get Core Web Vitals
  getCoreWebVitals: () => {
    return new Promise((resolve) => {
      const vitals = {
        FCP: 0, // First Contentful Paint
        LCP: 0, // Largest Contentful Paint
        FID: 0, // First Input Delay
        CLS: 0, // Cumulative Layout Shift
        TTFB: 0, // Time to First Byte
      };

      // FCP
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpEntry) {
        vitals.FCP = fcpEntry.startTime;
      }

      // LCP
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        vitals.LCP = lastEntry.startTime;
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // TTFB
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        vitals.CLS = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Resolve after a short delay to capture metrics
      setTimeout(() => {
        resolve(vitals);
      }, 2000);
    });
  },

  // Report performance metrics
  reportMetrics: async () => {
    const bundleAnalytics = bundleAnalyzer.analyzeBundlePerformance();
    const coreWebVitals = await bundleAnalyzer.getCoreWebVitals();
    const unusedCode = bundleAnalyzer.detectUnusedCode();

    const report = {
      timestamp: Date.now(),
      bundleAnalytics,
      coreWebVitals,
      unusedCode,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('📊 Performance Report');
      console.log('Bundle Size:', (bundleAnalytics.totalSize / 1024).toFixed(2), 'KB');
      console.log('Module Count:', bundleAnalytics.moduleCount);
      console.log('Core Web Vitals:', coreWebVitals);
      if (unusedCode.length > 0) {
        console.warn('Unused Code Detected:', unusedCode);
      }
      console.groupEnd();
    }

    // Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_report', {
        event_category: 'Performance',
        custom_bundle_size: bundleAnalytics.totalSize,
        custom_fcp: (coreWebVitals as any).FCP,
        custom_lcp: (coreWebVitals as any).LCP,
        custom_cls: (coreWebVitals as any).CLS,
      });
    }

    return report;
  },
};

// Initialize bundle monitoring
export function initializeBundleMonitoring() {
  if (typeof window === 'undefined') return;

  // Start monitoring
  const cleanup = bundleAnalyzer.monitorBundleLoading();

  // Report metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      bundleAnalyzer.reportMetrics();
    }, 1000);
  });

  return cleanup;
}