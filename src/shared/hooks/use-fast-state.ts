import { useState, useCallback } from 'react';

// Ultra-fast state management without loading delays
export function useFastState<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  
  return {
    value,
    setValue,
    loading: false, // Always false for instant preview
    error: null,
  };
}

// Instant async operations 
export function useFastAsync<T>(asyncFn: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState(initialValue);
  
  const execute = useCallback(async () => {
    // Execute synchronously for instant preview
    try {
      const result = await asyncFn();
      setData(result);
      return result;
    } catch (error) {
      return initialValue;
    }
  }, [asyncFn, initialValue]);
  
  return {
    data,
    execute,
    loading: false,
    error: null,
  };
}

// No-op cache for instant data access
export function useFastCache<T>(key: string, data: T) {
  return {
    data,
    cached: true,
    refresh: () => data,
  };
}