import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useTouch } from "@/shared/hooks/use-touch";
import { useSafeArea } from "@/shared/hooks/use-safe-area";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface MobileBottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  snapPoints?: string[];
  defaultSnap?: number;
}

export function MobileBottomSheet({ 
  children, 
  isOpen, 
  onClose, 
  title,
  className,
  snapPoints = ['90%', '50%', '25%'],
  defaultSnap = 0
}: MobileBottomSheetProps) {
  const [currentSnap, setCurrentSnap] = React.useState(defaultSnap);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [initialHeight, setInitialHeight] = React.useState(0);
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const { applySafeArea } = useSafeArea();

  const { touchHandlers } = useTouch({
    onSwipeDown: () => {
      if (currentSnap < snapPoints.length - 1) {
        setCurrentSnap(prev => prev + 1);
      } else {
        onClose();
      }
    },
  });

  // Handle manual dragging
  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setInitialHeight(sheetRef.current?.offsetHeight || 0);
  }, []);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    
    // Only allow dragging down
    if (deltaY > 0 && sheetRef.current) {
      const newHeight = Math.max(100, initialHeight - deltaY);
      sheetRef.current.style.height = `${newHeight}px`;
    }
  }, [isDragging, startY, initialHeight]);

  const handleTouchEnd = React.useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Snap to nearest point or close
    if (sheetRef.current) {
      const currentHeight = sheetRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const percentage = (currentHeight / windowHeight) * 100;
      
      if (percentage < 20) {
        onClose();
      } else {
        // Find nearest snap point
        const snapPercentages = snapPoints.map(point => parseInt(point));
        const nearest = snapPercentages.reduce((prev, curr) => 
          Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev
        );
        
        const newIndex = snapPercentages.indexOf(nearest);
        setCurrentSnap(newIndex);
        sheetRef.current.style.height = snapPoints[newIndex];
      }
    }
  }, [isDragging, snapPoints, onClose]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-card text-card-foreground rounded-t-2xl",
          "shadow-2xl transition-all duration-300 ease-out",
          "max-h-[90vh] flex flex-col",
          className
        )}
        style={{ 
          height: snapPoints[currentSnap],
          ...applySafeArea('bottom')
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Bottom sheet"}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title && (
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-auto text-muted-foreground hover:text-foreground"
            aria-label="Close bottom sheet"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto mobile-scroll-momentum">
          {children}
        </div>
      </div>
    </>
  );
}