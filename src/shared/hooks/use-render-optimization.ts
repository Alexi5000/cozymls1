import { useCallback, useRef, useMemo, useEffect } from 'react';
import { usePerformanceMonitor } from "@/shared/hooks/use-performance";

/**
 * Hook for optimizing component renders
 */
export function useRenderOptimization(componentName: string) {
  const { measureFunction } = usePerformanceMonitor(componentName);
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(0);

  useEffect(() => {
    renderCountRef.current++;
    lastRenderTimeRef.current = Date.now();
  });

  // Throttled render function for high-frequency updates
  const throttledRender = useCallback(
    measureFunction((renderFn: () => void) => {
      const now = Date.now();
      if (now - lastRenderTimeRef.current > 16) { // ~60fps
        renderFn();
        lastRenderTimeRef.current = now;
      }
    }, `${componentName}_throttledRender`),
    [measureFunction, componentName]
  );

  // Batch state updates
  const batchUpdates = useCallback((updateFn: () => void) => {
    // Use unstable_batchedUpdates in development for better batching
    if (process.env.NODE_ENV === 'development') {
      Promise.resolve().then(updateFn);
    } else {
      updateFn();
    }
  }, []);

  // Check if component should skip render
  const shouldSkipRender = useCallback((prevProps: any, nextProps: any) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }, []);

  return {
    renderCount: renderCountRef.current,
    throttledRender,
    batchUpdates,
    shouldSkipRender,
    measureFunction
  };
}

/**
 * Hook for list virtualization optimization
 */
export function useListOptimization<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  const scrollTop = useRef(0);
  
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop.current / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop.current + containerHeight) / itemHeight) + overscan
    );
    
    return { startIndex, endIndex };
  }, [items.length, itemHeight, containerHeight, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange.startIndex, visibleRange.endIndex]);

  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    scrollTop.current = event.currentTarget.scrollTop;
  }, []);

  return {
    visibleItems,
    visibleRange,
    onScroll,
    totalHeight: items.length * itemHeight
  };
}

/**
 * Hook for image lazy loading optimization
 */
export function useImageOptimization() {
  const observerRef = useRef<IntersectionObserver>();
  const loadedImagesRef = useRef(new Set<string>());

  const createObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;
              if (src && !loadedImagesRef.current.has(src)) {
                img.src = src;
                img.onload = () => loadedImagesRef.current.add(src);
                observerRef.current?.unobserve(img);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
    }
    return observerRef.current;
  }, []);

  const observeImage = useCallback((element: HTMLImageElement | null) => {
    if (element) {
      createObserver().observe(element);
    }
  }, [createObserver]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { observeImage };
}