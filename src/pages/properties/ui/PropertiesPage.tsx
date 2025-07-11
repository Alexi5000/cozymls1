import React, { Suspense } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { PropertiesHeader, PropertiesFilters, PropertiesStats, PropertiesGrid } from '@/widgets/properties';
import { PropertiesGridSkeleton } from '@/shared/ui/property-skeleton';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { PropertiesProvider, usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { ErrorBoundary } from '@/shared/ui/error-boundary';

function PropertiesContent() {
  const isMobile = useIsMobile();
  const { refreshProperties } = usePropertiesContext();

  const content = (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      <PropertiesHeader />
      {!isMobile && <PropertiesFilters />}
      <PropertiesStats />
      <ErrorBoundary>
        <Suspense fallback={<PropertiesGridSkeleton count={6} mobile={isMobile} />}>
          <PropertiesGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Properties" onRefresh={refreshProperties}>
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

export function PropertiesPage() {
  return (
    <PropertiesProvider>
      <PropertiesContent />
    </PropertiesProvider>
  );
}