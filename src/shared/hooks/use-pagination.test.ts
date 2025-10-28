import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from './use-pagination';

describe('usePagination', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => usePagination());
    
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(20);
  });

  it('initializes with custom values', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 2, pageSize: 50 })
    );
    
    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(50);
  });

  it('navigates to next page', () => {
    const { result } = renderHook(() => usePagination());
    
    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.page).toBe(2);
  });

  it('navigates to previous page', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 3 })
    );
    
    act(() => {
      result.current.previousPage();
    });
    
    expect(result.current.page).toBe(2);
  });

  it('does not go below page 1', () => {
    const { result } = renderHook(() => usePagination());
    
    act(() => {
      result.current.previousPage();
    });
    
    expect(result.current.page).toBe(1);
  });

  it('navigates to specific page', () => {
    const { result } = renderHook(() => usePagination());
    
    act(() => {
      result.current.setTotalItems(100);
      result.current.setPage(5);
    });
    
    expect(result.current.page).toBe(5);
  });

  it('changes page size and resets to page 1', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 3 })
    );
    
    act(() => {
      result.current.setPageSize(50);
    });
    
    expect(result.current.pageSize).toBe(50);
    expect(result.current.page).toBe(1);
  });

  it('calculates from/to range correctly', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 3, pageSize: 10 })
    );
    
    act(() => {
      result.current.setTotalItems(100);
    });
    
    expect(result.current.from).toBe(20); // (3 - 1) * 10
    expect(result.current.to).toBe(29);   // from + pageSize - 1
  });

  it('tracks navigation state correctly', () => {
    const { result } = renderHook(() => usePagination());
    
    act(() => {
      result.current.setTotalItems(100);
    });
    
    // First page
    expect(result.current.canPreviousPage).toBe(false);
    expect(result.current.canNextPage).toBe(true);
    
    // Navigate to middle page
    act(() => {
      result.current.setPage(3);
    });
    
    expect(result.current.canPreviousPage).toBe(true);
    expect(result.current.canNextPage).toBe(true);
    
    // Navigate to last page
    act(() => {
      result.current.setPage(5); // 100 items / 20 per page = 5 pages
    });
    
    expect(result.current.canPreviousPage).toBe(true);
    expect(result.current.canNextPage).toBe(false);
  });

  it('generates correct page range', () => {
    const { result } = renderHook(() => usePagination());
    
    act(() => {
      result.current.setTotalItems(200); // 10 pages
      result.current.setPage(5);
    });
    
    // Should show pages around current page (1, ..., 3, 4, 5, 6, 7, ..., 10)
    expect(result.current.pageRange).toContain(1);
    expect(result.current.pageRange).toContain(5);
    expect(result.current.pageRange).toContain(10);
  });
});
