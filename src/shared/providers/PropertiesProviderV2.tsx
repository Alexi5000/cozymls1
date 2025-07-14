import React, { createContext, useContext, ReactNode } from 'react';
import { usePropertySearch, PropertySearchFilters } from '@/features/search-property';
import { Property } from '@/entities/property';

interface PropertiesContextType {
  properties: Property[];
  allProperties: Property[];
  filters: PropertySearchFilters;
  isLoading: boolean;
  error: string | null;
  updateFilters: (filters: Partial<PropertySearchFilters>) => void;
  refreshProperties: () => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

interface PropertiesProviderProps {
  children: ReactNode;
}

export function PropertiesProviderV2({ children }: PropertiesProviderProps) {
  const searchState = usePropertySearch();

  const refreshProperties = async () => {
    await searchState.loadAllProperties();
  };

  const contextValue: PropertiesContextType = {
    properties: searchState.properties,
    allProperties: searchState.allProperties,
    filters: searchState.filters,
    isLoading: searchState.isLoading,
    error: searchState.error,
    updateFilters: searchState.updateFilters,
    refreshProperties,
  };

  return (
    <PropertiesContext.Provider value={contextValue}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function usePropertiesContextV2() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('usePropertiesContextV2 must be used within a PropertiesProviderV2');
  }
  return context;
}
