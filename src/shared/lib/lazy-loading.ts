import React, { lazy, ComponentType } from 'react';

/**
 * Enhanced lazy loading with retry mechanism and error boundary
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries = 3,
  retryDelay = 1000
): React.LazyExoticComponent<T> {
  return lazy(() => {
    let retryCount = 0;
    
    const loadWithRetry: () => Promise<{ default: T }> = async () => {
      try {
        return await importFn();
      } catch (error) {
        if (retryCount < retries) {
          retryCount++;
          console.warn(`Lazy loading failed, retrying (${retryCount}/${retries})...`, error);
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return loadWithRetry();
        }
        
        console.error('Lazy loading failed after retries:', error);
        throw error;
      }
    };
    
    return loadWithRetry();
  });
}

/**
 * Preload a lazy component
 */
export function preloadComponent(importFn: () => Promise<any>): void {
  const componentImport = importFn();
  
  // Handle the promise to avoid unhandled rejection warnings
  componentImport.catch(error => {
    console.warn('Component preloading failed:', error);
  });
}

/**
 * Create a lazy component with preloading on hover
 */
export function createPreloadableLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): ComponentType<any> {
  const LazyComponent = createLazyComponent(importFn);
  
  const PreloadableComponent = (props: any) => {
    const handleMouseEnter = () => {
      preloadComponent(importFn);
    };
    
    return React.createElement(
      'div',
      { onMouseEnter: handleMouseEnter },
      React.createElement(LazyComponent, props)
    );
  };
  
  return PreloadableComponent;
}

/**
 * Component registry for dynamic imports
 */
class ComponentRegistry {
  private components = new Map<string, ComponentType<any>>();
  private loadingPromises = new Map<string, Promise<ComponentType<any>>>();
  
  register(name: string, component: ComponentType<any>): void {
    this.components.set(name, component);
  }
  
  async load(name: string, importFn: () => Promise<{ default: ComponentType<any> }>): Promise<ComponentType<any>> {
    // Return cached component if available
    if (this.components.has(name)) {
      return this.components.get(name)!;
    }
    
    // Return existing loading promise if in progress
    if (this.loadingPromises.has(name)) {
      return this.loadingPromises.get(name)!;
    }
    
    // Create new loading promise
    const loadingPromise = importFn().then(module => {
      const component = module.default;
      this.components.set(name, component);
      this.loadingPromises.delete(name);
      return component;
    }).catch(error => {
      this.loadingPromises.delete(name);
      throw error;
    });
    
    this.loadingPromises.set(name, loadingPromise);
    return loadingPromise;
  }
  
  has(name: string): boolean {
    return this.components.has(name);
  }
  
  get(name: string): ComponentType<any> | undefined {
    return this.components.get(name);
  }
  
  clear(): void {
    this.components.clear();
    this.loadingPromises.clear();
  }
}

export const componentRegistry = new ComponentRegistry();

/**
 * Route-based code splitting helper
 */
export function createRouteComponent(
  routeName: string,
  importFn: () => Promise<{ default: ComponentType<any> }>
) {
  return createLazyComponent(() => {
    // Track route loading for analytics
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`route-${routeName}-start`);
    }
    
    return importFn().then(module => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        performance.mark(`route-${routeName}-end`);
        performance.measure(
          `route-${routeName}-load-time`,
          `route-${routeName}-start`,
          `route-${routeName}-end`
        );
      }
      
      return module;
    });
  });
}