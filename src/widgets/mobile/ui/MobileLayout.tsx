import { MobileHeader } from './MobileHeader';
import { MobileNavigation } from './MobileNavigation';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { PullToRefresh } from '@/shared/ui/pull-to-refresh';
import { cn } from '@/shared/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  title: string;
  showSearch?: boolean;
  onRefresh?: () => Promise<void>;
  className?: string;
}

export function MobileLayout({ 
  children, 
  title, 
  showSearch = true,
  onRefresh,
  className 
}: MobileLayoutProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null; // Return null if not mobile, let desktop layout handle it
  }

  const content = onRefresh ? (
    <PullToRefresh onRefresh={onRefresh}>
      {children}
    </PullToRefresh>
  ) : children;

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={title} showSearch={showSearch} />
      
      <main 
        className={cn(
          "pt-14 pb-20 min-h-screen", // Account for header and nav heights
          "mobile-scroll-momentum",
          className
        )}
      >
        <div className="mobile-spacing">
          {content}
        </div>
      </main>
      
      <MobileNavigation />
    </div>
  );
}