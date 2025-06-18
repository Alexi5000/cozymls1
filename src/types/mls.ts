
// Real Estate MLS Types
export interface Property {
  id: string;
  mlsId: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    county?: string;
  };
  price: number;
  status: 'active' | 'pending' | 'sold' | 'off-market' | 'expired';
  type: 'single-family' | 'condo' | 'townhome' | 'multi-family' | 'land' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  description?: string;
  features: string[];
  images: string[];
  listingAgent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    license: string;
    brokerage: string;
  };
  createdAt: Date;
  updatedAt: Date;
  daysOnMarket: number;
  priceHistory: PriceHistory[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PriceHistory {
  id: string;
  propertyId: string;
  price: number;
  changeDate: Date;
  changeType: 'initial' | 'increase' | 'decrease';
  reason?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  brokerage: string;
  specialties: string[];
  bio?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  joinDate: Date;
  totalSales: number;
  currentListings: number;
  regions: string[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'buyer' | 'seller' | 'both';
  status: 'active' | 'inactive' | 'closed';
  preferences?: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: Property['type'][];
    locations?: string[];
  };
  assignedAgent: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface ShowingRequest {
  id: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  requestedDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MLSStats {
  totalProperties: number;
  activeListings: number;
  avgDaysOnMarket: number;
  avgPrice: number;
  monthlyVolume: number;
  newListings: number;
}
