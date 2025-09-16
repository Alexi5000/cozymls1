import { Activity } from './types';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Follow up with John Smith',
    description: 'Discuss property viewing schedule',
    contactId: '1',
    priority: 'high',
    dueDate: new Date('2024-02-20'),
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Property showing - Pine Avenue',
    description: 'Show condo to Dawn Johnson',
    contactId: '2',
    priority: 'medium',
    dueDate: new Date('2024-02-18'),
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    type: 'email',
    title: 'Send market analysis',
    description: 'Prepare and send market analysis to potential investor',
    contactId: '3',
    priority: 'low',
    dueDate: new Date('2024-02-22'),
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];