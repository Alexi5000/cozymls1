import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  onIntersect?: (entry: IntersectionObserverEntry) => void;
  once?: boolean;
}

export function useIntersectionObserver({
  onIntersect,
  once = false,
  ...options
}: UseIntersectionObserverOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isCurrentlyIntersecting = entry.isIntersecting;
          
          setIsIntersecting(isCurrentlyIntersecting);
          
          if (isCurrentlyIntersecting && !hasIntersected) {
            setHasIntersected(true);
            onIntersect?.(entry);
            
            if (once) {
              observer.unobserve(element);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [onIntersect, once, hasIntersected, options]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
  };
}

// Hook for lazy loading images
export function useLazyImage(src: string) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { elementRef, hasIntersected } = useIntersectionObserver({
    once: true,
  });

  useEffect(() => {
    if (!hasIntersected) return;

    const img = new Image();
    img.onload = () => {
      setLoadedSrc(src);
      setIsLoaded(true);
      setError(null);
    };
    img.onerror = () => {
      setError('Failed to load image');
      setIsLoaded(false);
    };
    img.src = src;
  }, [hasIntersected, src]);

  return {
    elementRef,
    src: loadedSrc,
    isLoaded,
    error,
    hasIntersected,
  };
}

// Hook for lazy loading components
export function useLazyComponent<T>(
  importFunction: () => Promise<{ default: T }>,
  dependencies: any[] = []
) {
  const [Component, setComponent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { elementRef, hasIntersected } = useIntersectionObserver({
    once: true,
  });

  useEffect(() => {
    if (!hasIntersected || Component) return;

    setIsLoading(true);
    setError(null);

    importFunction()
      .then((module) => {
        setComponent(module.default);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [hasIntersected, Component, importFunction, ...dependencies]);

  return {
    elementRef,
    Component,
    isLoading,
    error,
    hasIntersected,
  };
}