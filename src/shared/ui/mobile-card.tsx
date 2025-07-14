import * as React from "react";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import { useTouch } from "@/shared/hooks/use-touch";

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onTap?: () => void;
  onLongPress?: () => void;
  enableHaptic?: boolean;
  swipeActions?: {
    left?: () => void;
    right?: () => void;
  };
}

export const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ 
    className, 
    onTap, 
    onLongPress, 
    enableHaptic = false,
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
      <Card
        ref={ref}
        className={cn(
          // Base mobile card styling
          "mobile-card transition-all duration-150",
          // Touch feedback
          isPressed && "scale-[0.98] opacity-90",
          // Cursor pointer if interactive
          (onTap || onLongPress) && "cursor-pointer",
          className
        )}
        {...touchHandlers}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

MobileCard.displayName = "MobileCard";