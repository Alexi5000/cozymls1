import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { mockPropertiesLite } from '@/entities/property';
import { PropertiesHeader, PropertiesFilters, PropertiesStats, PropertiesGrid } from '@/widgets/properties';
import { PropertiesGridSkeleton } from '@/shared/ui/property-skeleton';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function PropertiesPage() {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Lightweight properties for instant loading
  const properties = useMemo(() => mockPropertiesLite, []);
  
  // Optimized refresh handler with loading states
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // In real app, you would refetch data here
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Optimized content with suspense boundary
  const content = useMemo(() => (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      <PropertiesHeader />
      {!isMobile && <PropertiesFilters />}
      <PropertiesStats properties={properties} />
      <Suspense 
        fallback={<PropertiesGridSkeleton count={6} mobile={isMobile} />}
      >
        <PropertiesGrid properties={properties} />
      </Suspense>
    </div>
  ), [isMobile, properties]);

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