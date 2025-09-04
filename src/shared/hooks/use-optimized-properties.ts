import { useState, useCallback, useMemo } from 'react';
import { useAppData } from '@/app/data-provider';
import { Property } from '@/entities/property';

export interface PropertiesFilters {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  status?: string;
  bedrooms?: number;
  bathrooms?: number;
}

// Optimized properties hook using global data provider
export function useOptimizedProperties() {
  const { properties: allProperties } = useAppData();
  const [filters, setFilters] = useState<PropertiesFilters>({ search: '' });

  const updateFilters = useCallback((newFilters: Partial<PropertiesFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      const { search, minPrice, maxPrice, propertyType, status, bedrooms, bathrooms } = filters;
      
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
  }, [allProperties, filters]);

  const refreshProperties = useCallback(async () => {
    // Data is already in global state, just reset filters if needed
    setFilters({ search: '' });
  }, []);

  return {
    properties: filteredProperties,
    allProperties,
    filters,
    isLoading: false, // Never loading with global data
    error: null,      // No errors with pre-loaded data
    updateFilters,
    refreshProperties,
  };
}