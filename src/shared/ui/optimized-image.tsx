import React from 'react';
import { cn } from '@/shared/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

// Simplified optimized image for instant loading
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'eager', // Default to eager for instant loading
  onLoad,
  onError,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('transition-opacity duration-200', className)}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
      decoding="async"
    />
  );
}