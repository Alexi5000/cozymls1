import React, { createContext, useContext, ReactNode } from 'react';
import { Property, mockProperties } from '@/entities/property';
import { Deal, mockDeals } from '@/entities/deal';
import { User, mockUsers } from '@/entities/user';
import { Contact, mockContacts } from '@/entities/contact';
import { Activity, mockActivities } from '@/entities/activity';
import { Report, mockReports } from '@/entities/report';

// Global app data interface
interface AppData {
  properties: Property[];
  deals: Deal[];
  users: User[];
  contacts: Contact[];
  activities: Activity[];
  reports: Report[];
}

// App data context
const AppDataContext = createContext<AppData | undefined>(undefined);

interface AppDataProviderProps {
  children: ReactNode;
}

// Global data provider that preloads all data instantly
export function AppDataProvider({ children }: AppDataProviderProps) {
  // All data is preloaded synchronously for instant access
  const appData: AppData = {
    properties: mockProperties,
    deals: mockDeals,
    users: mockUsers,
    contacts: mockContacts,
    activities: mockActivities,
    reports: mockReports,
  };

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}