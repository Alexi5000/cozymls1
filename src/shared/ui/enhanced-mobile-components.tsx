import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useResponsiveBreakpoint } from "@/shared/hooks/use-responsive-breakpoint";
import { Card } from "./card";
import { Button } from "./button";

interface MobilePageLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function MobilePageLayout({ 
  children, 
  title, 
  className,
  showBackButton,
  onBackClick 
}: MobilePageLayoutProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("min-h-screen bg-background mobile-safe-area-top", className)}>
      {title && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b mobile-safe-area-top">
          <div className="flex items-center gap-3 px-4 py-3">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBackClick}
                className="mobile-touch-target"
              >
                ←
              </Button>
            )}
            <h1 className="responsive-heading flex-1">{title}</h1>
          </div>
        </div>
      )}
      <div className="mobile-spacing mobile-safe-area-bottom">
        {children}
      </div>
    </div>
  );
}

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onTap?: () => void;
}

export function ResponsiveCard({ 
  children, 
  className,
  interactive,
  onTap 
}: ResponsiveCardProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  const cardClasses = cn(
    'luxury-card',
    isMobile && 'mobile-card mobile-touch-target',
    interactive && 'cursor-pointer hover-lift',
    className
  );

  if (onTap) {
    return (
      <Card className={cardClasses} onClick={onTap}>
        {children}
      </Card>
    );
  }

  return (
    <Card className={cardClasses}>
      {children}
    </Card>
  );
}

interface ResponsiveListProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const gapClasses = {
  sm: 'space-y-2',
  md: 'space-y-3', 
  lg: 'space-y-4'
};

export function ResponsiveList({ children, className, gap = 'md' }: ResponsiveListProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  return (
    <div className={cn(
      gapClasses[gap],
      isMobile && 'mobile-stack',
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function ResponsiveHeader({ title, subtitle, actions, className }: ResponsiveHeaderProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  if (isMobile) {
    return (
      <div className={cn("mobile-spacing border-b bg-card", className)}>
        <div className="mobile-stack">
          <div>
            <h1 className="responsive-heading">{title}</h1>
            {subtitle && <p className="responsive-caption mt-1">{subtitle}</p>}
          </div>
          {actions && (
            <div className="flex gap-2 flex-wrap">
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-between responsive-padding border-b bg-card", className)}>
      <div>
        <h1 className="responsive-title">{title}</h1>
        {subtitle && <p className="responsive-caption mt-1">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}