
import { Layout } from '@/components/layout/Layout';
import { mockProperties } from '@/lib/mock-mls-data';
import { PropertiesHeader } from '@/components/properties/PropertiesHeader';
import { PropertiesFilters } from '@/components/properties/PropertiesFilters';
import { PropertiesStats } from '@/components/properties/PropertiesStats';
import { PropertiesGrid } from '@/components/properties/PropertiesGrid';

export default function Properties() {
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
