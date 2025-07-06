import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  Calendar, 
  BarChart3, 
  Settings,
  User,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/shared/ui/sidebar';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Agents', href: '/deals', icon: Users },
  { name: 'Showings', href: '/activities', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarPrimitive className="cozy-sidebar text-white">
      {/* Header */}
      <SidebarHeader className={cn(
        "p-6 border-b border-orange-700/50 mobile-safe-area-top"
      )}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded"></div>
              </div>
              <h2 className="text-xl font-bold">CozyMLS</h2>
            </div>
          )}
          <SidebarTrigger className={cn(
            "text-orange-200 hover:text-white hover:bg-orange-700/50 h-8 w-8",
            "mobile-touch-target"
          )} />
        </div>
      </SidebarHeader>
      
      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      className={cn(
                        'cozy-nav-item mobile-tap-highlight-none w-full',
                        isActive && 'active',
                        isCollapsed && 'justify-center px-3',
                        'mobile-touch-target py-4'
                      )}
                    >
                      <Link to={item.href}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="font-medium">{item.name}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* User Profile */}
      {!isCollapsed && (
        <SidebarFooter className={cn(
          "p-4 border-t border-orange-700/50 mobile-safe-area-bottom"
        )}>
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg hover:bg-orange-700/30 cursor-pointer transition-colors",
            "mobile-touch-target mobile-tap-highlight-none"
          )}>
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Sarah Thompson</p>
              <p className="text-xs text-orange-200">Real Estate Agent</p>
            </div>
            <ChevronDown className="h-4 w-4 text-orange-200" />
          </div>
        </SidebarFooter>
      )}
    </SidebarPrimitive>
  );
}