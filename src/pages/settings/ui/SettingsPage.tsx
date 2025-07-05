import { Layout } from '@/widgets/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Settings, User, Bell, Shield } from 'lucide-react';

export function SettingsPage() {
  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Manage your personal information, contact details, and profile preferences.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Configure email alerts, push notifications, and communication preferences.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Update your password, enable two-factor authentication, and manage security settings.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Configure application preferences, theme settings, and default values.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}