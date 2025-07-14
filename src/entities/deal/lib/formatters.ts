import { Deal } from "@/entities/deal/model/types";

export function formatDealValue(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDealValueCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(value);
}

export function formatDealStage(stage: Deal['stage']): string {
  const stageMap = {
    prospect: 'Prospect',
    qualified: 'Qualified',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    'closed-won': 'Closed Won',
    'closed-lost': 'Closed Lost',
  };
  return stageMap[stage] || stage;
}

export function formatDealProbability(probability: number): string {
  return `${probability}%`;
}

export function formatDealDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDealDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDealDuration(createdAt: Date, closedAt?: Date): string {
  const endDate = closedAt || new Date();
  const diffInDays = Math.floor((endDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day';
  if (diffInDays < 30) return `${diffInDays} days`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months`;
  return `${Math.floor(diffInDays / 365)} years`;
}

export function formatDealProgress(stage: Deal['stage']): number {
  const stageProgress = {
    prospect: 10,
    qualified: 30,
    proposal: 50,
    negotiation: 70,
    'closed-won': 100,
    'closed-lost': 0,
  };
  return stageProgress[stage] || 0;
}

export function formatDealId(id: string): string {
  return `#${id.toUpperCase()}`;
}

export function formatDealTitle(title: string): string {
  return title.trim();
}

export function formatDealSummary(deal: Deal): string {
  const value = formatDealValueCompact(deal.value);
  const stage = formatDealStage(deal.stage);
  const probability = formatDealProbability(deal.probability);
  return `${value} • ${stage} • ${probability}`;
}

export function formatDealTimeToClose(expectedCloseDate: Date): string {
  const now = new Date();
  const diffInDays = Math.floor((expectedCloseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 0) return 'Overdue';
  if (diffInDays === 0) return 'Due today';
  if (diffInDays === 1) return 'Due tomorrow';
  if (diffInDays < 7) return `Due in ${diffInDays} days`;
  if (diffInDays < 30) return `Due in ${Math.floor(diffInDays / 7)} weeks`;
  return `Due in ${Math.floor(diffInDays / 30)} months`;
}

export function formatDealStatus(deal: Deal): string {
  const isOverdue = new Date() > deal.expectedCloseDate;
  const stage = formatDealStage(deal.stage);
  
  if (deal.stage === 'closed-won') return 'Won';
  if (deal.stage === 'closed-lost') return 'Lost';
  if (isOverdue) return `${stage} (Overdue)`;
  return stage;
}

export function formatDealRevenue(deals: Deal[]): string {
  const totalRevenue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.value, 0);
  
  return formatDealValue(totalRevenue);
}

export function formatDealPipeline(deals: Deal[]): string {
  const pipelineValue = deals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  
  return formatDealValue(pipelineValue);
}

export function formatDealConversionRate(deals: Deal[]): string {
  const totalDeals = deals.length;
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won').length;
  
  if (totalDeals === 0) return '0%';
  
  const conversionRate = (wonDeals / totalDeals) * 100;
  return `${conversionRate.toFixed(1)}%`;
}

export function formatDealAverageValue(deals: Deal[]): string {
  if (deals.length === 0) return formatDealValue(0);
  
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const averageValue = totalValue / deals.length;
  
  return formatDealValue(averageValue);
}

export function formatDealExpectedRevenue(deals: Deal[]): string {
  const expectedRevenue = deals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  
  return formatDealValue(expectedRevenue);
}

export function formatDealMetrics(deals: Deal[]): {
  totalValue: string;
  averageValue: string;
  conversionRate: string;
  pipelineValue: string;
  revenue: string;
  expectedRevenue: string;
} {
  return {
    totalValue: formatDealValue(deals.reduce((sum, deal) => sum + deal.value, 0)),
    averageValue: formatDealAverageValue(deals),
    conversionRate: formatDealConversionRate(deals),
    pipelineValue: formatDealPipeline(deals),
    revenue: formatDealRevenue(deals),
    expectedRevenue: formatDealExpectedRevenue(deals),
  };
}
