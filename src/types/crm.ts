
// Core CRM Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status: 'active' | 'inactive' | 'prospect';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  notes?: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  contactId: string;
  probability: number;
  expectedCloseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  notes?: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description?: string;
  contactId?: string;
  dealId?: string;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales' | 'support';
  avatar?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalContacts: number;
  activeDeals: number;
  totalRevenue: number;
  monthlyGrowth: number;
  conversionRate: number;
  avgDealSize: number;
}
