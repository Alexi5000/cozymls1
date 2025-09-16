import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { StatsCard, RecentActivity, DealsOverview } from '@/widgets/dashboard';
import { HeroSection } from '@/widgets/dashboard/ui/HeroSection';
import { MarketInsights } from '@/widgets/dashboard/ui/MarketInsights';
import { mockDashboardStats } from '@/entities/dashboard';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import { AdaptiveLayout, ResponsiveGrid } from '@/shared/ui/adaptive-layout';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';

export function DashboardPage() {
  const stats = mockDashboardStats;
  const isMobile = useIsMobile();
  const { elementRef: contentRef, isVisible } = useScrollAnimation();

  const handleRefresh = async () => {
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Here you would typically refetch data
  };

  const heroStats = {
    activeProperties: stats.totalContacts,
    pendingSales: stats.activeDeals,
    monthlyRevenue: stats.totalRevenue,
    newListings: 8,
  };

  const content = (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Section */}
      <HeroSection userName="Dawn" stats={heroStats} />

      {/* Main Content with Scroll Animation */}
      <div 
        ref={contentRef}
        className={`space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Enhanced Stats Grid */}
        <ResponsiveGrid 
          cols={{ mobile: 2, tablet: 2, desktop: 4 }}
          gap={{ mobile: 3, tablet: 4, desktop: 6 }}
        >
          <StatsCard
            title="Active Properties"
            value={stats.totalContacts.toLocaleString()}
            change="+8 new listings this week"
            icon={Home}
            trend="up"
          />
          <StatsCard
            title="In Escrow"
            value={stats.activeDeals}
            change="+3 pending sales"
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            change={`+${stats.monthlyGrowth}% from last month`}
            icon={DollarSign}
            trend="up"
          />
          <StatsCard
            title="Active Agents"
            value="12"
            change="2 new agents onboarded"
            icon={Users}
            trend="up"
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