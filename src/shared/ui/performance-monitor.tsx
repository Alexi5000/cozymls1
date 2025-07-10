import React, { useEffect, useState } from 'react';
import { usePerformanceMonitor } from '@/shared/hooks/use-performance';
import { useMobilePerformance } from '@/shared/hooks/use-mobile-performance';
import { cn } from '@/shared/lib/utils';

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function PerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right',
  className 
}: PerformanceMonitorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { renderCount } = usePerformanceMonitor('PerformanceMonitor');
  const { metrics, isMobileOptimized } = useMobilePerformance();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!enabled || !isVisible) {
    return null;
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={cn(
        'fixed z-50 bg-black/90 text-white p-3 rounded-lg font-mono text-xs',
        'backdrop-blur-sm border border-white/20',
        'max-w-xs space-y-1',
        positionClasses[position],
        className
      )}
    >
      <div className="font-bold text-green-400 mb-2">Performance Monitor</div>
      <div>Render Count: {renderCount}</div>
      <div>Mobile Optimized: {isMobileOptimized ? '✅' : '❌'}</div>
      
      {isMobileOptimized && (
        <>
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="text-yellow-400 font-semibold">Mobile Metrics:</div>
            <div>Load Time: {metrics.loadTime.toFixed(2)}ms</div>
            <div>Render Time: {metrics.renderTime.toFixed(2)}ms</div>
            <div>Interaction: {metrics.interactionTime.toFixed(2)}ms</div>
            <div>Scroll Perf: {metrics.scrollPerformance.toFixed(2)}ms</div>
          </div>
        </>
      )}
      
      <div className="border-t border-white/20 pt-2 mt-2 text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}