import { useState, useCallback, useMemo } from 'react';
import { Property } from '@/entities/property';
import { mockProperties } from '@/entities/property';

export interface PropertiesFilters {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  status?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface PropertiesState {
  properties: Property[];
  filteredProperties: Property[];
  filters: PropertiesFilters;
  isLoading: boolean;
  error: string | null;
}

export function useProperties() {
  const [state, setState] = useState<PropertiesState>({
    properties: mockProperties,
    filteredProperties: mockProperties,
    filters: { search: '' },
    isLoading: false,
    error: null,
  });

  const updateFilters = useCallback((newFilters: Partial<PropertiesFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters }
    }));
  }, []);

  const filteredProperties = useMemo(() => {
    return state.properties.filter(property => {
      const { search, minPrice, maxPrice, propertyType, status, bedrooms, bathrooms } = state.filters;
      
      if (search && !property.address.toLowerCase().includes(search.toLowerCase()) &&
          !property.mlsId.toLowerCase().includes(search.toLowerCase()) &&
          !property.features.some(f => f.toLowerCase().includes(search.toLowerCase()))) {
        return false;
      }
      
      if (minPrice && property.price < minPrice) return false;
      if (maxPrice && property.price > maxPrice) return false;
      if (propertyType && property.propertyType !== propertyType) return false;
      if (status && property.status !== status) return false;
      if (bedrooms && property.bedrooms < bedrooms) return false;
      if (bathrooms && property.bathrooms < bathrooms) return false;
      
      return true;
    });
  }, [state.properties, state.filters]);

  const refreshProperties = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      setState(prev => ({ 
        ...prev, 
        properties: mockProperties,
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to fetch properties',
        isLoading: false 
      }));
    }
  }, []);

  return {
    properties: filteredProperties,
    allProperties: state.properties,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    updateFilters,
    refreshProperties,
  };
}