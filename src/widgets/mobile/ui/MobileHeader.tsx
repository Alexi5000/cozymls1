import { useState } from 'react';
import { Search, Menu, Bell, User } from 'lucide-react';
import { TouchButton } from '@/shared/ui/touch-button';
import { Input } from '@/shared/ui/input';
import { MobileDrawer } from '@/shared/ui/mobile-drawer';
import { useSafeArea } from '@/shared/hooks/use-safe-area';
import { cn } from '@/shared/lib/utils';

interface MobileHeaderProps {
  title: string;
  showSearch?: boolean;
  onMenuClick?: () => void;
}

export function MobileHeader({ title, showSearch = true, onMenuClick }: MobileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { applySafeArea } = useSafeArea();

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-30",
          "bg-card/95 backdrop-blur-sm border-b border-border",
          "flex items-center justify-between px-4 h-14"
        )}
        style={applySafeArea('top')}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {onMenuClick && (
            <TouchButton
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </TouchButton>
          )}
          
          <h1 className="text-lg font-semibold text-foreground truncate">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <TouchButton
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </TouchButton>
          )}
          
          <TouchButton
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground relative"
          >
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
          </TouchButton>
          
          <TouchButton
            variant="ghost"
            size="icon"
            className="ml-1"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </TouchButton>
        </div>
      </header>

      {/* Search Drawer */}
      <MobileDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        position="top"
        title="Search"
      >
        <div className="p-4 space-y-4">
          <Input
            placeholder="Search properties, contacts, deals..."
            className="mobile-input"
            autoFocus
          />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
            <div className="space-y-1">
              {['Downtown properties', 'John Smith', 'Luxury listings'].map((search) => (
                <TouchButton
                  key={search}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                  {search}
                </TouchButton>
              ))}
            </div>
          </div>
        </div>
      </MobileDrawer>
    </>
  );
}