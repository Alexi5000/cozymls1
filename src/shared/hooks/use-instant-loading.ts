import { useState, useCallback } from 'react';

// Ultra-fast loading hook that returns data instantly
export function useInstantLoading<T>(data: T) {
  return {
    data,
    loading: false,
    error: null,
    refetch: useCallback(() => Promise.resolve(data), [data]),
  };
}

// Instant mobile detection without performance overhead
export function useInstantMobile() {
  const [isMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  
  return { isMobile };
}

// No-op image loading for instant preview
export function useInstantImage() {
  return {
    loading: false,
    error: false,
    onLoad: () => {},
    onError: () => {},
  };
}

// Instant form submission without delays
export function useInstantForm() {
  return {
    submit: useCallback((fn: () => void) => {
      fn(); // Execute immediately
    }, []),
    submitting: false,
  };
}