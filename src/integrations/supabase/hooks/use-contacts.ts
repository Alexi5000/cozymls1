import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/shared/hooks/use-toast';

export interface ContactInsert {
  name: string;
  email: string;
  phone: string;
  company?: string;
  status?: 'lead' | 'prospect' | 'client';
  tags?: string[];
  notes?: string;
  created_by: string;
}

export interface ContactsQueryParams {
  page?: number;
  pageSize?: number;
}

export function useContacts(params?: ContactsQueryParams) {
  const { page = 1, pageSize = 20 } = params || {};
  
  return useQuery({
    queryKey: ['contacts', page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Get total count
      const { count } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Get paginated data
      const { data, error } = await supabase
        .from('contacts')
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

export function useContact(id: string) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (contact: ContactInsert) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert(contact)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({
        title: 'Success',
        description: 'Contact created successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create contact',
        variant: 'destructive'
      });
    }
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ContactInsert> }) => {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', data.id] });
      toast({
        title: 'Success',
        description: 'Contact updated successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update contact',
        variant: 'destructive'
      });
    }
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({
        title: 'Success',
        description: 'Contact deleted successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete contact',
        variant: 'destructive'
      });
    }
  });
}
