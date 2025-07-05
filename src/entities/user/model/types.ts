export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'manager';
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: Date;
  lastLogin?: Date;
}