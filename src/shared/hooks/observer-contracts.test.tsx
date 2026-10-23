import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MockIntersectionObserver, MockResizeObserver } from '@/test/setup';
import { useScrollAnimation, useStaggeredAnimation } from './use-scroll-animation';
import { useIntersectionObserver, usePerformanceMonitor } from './use-performance';

afterEach(() => {
  vi.restoreAllMocks();
  delete window.gtag;
});

function entry(target: Element, isIntersecting: boolean): IntersectionObserverEntry {
  return { target, isIntersecting } as IntersectionObserverEntry;
}

describe('browser observer contracts', () => {
  it('preserves scroll visibility callbacks, thresholds, margins and cleanup', () => {
    let observer: MockIntersectionObserver;
    vi.spyOn(globalThis, 'IntersectionObserver').mockImplementation(function(callback, options) {
      observer = new MockIntersectionObserver(callback, options);
      return observer;
    });
    function Animated() {
      const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.6, rootMargin: '20px', triggerOnce: false });
      return <div ref={elementRef} data-testid="animated" data-visible={isVisible} />;
    }
    const view = render(<Animated />);
    const element = screen.getByTestId('animated');
    expect(observer!.thresholds).toEqual([0.6]);
    expect(observer!.rootMargin).toBe('20px');
    act(() => observer!.emit([entry(element, false)]));
    expect(element).toHaveAttribute('data-visible', 'false');
    act(() => observer!.emit([entry(element, true)]));
    expect(element).toHaveAttribute('data-visible', 'true');
    const cleanup = vi.spyOn(observer!, 'unobserve');
    view.unmount();
    expect(cleanup).toHaveBeenCalledWith(element);
  });

  it('retains lazy viewport class behavior and caller options', () => {
    let observer: MockIntersectionObserver;
    vi.spyOn(globalThis, 'IntersectionObserver').mockImplementation(function(callback, options) {
      observer = new MockIntersectionObserver(callback, options);
      return observer;
    });
    function Viewport() {
      const ref = useIntersectionObserver({ threshold: [0.75, 0.25], rootMargin: '10px' });
      return <section ref={ref} data-testid="viewport" />;
    }
    const view = render(<Viewport />);
    const element = screen.getByTestId('viewport');
    expect(observer!.thresholds).toEqual([0.25, 0.75]);
    expect(observer!.rootMargin).toBe('10px');
    act(() => observer!.emit([entry(element, false)]));
    expect(element).not.toHaveClass('in-viewport');
    act(() => observer!.emit([entry(element, true)]));
    expect(element).toHaveClass('in-viewport');
    const cleanup = vi.spyOn(observer!, 'unobserve');
    view.unmount();
    expect(cleanup).toHaveBeenCalledWith(element);
  });

  it('dispatches resize callbacks only for observed targets and disconnects', () => {
    const callback = vi.fn();
    const observer = new ResizeObserver(callback) as MockResizeObserver;
    const target = document.createElement('div');
    const other = document.createElement('div');
    observer.observe(target, { box: 'border-box' });
    const record = { target } as ResizeObserverEntry;
    observer.emit([record, { target: other } as ResizeObserverEntry]);
    expect(callback).toHaveBeenCalledWith([record], observer);
    observer.disconnect();
    observer.emit([record]);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('keeps immediate stagger visibility and the scroll observer lifecycle', () => {
    const observe = vi.spyOn(MockIntersectionObserver.prototype, 'observe');
    const unobserve = vi.spyOn(MockIntersectionObserver.prototype, 'unobserve');
    function Staggered() {
      const { elementRef, isItemVisible } = useStaggeredAnimation(['first', 'second'], 100);
      return <div ref={elementRef} data-testid="staggered" data-visible={isItemVisible()} />;
    }
    const view = render(<Staggered />);
    expect(screen.getByTestId('staggered')).toHaveAttribute('data-visible', 'true');
    expect(observe).toHaveBeenCalledTimes(1);
    view.unmount();
    expect(unobserve).toHaveBeenCalledTimes(1);
  });

  it('still emits the existing performance metrics to analytics', () => {
    window.gtag = vi.fn();
    function Monitored() {
      usePerformanceMonitor('Report');
      return null;
    }
    render(<Monitored />);
    expect(window.gtag).toHaveBeenCalledWith('event', 'component_render', expect.objectContaining({
      custom_component_name: 'Report', custom_render_count: 1,
      custom_render_time: expect.any(Number), custom_timestamp: expect.any(Number),
    }));
  });
});
