import React from 'react';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Layout } from './Layout';
import { MobileLayout } from '@/widgets/mobile';

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
  const isMobile = useIsMobile();

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