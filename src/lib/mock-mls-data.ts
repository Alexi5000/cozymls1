
import { Property, Agent, Client, ShowingRequest, MLSStats } from '@/types/mls';

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    email: 'sarah@cozyhomes.com',
    phone: '+1 (555) 123-4567',
    license: 'RE12345678',
    brokerage: 'Cozy Homes Realty',
    specialties: ['Luxury Homes', 'First-Time Buyers'],
    bio: 'Experienced real estate professional specializing in luxury properties and first-time homebuyers.',
    avatar: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?w=400&h=400&fit=crop&crop=face',
    status: 'active',
    joinDate: new Date('2020-03-15'),
    totalSales: 47,
    currentListings: 12,
    regions: ['Downtown', 'Westside', 'North Hills'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@cozyhomes.com',
    phone: '+1 (555) 987-6543',
    license: 'RE87654321',
    brokerage: 'Cozy Homes Realty',
    specialties: ['Investment Properties', 'Commercial'],
    status: 'active',
    joinDate: new Date('2019-07-22'),
    totalSales: 63,
    currentListings: 8,
    regions: ['East Side', 'Industrial District'],
  },
];

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: '1',
    mlsId: 'MLS001234',
    title: 'Charming Victorian Home',
    address: {
      street: '123 Maple Street',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90210',
      county: 'Los Angeles',
    },
    price: 875000,
    status: 'active',
    type: 'single-family',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    lotSize: 0.25,
    yearBuilt: 1925,
    description: 'Beautiful Victorian home with original hardwood floors and modern updates.',
    features: ['Hardwood Floors', 'Updated Kitchen', 'Original Details', 'Large Garden'],
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    ],
    listingAgent: {
      id: '1',
      name: 'Sarah Thompson',
      email: 'sarah@cozyhomes.com',
      phone: '+1 (555) 123-4567',
      license: 'RE12345678',
      brokerage: 'Cozy Homes Realty',
    },
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-06-15'),
    daysOnMarket: 45,
    priceHistory: [
      {
        id: '1',
        propertyId: '1',
        price: 875000,
        changeDate: new Date('2024-05-01'),
        changeType: 'initial',
      },
    ],
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    id: '2',
    mlsId: 'MLS005678',
    title: 'Modern Downtown Condo',
    address: {
      street: '456 High Street, Unit 12A',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90211',
      county: 'Los Angeles',
    },
    price: 650000,
    status: 'pending',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    yearBuilt: 2018,
    description: 'Sleek modern condo with city views and premium amenities.',
    features: ['City Views', 'Gym', 'Rooftop Deck', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    ],
    listingAgent: {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@cozyhomes.com',
      phone: '+1 (555) 987-6543',
      license: 'RE87654321',
      brokerage: 'Cozy Homes Realty',
    },
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-06-10'),
    daysOnMarket: 62,
    priceHistory: [
      {
        id: '2',
        propertyId: '2',
        price: 675000,
        changeDate: new Date('2024-04-15'),
        changeType: 'initial',
      },
      {
        id: '3',
        propertyId: '2',
        price: 650000,
        changeDate: new Date('2024-05-20'),
        changeType: 'decrease',
        reason: 'Market adjustment',
      },
    ],
  },
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 234-5678',
    type: 'buyer',
    status: 'active',
    preferences: {
      minPrice: 400000,
      maxPrice: 800000,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: ['single-family', 'townhome'],
      locations: ['Westside', 'North Hills'],
    },
    assignedAgent: '1',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-06-17'),
    notes: 'First-time homebuyer, pre-approved for $750k',
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 345-6789',
    type: 'seller',
    status: 'active',
    assignedAgent: '2',
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-06-16'),
    notes: 'Looking to downsize, flexible on timing',
  },
];

// Mock Showing Requests
export const mockShowingRequests: ShowingRequest[] = [
  {
    id: '1',
    propertyId: '1',
    clientId: '1',
    agentId: '1',
    requestedDate: new Date('2024-06-20T14:00:00'),
    status: 'confirmed',
    notes: 'Client is very interested, has financing pre-approval',
    createdAt: new Date('2024-06-17'),
    updatedAt: new Date('2024-06-17'),
  },
  {
    id: '2',
    propertyId: '2',
    clientId: '1',
    agentId: '1',
    requestedDate: new Date('2024-06-22T10:30:00'),
    status: 'pending',
    createdAt: new Date('2024-06-18'),
    updatedAt: new Date('2024-06-18'),
  },
];

// Mock MLS Stats
export const mockMLSStats: MLSStats = {
  totalProperties: 1247,
  activeListings: 342,
  avgDaysOnMarket: 28,
  avgPrice: 725000,
  monthlyVolume: 15600000,
  newListings: 47,
};
