import { useCallback } from 'react';

// Simplified memory optimization for instant loading
export function useMemoryOptimization() {
  // No-op versions for instant loading
  const registerCleanup = useCallback((cleanupFn: () => void) => {
    return () => {}; // No-op
  }, []);

  const setOptimizedInterval = useCallback((callback: () => void, ms: number) => {
    return setInterval(callback, ms); // Basic interval without tracking
  }, []);

  const setOptimizedTimeout = useCallback((callback: () => void, ms: number) => {
    return setTimeout(callback, ms); // Basic timeout without tracking
  }, []);

  const addEventListenerWithCleanup = useCallback((
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  }, []);

  const cleanup = useCallback(() => {
    // No-op for instant loading
  }, []);

  return {
    registerCleanup,
    setOptimizedInterval,
    setOptimizedTimeout,
    addEventListenerWithCleanup,
    cleanup,
  };
}

// Simplified object pooling
export function useObjectPool<T>(factory: () => T, reset: (obj: T) => void) {
  return {
    acquire: factory, // Always create new for simplicity
    release: () => {}, // No-op
  };
}

// Simplified DOM cleanup
export function useDOMCleanup() {
  return {
    trackElement: () => {}, // No-op
    untrackElement: () => {}, // No-op
  };
}