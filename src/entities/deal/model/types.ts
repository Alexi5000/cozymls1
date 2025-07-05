export interface Deal {
  id: string;
  title: string;
  contactId: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}