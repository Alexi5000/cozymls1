import { Layout } from '@/widgets/layout';
import { mockProperties } from '@/entities/property';
import { PropertiesHeader, PropertiesFilters, PropertiesStats, PropertiesGrid } from '@/widgets/properties';

export function PropertiesPage() {
  return (
    <Layout title="Properties">
      <div className="space-y-8">
        <PropertiesHeader />
        <PropertiesFilters />
        <PropertiesStats properties={mockProperties} />
        <PropertiesGrid properties={mockProperties} />
      </div>
    </Layout>
  );
}