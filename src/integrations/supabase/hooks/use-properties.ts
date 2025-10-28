import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/shared/hooks/use-toast';

export interface PropertyInsert {
  mls_id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  lot_size: number;
  year_built: number;
  property_type: 'house' | 'apartment' | 'townhouse' | 'duplex' | 'land' | 'commercial';
  status?: 'active' | 'pending' | 'sold' | 'off-market';
  description: string;
  features?: string[];
  images?: string[];
  agent_id: string;
}

export interface PropertiesQueryParams {
  page?: number;
  pageSize?: number;
}

export function useProperties(params?: PropertiesQueryParams) {
  const { page = 1, pageSize = 20 } = params || {};
  
  return useQuery({
    queryKey: ['properties', page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Get total count
      const { count } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      // Get paginated data
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      return {
        data: data || [],
        totalCount: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      };
    }
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (property: PropertyInsert) => {
      const { data, error } = await supabase
        .from('properties')
        .insert(property)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: 'Success',
        description: 'Property created successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create property',
        variant: 'destructive'
      });
    }
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PropertyInsert> }) => {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', data.id] });
      toast({
        title: 'Success',
        description: 'Property updated successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update property',
        variant: 'destructive'
      });
    }
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: 'Success',
        description: 'Property deleted successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete property',
        variant: 'destructive'
      });
    }
  });
}
