/**
 * Centralized performance metrics store
 */
class PerformanceStore {
  private metrics = new Map<string, any>();
  private observers: Array<(metrics: Map<string, any>) => void> = [];
  
  // Store a metric
  setMetric(key: string, value: any): void {
    this.metrics.set(key, {
      value,
      timestamp: Date.now()
    });
    this.notifyObservers();
  }
  
  // Get a metric
  getMetric(key: string): any {
    const metric = this.metrics.get(key);
    return metric ? metric.value : undefined;
  }
  
  // Get all metrics
  getAllMetrics(): Record<string, any> {
    const result: Record<string, any> = {};
    this.metrics.forEach((metric, key) => {
      result[key] = metric.value;
    });
    return result;
  }
  
  // Subscribe to metric changes
  subscribe(callback: (metrics: Map<string, any>) => void): () => void {
    this.observers.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }
  
  // Notify all observers
  private notifyObservers(): void {
    this.observers.forEach(callback => callback(this.metrics));
  }
  
  // Clear all metrics
  clear(): void {
    this.metrics.clear();
    this.notifyObservers();
  }
  
  // Record navigation timing
  recordNavigation(route: string): void {
    this.setMetric(`navigation_${route}`, {
      timestamp: Date.now(),
      memory: this.getMemoryUsage(),
      userAgent: navigator.userAgent
    });
  }
  
  // Record component render
  recordRender(componentName: string, renderTime: number): void {
    const key = `render_${componentName}`;
    const existing = this.getMetric(key) || { count: 0, totalTime: 0, avgTime: 0 };
    
    existing.count++;
    existing.totalTime += renderTime;
    existing.avgTime = existing.totalTime / existing.count;
    existing.lastRenderTime = renderTime;
    
    this.setMetric(key, existing);
  }
  
  // Record API call
  recordApiCall(endpoint: string, duration: number, success: boolean): void {
    const key = `api_${endpoint}`;
    const existing = this.getMetric(key) || { 
      count: 0, 
      totalTime: 0, 
      avgTime: 0, 
      successCount: 0, 
      errorCount: 0 
    };
    
    existing.count++;
    existing.totalTime += duration;
    existing.avgTime = existing.totalTime / existing.count;
    
    if (success) {
      existing.successCount++;
    } else {
      existing.errorCount++;
    }
    
    this.setMetric(key, existing);
  }
  
  // Get memory usage
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }
  
  // Export metrics for analytics
  exportMetrics(): string {
    const data = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.getAllMetrics()
    };
    
    return JSON.stringify(data);
  }
}

export const performanceStore = new PerformanceStore();

// Auto-record Core Web Vitals
if (typeof window !== 'undefined') {
  // Record FCP
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        performanceStore.setMetric('fcp', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['paint'] });

  // Record LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    performanceStore.setMetric('lcp', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Record CLS
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        performanceStore.setMetric('cls', clsValue);
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });
}