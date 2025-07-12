import { ResponsiveLayout, Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { StatsCard, RecentActivity, DealsOverview } from '@/widgets/dashboard';
import { HeroSection } from '@/widgets/dashboard/ui/HeroSection';
import { MarketInsights } from '@/widgets/dashboard/ui/MarketInsights';
import { mockDashboardStats } from '@/entities/dashboard';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import { useMobilePerformance } from '@/shared/hooks/use-mobile-performance';
import { AdaptiveLayout, ResponsiveGrid } from '@/shared/ui/adaptive-layout';
import { ResponsiveContainer, ResponsiveStack, ResponsiveGridContainer } from '@/shared/ui';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';

export function DashboardPage() {
  const stats = mockDashboardStats;
  const isMobile = useIsMobile();
  const { elementRef: contentRef, isVisible } = useScrollAnimation();
  const { isMobileOptimized, shouldOptimizeAnimations } = useMobilePerformance({
    enableVirtualization: true,
    enableImageLazyLoading: true,
    debounceScrollEvents: true,
    optimizeAnimations: true,
  });

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
    <ResponsiveContainer maxWidth="full" padding={isMobile ? "sm" : "md"}>
      <ResponsiveStack gap={isMobile ? "lg" : "responsive"}>
        {/* Hero Section */}
        <HeroSection userName="Dawn" stats={heroStats} />

        {/* Main Content with Scroll Animation */}
        <div 
          ref={contentRef}
          className={`mobile-will-change transition-all ${shouldOptimizeAnimations ? 'duration-300' : 'duration-1000'} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ResponsiveStack gap={isMobile ? "md" : "lg"}>
            {/* Enhanced Stats Grid */}
            <ResponsiveGridContainer 
              cols={{ mobile: 2, tablet: 4, desktop: 4 }}
              gap={isMobile ? "sm" : "md"}
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
                value={stats.activeDeals.toString()}
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
            </ResponsiveGridContainer>

            {/* Main Content Grid - Enhanced */}
            <AdaptiveLayout
              mobileChildren={
                <ResponsiveStack gap="lg">
                  <RecentActivity />
                  <MarketInsights />
                  <DealsOverview />
                </ResponsiveStack>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <RecentActivity />
                </div>
                <ResponsiveStack gap="lg">
                  <MarketInsights />
                  <DealsOverview />
                </ResponsiveStack>
              </div>
            </AdaptiveLayout>
          </ResponsiveStack>
        </div>
      </ResponsiveStack>
    </ResponsiveContainer>
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