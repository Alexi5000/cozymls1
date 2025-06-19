
import { Activity } from '@/types/crm';

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
