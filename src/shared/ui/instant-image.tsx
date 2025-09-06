import React from 'react';
import { cn } from '@/shared/lib/utils';

interface InstantImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

// Simplified image component for instant loading
export function InstantImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'eager', // Default to eager for instant loading
  onLoad,
  onError,
}: InstantImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={cn("transition-opacity duration-200", className)}
      onLoad={onLoad}
      onError={onError}
      decoding="async"
    />
  );
}