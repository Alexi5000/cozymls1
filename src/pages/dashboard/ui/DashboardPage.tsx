import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { StatsCard, RecentActivity, DealsOverview } from '@/widgets/dashboard';
import { mockDashboardStats } from '@/entities/dashboard';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { AdaptiveLayout, ResponsiveGrid } from '@/shared/ui/adaptive-layout';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';

export function DashboardPage() {
  const stats = mockDashboardStats;
  const isMobile = useIsMobile();

  const handleRefresh = async () => {
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Here you would typically refetch data
  };

  const content = (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-gray-600 mb-2">Welcome back, Sarah 👋</h2>
        <p className="text-sm md:text-base text-gray-500">Here's what's happening with your real estate business today.</p>
      </div>

      {/* Stats Grid - Mobile Optimized */}
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

      {/* Main Content Grid */}
      <AdaptiveLayout
        mobileChildren={
          <div className="space-y-6">
            <RecentActivity />
            <DealsOverview />
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          <DealsOverview />
        </div>
      </AdaptiveLayout>
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