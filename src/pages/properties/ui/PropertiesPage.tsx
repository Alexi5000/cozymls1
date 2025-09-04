import React from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { PropertiesHeader, PropertiesFilters, PropertiesStats } from '@/widgets/properties';
import { FastPropertiesGrid } from '@/widgets/properties/ui/FastPropertiesGrid';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { PropertiesProvider, usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { ErrorBoundary } from '@/shared/ui/error-boundary';

function PropertiesContent() {
  const isMobile = useIsMobile();
  const propertiesContext = usePropertiesContext();
  
  if (!propertiesContext) {
    console.error('PropertiesContext is undefined');
    return <div>Loading...</div>;
  }
  
  const { refreshProperties } = propertiesContext;

  const content = (
    <div className="space-y-6 md:space-y-8">
      <PropertiesHeader />
      {!isMobile && <PropertiesFilters />}
      <PropertiesStats />
      <ErrorBoundary>
        <FastPropertiesGrid />
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