import { ResponsiveLayout, Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Settings, User, Bell, Shield } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export function SettingsPage() {
  const isMobile = useIsMobile();
  
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const content = (
    <div className="space-y-6">
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center gap-2",
              isMobile ? "mobile-title" : ""
            )}>
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={isMobile ? "mobile-body" : "text-gray-600"}>
              Manage your personal information, contact details, and profile preferences.
            </p>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center gap-2",
              isMobile ? "mobile-title" : ""
            )}>
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={isMobile ? "mobile-body" : "text-gray-600"}>
              Configure email alerts, push notifications, and communication preferences.
            </p>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center gap-2",
              isMobile ? "mobile-title" : ""
            )}>
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={isMobile ? "mobile-body" : "text-gray-600"}>
              Update your password, enable two-factor authentication, and manage security settings.
            </p>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center gap-2",
              isMobile ? "mobile-title" : ""
            )}>
              <Settings className="h-5 w-5" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={isMobile ? "mobile-body" : "text-gray-600"}>
              Configure application preferences, theme settings, and default values.
            </p>
          </CardContent>
        </Card>
      </div>
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