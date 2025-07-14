import { Property } from "@/entities/property/model/types";

export interface PropertyFilters {
  status?: Property['status'];
  propertyType?: Property['propertyType'];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  city?: string;
  state?: string;
  zipCode?: string;
  agentId?: string;
  maxDaysOnMarket?: number;
}

export interface PropertySortOptions {
  sortBy: 'price' | 'daysOnMarket' | 'listingDate' | 'squareFeet' | 'address';
  sortOrder: 'asc' | 'desc';
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class PropertyService {
  private static instance: PropertyService;
  private properties: Property[] = [];

  private constructor() {}

  static getInstance(): PropertyService {
    if (!PropertyService.instance) {
      PropertyService.instance = new PropertyService();
    }
    return PropertyService.instance;
  }

  // Initialize with mock data
  async initialize(mockData: Property[]): Promise<void> {
    this.properties = mockData;
  }

  // Get all properties
  async getAll(): Promise<Property[]> {
    return [...this.properties];
  }

  // Get property by ID
  async getById(id: string): Promise<Property | null> {
    return this.properties.find(p => p.id === id) || null;
  }

  // Search properties with filters and pagination
  async search(
    filters: PropertyFilters = {},
    sortOptions: PropertySortOptions = { sortBy: 'listingDate', sortOrder: 'desc' },
    page: number = 1,
    pageSize: number = 20
  ): Promise<PropertySearchResult> {
    let filteredProperties = this.applyFilters(this.properties, filters);
    filteredProperties = this.applySorting(filteredProperties, sortOptions);

    const total = filteredProperties.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const properties = filteredProperties.slice(start, end);

    return {
      properties,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  // Get properties by agent
  async getByAgent(agentId: string): Promise<Property[]> {
    return this.properties.filter(p => p.agent.id === agentId);
  }

  // Get properties by status
  async getByStatus(status: Property['status']): Promise<Property[]> {
    return this.properties.filter(p => p.status === status);
  }

  // Get recently listed properties
  async getRecentListings(limit: number = 10): Promise<Property[]> {
    return [...this.properties]
      .sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime())
      .slice(0, limit);
  }

  // Get hot properties (quick sales)
  async getHotProperties(maxDaysOnMarket: number = 7): Promise<Property[]> {
    return this.properties.filter(p => 
      p.status === 'active' && p.daysOnMarket <= maxDaysOnMarket
    );
  }

  // Get properties by price range
  async getByPriceRange(minPrice: number, maxPrice: number): Promise<Property[]> {
    return this.properties.filter(p => p.price >= minPrice && p.price <= maxPrice);
  }

  // Get featured properties (for dashboard/homepage)
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    // Simple logic: mix of new listings and properties with good features
    const newListings = this.properties
      .filter(p => p.status === 'active')
      .sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime())
      .slice(0, Math.floor(limit / 2));

    const qualityProperties = this.properties
      .filter(p => p.status === 'active' && p.features.length >= 5)
      .sort((a, b) => b.features.length - a.features.length)
      .slice(0, limit - newListings.length);

    return [...newListings, ...qualityProperties].slice(0, limit);
  }

  // Create new property
  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.properties.push(newProperty);
    return newProperty;
  }

  // Update property
  async update(id: string, updates: Partial<Property>): Promise<Property | null> {
    const propertyIndex = this.properties.findIndex(p => p.id === id);
    if (propertyIndex === -1) return null;

    const updatedProperty = {
      ...this.properties[propertyIndex],
      ...updates,
      updatedAt: new Date(),
    };

    this.properties[propertyIndex] = updatedProperty;
    return updatedProperty;
  }

  // Delete property
  async delete(id: string): Promise<boolean> {
    const propertyIndex = this.properties.findIndex(p => p.id === id);
    if (propertyIndex === -1) return false;

    this.properties.splice(propertyIndex, 1);
    return true;
  }

  // Get property statistics
  async getStats(): Promise<{
    total: number;
    active: number;
    pending: number;
    sold: number;
    averagePrice: number;
    averageDaysOnMarket: number;
  }> {
    const active = this.properties.filter(p => p.status === 'active').length;
    const pending = this.properties.filter(p => p.status === 'pending').length;
    const sold = this.properties.filter(p => p.status === 'sold').length;
    const averagePrice = this.properties.reduce((sum, p) => sum + p.price, 0) / this.properties.length;
    const averageDaysOnMarket = this.properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / this.properties.length;

    return {
      total: this.properties.length,
      active,
      pending,
      sold,
      averagePrice: Math.round(averagePrice),
      averageDaysOnMarket: Math.round(averageDaysOnMarket),
    };
  }

  // Private helper methods
  private applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
    return properties.filter(property => {
      if (filters.status && property.status !== filters.status) return false;
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms !== filters.bathrooms) return false;
      if (filters.minSquareFeet && property.squareFeet < filters.minSquareFeet) return false;
      if (filters.maxSquareFeet && property.squareFeet > filters.maxSquareFeet) return false;
      if (filters.city && property.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.state && property.state.toLowerCase() !== filters.state.toLowerCase()) return false;
      if (filters.zipCode && property.zipCode !== filters.zipCode) return false;
      if (filters.agentId && property.agent.id !== filters.agentId) return false;
      if (filters.maxDaysOnMarket && property.daysOnMarket > filters.maxDaysOnMarket) return false;
      return true;
    });
  }

  private applySorting(properties: Property[], sortOptions: PropertySortOptions): Property[] {
    return [...properties].sort((a, b) => {
      const { sortBy, sortOrder } = sortOptions;
      let comparison = 0;

      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'daysOnMarket':
          comparison = a.daysOnMarket - b.daysOnMarket;
          break;
        case 'listingDate':
          comparison = new Date(a.listingDate).getTime() - new Date(b.listingDate).getTime();
          break;
        case 'squareFeet':
          comparison = a.squareFeet - b.squareFeet;
          break;
        case 'address':
          comparison = a.address.localeCompare(b.address);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}

// Export singleton instance
export const propertyService = PropertyService.getInstance();
