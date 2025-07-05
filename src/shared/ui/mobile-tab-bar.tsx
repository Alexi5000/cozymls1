import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useSafeArea } from "@/shared/hooks/use-safe-area";
import { LucideIcon } from "lucide-react";

interface TabItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface MobileTabBarProps {
  items: TabItem[];
  className?: string;
}

export function MobileTabBar({ items, className }: MobileTabBarProps) {
  const location = useLocation();
  const { applySafeArea } = useSafeArea();

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-card border-t border-border",
        "flex items-center justify-around",
        "h-16 shadow-lg z-40",
        className
      )}
      style={applySafeArea('bottom')}
    >
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center",
              "min-w-[60px] min-h-[44px] px-2 py-1",
              "text-xs font-medium transition-colors duration-200",
              "relative",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="relative">
              <Icon className={cn(
                "h-5 w-5 mb-1",
                isActive && "drop-shadow-sm"
              )} />
              
              {/* Badge */}
              {item.badge && item.badge > 0 && (
                <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {item.badge > 99 ? '99+' : item.badge}
                </div>
              )}
            </div>
            
            <span className="truncate max-w-[60px]">{item.label}</span>
            
            {/* Active indicator */}
            {isActive && (
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}