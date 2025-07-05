import * as React from "react";
import { useIsMobile } from "@/shared/hooks/use-mobile";

interface AdaptiveLayoutProps {
  children: React.ReactNode;
  mobileChildren?: React.ReactNode;
  className?: string;
}

export function AdaptiveLayout({ children, mobileChildren, className }: AdaptiveLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={className}>
      {isMobile && mobileChildren ? mobileChildren : children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 3, tablet: 4, desktop: 6 },
  className 
}: ResponsiveGridProps) {
  const gridCols = `grid-cols-${cols.mobile} md:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`;
  const gridGap = `gap-${gap.mobile} md:gap-${gap.tablet} lg:gap-${gap.desktop}`;
  
  return (
    <div className={`grid ${gridCols} ${gridGap} ${className}`}>
      {children}
    </div>
  );
}