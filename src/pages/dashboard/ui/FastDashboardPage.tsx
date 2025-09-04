import React from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { FastDashboardStats } from '@/widgets/dashboard/ui/FastDashboardStats';
import { RecentActivity } from '@/widgets/dashboard';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function FastDashboardPage() {
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your real estate CRM</p>
      </div>
      
      <FastDashboardStats />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Dashboard">
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Dashboard">
      {content}
    </Layout>
  );
}