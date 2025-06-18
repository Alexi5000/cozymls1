
import { Contact, Deal, Activity, User, DashboardStats } from '@/types/crm';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?w=400&h=400&fit=crop&crop=face',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2', 
    name: 'Mike Chen',
    email: 'mike@company.com',
    role: 'sales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    createdAt: new Date('2024-01-15'),
  },
];

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    position: 'CTO',
    status: 'active',
    tags: ['enterprise', 'tech'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-06-15'),
    assignedTo: '2',
    notes: 'Interested in enterprise solution',
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily@startup.io',
    phone: '+1 (555) 987-6543',
    company: 'Startup.io',
    position: 'Founder',
    status: 'prospect',
    tags: ['startup', 'saas'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-06-16'),
    assignedTo: '2',
  },
  {
    id: '3',
    name: 'Robert Wilson',
    email: 'robert@bigcorp.com',
    phone: '+1 (555) 456-7890',
    company: 'BigCorp',
    position: 'VP Sales',
    status: 'active',
    tags: ['enterprise', 'established'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-06-17'),
    assignedTo: '1',
  },
];

// Mock Deals
export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'TechCorp Enterprise License',
    value: 50000,
    stage: 'negotiation',
    contactId: '1',
    probability: 75,
    expectedCloseDate: new Date('2024-07-31'),
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-06-15'),
    assignedTo: '2',
    notes: 'Large enterprise deal, needs approval from board',
  },
  {
    id: '2',
    title: 'Startup.io Growth Plan',
    value: 12000,
    stage: 'proposal',
    contactId: '2',
    probability: 60,
    expectedCloseDate: new Date('2024-07-15'),
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-16'),
    assignedTo: '2',
  },
  {
    id: '3',
    title: 'BigCorp Integration',
    value: 75000,
    stage: 'qualified',
    contactId: '3',
    probability: 40,
    expectedCloseDate: new Date('2024-08-30'),
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-17'),
    assignedTo: '1',
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Follow-up call with John Smith',
    description: 'Discussed implementation timeline',
    contactId: '1',
    dealId: '1',
    dueDate: new Date('2024-06-20'),
    createdAt: new Date('2024-06-18'),
    assignedTo: '2',
    priority: 'high',
  },
  {
    id: '2',
    type: 'email',
    title: 'Send proposal to Emily',
    description: 'Growth plan proposal with pricing',
    contactId: '2',
    dealId: '2',
    dueDate: new Date('2024-06-19'),
    createdAt: new Date('2024-06-18'),
    assignedTo: '2',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Demo meeting with BigCorp',
    description: 'Product demonstration and Q&A',
    contactId: '3',
    dealId: '3',
    dueDate: new Date('2024-06-25'),
    createdAt: new Date('2024-06-18'),
    assignedTo: '1',
    priority: 'high',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalContacts: 247,
  activeDeals: 23,
  totalRevenue: 1250000,
  monthlyGrowth: 12.5,
  conversionRate: 23.4,
  avgDealSize: 45000,
};
