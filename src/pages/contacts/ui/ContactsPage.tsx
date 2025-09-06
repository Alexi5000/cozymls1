import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { ContactsHeader, ContactsGrid } from '@/widgets/contacts';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function ContactsPage() {
  const isMobile = useIsMobile();

  const handleRefresh = async () => {
    // Instant refresh - no artificial delays
  };

  const content = (
    <div className="space-y-6">
      <ContactsHeader />
      <ContactsGrid />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Contacts" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Contacts">
      {content}
    </Layout>
  );
}
