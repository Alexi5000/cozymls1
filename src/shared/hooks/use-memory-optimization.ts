import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for memory leak prevention and cleanup
 */
export function useMemoryOptimization() {
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);
  const intervalIdsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const timeoutIdsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const eventListenersRef = useRef<Array<{
    element: EventTarget;
    event: string;
    handler: EventListener;
  }>>([]);

  // Register cleanup function
  const registerCleanup = useCallback((cleanupFn: () => void) => {
    cleanupFunctionsRef.current.push(cleanupFn);
  }, []);

  // Optimized interval management
  const setOptimizedInterval = useCallback((callback: () => void, ms: number) => {
    const id = setInterval(callback, ms);
    intervalIdsRef.current.add(id);
    return id;
  }, []);

  // Optimized timeout management
  const setOptimizedTimeout = useCallback((callback: () => void, ms: number) => {
    const id = setTimeout(() => {
      callback();
      timeoutIdsRef.current.delete(id);
    }, ms);
    timeoutIdsRef.current.add(id);
    return id;
  }, []);

  // Event listener management
  const addEventListenerWithCleanup = useCallback((
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options);
    eventListenersRef.current.push({ element, event, handler });
  }, []);

  // Manual cleanup
  const cleanup = useCallback(() => {
    // Clear intervals
    intervalIdsRef.current.forEach(clearInterval);
    intervalIdsRef.current.clear();

    // Clear timeouts
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current.clear();

    // Remove event listeners
    eventListenersRef.current.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    eventListenersRef.current.length = 0;

    // Run custom cleanup functions
    cleanupFunctionsRef.current.forEach(fn => fn());
    cleanupFunctionsRef.current.length = 0;
  }, []);

  // Automatic cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    registerCleanup,
    setOptimizedInterval,
    setOptimizedTimeout,
    addEventListenerWithCleanup,
    cleanup
  };
}

/**
 * Hook for object pool management to reduce GC pressure
 */
export function useObjectPool<T>(
  createObject: () => T,
  resetObject: (obj: T) => void,
  maxSize = 100
) {
  const poolRef = useRef<T[]>([]);

  const acquire = useCallback((): T => {
    if (poolRef.current.length > 0) {
      return poolRef.current.pop()!;
    }
    return createObject();
  }, [createObject]);

  const release = useCallback((obj: T) => {
    if (poolRef.current.length < maxSize) {
      resetObject(obj);
      poolRef.current.push(obj);
    }
  }, [resetObject, maxSize]);

  // Cleanup pool on unmount
  useEffect(() => {
    return () => {
      poolRef.current.length = 0;
    };
  }, []);

  return { acquire, release };
}

/**
 * Hook for DOM element cleanup
 */
export function useDOMCleanup() {
  const elementsRef = useRef<Set<Element>>(new Set());
  
  const trackElement = useCallback((element: Element) => {
    elementsRef.current.add(element);
  }, []);

  const untrackElement = useCallback((element: Element) => {
    elementsRef.current.delete(element);
  }, []);

  useEffect(() => {
    return () => {
      // Remove all tracked elements
      elementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      elementsRef.current.clear();
    };
  }, []);

  return { trackElement, untrackElement };
}