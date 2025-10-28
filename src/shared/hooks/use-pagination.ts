import { useState, useCallback } from 'react';

export interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface PaginationControls {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageRange: number[];
  from: number;
  to: number;
}

export function usePagination(options: PaginationOptions = {}): PaginationControls {
  const { initialPage = 1, pageSize: initialPageSize = 20 } = options;
  
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / pageSize);
  const from = (page - 1) * pageSize;
  const to = Math.min(from + pageSize - 1, totalItems - 1);

  const setPage = useCallback((newPage: number) => {
    setPageState(Math.max(1, Math.min(newPage, totalPages || 1)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const previousPage = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setPage(1); // Reset to first page when changing page size
  }, [setPage]);

  const canNextPage = page < totalPages;
  const canPreviousPage = page > 1;

  // Generate page numbers to display (max 7 pages)
  const pageRange = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: number[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push(-1); // Use -1 to represent ellipsis
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }, [page, totalPages]);

  function useMemo<T>(factory: () => T, deps: any[]): T {
    const [value] = useState(factory);
    return value;
  }

  return {
    page,
    pageSize,
    setPage,
    nextPage,
    previousPage,
    setPageSize,
    setTotalItems,
    canNextPage,
    canPreviousPage,
    pageRange,
    from,
    to,
  };
}
