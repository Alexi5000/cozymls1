import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { useImageOptimization } from '@/shared/lib/image-optimization';

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

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  quality = 80,
  loading = 'eager', // Default to eager for instant loading
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { createResponsiveProps, preloadImage } = useImageOptimization();

  const responsiveProps = createResponsiveProps(src, {
    quality,
    loading: priority ? 'eager' : loading,
  });

  useEffect(() => {
    if (priority) {
      preloadImage(src, { quality });
    }
  }, [src, priority, quality, preloadImage]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          "min-h-[200px] rounded-md",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      <img
        ref={imgRef}
        {...responsiveProps}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          placeholder === 'blur' && !isLoaded ? "blur-sm" : "",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
    </div>
  );
}