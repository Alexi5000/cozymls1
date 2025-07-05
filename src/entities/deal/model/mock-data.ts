import { Deal } from './types';

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Oak Street Property Sale',
    contactId: '1',
    value: 1250000,
    stage: 'negotiation',
    probability: 75,
    expectedCloseDate: new Date('2024-03-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '2',
    title: 'Pine Avenue Condo',
    contactId: '2',
    value: 850000,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: new Date('2024-04-01'),
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    title: 'Investment Property Portfolio',
    contactId: '3',
    value: 2500000,
    stage: 'qualified',
    probability: 40,
    expectedCloseDate: new Date('2024-05-15'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05')
  }
];