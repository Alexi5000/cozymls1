import { Contact } from './types';

// Lightweight mock data for instant preview loading (5 items instead of 50)
export const mockContactsLite: Contact[] = [
  {
    id: '1',
    name: 'Dawn Johnson',
    email: 'dawn.johnson@email.com',
    phone: '(555) 123-4567',
    company: 'Tech Corp',
    status: 'client',
    tags: ['VIP', 'Luxury'],
    lastContact: new Date('2024-01-20'),
    notes: 'Looking for luxury properties with sea views',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '2',
    name: 'Michael Davis',
    email: 'michael.davis@company.com',
    phone: '(555) 234-5678',
    company: 'Design Studio',
    status: 'prospect',
    tags: ['First-time buyer', 'Investment'],
    lastContact: new Date('2024-01-18'),
    notes: 'First-time buyer, needs guidance on property investment',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@business.net',
    phone: '(555) 345-6789',
    company: 'Marketing Agency',
    status: 'lead',
    tags: ['Relocating', 'Quick close'],
    lastContact: new Date('2024-01-15'),
    notes: 'Relocating from London for work, cash buyer',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    name: 'Robert Wilson',
    email: 'robert.wilson@corp.org',
    phone: '(555) 456-7890',
    status: 'client',
    tags: ['Downsizing', 'Flexible timing'],
    lastContact: new Date('2024-01-22'),
    notes: 'Downsizing after retirement, prefers coastal areas',
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@gmail.com',
    phone: '(555) 567-8901',
    company: 'Financial Services',
    status: 'prospect',
    tags: ['Upsizing', 'School district'],
    lastContact: new Date('2024-01-16'),
    notes: 'Growing family, needs more space near good schools',
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2024-01-19')
  }
];