import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { useTouch } from "@/shared/hooks/use-touch";

const mobileButtonVariants = cva(
  "mobile-touch-target mobile-tap-highlight-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors mobile-focus disabled:pointer-events-none disabled:opacity-50 mobile-will-change",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 mobile-press",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 mobile-press",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground mobile-press",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 mobile-press",
        ghost: "hover:bg-accent hover:text-accent-foreground mobile-press",
        link: "text-primary underline-offset-4 hover:underline mobile-press",
        floating: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl mobile-press rounded-full",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-8 text-base", 
        icon: "h-11 w-11",
        xl: "h-14 px-10 text-lg", // Extra large for primary mobile actions
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface MobileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileButtonVariants> {
  asChild?: boolean;
  onTap?: () => void;
  onLongPress?: () => void;
  enableHaptic?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    onTap,
    onLongPress,
    enableHaptic = false,
    loading = false,
    loadingText = "Loading...",
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";

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
    });

    return (
      <Comp
        className={cn(
          mobileButtonVariants({ variant, size, fullWidth, className }),
          isPressed && "scale-[0.98] opacity-90",
          loading && "opacity-60 pointer-events-none"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...touchHandlers}
        {...props}
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

MobileButton.displayName = "MobileButton";

export { MobileButton, mobileButtonVariants };