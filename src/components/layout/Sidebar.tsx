
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Target, 
  Calendar, 
  BarChart3, 
  Settings,
  Menu,
  X,
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Properties', href: '/contacts', icon: Target },
  { name: 'Agents', href: '/deals', icon: Users },
  { name: 'Showings', href: '/activities', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      'cozy-sidebar text-white transition-all duration-300 flex flex-col shadow-xl',
      collapsed ? 'w-20' : 'w-72'
    )}>
      {/* Header */}
      <div className="p-6 border-b border-orange-700/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
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
            className="text-orange-200 hover:text-white hover:bg-orange-700/50 h-8 w-8"
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
                  'cozy-nav-item',
                  isActive && 'active',
                  collapsed && 'justify-center px-3'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-orange-700/50">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-700/30 cursor-pointer transition-colors">
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
  );
}
