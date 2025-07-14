import * as React from "react";
import { Button, ButtonProps } from "@/shared/ui/button";
import { useTouch } from "@/shared/hooks/use-touch";
import { cn } from "@/shared/lib/utils";

interface TouchButtonProps extends ButtonProps {
  onLongPress?: () => void;
  longPressDelay?: number;
  enableHaptic?: boolean;
}

export const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ 
    className, 
    onLongPress, 
    longPressDelay = 500, 
    enableHaptic = false,
    onClick,
    children,
    ...props 
  }, ref) => {
    const handleTap = React.useCallback(() => {
      if (enableHaptic && 'vibrate' in navigator) {
        navigator.vibrate(10); // Short haptic feedback
      }
      onClick?.(undefined as any);
    }, [onClick, enableHaptic]);

    const handleLongPress = React.useCallback(() => {
      if (enableHaptic && 'vibrate' in navigator) {
        navigator.vibrate([10, 50, 10]); // Pattern for long press
      }
      onLongPress?.();
    }, [onLongPress, enableHaptic]);

    const { touchHandlers, isPressed } = useTouch({
      onTap: handleTap,
      onLongPress: onLongPress ? handleLongPress : undefined,
    }, { longPressDelay });

    return (
      <Button
        ref={ref}
        className={cn(
          // Enhanced touch targets - minimum 44px
          "min-h-[44px] min-w-[44px]",
          // Active state styling
          isPressed && "scale-95 opacity-90",
          // Smooth transitions
          "transition-all duration-150 ease-out",
          // Better touch feedback
          "active:scale-95 active:opacity-90",
          className
        )}
        {...touchHandlers}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

TouchButton.displayName = "TouchButton";