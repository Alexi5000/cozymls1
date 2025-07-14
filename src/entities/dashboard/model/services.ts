import { DashboardStats } from "@/entities/dashboard/model/types";

export interface DashboardTimeRange {
  start: Date;
  end: Date;
}

export interface DashboardService {
  getStats(timeRange?: DashboardTimeRange): Promise<DashboardStats>;
  getHistoricalStats(periods: number): Promise<DashboardStats[]>;
  refreshStats(): Promise<DashboardStats>;
}

export class MockDashboardService implements DashboardService {
  private static instance: MockDashboardService;
  private currentStats: DashboardStats;

  private constructor() {
    this.currentStats = {
      totalContacts: 847,
      activeDeals: 23,
      totalRevenue: 2400000,
      monthlyGrowth: 12.5,
    };
  }

  static getInstance(): MockDashboardService {
    if (!MockDashboardService.instance) {
      MockDashboardService.instance = new MockDashboardService();
    }
    return MockDashboardService.instance;
  }

  async getStats(timeRange?: DashboardTimeRange): Promise<DashboardStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (timeRange) {
      // Simulate filtered stats based on time range
      const daysDiff = Math.floor((timeRange.end.getTime() - timeRange.start.getTime()) / (1000 * 60 * 60 * 24));
      const multiplier = Math.min(1, daysDiff / 30); // Scale based on days
      
      return {
        totalContacts: Math.floor(this.currentStats.totalContacts * multiplier),
        activeDeals: Math.floor(this.currentStats.activeDeals * multiplier),
        totalRevenue: Math.floor(this.currentStats.totalRevenue * multiplier),
        monthlyGrowth: this.currentStats.monthlyGrowth,
      };
    }
    
    return { ...this.currentStats };
  }

  async getHistoricalStats(periods: number = 12): Promise<DashboardStats[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const historical: DashboardStats[] = [];
    const now = new Date();
    
    for (let i = periods - 1; i >= 0; i--) {
      const baseVariation = 0.7 + Math.random() * 0.6; // 70% to 130% variation
      const growthVariation = -5 + Math.random() * 20; // -5% to 15% growth
      
      historical.push({
        totalContacts: Math.floor(this.currentStats.totalContacts * baseVariation),
        activeDeals: Math.floor(this.currentStats.activeDeals * baseVariation),
        totalRevenue: Math.floor(this.currentStats.totalRevenue * baseVariation),
        monthlyGrowth: Math.round(growthVariation * 10) / 10,
      });
    }
    
    return historical;
  }

  async refreshStats(): Promise<DashboardStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Simulate slight changes in stats
    const contactsChange = Math.floor(Math.random() * 10) - 5; // -5 to +5
    const dealsChange = Math.floor(Math.random() * 6) - 3; // -3 to +3
    const revenueChange = Math.floor(Math.random() * 100000) - 50000; // -50k to +50k
    const growthChange = (Math.random() * 2) - 1; // -1% to +1%
    
    this.currentStats = {
      totalContacts: Math.max(0, this.currentStats.totalContacts + contactsChange),
      activeDeals: Math.max(0, this.currentStats.activeDeals + dealsChange),
      totalRevenue: Math.max(0, this.currentStats.totalRevenue + revenueChange),
      monthlyGrowth: Math.round((this.currentStats.monthlyGrowth + growthChange) * 10) / 10,
    };
    
    return { ...this.currentStats };
  }

  // Additional methods for testing and development
  updateStats(newStats: Partial<DashboardStats>): void {
    this.currentStats = {
      ...this.currentStats,
      ...newStats,
    };
  }

  resetStats(): void {
    this.currentStats = {
      totalContacts: 847,
      activeDeals: 23,
      totalRevenue: 2400000,
      monthlyGrowth: 12.5,
    };
  }

  // Real-time stats simulation
  startRealTimeUpdates(callback: (stats: DashboardStats) => void, interval: number = 30000): () => void {
    const intervalId = setInterval(async () => {
      const updatedStats = await this.refreshStats();
      callback(updatedStats);
    }, interval);

    return () => clearInterval(intervalId);
  }
}

// Export singleton instance
export const dashboardService = MockDashboardService.getInstance();

// Real implementation would look like this:
/*
export class ApiDashboardService implements DashboardService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getStats(timeRange?: DashboardTimeRange): Promise<DashboardStats> {
    const params = new URLSearchParams();
    if (timeRange) {
      params.append('start', timeRange.start.toISOString());
      params.append('end', timeRange.end.toISOString());
    }

    const response = await fetch(`${this.baseUrl}/dashboard/stats?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard stats: ${response.statusText}`);
    }

    return response.json();
  }

  async getHistoricalStats(periods: number): Promise<DashboardStats[]> {
    const response = await fetch(`${this.baseUrl}/dashboard/historical?periods=${periods}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch historical stats: ${response.statusText}`);
    }

    return response.json();
  }

  async refreshStats(): Promise<DashboardStats> {
    return this.getStats();
  }
}
*/
