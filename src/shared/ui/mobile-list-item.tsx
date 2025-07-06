import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useTouch } from "@/shared/hooks/use-touch";
import { ChevronRight } from "lucide-react";

interface MobileListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  enableHaptic?: boolean;
  showChevron?: boolean;
  swipeActions?: {
    left?: () => void;
    right?: () => void;
  };
}

export const MobileListItem = React.forwardRef<HTMLDivElement, MobileListItemProps>(
  ({ 
    className, 
    title,
    subtitle,
    description,
    icon,
    badge,
    onTap, 
    onLongPress, 
    enableHaptic = false,
    showChevron = false,
    swipeActions,
    children, 
    ...props 
  }, ref) => {
    const handleTap = React.useCallback(() => {
      if (enableHaptic && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
      onTap?.();
    }, [onTap, enableHaptic]);

    const handleLongPress = React.useCallback(() => {
      if (enableHaptic && 'vibrate' in navigator) {
        navigator.vibrate([10, 50, 10]);
      }
      onLongPress?.();
    }, [onLongPress, enableHaptic]);

    const { touchHandlers, isPressed } = useTouch({
      onTap: onTap ? handleTap : undefined,
      onLongPress: onLongPress ? handleLongPress : undefined,
      onSwipeLeft: swipeActions?.left,
      onSwipeRight: swipeActions?.right,
    });

    return (
      <div
        ref={ref}
        className={cn(
          // Base mobile list item styling
          "mobile-touch-target mobile-tap-highlight-none",
          "flex items-center gap-3 p-4 bg-card rounded-lg",
          "border border-border transition-all duration-150",
          // Touch feedback
          isPressed && "mobile-press bg-muted/50",
          // Cursor pointer if interactive
          (onTap || onLongPress) && "cursor-pointer hover:bg-muted/30",
          className
        )}
        {...touchHandlers}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            {icon}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mobile-row mb-1">
            <h3 className="mobile-title truncate">{title}</h3>
            {badge}
          </div>
          
          {subtitle && (
            <p className="mobile-subtitle truncate mb-1">{subtitle}</p>
          )}
          
          {description && (
            <p className="mobile-caption line-clamp-2">{description}</p>
          )}
          
          {children}
        </div>
        
        {/* Chevron indicator */}
        {(showChevron || onTap) && (
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
        
        {/* Swipe indicator */}
        {swipeActions && (
          <div className="swipe-indicator" />
        )}
      </div>
    );
  }
);

MobileListItem.displayName = "MobileListItem";