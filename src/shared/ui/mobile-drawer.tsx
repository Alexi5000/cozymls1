import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useTouch } from "@/shared/hooks/use-touch";
import { useSafeArea } from "@/shared/hooks/use-safe-area";
import { X } from "lucide-react";
import { Button } from "./button";

interface MobileDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'bottom' | 'top';
  title?: string;
  className?: string;
}

export function MobileDrawer({ 
  children, 
  isOpen, 
  onClose, 
  position = 'left',
  title,
  className 
}: MobileDrawerProps) {
  const { applySafeArea } = useSafeArea();
  const { touchHandlers } = useTouch({
    onSwipeLeft: position === 'right' ? onClose : undefined,
    onSwipeRight: position === 'left' ? onClose : undefined,
    onSwipeDown: position === 'bottom' ? onClose : undefined,
  });

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getDrawerClasses = () => {
    const baseClasses = "fixed bg-card text-card-foreground shadow-2xl transition-transform duration-300 ease-out z-50";
    
    switch (position) {
      case 'left':
        return cn(
          baseClasses,
          "top-0 left-0 h-full w-80 max-w-[85vw]",
          "transform translate-x-0",
          className
        );
      case 'right':
        return cn(
          baseClasses,
          "top-0 right-0 h-full w-80 max-w-[85vw]",
          "transform translate-x-0",
          className
        );
      case 'top':
        return cn(
          baseClasses,
          "top-0 left-0 right-0 max-h-[85vh] rounded-b-2xl",
          "transform translate-y-0",
          className
        );
      case 'bottom':
        return cn(
          baseClasses,
          "bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl",
          "transform translate-y-0",
          className
        );
      default:
        return cn(baseClasses, className);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        className={getDrawerClasses()}
        style={applySafeArea('all')}
        {...touchHandlers}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Mobile drawer"}
      >
        {/* Header */}
        {(title || position !== 'bottom') && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-auto text-muted-foreground hover:text-foreground"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        
        {/* Handle for bottom drawer */}
        {position === 'bottom' && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
        )}
      </div>
    </>
  );
}