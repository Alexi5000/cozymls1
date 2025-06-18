
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DealsOverview } from '@/components/dashboard/DealsOverview';
import { mockDashboardStats } from '@/lib/mock-data';
import { Users, Target, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Welcome back, Sarah 👋</h2>
          <p className="text-gray-500">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Contacts"
            value={stats.totalContacts.toLocaleString()}
            change="+12% from last month"
            icon={Users}
            trend="up"
          />
          <StatsCard
            title="Active Deals"
            value={stats.activeDeals}
            change="+5% from last month"
            icon={Target}
            trend="up"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            change={`+${stats.monthlyGrowth}% from last month`}
            icon={DollarSign}
            trend="up"
          />
          <StatsCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change="+2.1% from last month"
            icon={TrendingUp}
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
