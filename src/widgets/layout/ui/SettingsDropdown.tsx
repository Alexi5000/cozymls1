import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/shared/lib/theme-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Switch } from '@/shared/ui/switch';
import { Settings, Bell, User, Eye, Moon, Globe, Shield, HelpCircle } from 'lucide-react';

interface SettingsDropdownProps {
  onClose: () => void;
}

export function SettingsDropdown({ onClose }: SettingsDropdownProps) {
  const navigate = useNavigate();
  const { theme, notifications, autoRefresh, toggleTheme, setNotifications, setAutoRefresh } = useThemeStore();

  const handleNavigation = (page: string) => {
    navigate('/settings');
    onClose();
  };

  return (
    <Card className="absolute right-0 top-12 w-72 bg-white border shadow-luxury z-50 animate-scale-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Quick toggles */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive alerts for new properties</p>
              </div>
            </div>
            <Switch 
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Switch to dark theme</p>
              </div>
            </div>
            <Switch 
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Auto-refresh Data</p>
                <p className="text-xs text-muted-foreground">Keep property data up to date</p>
              </div>
            </div>
            <Switch 
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Navigation options */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('settings')}
          >
            <User className="h-4 w-4 mr-3" />
            All Settings
          </Button>
          
          <Separator className="my-2" />
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('help')}
          >
            <HelpCircle className="h-4 w-4 mr-3" />
            Help & Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}