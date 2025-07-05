import { Contact } from './types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    company: 'Tech Corp',
    status: 'client',
    tags: ['VIP', 'Luxury'],
    lastContact: new Date('2024-02-15'),
    notes: 'Looking for a family home in San Francisco',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    company: 'Design Studio',
    status: 'prospect',
    tags: ['First-time buyer'],
    lastContact: new Date('2024-02-10'),
    notes: 'Interested in condos under $800k',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '(555) 345-6789',
    status: 'lead',
    tags: ['Investor'],
    lastContact: new Date('2024-02-05'),
    notes: 'Looking for investment properties',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05')
  }
];