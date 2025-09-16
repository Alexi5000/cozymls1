import { Activity } from './types';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Follow up with John Smith',
    description: 'Discuss property viewing schedule and answer questions about the downtown condo',
    contactId: '1',
    dealId: '1',
    priority: 'high',
    dueDate: new Date('2024-02-20T14:30:00'),
    createdAt: new Date('2024-02-15T09:00:00'),
    updatedAt: new Date('2024-02-15T09:00:00')
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Property showing - Pine Avenue',
    description: 'Show 3-bedroom condo to Dawn Johnson and her family',
    contactId: '2',
    dealId: '2',
    priority: 'high',
    dueDate: new Date('2024-02-18T15:00:00'),
    createdAt: new Date('2024-02-10T11:30:00'),
    updatedAt: new Date('2024-02-10T11:30:00')
  },
  {
    id: '3',
    type: 'email',
    title: 'Send market analysis',
    description: 'Prepare and send comprehensive market analysis to potential investor',
    contactId: '3',
    priority: 'medium',
    dueDate: new Date('2024-02-22T10:00:00'),
    createdAt: new Date('2024-02-05T16:45:00'),
    updatedAt: new Date('2024-02-05T16:45:00')
  },
  {
    id: '4',
    type: 'call',
    title: 'Loan pre-approval follow-up',
    description: 'Check with Sarah Wilson about mortgage pre-approval status',
    contactId: '4',
    dealId: '3',
    priority: 'high',
    dueDate: new Date('2024-02-19T11:00:00'),
    createdAt: new Date('2024-02-14T14:20:00'),
    updatedAt: new Date('2024-02-14T14:20:00')
  },
  {
    id: '5',
    type: 'meeting',
    title: 'Closing preparation meeting',
    description: 'Review closing documents with Michael Chen for Oak Street property',
    contactId: '5',
    dealId: '4',
    priority: 'high',
    dueDate: new Date('2024-02-21T13:30:00'),
    createdAt: new Date('2024-02-12T10:15:00'),
    updatedAt: new Date('2024-02-12T10:15:00')
  },
  {
    id: '6',
    type: 'task',
    title: 'Update property listings',
    description: 'Update photos and descriptions for 5 new listings in the downtown area',
    priority: 'medium',
    dueDate: new Date('2024-02-23T17:00:00'),
    createdAt: new Date('2024-02-16T08:30:00'),
    updatedAt: new Date('2024-02-16T08:30:00')
  },
  {
    id: '7',
    type: 'call',
    title: 'Home inspection coordination',
    description: 'Schedule home inspection for Emma Davis property purchase',
    contactId: '6',
    dealId: '5',
    priority: 'high',
    dueDate: new Date('2024-02-20T09:30:00'),
    createdAt: new Date('2024-02-13T15:45:00'),
    updatedAt: new Date('2024-02-13T15:45:00')
  },
  {
    id: '8',
    type: 'note',
    title: 'Client preference notes',
    description: 'Document Robert Taylor preferences: 4+ bedrooms, good schools, under $800k',
    contactId: '7',
    priority: 'low',
    createdAt: new Date('2024-02-11T12:20:00'),
    updatedAt: new Date('2024-02-11T12:20:00')
  },
  {
    id: '9',
    type: 'email',
    title: 'Neighborhood comparison report',
    description: 'Send detailed neighborhood comparison for Lisa Anderson',
    contactId: '8',
    priority: 'medium',
    dueDate: new Date('2024-02-24T14:00:00'),
    createdAt: new Date('2024-02-17T11:10:00'),
    updatedAt: new Date('2024-02-17T11:10:00')
  },
  {
    id: '10',
    type: 'meeting',
    title: 'Investment property consultation',
    description: 'Consultation with David Kim about rental property investment opportunities',
    contactId: '9',
    priority: 'medium',
    dueDate: new Date('2024-02-25T16:30:00'),
    createdAt: new Date('2024-02-18T09:45:00'),
    updatedAt: new Date('2024-02-18T09:45:00')
  },
  {
    id: '11',
    type: 'task',
    title: 'CMA preparation',
    description: 'Prepare Comparative Market Analysis for 123 Maple Street',
    dealId: '6',
    priority: 'high',
    dueDate: new Date('2024-02-21T10:00:00'),
    createdAt: new Date('2024-02-15T13:30:00'),
    updatedAt: new Date('2024-02-15T13:30:00')
  },
  {
    id: '12',
    type: 'call',
    title: 'Price negotiation discussion',
    description: 'Discuss counter-offer strategy with Jennifer Martinez',
    contactId: '10',
    dealId: '7',
    priority: 'high',
    dueDate: new Date('2024-02-19T15:45:00'),
    completedAt: new Date('2024-02-19T15:30:00'),
    createdAt: new Date('2024-02-18T16:20:00'),
    updatedAt: new Date('2024-02-19T15:30:00')
  },
  {
    id: '13',
    type: 'email',
    title: 'Welcome package for new clients',
    description: 'Send comprehensive welcome package to the Thompson family',
    contactId: '11',
    priority: 'low',
    dueDate: new Date('2024-02-26T12:00:00'),
    createdAt: new Date('2024-02-19T10:30:00'),
    updatedAt: new Date('2024-02-19T10:30:00')
  },
  {
    id: '14',
    type: 'meeting',
    title: 'Open house preparation',
    description: 'Prepare marketing materials and staging for weekend open house',
    priority: 'medium',
    dueDate: new Date('2024-02-23T09:00:00'),
    createdAt: new Date('2024-02-17T14:15:00'),
    updatedAt: new Date('2024-02-17T14:15:00')
  },
  {
    id: '15',
    type: 'note',
    title: 'Market trends research',
    description: 'Research current market trends in the suburban family home segment',
    priority: 'low',
    completedAt: new Date('2024-02-16T17:00:00'),
    createdAt: new Date('2024-02-14T08:00:00'),
    updatedAt: new Date('2024-02-16T17:00:00')
  }
];