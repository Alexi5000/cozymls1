import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './pagination';

interface DataPaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelect?: boolean;
  from: number;
  to: number;
}

export function DataPagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeSelect = true,
  from,
  to,
}: DataPaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
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
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          Showing {from + 1} to {Math.min(to + 1, totalItems)} of {totalItems} results
        </span>
        {showPageSizeSelect && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Show</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(1)}
              disabled={page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>

          {pageNumbers.map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={pageNum === page}
                  onClick={() => onPageChange(pageNum as number)}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
          
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
