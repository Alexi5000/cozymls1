export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'lead' | 'prospect' | 'client';
  tags: string[];
  lastContact: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}