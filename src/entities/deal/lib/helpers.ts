import { Deal } from "@/entities/deal/model/types";

export function getDealStageColor(stage: Deal['stage']): string {
  const colors = {
    prospect: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
    qualified: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    proposal: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    negotiation: 'bg-orange-500/20 text-orange-700 border-orange-500/30',
    'closed-won': 'bg-green-500/20 text-green-700 border-green-500/30',
    'closed-lost': 'bg-red-500/20 text-red-700 border-red-500/30',
  };
  return colors[stage] || colors.prospect;
}

export function getDealProbabilityColor(probability: number): string {
  if (probability >= 80) return 'bg-green-500/20 text-green-700 border-green-500/30';
  if (probability >= 60) return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
  if (probability >= 40) return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
  if (probability >= 20) return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
  return 'bg-red-500/20 text-red-700 border-red-500/30';
}

export function isDealOverdue(deal: Deal): boolean {
  return new Date() > deal.expectedCloseDate && !['closed-won', 'closed-lost'].includes(deal.stage);
}

export function isDealClosingSoon(deal: Deal, daysThreshold: number = 7): boolean {
  const now = new Date();
  const daysToClose = Math.floor((deal.expectedCloseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return daysToClose <= daysThreshold && daysToClose >= 0 && !['closed-won', 'closed-lost'].includes(deal.stage);
}

export function isDealActive(deal: Deal): boolean {
  return !['closed-won', 'closed-lost'].includes(deal.stage);
}

export function isDealClosed(deal: Deal): boolean {
  return ['closed-won', 'closed-lost'].includes(deal.stage);
}

export function isDealWon(deal: Deal): boolean {
  return deal.stage === 'closed-won';
}

export function isDealLost(deal: Deal): boolean {
  return deal.stage === 'closed-lost';
}

export function getDealsByStage(deals: Deal[], stage: Deal['stage']): Deal[] {
  return deals.filter(deal => deal.stage === stage);
}

export function getDealsByContact(deals: Deal[], contactId: string): Deal[] {
  return deals.filter(deal => deal.contactId === contactId);
}

export function getActiveDeals(deals: Deal[]): Deal[] {
  return deals.filter(deal => isDealActive(deal));
}

export function getClosedDeals(deals: Deal[]): Deal[] {
  return deals.filter(deal => isDealClosed(deal));
}

export function getWonDeals(deals: Deal[]): Deal[] {
  return deals.filter(deal => isDealWon(deal));
}

export function getLostDeals(deals: Deal[]): Deal[] {
  return deals.filter(deal => isDealLost(deal));
}

export function getOverdueDeals(deals: Deal[]): Deal[] {
  return deals.filter(deal => isDealOverdue(deal));
}

export function getClosingSoonDeals(deals: Deal[], daysThreshold: number = 7): Deal[] {
  return deals.filter(deal => isDealClosingSoon(deal, daysThreshold));
}

export function getHighValueDeals(deals: Deal[], threshold: number = 100000): Deal[] {
  return deals.filter(deal => deal.value >= threshold);
}

export function getHighProbabilityDeals(deals: Deal[], threshold: number = 80): Deal[] {
  return deals.filter(deal => deal.probability >= threshold);
}

export function sortDealsByValue(deals: Deal[], ascending: boolean = false): Deal[] {
  return [...deals].sort((a, b) => ascending ? a.value - b.value : b.value - a.value);
}

export function sortDealsByProbability(deals: Deal[], ascending: boolean = false): Deal[] {
  return [...deals].sort((a, b) => ascending ? a.probability - b.probability : b.probability - a.probability);
}

export function sortDealsByCloseDate(deals: Deal[], ascending: boolean = true): Deal[] {
  return [...deals].sort((a, b) => {
    const dateA = new Date(a.expectedCloseDate).getTime();
    const dateB = new Date(b.expectedCloseDate).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function sortDealsByStage(deals: Deal[]): Deal[] {
  const stageOrder = {
    prospect: 1,
    qualified: 2,
    proposal: 3,
    negotiation: 4,
    'closed-won': 5,
    'closed-lost': 6,
  };
  
  return [...deals].sort((a, b) => stageOrder[a.stage] - stageOrder[b.stage]);
}

export function sortDealsByCreatedAt(deals: Deal[], ascending: boolean = false): Deal[] {
  return [...deals].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function getDealStats(deals: Deal[]) {
  const total = deals.length;
  const active = getActiveDeals(deals).length;
  const closed = getClosedDeals(deals).length;
  const won = getWonDeals(deals).length;
  const lost = getLostDeals(deals).length;
  const overdue = getOverdueDeals(deals).length;
  const closingSoon = getClosingSoonDeals(deals).length;
  
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const activeValue = getActiveDeals(deals).reduce((sum, deal) => sum + deal.value, 0);
  const wonValue = getWonDeals(deals).reduce((sum, deal) => sum + deal.value, 0);
  const pipelineValue = getActiveDeals(deals).reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  
  const conversionRate = total > 0 ? (won / total) * 100 : 0;
  const averageValue = total > 0 ? totalValue / total : 0;
  const averageProbability = total > 0 ? deals.reduce((sum, deal) => sum + deal.probability, 0) / total : 0;
  
  return {
    total,
    active,
    closed,
    won,
    lost,
    overdue,
    closingSoon,
    totalValue,
    activeValue,
    wonValue,
    pipelineValue,
    conversionRate,
    averageValue,
    averageProbability,
    stages: {
      prospect: getDealsByStage(deals, 'prospect').length,
      qualified: getDealsByStage(deals, 'qualified').length,
      proposal: getDealsByStage(deals, 'proposal').length,
      negotiation: getDealsByStage(deals, 'negotiation').length,
      'closed-won': getDealsByStage(deals, 'closed-won').length,
      'closed-lost': getDealsByStage(deals, 'closed-lost').length,
    },
  };
}

export function calculateDealWeightedValue(deal: Deal): number {
  return deal.value * (deal.probability / 100);
}

export function calculateDealDuration(deal: Deal): number {
  const now = new Date();
  const createdAt = new Date(deal.createdAt);
  return Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateDealVelocity(deals: Deal[]): number {
  const closedDeals = getClosedDeals(deals);
  if (closedDeals.length === 0) return 0;
  
  const totalDuration = closedDeals.reduce((sum, deal) => {
    const duration = calculateDealDuration(deal);
    return sum + duration;
  }, 0);
  
  return Math.round(totalDuration / closedDeals.length);
}

export function getDealPipeline(deals: Deal[]): Array<{
  stage: Deal['stage'];
  count: number;
  value: number;
  weightedValue: number;
}> {
  const stages: Deal['stage'][] = ['prospect', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
  
  return stages.map(stage => {
    const stageDeals = getDealsByStage(deals, stage);
    const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
    const weightedValue = stageDeals.reduce((sum, deal) => sum + calculateDealWeightedValue(deal), 0);
    
    return {
      stage,
      count: stageDeals.length,
      value,
      weightedValue,
    };
  });
}

export function getDealForecast(deals: Deal[], months: number = 3): Array<{
  month: string;
  expectedRevenue: number;
  optimisticRevenue: number;
  pessimisticRevenue: number;
}> {
  const forecast = [];
  const now = new Date();
  
  for (let i = 0; i < months; i++) {
    const forecastDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthStart = new Date(forecastDate.getFullYear(), forecastDate.getMonth(), 1);
    const monthEnd = new Date(forecastDate.getFullYear(), forecastDate.getMonth() + 1, 0);
    
    const monthDeals = getActiveDeals(deals).filter(deal => {
      const closeDate = new Date(deal.expectedCloseDate);
      return closeDate >= monthStart && closeDate <= monthEnd;
    });
    
    const expectedRevenue = monthDeals.reduce((sum, deal) => sum + calculateDealWeightedValue(deal), 0);
    const optimisticRevenue = monthDeals.reduce((sum, deal) => sum + deal.value, 0);
    const pessimisticRevenue = monthDeals
      .filter(deal => deal.probability >= 80)
      .reduce((sum, deal) => sum + deal.value, 0);
    
    forecast.push({
      month: forecastDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      expectedRevenue,
      optimisticRevenue,
      pessimisticRevenue,
    });
  }
  
  return forecast;
}

export function getDealInsights(deals: Deal[]): Array<{
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
}> {
  const insights = [];
  const stats = getDealStats(deals);
  
  // High conversion rate
  if (stats.conversionRate > 50) {
    insights.push({
      type: 'success' as const,
      title: 'High Conversion Rate',
      message: `Conversion rate is ${stats.conversionRate.toFixed(1)}% - excellent performance!`,
    });
  }
  
  // Low conversion rate
  if (stats.conversionRate < 20) {
    insights.push({
      type: 'warning' as const,
      title: 'Low Conversion Rate',
      message: `Conversion rate is ${stats.conversionRate.toFixed(1)}% - consider improving qualification process.`,
    });
  }
  
  // Many overdue deals
  if (stats.overdue > 0) {
    insights.push({
      type: 'warning' as const,
      title: 'Overdue Deals',
      message: `${stats.overdue} deals are overdue - review and update close dates.`,
    });
  }
  
  // High value pipeline
  if (stats.pipelineValue > 1000000) {
    insights.push({
      type: 'success' as const,
      title: 'Strong Pipeline',
      message: `Pipeline value is ${(stats.pipelineValue / 1000000).toFixed(1)}M - healthy deal flow.`,
    });
  }
  
  // Deals closing soon
  if (stats.closingSoon > 0) {
    insights.push({
      type: 'info' as const,
      title: 'Deals Closing Soon',
      message: `${stats.closingSoon} deals are closing within the next 7 days - prioritize follow-up.`,
    });
  }
  
  return insights;
}

export function searchDeals(deals: Deal[], query: string): Deal[] {
  const lowerQuery = query.toLowerCase();
  return deals.filter(deal =>
    deal.title.toLowerCase().includes(lowerQuery) ||
    deal.contactId.toLowerCase().includes(lowerQuery) ||
    deal.stage.toLowerCase().includes(lowerQuery)
  );
}

export function getDealTrends(deals: Deal[], months: number = 12): Array<{
  month: string;
  created: number;
  won: number;
  lost: number;
  value: number;
}> {
  const trends = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    
    const monthDeals = deals.filter(deal => {
      const createdDate = new Date(deal.createdAt);
      return createdDate >= monthStart && createdDate <= monthEnd;
    });
    
    const wonDeals = monthDeals.filter(deal => deal.stage === 'closed-won');
    const lostDeals = monthDeals.filter(deal => deal.stage === 'closed-lost');
    const totalValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
    
    trends.push({
      month: monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      created: monthDeals.length,
      won: wonDeals.length,
      lost: lostDeals.length,
      value: totalValue,
    });
  }
  
  return trends;
}
