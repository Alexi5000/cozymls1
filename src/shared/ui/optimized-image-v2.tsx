import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useImageOptimization } from '@/shared/hooks/use-render-optimization';
import { useMemoryOptimization } from '@/shared/hooks/use-memory-optimization';
import { cn } from '@/shared/lib/utils';

interface OptimizedImageV2Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  quality?: number;
  sizes?: string;
}

export const OptimizedImageV2 = memo(function OptimizedImageV2({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  quality = 75,
  sizes
}: OptimizedImageV2Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const { observeImage } = useImageOptimization();
  const { registerCleanup } = useMemoryOptimization();

  // Generate responsive srcSet
  const srcSet = React.useMemo(() => {
    if (!width) return undefined;
    
    const widths = [width, width * 2, width * 3];
    return widths
      .map(w => `${src}?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  }, [src, width, quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && !priority && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(imgRef.current);
      registerCleanup(() => observer.disconnect());
    }
  }, [loading, priority, registerCleanup]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Preload high priority images
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (srcSet) link.imageSrcset = srcSet;
      if (sizes) link.imageSizes = sizes;
      
      document.head.appendChild(link);
      registerCleanup(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    }
  }, [priority, src, srcSet, sizes, registerCleanup]);

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Loading placeholder */}
      {placeholder === 'empty' && !isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Main image */}
      {isInView && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            position: isLoaded ? 'relative' : 'absolute',
            top: isLoaded ? 'auto' : 0,
            left: isLoaded ? 'auto' : 0
          }}
        />
      )}
    </div>
  );
});

/**
 * Optimized background image component
 */
interface OptimizedBackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  loading?: 'lazy' | 'eager';
  quality?: number;
}

export const OptimizedBackgroundImage = memo(function OptimizedBackgroundImage({
  src,
  className,
  children,
  loading = 'lazy',
  quality = 75
}: OptimizedBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const divRef = useRef<HTMLDivElement>(null);
  const { registerCleanup } = useMemoryOptimization();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && divRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(divRef.current);
      registerCleanup(() => observer.disconnect());
    }
  }, [loading, registerCleanup]);

  // Preload image
  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = `${src}?q=${quality}`;
    }
  }, [isInView, src, quality]);

  return (
    <div
      ref={divRef}
      className={cn('relative', className)}
      style={{
        backgroundImage: isLoaded ? `url(${src}?q=${quality})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {children}
    </div>
  );
});