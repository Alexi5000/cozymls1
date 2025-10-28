import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { useProperties } from '@/integrations/supabase/hooks';
import { PropertiesHeader, PropertiesFilters, PropertiesStats, PropertiesGrid } from '@/widgets/properties';
import { PropertiesGridSkeleton } from '@/shared/ui/property-skeleton';
import { DataPagination } from '@/shared/ui/data-pagination';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function PropertiesPage() {
  const isMobile = useIsMobile();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  const { data: propertiesData, isLoading, refetch } = useProperties({ page, pageSize });
  
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return <PropertiesGridSkeleton count={6} mobile={isMobile} />;
    }

    const properties = propertiesData?.data || [];
    const totalCount = propertiesData?.totalCount || 0;
    const totalPages = propertiesData?.totalPages || 1;
    const from = (page - 1) * pageSize;
    const to = Math.min(from + pageSize - 1, totalCount - 1);

    return (
      <div className="space-y-6 md:space-y-8 animate-slide-up">
        <PropertiesHeader />
        {!isMobile && <PropertiesFilters />}
        <PropertiesStats properties={properties as any} />
        <Suspense 
          fallback={<PropertiesGridSkeleton count={6} mobile={isMobile} />}
        >
          <PropertiesGrid properties={properties as any} />
        </Suspense>
        
        {totalCount > 0 && (
          <DataPagination
            page={page}
            pageSize={pageSize}
            totalItems={totalCount}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            from={from}
            to={to}
          />
        )}
      </div>
    );
  }, [isMobile, propertiesData, isLoading, page, pageSize, handlePageChange, handlePageSizeChange]);

  if (isMobile) {
    return (
      <MobileLayout title="Properties" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Properties">
      {content}
    </Layout>
  );
}