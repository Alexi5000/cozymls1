import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { RotateCcw } from "lucide-react";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
}

export function PullToRefresh({ 
  children, 
  onRefresh, 
  threshold = 80,
  className 
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [canRefresh, setCanRefresh] = React.useState(false);
  
  const startY = React.useRef(0);
  const currentY = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (isRefreshing || !containerRef.current || containerRef.current.scrollTop > 0) {
      return;
    }

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      // Prevent default scrolling when pulling down
      e.preventDefault();
      
      // Apply rubber band effect
      const adjustedDistance = distance * 0.5;
      setPullDistance(adjustedDistance);
      setCanRefresh(adjustedDistance >= threshold);
    }
  }, [isRefreshing, threshold]);

  const handleTouchEnd = React.useCallback(async () => {
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
    setCanRefresh(false);
    startY.current = 0;
    currentY.current = 0;
  }, [canRefresh, isRefreshing, onRefresh]);

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const rotation = pullProgress * 180;

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-auto", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center",
          "bg-background/95 backdrop-blur-sm transition-all duration-200",
          "z-10"
        )}
        style={{ 
          height: Math.max(0, pullDistance),
          opacity: pullDistance > 10 ? 1 : 0
        }}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <RotateCcw 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isRefreshing && "animate-spin"
            )}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              color: canRefresh ? 'hsl(var(--primary))' : undefined
            }}
          />
          <span className="text-sm font-medium">
            {isRefreshing 
              ? "Refreshing..." 
              : canRefresh 
                ? "Release to refresh" 
                : "Pull to refresh"
            }
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  );
}