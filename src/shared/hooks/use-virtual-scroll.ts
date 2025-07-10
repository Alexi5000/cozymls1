import { useState, useEffect, useMemo, useCallback } from 'react';

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  scrollingDelay?: number;
}

interface VirtualScrollReturn {
  virtualItems: Array<{
    index: number;
    start: number;
    size: number;
  }>;
  totalSize: number;
  scrollElementProps: {
    ref: (element: HTMLElement | null) => void;
    onScroll: (e: React.UIEvent<HTMLElement>) => void;
    style: React.CSSProperties;
  };
  isScrolling: boolean;
}

export function useVirtualScroll(
  itemCount: number,
  options: VirtualScrollOptions
): VirtualScrollReturn {
  const {
    itemHeight,
    containerHeight,
    overscan = 5,
    scrollingDelay = 150,
  } = options;

  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      itemCount - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight)
    );

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(itemCount - 1, end + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  // Generate virtual items
  const virtualItems = useMemo(() => {
    const items = [];
    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      items.push({
        index: i,
        start: i * itemHeight,
        size: itemHeight,
      });
    }
    return items;
  }, [visibleRange, itemHeight]);

  const totalSize = itemCount * itemHeight;

  // Handle scroll events
  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollTop(scrollTop);
    setIsScrolling(true);
  }, []);

  // Debounce scrolling state
  useEffect(() => {
    if (!isScrolling) return;

    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, scrollingDelay);

    return () => clearTimeout(timeout);
  }, [scrollTop, isScrolling, scrollingDelay]);

  // Ref callback for scroll element
  const setScrollElementRef = useCallback((element: HTMLElement | null) => {
    setScrollElement(element);
  }, []);

  return {
    virtualItems,
    totalSize,
    scrollElementProps: {
      ref: setScrollElementRef,
      onScroll: handleScroll,
      style: {
        height: containerHeight,
        overflow: 'auto',
      },
    },
    isScrolling,
  };
}

// Hook for dynamic item heights (more advanced)
export function useDynamicVirtualScroll(
  items: any[],
  estimateSize: (index: number) => number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [sizes, setSizes] = useState<Map<number, number>>(new Map());

  // Measure item sizes
  const measureElement = useCallback((index: number, element: HTMLElement) => {
    const height = element.getBoundingClientRect().height;
    setSizes(prev => new Map(prev).set(index, height));
  }, []);

  // Calculate positions
  const { virtualItems, totalSize } = useMemo(() => {
    const virtualItems = [];
    let totalSize = 0;
    
    for (let i = 0; i < items.length; i++) {
      const size = sizes.get(i) ?? estimateSize(i);
      const start = totalSize;
      
      // Check if item is in viewport
      const end = start + size;
      if (
        end >= scrollTop - overscan * estimateSize(0) &&
        start <= scrollTop + containerHeight + overscan * estimateSize(0)
      ) {
        virtualItems.push({
          index: i,
          start,
          size,
          measureRef: (el: HTMLElement | null) => {
            if (el) measureElement(i, el);
          },
        });
      }
      
      totalSize += size;
    }

    return { virtualItems, totalSize };
  }, [items.length, sizes, estimateSize, scrollTop, containerHeight, overscan, measureElement]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    virtualItems,
    totalSize,
    scrollElementProps: {
      onScroll: handleScroll,
      style: {
        height: containerHeight,
        overflow: 'auto',
      },
    },
  };
}