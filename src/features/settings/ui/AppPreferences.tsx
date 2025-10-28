import { useThemeStore } from '@/shared/lib/theme-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { Separator } from '@/shared/ui/separator';
import { Moon, Sun, Bell, RefreshCw } from 'lucide-react';

export function AppPreferences() {
  const { theme, autoRefresh, notifications, toggleTheme, setAutoRefresh, setNotifications } = useThemeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Preferences</CardTitle>
        <CardDescription>
          Customize your app experience and behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
            <div className="space-y-0.5">
              <Label htmlFor="theme-toggle">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
          </div>
          <Switch
            id="theme-toggle"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-0.5">
              <Label htmlFor="notifications-toggle">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for new properties and updates
              </p>
            </div>
          </div>
          <Switch
            id="notifications-toggle"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-0.5">
              <Label htmlFor="autorefresh-toggle">Auto-refresh Data</Label>
              <p className="text-sm text-muted-foreground">
                Keep property data up to date automatically
              </p>
            </div>
          </div>
          <Switch
            id="autorefresh-toggle"
            checked={autoRefresh}
            onCheckedChange={setAutoRefresh}
          />
        </div>
      </CardContent>
    </Card>
  );
}
