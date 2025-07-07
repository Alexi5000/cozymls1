export interface Property {
  id: string;
  mlsId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  propertyType: 'house' | 'apartment' | 'townhouse' | 'duplex' | 'land' | 'commercial';
  status: 'active' | 'pending' | 'sold' | 'off-market';
  listingDate: Date;
  daysOnMarket: number;
  description: string;
  features: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}