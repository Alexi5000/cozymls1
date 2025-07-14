import React from 'react';
import { useResponsiveBreakpoint } from '@/shared/hooks/use-responsive-breakpoint';
import { Layout } from "@/widgets/layout/ui/Layout";
import { MobileLayout } from '@/widgets/mobile';
import { ResponsiveContainer } from '@/shared/ui';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  title: string;
  showSearch?: boolean;
  onRefresh?: () => Promise<void>;
  className?: string;
}

export function ResponsiveLayout({ 
  children, 
  title, 
  showSearch = true,
  onRefresh,
  className 
}: ResponsiveLayoutProps) {
  const { isMobile } = useResponsiveBreakpoint();

  if (isMobile) {
    return (
      <MobileLayout 
        title={title}
        showSearch={showSearch}
        onRefresh={onRefresh}
        className={className}
      >
        {children}
      </MobileLayout>
    );
  }

  return (
    <Layout title={title}>
      {children}
    </Layout>
  );
}