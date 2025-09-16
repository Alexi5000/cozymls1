import { Home, Building2, Users, Calendar, BarChart3, Settings } from 'lucide-react';
import { MobileTabBar } from '@/shared/ui/mobile-tab-bar';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/activities', label: 'Activities', icon: Calendar },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function MobileNavigation() {
  return <MobileTabBar items={navigationItems} />;
}