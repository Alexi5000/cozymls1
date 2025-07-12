import { memo, useMemo, useCallback, useRef, MutableRefObject } from 'react';

/**
 * Enhanced memo with custom comparison and debugging
 */
export function createOptimizedMemo<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean,
  debugName?: string
) {
  const MemoizedComponent = memo(Component, areEqual);
  
  if (process.env.NODE_ENV === 'development' && debugName) {
    MemoizedComponent.displayName = `OptimizedMemo(${debugName})`;
  }
  
  return MemoizedComponent;
}

/**
 * Stable callback hook with dependency comparison
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: unknown[]
): T {
  const callbackRef = useRef<T>(callback);
  const depsRef = useRef(deps);
  
  // Update callback only if dependencies changed
  if (!areArraysEqual(depsRef.current, deps)) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }
  
  return useCallback(callbackRef.current, []);
}

/**
 * Memoized value with stable reference
 */
export function useStableMemo<T>(
  factory: () => T,
  deps: unknown[]
): T {
  const valueRef = useRef<T>();
  const depsRef = useRef(deps);
  const hasValue = useRef(false);
  
  if (!hasValue.current || !areArraysEqual(depsRef.current, deps)) {
    valueRef.current = factory();
    depsRef.current = deps;
    hasValue.current = true;
  }
  
  return valueRef.current!;
}

/**
 * Optimized list item memo comparison
 */
export function createListItemMemo<T extends { id: string | number }>(
  Component: React.ComponentType<{ item: T; index: number }>
) {
  return memo(Component, (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.index === nextProps.index &&
      shallowEqual(prevProps.item, nextProps.item)
    );
  });
}

/**
 * Shallow equality comparison
 */
function shallowEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Array equality comparison
 */
function areArraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false;
  
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  
  return true;
}

/**
 * Expensive computation cache
 */
export function useComputationCache<T>(
  computation: () => T,
  deps: unknown[],
  shouldRecalculate?: (prevDeps: unknown[], nextDeps: unknown[]) => boolean
): T {
  const cacheRef = useRef<{ value: T; deps: unknown[] }>();
  
  const shouldUpdate = !cacheRef.current || 
    (shouldRecalculate ? 
      shouldRecalculate(cacheRef.current.deps, deps) : 
      !areArraysEqual(cacheRef.current.deps, deps)
    );
  
  if (shouldUpdate) {
    cacheRef.current = {
      value: computation(),
      deps: [...deps]
    };
  }
  
  return cacheRef.current.value;
}