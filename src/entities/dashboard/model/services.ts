import { mockProperties } from '@/entities/property';
import { mockDeals } from '@/entities/deal';
import { mockUsers } from '@/entities/user';
import { mockActivities } from '@/entities/activity';
import { DashboardStats } from './types';
import { formatCurrency, formatPercentage, formatGrowth } from '../lib/formatters';

export interface EnhancedDashboardStats extends DashboardStats {
  newListings: number;
  pendingSales: number;
  averageDaysOnMarket: number;
  averagePropertyValue: number;
  totalListings: number;
  soldThisMonth: number;
  conversionRate: number;
  topPerformingAgents: Array<{
    id: string;
    name: string;
    properties: number;
    revenue: number;
  }>;
  recentGrowth: {
    properties: { value: number; trend: 'up' | 'down' | 'neutral'; };
    revenue: { value: number; trend: 'up' | 'down' | 'neutral'; };
    deals: { value: number; trend: 'up' | 'down' | 'neutral'; };
  };
}

export class DashboardService {
  static calculateDashboardStats(): EnhancedDashboardStats {
    const properties = mockProperties;
    const deals = mockDeals;
    const users = mockUsers;
    const activities = mockActivities;

    // Basic counts
    const activeProperties = properties.filter(p => p.status === 'active').length;
    const pendingSales = properties.filter(p => p.status === 'pending').length;
    const soldProperties = properties.filter(p => p.status === 'sold');
    
    // Calculate revenue from sold properties (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSales = soldProperties.filter(p => 
      p.updatedAt >= thirtyDaysAgo
    );
    
    const monthlyRevenue = recentSales.reduce((sum, p) => sum + (p.price * 0.03), 0); // 3% commission
    const totalRevenue = soldProperties.reduce((sum, p) => sum + (p.price * 0.03), 0);
    
    // Calculate average days on market
    const averageDaysOnMarket = properties.length > 0 
      ? Math.round(properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / properties.length)
      : 0;
    
    // Calculate average property value
    const averagePropertyValue = properties.length > 0
      ? properties.reduce((sum, p) => sum + p.price, 0) / properties.length
      : 0;

    // New listings (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newListings = properties.filter(p => p.listingDate >= sevenDaysAgo).length;

    // Calculate conversion rate
    const totalListings = properties.length;
    const conversionRate = totalListings > 0 ? (soldProperties.length / totalListings) * 100 : 0;

    // Top performing agents
    const agentPerformance = users
      .filter(u => u.role === 'agent')
      .map(agent => {
        const agentProperties = properties.filter(p => p.agent.id === agent.id);
        const agentSales = agentProperties.filter(p => p.status === 'sold');
        const agentRevenue = agentSales.reduce((sum, p) => sum + (p.price * 0.03), 0);
        
        return {
          id: agent.id,
          name: agent.name,
          properties: agentProperties.length,
          revenue: agentRevenue
        };
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Mock growth calculations (in real app, compare with previous period)
    const recentGrowth = {
      properties: { value: 12.5, trend: 'up' as const },
      revenue: { value: 8.3, trend: 'up' as const },
      deals: { value: -2.1, trend: 'down' as const }
    };

    return {
      totalContacts: users.filter(u => u.role !== 'admin').length + 150, // Include external contacts
      activeDeals: deals.length,
      totalRevenue: totalRevenue,
      monthlyGrowth: recentGrowth.revenue.value,
      newListings,
      pendingSales,
      averageDaysOnMarket,
      averagePropertyValue,
      totalListings,
      soldThisMonth: recentSales.length,
      conversionRate,
      topPerformingAgents: agentPerformance,
      recentGrowth
    };
  }

  static getMarketInsights() {
    const properties = mockProperties;
    
    // Calculate market statistics
    const pricesByArea = properties.reduce((acc, p) => {
      const area = p.city;
      if (!acc[area]) acc[area] = [];
      acc[area].push(p.price);
      return acc;
    }, {} as Record<string, number[]>);

    // Find hottest market (highest average price increase)
    const marketTrends = Object.entries(pricesByArea).map(([area, prices]) => {
      const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
      return { area, avgPrice, count: prices.length };
    }).sort((a, b) => b.avgPrice - a.avgPrice);

    const insights = [
      {
        title: "Market Hotspot",
        description: `${marketTrends[0]?.area} showing highest values`,
        trend: "up" as const,
        value: `€${Math.round(marketTrends[0]?.avgPrice / 1000)}K avg`,
        color: "from-emerald-500 to-emerald-600"
      },
      {
        title: "Inventory Alert",
        description: `${properties.filter(p => p.price < 500000).length} properties under €500K`,
        trend: "down" as const,
        value: `${properties.filter(p => p.price < 500000).length} left`,
        color: "from-amber-500 to-amber-600"
      },
      {
        title: "Best Performance",
        description: `Average ${Math.round(100 - (properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / properties.length))} days to sell`,
        trend: "up" as const,
        value: `${Math.round(100 - (properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / properties.length))}% faster`,
        color: "from-blue-500 to-blue-600"
      }
    ];

    return insights;
  }

  static getRecentActivities() {
    // Combine real property and deal activities
    const recentPropertyListings = mockProperties
      .sort((a, b) => b.listingDate.getTime() - a.listingDate.getTime())
      .slice(0, 3)
      .map(p => ({
        id: `property-${p.id}`,
        title: `New listing: ${p.address}`,
        type: 'listing' as const,
        date: p.listingDate,
        priority: 'medium' as const,
        icon: 'Home' as const
      }));

    const recentDeals = mockDeals
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 2)
      .map(d => ({
        id: `deal-${d.id}`,
        title: `Deal update: ${d.title}`,
        type: 'deal' as const,
        date: d.updatedAt,
        priority: d.probability > 70 ? 'high' as const : 'medium' as const,
        icon: 'TrendingUp' as const
      }));

    return [...recentPropertyListings, ...recentDeals]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 6);
  }
}