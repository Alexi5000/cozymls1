import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { mockProperties } from '@/entities/property';
import { PropertiesHeader, PropertiesFilters, PropertiesStats, PropertiesGrid } from '@/widgets/properties';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function PropertiesPage() {
  const isMobile = useIsMobile();
  
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const content = (
    <div className="space-y-6 md:space-y-8">
      <PropertiesHeader />
      {!isMobile && <PropertiesFilters />}
      <PropertiesStats properties={mockProperties} />
      <PropertiesGrid properties={mockProperties} />
    </div>
  );

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