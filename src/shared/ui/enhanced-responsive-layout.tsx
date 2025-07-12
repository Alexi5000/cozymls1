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
  gap?: 'sm' | 'md' | 'lg' | 'responsive';
  className?: string;
}

const gapClasses = {
  sm: 'gap-2 sm:gap-3',
  md: 'gap-3 sm:gap-4 md:gap-6',
  lg: 'gap-4 sm:gap-6 md:gap-8',
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

interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: 'column' | 'row-on-desktop';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'sm' | 'md' | 'lg' | 'responsive';
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
  className 
}: ResponsiveStackProps) {
  const stackClasses = cn(
    'flex',
    direction === 'column' ? 'flex-col' : 'flex-col lg:flex-row',
    alignClasses[align],
    gapClasses[gap],
    className
  );
  
  return (
    <div className={stackClasses}>
      {children}
    </div>
  );
}