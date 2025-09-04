/**
 * Font loading utilities for optimal performance
 * Replaces complex font detection with simple CSS-based approach
 */

/**
 * Check if fonts are loaded (for performance monitoring)
 */
export const checkFontsLoaded = (): Promise<boolean> => {
  if (!document.fonts) {
    return Promise.resolve(true); // Fallback for older browsers
  }
  
  return document.fonts.ready.then(() => {
    const interLoaded = document.fonts.check('16px Inter');
    const playfairLoaded = document.fonts.check('16px Playfair Display');
    return interLoaded && playfairLoaded;
  });
};

/**
 * Monitor font loading performance
 */
export const monitorFontPerformance = () => {
  if (typeof performance === 'undefined') return;
  
  checkFontsLoaded().then((loaded) => {
    const loadTime = performance.now();
    console.debug(`Fonts loaded: ${loaded} at ${loadTime.toFixed(2)}ms`);
    
    // Track font loading metrics
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('fonts.googleapis.com')) {
            console.debug('Font resource timing:', entry);
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  });
};

/**
 * Font display utilities for components
 */
export const fontClasses = {
  display: 'font-display',
  body: 'font-body font-sans',
  heading: 'font-display',
  mono: 'font-mono',
} as const;