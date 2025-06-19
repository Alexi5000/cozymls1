
import { User } from '@/types/crm';

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
