import { User } from './types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Thompson',
    email: 'sarah@cozymls.com',
    role: 'agent',
    phone: '(555) 123-4567',
    department: 'Sales',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-02-15')
  },
  {
    id: 'user2',
    name: 'Mike Johnson',
    email: 'mike@cozymls.com',
    role: 'agent',
    phone: '(555) 234-5678',
    department: 'Sales',
    createdAt: new Date('2024-01-05'),
    lastLogin: new Date('2024-02-14')
  },
  {
    id: 'user3',
    name: 'Emily Davis',
    email: 'emily@cozymls.com',
    role: 'manager',
    phone: '(555) 345-6789',
    department: 'Sales',
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date('2024-02-15')
  }
];