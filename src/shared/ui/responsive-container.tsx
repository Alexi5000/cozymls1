import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useResponsiveBreakpoint } from "@/shared/hooks/use-responsive-breakpoint";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  as?: keyof JSX.IntrinsicElements;
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = "lg",
  padding = "md",
  as: Component = "div",
  ...props
}: ResponsiveContainerProps) {
  const { isMobile, isTablet } = useResponsiveBreakpoint();

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-full"
  };

  const paddingClasses = {
    none: "",
    sm: isMobile ? "px-3" : "px-4",
    md: isMobile ? "px-4" : isTablet ? "px-6" : "px-8",
    lg: isMobile ? "px-6" : isTablet ? "px-8" : "px-12"
  };

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ResponsiveStackProps {
  children: React.ReactNode;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  align?: "start" | "center" | "end" | "stretch";
}

export function ResponsiveStack({
  children,
  spacing = "md",
  className,
  align = "stretch"
}: ResponsiveStackProps) {
  const { isMobile } = useResponsiveBreakpoint();

  const spacingClasses = {
    xs: isMobile ? "space-y-1" : "space-y-2",
    sm: isMobile ? "space-y-2" : "space-y-3",
    md: isMobile ? "space-y-3" : "space-y-4",
    lg: isMobile ? "space-y-4" : "space-y-6",
    xl: isMobile ? "space-y-6" : "space-y-8"
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center", 
    end: "items-end",
    stretch: "items-stretch"
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        spacingClasses[spacing],
        alignClasses[align],
        className
      )}
    >
      {children}
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
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  minItemWidth?: string;
}

export function ResponsiveGridContainer({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  className,
  minItemWidth = "280px"
}: ResponsiveGridProps) {
  const { isMobile, isTablet } = useResponsiveBreakpoint();

  const gapClasses = {
    xs: isMobile ? "gap-1" : "gap-2",
    sm: isMobile ? "gap-2" : "gap-3",
    md: isMobile ? "gap-3" : "gap-4",
    lg: isMobile ? "gap-4" : "gap-6",
    xl: isMobile ? "gap-6" : "gap-8"
  };

  // Use auto-fit for flexible layouts
  const gridStyle = minItemWidth 
    ? { gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))` }
    : {};

  const gridCols = !minItemWidth 
    ? `grid-cols-${cols.mobile} md:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`
    : "";

  return (
    <div
      className={cn(
        "grid",
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