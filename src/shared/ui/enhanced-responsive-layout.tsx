import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useResponsiveBreakpoint } from "@/shared/hooks/use-responsive-breakpoint";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'responsive';
  as?: React.ElementType;
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm', 
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'p-2 sm:p-3',
  md: 'p-3 sm:p-4 md:p-6',
  lg: 'p-4 sm:p-6 md:p-8 lg:p-10',
  responsive: 'responsive-padding'
};

export function ResponsiveContainer({ 
  children, 
  className, 
  maxWidth = 'full',
  padding = 'responsive',
  as: Component = 'div',
  ...props 
}: ResponsiveContainerProps) {
  const { isMobile } = useResponsiveBreakpoint();

  return (
    <Component 
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        isMobile && 'mobile-container',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  className?: string;
}

interface ResponsiveGridContainerProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  minItemWidth?: string;
}

const gapClasses = {
  xs: 'gap-1 sm:gap-2',
  sm: 'gap-2 sm:gap-3',
  md: 'gap-3 sm:gap-4 md:gap-6',
  lg: 'gap-4 sm:gap-6 md:gap-8',
  xl: 'gap-6 sm:gap-8 md:gap-10',
  responsive: 'responsive-gap'
};

export function ResponsiveGrid({ 
  children, 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'responsive',
  className 
}: ResponsiveGridProps) {
  const gridCols = cn(
    'grid',
    `grid-cols-${columns.mobile}`,
    `md:grid-cols-${columns.tablet}`,
    `lg:grid-cols-${columns.desktop}`,
    gapClasses[gap]
  );
  
  return (
    <div className={cn(gridCols, className)}>
      {children}
    </div>
  );
}

export function ResponsiveGridContainer({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className,
  minItemWidth = '280px'
}: ResponsiveGridContainerProps) {
  const { isMobile, isTablet } = useResponsiveBreakpoint();

  const gapClasses = {
    xs: isMobile ? 'gap-1' : 'gap-2',
    sm: isMobile ? 'gap-2' : 'gap-3',
    md: isMobile ? 'gap-3' : 'gap-4',
    lg: isMobile ? 'gap-4' : 'gap-6',
    xl: isMobile ? 'gap-6' : 'gap-8'
  };

  // Use auto-fit for flexible layouts
  const gridStyle = minItemWidth 
    ? { gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))` }
    : {};

  const gridCols = !minItemWidth 
    ? `grid-cols-${cols.mobile} md:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`
    : '';

  return (
    <div
      className={cn(
        'grid',
        !minItemWidth && gridCols,
        gapClasses[gap],
        className
      )}
      style={gridStyle}
    >
      {children}
    </div>
  );
}

interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: 'column' | 'row-on-desktop';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // backward compatibility
  className?: string;
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center', 
  end: 'items-end',
  stretch: 'items-stretch'
};

export function ResponsiveStack({ 
  children, 
  direction = 'column',
  align = 'stretch',
  gap = 'md',
  spacing, // backward compatibility
  className 
}: ResponsiveStackProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  // Use spacing prop if provided for backward compatibility
  const finalGap = spacing || gap;
  
  const gapClasses = {
    xs: 'gap-1 sm:gap-2',
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4 md:gap-6',
    lg: 'gap-4 sm:gap-6 md:gap-8',
    xl: 'gap-6 sm:gap-8 md:gap-10',
    responsive: 'responsive-gap'
  };

  const stackClasses = cn(
    'flex',
    direction === 'column' ? 'flex-col' : 'flex-col lg:flex-row',
    alignClasses[align],
    gapClasses[finalGap] || gapClasses.md,
    className
  );
  
  return (
    <div className={stackClasses}>
      {children}
    </div>
  );
}