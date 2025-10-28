import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { StatsCard, RecentActivity, DealsOverview } from '@/widgets/dashboard';
import { HeroSection } from '@/widgets/dashboard/ui/HeroSection';
import { MarketInsights } from '@/widgets/dashboard/ui/MarketInsights';
import { useDashboardStats } from '@/integrations/supabase/hooks';
import { useDeals } from '@/integrations/supabase/hooks/use-deals';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import { AdaptiveLayout, ResponsiveGrid } from '@/shared/ui/adaptive-layout';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/shared/ui/skeleton';
import { logger } from '@/shared/lib/logger';

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDashboardStats();
  const { data: deals, refetch: refetchDeals } = useDeals();
  const isMobile = useIsMobile();
  const { elementRef: contentRef, isVisible } = useScrollAnimation();

  logger.database('QUERY', 'dashboard_stats', stats);

  const handleRefresh = async () => {
    logger.ui('DashboardPage', 'Refreshing dashboard data');
    await Promise.all([refetchStats(), refetchDeals()]);
  };

  // Calculate pending sales (deals in proposal stage)
  const pendingSalesCount = deals?.filter(d => d.stage === 'proposal').length || 0;

  if (statsLoading) {
    return (
      <Layout title="Dashboard">
        <div className="space-y-8">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const heroStats = {
    activeProperties: Number(stats?.active_deals || 0),
    pendingSales: Number(stats?.active_deals || 0),
    monthlyRevenue: Number(stats?.total_revenue || 0),
    newListings: Number(stats?.total_contacts || 0),
  };

  const content = (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Section */}
      <HeroSection userName="Dawn" stats={heroStats} />

      {/* Main Content with Scroll Animation */}
      <div 
        ref={contentRef}
        className={`space-y-8 transition-all duration-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {/* Enhanced Stats Grid */}
        <ResponsiveGrid 
          cols={{ mobile: 2, tablet: 2, desktop: 4 }}
          gap={{ mobile: 3, tablet: 4, desktop: 6 }}
        >
          <StatsCard
            title="Total Contacts"
            value={stats?.total_contacts?.toString() || '0'}
            change={`${Number(stats?.monthly_growth || 0).toFixed(1)}% growth`}
            icon={Users}
            trend={Number(stats?.monthly_growth || 0) >= 0 ? 'up' : 'down'}
          />
          <StatsCard
            title="Active Deals"
            value={stats?.active_deals?.toString() || '0'}
            change={`${pendingSalesCount} pending sales`}
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${((Number(stats?.total_revenue || 0)) / 1000).toFixed(1)}K`}
            change={`${Number(stats?.monthly_growth || 0).toFixed(1)}% growth`}
            icon={DollarSign}
            trend={Number(stats?.monthly_growth || 0) >= 0 ? 'up' : 'down'}
          />
          <StatsCard
            title="Growth Rate"
            value={`${Number(stats?.monthly_growth || 0).toFixed(1)}%`}
            change="vs last month"
            icon={Home}
            trend={Number(stats?.monthly_growth || 0) >= 0 ? 'up' : 'down'}
          />
        </ResponsiveGrid>

        {/* Main Content Grid - Enhanced */}
        <AdaptiveLayout
          mobileChildren={
            <div className="space-y-6">
              <RecentActivity />
              <MarketInsights />
              <DealsOverview />
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <MarketInsights />
              <DealsOverview />
            </div>
          </div>
        </AdaptiveLayout>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Dashboard" onRefresh={handleRefresh}>
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
