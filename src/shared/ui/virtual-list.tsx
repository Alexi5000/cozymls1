import React, { memo } from 'react';
import { useVirtualScroll } from '@/shared/hooks/use-virtual-scroll';
import { cn } from '@/shared/lib/utils';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
  onScroll?: (scrollTop: number) => void;
}

function VirtualListComponent<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className,
  overscan = 5,
  onScroll,
}: VirtualListProps<T>) {
  const {
    virtualItems,
    totalSize,
    scrollElementProps,
    isScrolling,
  } = useVirtualScroll(items.length, {
    itemHeight,
    containerHeight: height,
    overscan,
  });

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    scrollElementProps.onScroll(e);
    onScroll?.(e.currentTarget.scrollTop);
  };

  return (
    <div
      {...scrollElementProps}
      onScroll={handleScroll}
      className={cn(
        "relative overflow-auto",
        isScrolling && "pointer-events-none", // Disable interactions while scrolling
        className
      )}
    >
      {/* Total size container */}
      <div style={{ height: totalSize, position: 'relative' }}>
        {/* Rendered items */}
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: virtualItem.start,
              left: 0,
              height: virtualItem.size,
              width: '100%',
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export const VirtualList = memo(VirtualListComponent) as <T>(
  props: VirtualListProps<T>
) => JSX.Element;