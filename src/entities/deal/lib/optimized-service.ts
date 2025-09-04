import { Deal, mockDeals } from '@/entities/deal';

// Instant deal service - no artificial delays
export class OptimizedDealService {
  private static instance: OptimizedDealService;
  private deals: Deal[] = mockDeals;

  static getInstance(): OptimizedDealService {
    if (!OptimizedDealService.instance) {
      OptimizedDealService.instance = new OptimizedDealService();
    }
    return OptimizedDealService.instance;
  }

  // Instant data access
  getAll(): Deal[] {
    return this.deals;
  }

  getById(id: string): Deal | null {
    return this.deals.find(deal => deal.id === id) || null;
  }

  getByStage(stage: Deal['stage']): Deal[] {
    return this.deals.filter(deal => deal.stage === stage);
  }

  // Instant stats calculation
  getStats() {
    const totalValue = this.deals.reduce((sum, deal) => sum + deal.value, 0);
    const wonDeals = this.deals.filter(deal => deal.stage === 'closed-won');
    const lostDeals = this.deals.filter(deal => deal.stage === 'closed-lost');
    const activeDeals = this.deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage));

    return {
      totalDeals: this.deals.length,
      totalValue,
      wonValue: wonDeals.reduce((sum, deal) => sum + deal.value, 0),
      activeValue: activeDeals.reduce((sum, deal) => sum + deal.value, 0),
      conversionRate: this.deals.length > 0 ? (wonDeals.length / this.deals.length) * 100 : 0,
      averageDealSize: this.deals.length > 0 ? totalValue / this.deals.length : 0,
    };
  }

  // Instant pipeline data
  getPipeline() {
    const stages = ['prospect', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'] as const;
    return stages.map(stage => {
      const stageDeals = this.deals.filter(deal => deal.stage === stage);
      return {
        stage,
        count: stageDeals.length,
        value: stageDeals.reduce((sum, deal) => sum + deal.value, 0),
      };
    });
  }
}

export const optimizedDealService = OptimizedDealService.getInstance();