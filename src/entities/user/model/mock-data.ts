import { User } from './types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Siobhan O\'Sullivan',
    email: 'siobhan@dublinestate.ie',
    role: 'agent',
    phone: '+353 1 456 7890',
    department: 'Residential Sales',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-02-15')
  },
  {
    id: 'user2',
    name: 'Cian Murphy',
    email: 'cian@dublinestate.ie',
    role: 'agent',
    phone: '+353 87 123 4567',
    department: 'Luxury Properties',
    createdAt: new Date('2024-01-05'),
    lastLogin: new Date('2024-02-14')
  },
  {
    id: 'user3',
    name: 'Aoife Kelly',
    email: 'aoife@dublinestate.ie',
    role: 'manager',
    phone: '+353 1 234 5678',
    department: 'Sales',
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date('2024-02-15')
  },
  {
    id: 'user4',
    name: 'Padraig O\'Brien',
    email: 'padraig@dublinestate.ie',
    role: 'agent',
    phone: '+353 86 567 8901',
    department: 'Commercial',
    createdAt: new Date('2024-01-12'),
    lastLogin: new Date('2024-02-13')
  },
  {
    id: 'user5',
    name: 'Niamh Ryan',
    email: 'niamh@dublinestate.ie',
    role: 'agent',
    phone: '+353 1 345 6789',
    department: 'Residential Sales',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-02-12')
  },
  {
    id: 'user6',
    name: 'Eoin Walsh',
    email: 'eoin@dublinestate.ie',
    role: 'agent',
    phone: '+353 85 234 5678',
    department: 'Investment Properties',
    createdAt: new Date('2024-01-18'),
    lastLogin: new Date('2024-02-11')
  },
  {
    id: 'user7',
    name: 'Caoimhe Byrne',
    email: 'caoimhe@dublinestate.ie',
    role: 'agent',
    phone: '+353 1 567 8901',
    department: 'Luxury Properties',
    createdAt: new Date('2024-01-20'),
    lastLogin: new Date('2024-02-10')
  },
  {
    id: 'user8',
    name: 'Ruairi McCarthy',
    email: 'ruairi@dublinestate.ie',
    role: 'agent',
    phone: '+353 83 678 9012',
    department: 'Residential Sales',
    createdAt: new Date('2024-01-22'),
    lastLogin: new Date('2024-02-09')
  },
  {
    id: 'user9',
    name: 'Grainne Fitzgerald',
    email: 'grainne@dublinestate.ie',
    role: 'agent',
    phone: '+353 1 678 9012',
    department: 'Commercial',
    createdAt: new Date('2024-01-25'),
    lastLogin: new Date('2024-02-08')
  },
  {
    id: 'user10',
    name: 'Oisin Donovan',
    email: 'oisin@dublinestate.ie',
    role: 'admin',
    phone: '+353 87 789 0123',
    department: 'Operations',
    createdAt: new Date('2024-01-28'),
    lastLogin: new Date('2024-02-16')
  }
];