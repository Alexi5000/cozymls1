import React, { memo } from 'react';
import { useAppData } from '@/app/data-provider';
import { DashboardStatsCard } from '@/entities/dashboard';
import { optimizedDealService } from '@/entities/deal/lib/optimized-service';
import { optimizedUserService } from '@/entities/user/lib/optimized-service';
import { Building2, DollarSign, TrendingUp, Users } from 'lucide-react';

// Fast dashboard stats without complex calculations
const FastDashboardStats = memo(() => {
  const { properties } = useAppData();
  const dealStats = optimizedDealService.getStats();
  const userStats = optimizedUserService.getStats();

  const stats = [
    {
      title: 'Total Properties',
      value: properties.length,
      change: 12,
      trend: 'up' as const,
      icon: Building2,
    },
    {
      title: 'Active Deals',
      value: dealStats.totalDeals,
      change: 8,
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'Total Revenue',
      value: dealStats.totalValue,
      change: 15,
      trend: 'up' as const,
      icon: TrendingUp,
      currency: true,
    },
    {
      title: 'Active Agents',
      value: userStats.agents,
      change: 3,
      trend: 'up' as const,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <DashboardStatsCard key={index} {...stat} />
      ))}
    </div>
  );
});

FastDashboardStats.displayName = 'FastDashboardStats';

export { FastDashboardStats };