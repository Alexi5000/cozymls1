import { useState, useEffect, useCallback } from 'react';
import { Property } from '@/entities/property';
import { PropertySearchFilters } from '../types';

export function usePropertySearch() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertySearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAllProperties = useCallback(async () => {
    setIsLoading(false); // Instant loading - no delays
    setError(null);
    try {
      // Instant property loading
      const mockProperties: Property[] = [];
      setAllProperties(mockProperties);
      setProperties(mockProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<PropertySearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  useEffect(() => {
    loadAllProperties();
  }, [loadAllProperties]);

  return {
    properties,
    allProperties,
    filters,
    isLoading,
    error,
    updateFilters,
    loadAllProperties,
  };
}