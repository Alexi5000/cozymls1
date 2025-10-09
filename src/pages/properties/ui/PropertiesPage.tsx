import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { useProperties } from '@/integrations/supabase/hooks';
import { PropertiesHeader, PropertiesFilters, PropertiesStats, PropertiesGrid } from '@/widgets/properties';
import { PropertiesGridSkeleton } from '@/shared/ui/property-skeleton';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function PropertiesPage() {
  const isMobile = useIsMobile();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data: properties, isLoading, refetch } = useProperties();
  
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const content = useMemo(() => {
    if (isLoading) {
      return <PropertiesGridSkeleton count={6} mobile={isMobile} />;
    }

    const dbProperties = properties || [];

    return (
      <div className="space-y-6 md:space-y-8 animate-slide-up">
        <PropertiesHeader />
        {!isMobile && <PropertiesFilters />}
        <PropertiesStats properties={dbProperties as any} />
        <Suspense 
          fallback={<PropertiesGridSkeleton count={6} mobile={isMobile} />}
        >
          <PropertiesGrid properties={dbProperties as any} />
        </Suspense>
      </div>
    );
  }, [isMobile, properties, isLoading]);

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