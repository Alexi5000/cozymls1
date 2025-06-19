
import { Deal } from '@/types/crm';

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
