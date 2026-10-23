import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

export class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];
  private targets = new Set<Element>();

  constructor(
    private callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) {
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? '0px';
    this.thresholds = Array.isArray(options.threshold)
      ? [...options.threshold].sort((a, b) => a - b)
      : [options.threshold ?? 0];
  }

  disconnect() { this.targets.clear(); }
  observe(target: Element) { this.targets.add(target); }
  unobserve(target: Element) { this.targets.delete(target); }
  takeRecords(): IntersectionObserverEntry[] { return []; }
  emit(entries: IntersectionObserverEntry[]) {
    const observed = entries.filter(entry => this.targets.has(entry.target));
    if (observed.length) this.callback(observed, this);
  }
}

export class MockResizeObserver implements ResizeObserver {
  private targets = new Map<Element, ResizeObserverOptions>();

  constructor(private callback: ResizeObserverCallback) {}
  disconnect() { this.targets.clear(); }
  observe(target: Element, options: ResizeObserverOptions = {}) {
    this.targets.set(target, options);
  }
  unobserve(target: Element) { this.targets.delete(target); }
  emit(entries: ResizeObserverEntry[]) {
    const observed = entries.filter(entry => this.targets.has(entry.target));
    if (observed.length) this.callback(observed, this);
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;
globalThis.ResizeObserver = MockResizeObserver;
