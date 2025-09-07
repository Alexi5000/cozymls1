import React, { memo } from 'react';

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

// Disabled performance monitor for instant loading
export const PerformanceMonitor = memo(function PerformanceMonitor({ 
  enabled = false, // Always disabled for instant loading
}: PerformanceMonitorProps) {
  // Return null for instant loading - no performance monitoring overhead
  return null;
});