// No-op performance hooks for instant loading

export function useRenderOptimization(componentName: string) {
  return {
    renderCount: 0,
    throttledRender: (fn: any) => fn,
    batchUpdates: (fn: any) => fn(),
    shouldSkipRender: () => false,
    measureFunction: (fn: any) => fn,
  };
}

export function useListOptimization<T>({ items, itemHeight, containerHeight, overscan = 5 }: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  return {
    visibleItems: items, // Return all items for instant loading
    visibleRange: { start: 0, end: items.length },
    onScroll: () => {}, // No-op
    totalHeight: items.length * itemHeight,
  };
}

export function useImageOptimization() {
  return {
    observeImage: () => {}, // No-op - no lazy loading for instant performance
  };
}

export function useObjectPool<T>(factory: () => T, reset: (obj: T) => void) {
  return {
    acquire: factory, // Always create new for simplicity
    release: () => {}, // No-op
  };
}

export function useDOMCleanup() {
  return {
    trackElement: () => {}, // No-op
    untrackElement: () => {}, // No-op
  };
}