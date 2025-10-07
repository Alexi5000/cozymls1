import React from 'react';
import { useAuth } from '@/shared/hooks/use-auth';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { User, Settings, Bell, CreditCard, HelpCircle, LogOut, Shield, Activity } from 'lucide-react';

interface UserAccountDropdownProps {
  onClose: () => void;
}

export function UserAccountDropdown({ onClose }: UserAccountDropdownProps) {
  const { user, signOut } = useAuth();

  const userInfo = {
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    role: 'Real Estate Agent',
    initials: (user?.user_metadata?.name || user?.email || 'U')
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    accountType: 'Agent'
  };

  const handleNavigation = (page: string) => {
    console.log(`Navigate to ${page}`);
    onClose();
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  return (
    <Card className="absolute right-0 top-12 w-80 bg-white border shadow-luxury z-50 animate-scale-in">
      <CardHeader className="pb-3">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
              {userInfo.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate">{userInfo.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {userInfo.accountType}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
            <p className="text-xs text-muted-foreground">{userInfo.role}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Quick Stats */}
        <div className="p-4 bg-muted/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Active Listings</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">€2.4M</p>
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Navigation Menu */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('profile')}
          >
            <User className="h-4 w-4 mr-3" />
            My Profile
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('activity')}
          >
            <Activity className="h-4 w-4 mr-3" />
            Recent Activity
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('billing')}
          >
            <CreditCard className="h-4 w-4 mr-3" />
            Billing & Subscription
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('notifications')}
          >
            <Bell className="h-4 w-4 mr-3" />
            Notification Settings
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('privacy')}
          >
            <Shield className="h-4 w-4 mr-3" />
            Privacy & Security
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handleNavigation('settings')}
          >
            <Settings className="h-4 w-4 mr-3" />
            Account Settings
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
          
          <Separator className="my-2" />
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}