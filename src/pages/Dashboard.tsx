
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DealsOverview } from '@/components/dashboard/DealsOverview';
import { mockDashboardStats } from '@/lib/mock-data/dashboard';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Welcome back, Sarah 👋</h2>
          <p className="text-gray-500">Here's what's happening with your real estate business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Properties"
            value={stats.totalContacts.toLocaleString()}
            change="+8 new listings this week"
            icon={Home}
            trend="up"
          />
          <StatsCard
            title="Properties in Escrow"
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          <DealsOverview />
        </div>
      </div>
    </Layout>
  );
}
