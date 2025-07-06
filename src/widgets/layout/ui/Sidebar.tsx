import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  Calendar, 
  BarChart3, 
  Settings,
  Menu,
  X,
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { useIsMobile } from '@/shared/hooks/use-mobile';

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
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Auto-collapse on mobile, allow manual toggle on desktop
  const isCollapsed = isMobile || collapsed;

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
      
      <div className={cn(
      'cozy-sidebar text-white transition-all duration-300 flex flex-col shadow-xl',
      'md:relative fixed md:translate-x-0 z-50 h-full',
      isMobile ? (collapsed ? '-translate-x-full w-0' : 'translate-x-0 w-72 mobile-safe-area-left') : (collapsed ? 'w-16' : 'w-64')
    )}>
      {/* Header */}
      <div className={cn(
        "p-6 border-b border-orange-700/50",
        isMobile && "mobile-safe-area-top pt-8"
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "text-orange-200 hover:text-white hover:bg-orange-700/50 h-8 w-8",
              isMobile && "mobile-touch-target"
            )}
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
               <Link
                key={item.name}
                to={item.href}
                 className={cn(
                   'cozy-nav-item mobile-tap-highlight-none',
                   isActive && 'active',
                   isCollapsed && 'justify-center px-3',
                   isMobile && 'mobile-touch-target py-4'
                 )}
                 onClick={() => isMobile && setCollapsed(true)}
               >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* User Profile */}
      {!isCollapsed && (
        <div className={cn(
          "p-4 border-t border-orange-700/50",
          isMobile && "mobile-safe-area-bottom pb-8"
        )}>
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg hover:bg-orange-700/30 cursor-pointer transition-colors",
            isMobile && "mobile-touch-target mobile-tap-highlight-none"
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
        </div>
      )}
      </div>
    </>
  );
}