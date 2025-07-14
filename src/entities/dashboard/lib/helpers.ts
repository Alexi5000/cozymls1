import { DashboardStats } from "@/entities/dashboard/model/types";

export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function calculatePercentageChange(current: number, previous: number): number {
  return calculateGrowthRate(current, previous);
}

export function isGrowthPositive(growth: number): boolean {
  return growth > 0;
}

export function isGrowthNegative(growth: number): boolean {
  return growth < 0;
}

export function getGrowthTrend(growth: number): 'up' | 'down' | 'neutral' {
  if (growth > 0) return 'up';
  if (growth < 0) return 'down';
  return 'neutral';
}

export function aggregateStats(statsArray: DashboardStats[]): DashboardStats {
  const totalStats = statsArray.reduce(
    (acc, stats) => ({
      totalContacts: acc.totalContacts + stats.totalContacts,
      activeDeals: acc.activeDeals + stats.activeDeals,
      totalRevenue: acc.totalRevenue + stats.totalRevenue,
      monthlyGrowth: acc.monthlyGrowth + stats.monthlyGrowth,
    }),
    {
      totalContacts: 0,
      activeDeals: 0,
      totalRevenue: 0,
      monthlyGrowth: 0,
    }
  );

  return {
    ...totalStats,
    monthlyGrowth: totalStats.monthlyGrowth / statsArray.length, // Average growth
  };
}

export function compareStats(
  current: DashboardStats,
  previous: DashboardStats
): {
  contactsGrowth: number;
  dealsGrowth: number;
  revenueGrowth: number;
  overallGrowth: number;
} {
  return {
    contactsGrowth: calculateGrowthRate(current.totalContacts, previous.totalContacts),
    dealsGrowth: calculateGrowthRate(current.activeDeals, previous.activeDeals),
    revenueGrowth: calculateGrowthRate(current.totalRevenue, previous.totalRevenue),
    overallGrowth: current.monthlyGrowth,
  };
}

export function getStatsMetrics(stats: DashboardStats) {
  return [
    {
      key: 'totalContacts',
      label: 'Total Contacts',
      value: stats.totalContacts,
      type: 'count' as const,
    },
    {
      key: 'activeDeals',
      label: 'Active Deals',
      value: stats.activeDeals,
      type: 'count' as const,
    },
    {
      key: 'totalRevenue',
      label: 'Total Revenue',
      value: stats.totalRevenue,
      type: 'currency' as const,
    },
    {
      key: 'monthlyGrowth',
      label: 'Monthly Growth',
      value: stats.monthlyGrowth,
      type: 'percentage' as const,
    },
  ];
}

export function generateTimeSeriesData(
  stats: DashboardStats,
  periods: number = 12
): Array<{
  period: string;
  contacts: number;
  deals: number;
  revenue: number;
}> {
  const data = [];
  const now = new Date();
  
  for (let i = periods - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const periodLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Generate mock historical data based on current stats
    const monthlyVariation = 0.8 + Math.random() * 0.4; // 80% to 120% of current
    
    data.push({
      period: periodLabel,
      contacts: Math.floor(stats.totalContacts * monthlyVariation),
      deals: Math.floor(stats.activeDeals * monthlyVariation),
      revenue: Math.floor(stats.totalRevenue * monthlyVariation),
    });
  }
  
  return data;
}

export function calculateConversionRate(contacts: number, deals: number): number {
  if (contacts === 0) return 0;
  return (deals / contacts) * 100;
}

export function calculateAverageRevenuePerDeal(revenue: number, deals: number): number {
  if (deals === 0) return 0;
  return revenue / deals;
}

export function calculateAverageRevenuePerContact(revenue: number, contacts: number): number {
  if (contacts === 0) return 0;
  return revenue / contacts;
}

export function getDashboardInsights(stats: DashboardStats): Array<{
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
}> {
  const insights = [];
  
  const conversionRate = calculateConversionRate(stats.totalContacts, stats.activeDeals);
  const avgRevenuePerDeal = calculateAverageRevenuePerDeal(stats.totalRevenue, stats.activeDeals);
  
  // Growth insight
  if (stats.monthlyGrowth > 10) {
    insights.push({
      type: 'success' as const,
      title: 'Strong Growth',
      message: `Monthly growth is ${stats.monthlyGrowth.toFixed(1)}% - excellent performance!`,
    });
  } else if (stats.monthlyGrowth < 0) {
    insights.push({
      type: 'warning' as const,
      title: 'Declining Growth',
      message: `Monthly growth is ${stats.monthlyGrowth.toFixed(1)}% - consider reviewing strategies.`,
    });
  }
  
  // Conversion rate insight
  if (conversionRate > 20) {
    insights.push({
      type: 'success' as const,
      title: 'High Conversion',
      message: `Conversion rate is ${conversionRate.toFixed(1)}% - great lead quality!`,
    });
  } else if (conversionRate < 5) {
    insights.push({
      type: 'warning' as const,
      title: 'Low Conversion',
      message: `Conversion rate is ${conversionRate.toFixed(1)}% - focus on lead qualification.`,
    });
  }
  
  // Revenue insight
  if (avgRevenuePerDeal > 100000) {
    insights.push({
      type: 'success' as const,
      title: 'High Value Deals',
      message: `Average deal value is $${(avgRevenuePerDeal / 1000).toFixed(0)}K - premium market focus.`,
    });
  }
  
  return insights;
}

export function generateDashboardGoals(stats: DashboardStats) {
  const currentMonth = new Date().getMonth();
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long' });
  
  return {
    contacts: {
      current: stats.totalContacts,
      target: Math.ceil(stats.totalContacts * 1.1), // 10% increase
      progress: Math.min(100, (stats.totalContacts / Math.ceil(stats.totalContacts * 1.1)) * 100),
    },
    deals: {
      current: stats.activeDeals,
      target: Math.ceil(stats.activeDeals * 1.15), // 15% increase
      progress: Math.min(100, (stats.activeDeals / Math.ceil(stats.activeDeals * 1.15)) * 100),
    },
    revenue: {
      current: stats.totalRevenue,
      target: Math.ceil(stats.totalRevenue * 1.2), // 20% increase
      progress: Math.min(100, (stats.totalRevenue / Math.ceil(stats.totalRevenue * 1.2)) * 100),
    },
    period: monthName,
  };
}

export function isStatsTrendingUp(current: DashboardStats, previous: DashboardStats): boolean {
  const comparison = compareStats(current, previous);
  return comparison.overallGrowth > 0;
}

export function getStatsHealthScore(stats: DashboardStats): {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  factors: Array<{ name: string; impact: number; positive: boolean }>;
} {
  const factors = [];
  let score = 50; // Base score
  
  // Growth factor
  if (stats.monthlyGrowth > 10) {
    factors.push({ name: 'High Growth', impact: 30, positive: true });
    score += 30;
  } else if (stats.monthlyGrowth > 0) {
    factors.push({ name: 'Positive Growth', impact: 10, positive: true });
    score += 10;
  } else {
    factors.push({ name: 'Negative Growth', impact: -20, positive: false });
    score -= 20;
  }
  
  // Volume factors
  if (stats.totalContacts > 1000) {
    factors.push({ name: 'High Volume', impact: 10, positive: true });
    score += 10;
  }
  
  if (stats.activeDeals > 50) {
    factors.push({ name: 'Active Pipeline', impact: 10, positive: true });
    score += 10;
  }
  
  // Revenue factor
  if (stats.totalRevenue > 5000000) {
    factors.push({ name: 'High Revenue', impact: 20, positive: true });
    score += 20;
  }
  
  // Conversion rate
  const conversionRate = calculateConversionRate(stats.totalContacts, stats.activeDeals);
  if (conversionRate > 15) {
    factors.push({ name: 'High Conversion', impact: 15, positive: true });
    score += 15;
  } else if (conversionRate < 5) {
    factors.push({ name: 'Low Conversion', impact: -15, positive: false });
    score -= 15;
  }
  
  // Normalize score
  score = Math.max(0, Math.min(100, score));
  
  // Determine grade
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';
  
  return { score, grade, factors };
}
