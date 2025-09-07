import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import { useListOptimization } from '@/shared/hooks/use-render-optimization';
import { useMemoryOptimization } from '@/shared/hooks/use-memory-optimization';
import { cn } from '@/shared/lib/utils';

interface OptimizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  height: number;
  className?: string;
  getItemKey?: (item: T, index: number) => string | number;
  onScroll?: (scrollTop: number) => void;
  overscan?: number;
}

function OptimizedListComponent<T>({
  items,
  renderItem,
  itemHeight,
  height,
  className,
  getItemKey = (item: any, index: number) => item.id || index,
  onScroll,
  overscan = 5
}: OptimizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addEventListenerWithCleanup } = useMemoryOptimization();
  
  const {
    visibleItems,
    visibleRange,
    onScroll: handleScroll,
    totalHeight
  } = useListOptimization({
    items,
    itemHeight,
    containerHeight: height,
    overscan
  });

  // Simplified scroll handler for instant loading
  const optimizedScrollHandler = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    onScroll?.(event.currentTarget.scrollTop);
  }, [onScroll]);

  // Simplified visible items with keys - no virtualization
  const visibleItemsWithKeys = useMemo(() => {
    return visibleItems.map((item, index) => ({
      item,
      index: visibleRange.start + index,
      key: getItemKey(item, visibleRange.start + index)
    }));
  }, [visibleItems, visibleRange.start, getItemKey]);

  // No spacers needed for instant loading
  const topSpacerHeight = 0;
  const bottomSpacerHeight = 0;

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height }}
      onScroll={optimizedScrollHandler}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Top spacer */}
        {topSpacerHeight > 0 && (
          <div style={{ height: topSpacerHeight }} />
        )}
        
        {/* Visible items */}
        {visibleItemsWithKeys.map(({ item, index, key }) => (
          <div
            key={key}
            style={{
              height: itemHeight,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
        
        {/* Bottom spacer */}
        {bottomSpacerHeight > 0 && (
          <div style={{ height: bottomSpacerHeight }} />
        )}
      </div>
    </div>
  );
}

export const OptimizedList = memo(OptimizedListComponent) as <T>(
  props: OptimizedListProps<T>
) => React.ReactElement;

/**
 * Simple optimized list without virtualization for smaller lists
 */
interface SimpleOptimizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  getItemKey?: (item: T, index: number) => string | number;
}

function SimpleOptimizedListComponent<T>({
  items,
  renderItem,
  className,
  getItemKey = (item: any, index: number) => item.id || index
}: SimpleOptimizedListProps<T>) {
  // Memoized items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => {
    return items.map((item, index) => ({
      item,
      index,
      key: getItemKey(item, index)
    }));
  }, [items, getItemKey]);

  return (
    <div className={className}>
      {memoizedItems.map(({ item, index, key }) => (
        <div key={key}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export const SimpleOptimizedList = memo(SimpleOptimizedListComponent) as <T>(
  props: SimpleOptimizedListProps<T>
) => React.ReactElement;