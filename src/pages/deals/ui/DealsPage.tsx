import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { DealsHeader, DealsGrid } from '@/widgets/deals';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function DealsPage() {
  const isMobile = useIsMobile();

  const handleRefresh = async () => {
    // Instant refresh - no artificial delays
  };

  const content = (
    <div className="space-y-6">
      <DealsHeader />
      <DealsGrid />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Deals" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Deals">
      {content}
    </Layout>
  );
}
