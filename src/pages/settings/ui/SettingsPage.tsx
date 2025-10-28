import { useState } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ProfileSettings, SecuritySettings, AppPreferences } from '@/features/settings';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { User, Shield, Settings } from 'lucide-react';

export function SettingsPage() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleRefresh = async () => {
    // Refetch data if needed
  };

  const content = (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={isMobile ? "w-full grid grid-cols-3" : ""}>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {!isMobile && <span>Profile</span>}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {!isMobile && <span>Security</span>}
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {!isMobile && <span>Preferences</span>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <AppPreferences />
        </TabsContent>
      </Tabs>
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Settings" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Settings">
      {content}
    </Layout>
  );
}