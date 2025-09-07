// Simplified performance store for instant loading

class PerformanceStore {
  private metrics = new Map<string, any>();

  setMetric(key: string, value: any): void {
    // No-op for instant loading
  }

  getMetric(key: string): any {
    return null; // No metrics for instant loading
  }

  getAllMetrics(): Record<string, any> {
    return {}; // No metrics for instant loading
  }

  subscribe(callback: (metrics: Map<string, any>) => void): () => void {
    return () => {}; // No-op unsubscribe
  }

  clear(): void {
    // No-op for instant loading
  }

  recordNavigation(route: string): void {
    // No-op for instant loading
  }

  recordRender(componentName: string, renderTime: number): void {
    // No-op for instant loading
  }

  recordApiCall(endpoint: string, duration: number, success: boolean): void {
    // No-op for instant loading
  }

  exportMetrics(): string {
    return '{}'; // Empty metrics for instant loading
  }
}

// Global performance store instance
export const performanceStore = new PerformanceStore();