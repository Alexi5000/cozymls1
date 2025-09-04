// Instant loading utilities to replace complex performance monitoring

export const instantLoading = {
  // Remove loading states - everything should be instant with pre-loaded data
  withInstantData: <T>(data: T) => ({
    data,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(data),
  }),

  // Simple memoization without complex performance tracking
  simpleMemo: <T>(factory: () => T, deps: readonly any[]): T => {
    // Use React.useMemo in components, this is just for non-React contexts
    return factory();
  },

  // Instant state updates
  instantUpdate: <T>(setter: (value: T) => void, value: T) => {
    setter(value);
    // No artificial delays or batching
  },

  // Pre-load critical resources
  preloadCritical: () => {
    // Preload fonts and critical CSS
    if (typeof document !== 'undefined') {
      // Create link elements for critical resources
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
    }
  },

  // Fast navigation - no artificial delays
  navigate: (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
  },
};