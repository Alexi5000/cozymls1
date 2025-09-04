import { Layout } from '@/widgets/layout';
import { HeroSection } from '@/widgets/dashboard/ui/HeroSection';
import { MarketInsights } from '@/widgets/dashboard/ui/MarketInsights';
import { RecentActivity } from '@/widgets/dashboard/ui/RecentActivity';
import { DealsOverview } from '@/widgets/dashboard/ui/DealsOverview';
import { StatsCardGrid } from '@/widgets/dashboard/ui/StatsCardGrid';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { DashboardService } from '@/entities/dashboard/model/services';
import { 
  Home, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/entities/dashboard/lib/formatters';

export function EnhancedDashboardPage() {
  const isMobile = useIsMobile();
  const dashboardStats = DashboardService.calculateDashboardStats();
  
  // Prepare stats for HeroSection
  const heroStats = {
    activeProperties: dashboardStats.totalListings,
    pendingSales: dashboardStats.pendingSales,
    monthlyRevenue: dashboardStats.totalRevenue,
    newListings: dashboardStats.newListings
  };

  // Prepare additional stats cards
  const additionalStats = [
    {
      title: "Avg Days on Market",
      value: dashboardStats.averageDaysOnMarket,
      change: `${dashboardStats.recentGrowth.properties.value}% improvement`,
      icon: Clock,
      trend: dashboardStats.recentGrowth.properties.trend
    },
    {
      title: "Conversion Rate", 
      value: formatPercentage(dashboardStats.conversionRate),
      change: "Industry leading",
      icon: Target,
      trend: 'up' as const
    },
    {
      title: "Avg Property Value",
      value: formatCurrency(dashboardStats.averagePropertyValue),
      change: `${dashboardStats.recentGrowth.revenue.value}% growth`,
      icon: BarChart3,
      trend: dashboardStats.recentGrowth.revenue.trend
    },
    {
      title: "Monthly Sales",
      value: dashboardStats.soldThisMonth,
      change: `${dashboardStats.newListings} new listings`,
      icon: Calendar,
      trend: 'up' as const
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6 md:space-y-8 animate-slide-up">
        {/* Hero Section with Key Stats */}
        <HeroSection 
          userName="Dawn" 
          stats={heroStats}
        />
        
        {/* Additional Stats Grid */}
        {!isMobile && (
          <StatsCardGrid 
            stats={additionalStats}
            className="mb-8"
          />
        )}
        
        {/* Main Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
            <DealsOverview />
          </div>
          
          {/* Right Column - Market Insights */}
          <div className="space-y-6">
            <MarketInsights />
            
            {/* Top Agents Performance */}
            <div className="bg-card rounded-xl p-6 border shadow-elegant animate-scale-in">
              <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Top Agents
              </h3>
              <div className="space-y-4">
                {dashboardStats.topPerformingAgents.slice(0, 3).map((agent, index) => (
                  <div 
                    key={agent.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gradient-subtle transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.properties} properties</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(agent.revenue)}</p>
                      <p className="text-sm text-muted-foreground">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}