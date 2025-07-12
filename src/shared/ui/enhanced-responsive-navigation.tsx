import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useResponsiveBreakpoint } from "@/shared/hooks/use-responsive-breakpoint";
import { Button } from "./button";

interface ResponsiveNavigationProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'responsive';
}

export function ResponsiveNavigation({ 
  children, 
  className,
  orientation = 'responsive' 
}: ResponsiveNavigationProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  const navClasses = cn(
    'flex gap-2',
    orientation === 'vertical' || (orientation === 'responsive' && isMobile)
      ? 'flex-col' 
      : 'flex-row flex-wrap',
    className
  );

  return (
    <nav className={navClasses}>
      {children}
    </nav>
  );
}