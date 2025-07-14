import { Deal } from "@/entities/deal/model/types";

export interface DealFilters {
  stage?: Deal['stage'];
  contactId?: string;
  minValue?: number;
  maxValue?: number;
  minProbability?: number;
  maxProbability?: number;
  isOverdue?: boolean;
  isClosingSoon?: boolean;
  search?: string;
}

export interface DealSortOptions {
  sortBy: 'title' | 'value' | 'probability' | 'stage' | 'expectedCloseDate' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface DealSearchResult {
  deals: Deal[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class DealService {
  private static instance: DealService;
  private deals: Deal[] = [];

  private constructor() {}

  static getInstance(): DealService {
    if (!DealService.instance) {
      DealService.instance = new DealService();
    }
    return DealService.instance;
  }

  // Initialize with mock data
  async initialize(mockData: Deal[]): Promise<void> {
    this.deals = mockData;
  }

  // Get all deals
  async getAll(): Promise<Deal[]> {
    return [...this.deals];
  }

  // Get deal by ID
  async getById(id: string): Promise<Deal | null> {
    return this.deals.find(d => d.id === id) || null;
  }

  // Search deals with filters and pagination
  async search(
    filters: DealFilters = {},
    sortOptions: DealSortOptions = { sortBy: 'createdAt', sortOrder: 'desc' },
    page: number = 1,
    pageSize: number = 20
  ): Promise<DealSearchResult> {
    let filteredDeals = this.applyFilters(this.deals, filters);
    filteredDeals = this.applySorting(filteredDeals, sortOptions);

    const total = filteredDeals.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const deals = filteredDeals.slice(start, end);

    return {
      deals,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  // Get deals by stage
  async getByStage(stage: Deal['stage']): Promise<Deal[]> {
    return this.deals.filter(d => d.stage === stage);
  }

  // Get deals by contact
  async getByContact(contactId: string): Promise<Deal[]> {
    return this.deals.filter(d => d.contactId === contactId);
  }

  // Get active deals (not closed)
  async getActiveDeals(): Promise<Deal[]> {
    return this.deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage));
  }

  // Get closed deals
  async getClosedDeals(): Promise<Deal[]> {
    return this.deals.filter(d => ['closed-won', 'closed-lost'].includes(d.stage));
  }

  // Get overdue deals
  async getOverdueDeals(): Promise<Deal[]> {
    const now = new Date();
    return this.deals.filter(d => 
      d.expectedCloseDate < now && !['closed-won', 'closed-lost'].includes(d.stage)
    );
  }

  // Get deals closing soon
  async getClosingSoonDeals(daysThreshold: number = 7): Promise<Deal[]> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysThreshold);

    return this.deals.filter(d => 
      d.expectedCloseDate <= futureDate && 
      d.expectedCloseDate >= now &&
      !['closed-won', 'closed-lost'].includes(d.stage)
    );
  }

  // Get high value deals
  async getHighValueDeals(threshold: number = 100000): Promise<Deal[]> {
    return this.deals.filter(d => d.value >= threshold);
  }

  // Get high probability deals
  async getHighProbabilityDeals(threshold: number = 80): Promise<Deal[]> {
    return this.deals.filter(d => d.probability >= threshold);
  }

  // Create new deal
  async create(deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
    const newDeal: Deal = {
      ...deal,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.deals.push(newDeal);
    return newDeal;
  }

  // Update deal
  async update(id: string, updates: Partial<Deal>): Promise<Deal | null> {
    const dealIndex = this.deals.findIndex(d => d.id === id);
    if (dealIndex === -1) return null;

    const updatedDeal = {
      ...this.deals[dealIndex],
      ...updates,
      updatedAt: new Date(),
    };

    this.deals[dealIndex] = updatedDeal;
    return updatedDeal;
  }

  // Delete deal
  async delete(id: string): Promise<boolean> {
    const dealIndex = this.deals.findIndex(d => d.id === id);
    if (dealIndex === -1) return false;

    this.deals.splice(dealIndex, 1);
    return true;
  }

  // Move deal to next stage
  async moveToNextStage(id: string): Promise<Deal | null> {
    const deal = await this.getById(id);
    if (!deal) return null;

    const stageOrder: Deal['stage'][] = [
      'prospect', 'qualified', 'proposal', 'negotiation', 'closed-won'
    ];

    const currentIndex = stageOrder.indexOf(deal.stage);
    if (currentIndex === -1 || currentIndex === stageOrder.length - 1) {
      return deal; // Already at final stage or invalid stage
    }

    const nextStage = stageOrder[currentIndex + 1];
    return this.update(id, { stage: nextStage });
  }

  // Close deal as won
  async closeAsWon(id: string): Promise<Deal | null> {
    return this.update(id, { 
      stage: 'closed-won', 
      probability: 100,
      expectedCloseDate: new Date()
    });
  }

  // Close deal as lost
  async closeAsLost(id: string): Promise<Deal | null> {
    return this.update(id, { 
      stage: 'closed-lost', 
      probability: 0,
      expectedCloseDate: new Date()
    });
  }

  // Get deal statistics
  async getStats(): Promise<{
    total: number;
    active: number;
    closed: number;
    won: number;
    lost: number;
    overdue: number;
    closingSoon: number;
    totalValue: number;
    activeValue: number;
    wonValue: number;
    pipelineValue: number;
    conversionRate: number;
    averageValue: number;
    averageProbability: number;
    stages: Record<Deal['stage'], number>;
  }> {
    const total = this.deals.length;
    const active = (await this.getActiveDeals()).length;
    const closed = (await this.getClosedDeals()).length;
    const won = (await this.getByStage('closed-won')).length;
    const lost = (await this.getByStage('closed-lost')).length;
    const overdue = (await this.getOverdueDeals()).length;
    const closingSoon = (await this.getClosingSoonDeals()).length;

    const totalValue = this.deals.reduce((sum, deal) => sum + deal.value, 0);
    const activeDeals = await this.getActiveDeals();
    const activeValue = activeDeals.reduce((sum, deal) => sum + deal.value, 0);
    const wonDeals = await this.getByStage('closed-won');
    const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
    const pipelineValue = activeDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

    const conversionRate = total > 0 ? (won / total) * 100 : 0;
    const averageValue = total > 0 ? totalValue / total : 0;
    const averageProbability = total > 0 ? this.deals.reduce((sum, deal) => sum + deal.probability, 0) / total : 0;

    const stages: Record<Deal['stage'], number> = {
      prospect: (await this.getByStage('prospect')).length,
      qualified: (await this.getByStage('qualified')).length,
      proposal: (await this.getByStage('proposal')).length,
      negotiation: (await this.getByStage('negotiation')).length,
      'closed-won': won,
      'closed-lost': lost,
    };

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
      stages,
    };
  }

  // Get deal pipeline
  async getPipeline(): Promise<Array<{
    stage: Deal['stage'];
    count: number;
    value: number;
    weightedValue: number;
  }>> {
    const stages: Deal['stage'][] = ['prospect', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
    
    const pipeline = [];
    for (const stage of stages) {
      const stageDeals = await this.getByStage(stage);
      const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
      const weightedValue = stageDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
      
      pipeline.push({
        stage,
        count: stageDeals.length,
        value,
        weightedValue,
      });
    }
    
    return pipeline;
  }

  // Private helper methods
  private applyFilters(deals: Deal[], filters: DealFilters): Deal[] {
    return deals.filter(deal => {
      if (filters.stage && deal.stage !== filters.stage) return false;
      if (filters.contactId && deal.contactId !== filters.contactId) return false;
      if (filters.minValue && deal.value < filters.minValue) return false;
      if (filters.maxValue && deal.value > filters.maxValue) return false;
      if (filters.minProbability && deal.probability < filters.minProbability) return false;
      if (filters.maxProbability && deal.probability > filters.maxProbability) return false;
      
      if (filters.isOverdue !== undefined) {
        const isOverdue = new Date() > deal.expectedCloseDate && !['closed-won', 'closed-lost'].includes(deal.stage);
        if (filters.isOverdue !== isOverdue) return false;
      }
      
      if (filters.isClosingSoon !== undefined) {
        const now = new Date();
        const daysToClose = Math.floor((deal.expectedCloseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isClosingSoon = daysToClose <= 7 && daysToClose >= 0 && !['closed-won', 'closed-lost'].includes(deal.stage);
        if (filters.isClosingSoon !== isClosingSoon) return false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchMatch = 
          deal.title.toLowerCase().includes(searchLower) ||
          deal.contactId.toLowerCase().includes(searchLower) ||
          deal.stage.toLowerCase().includes(searchLower);
        if (!searchMatch) return false;
      }
      
      return true;
    });
  }

  private applySorting(deals: Deal[], sortOptions: DealSortOptions): Deal[] {
    return [...deals].sort((a, b) => {
      const { sortBy, sortOrder } = sortOptions;
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'value':
          comparison = a.value - b.value;
          break;
        case 'probability':
          comparison = a.probability - b.probability;
          break;
        case 'stage': {
          const stageOrder = {
            prospect: 1,
            qualified: 2,
            proposal: 3,
            negotiation: 4,
            'closed-won': 5,
            'closed-lost': 6,
          };
          comparison = stageOrder[a.stage] - stageOrder[b.stage];
          break;
        }
        case 'expectedCloseDate':
          comparison = a.expectedCloseDate.getTime() - b.expectedCloseDate.getTime();
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}

// Export singleton instance
export const dealService = DealService.getInstance();
