import React, { createContext, useContext, ReactNode } from 'react';
import { useProperties, PropertiesFilters } from '@/shared/hooks/use-properties';
import { Property } from '@/entities/property';

interface PropertiesContextType {
  properties: Property[];
  allProperties: Property[];
  filters: PropertiesFilters;
  isLoading: boolean;
  error: string | null;
  updateFilters: (filters: Partial<PropertiesFilters>) => void;
  refreshProperties: () => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

interface PropertiesProviderProps {
  children: ReactNode;
}

export function PropertiesProvider({ children }: PropertiesProviderProps) {
  const propertiesState = useProperties();

  return (
    <PropertiesContext.Provider value={propertiesState}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function usePropertiesContext() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('usePropertiesContext must be used within a PropertiesProvider');
  }
  return context;
}