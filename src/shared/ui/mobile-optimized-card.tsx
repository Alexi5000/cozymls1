import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import { useTouch } from "@/shared/hooks/use-touch";

interface MobileOptimizedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  onTap?: () => void;
  onLongPress?: () => void;
  enableHaptic?: boolean;
  swipeActions?: {
    left?: () => void;
    right?: () => void;
  };
  variant?: 'default' | 'compact' | 'featured';
}

export const MobileOptimizedCard = React.forwardRef<HTMLDivElement, MobileOptimizedCardProps>(
  ({ 
    className, 
    title,
    subtitle,
    onTap, 
    onLongPress, 
    enableHaptic = false,
    swipeActions,
    variant = 'default',
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

    const getVariantClasses = () => {
      switch (variant) {
        case 'compact':
          return 'mobile-shadow p-3';
        case 'featured':
          return 'mobile-shadow-lg border-primary/20 bg-gradient-to-br from-card to-card/80';
        default:
          return 'mobile-shadow';
      }
    };

    return (
      <Card
        ref={ref}
        className={cn(
          // Base mobile card styling
          "mobile-card mobile-tap-highlight-none transition-all duration-150",
          getVariantClasses(),
          // Touch feedback
          isPressed && "mobile-press opacity-90",
          // Cursor pointer if interactive
          (onTap || onLongPress) && "cursor-pointer",
          className
        )}
        {...touchHandlers}
        {...props}
      >
        {(title || subtitle) && (
          <CardHeader className={cn(
            variant === 'compact' ? 'pb-2' : 'pb-3'
          )}>
            {title && (
              <CardTitle className={cn(
                "mobile-title",
                variant === 'compact' && 'text-base'
              )}>
                {title}
              </CardTitle>
            )}
            {subtitle && (
              <p className="mobile-subtitle">{subtitle}</p>
            )}
          </CardHeader>
        )}
        
        <CardContent className={cn(
          variant === 'compact' ? 'pt-0 p-3' : 'pt-0'
        )}>
          {children}
        </CardContent>
        
        {/* Swipe indicator */}
        {swipeActions && (
          <div className="swipe-indicator" />
        )}
      </Card>
    );
  }
);

MobileOptimizedCard.displayName = "MobileOptimizedCard";