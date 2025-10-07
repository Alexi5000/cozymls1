import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/shared/hooks/use-toast';

export interface ActivityInsert {
  type: 'call' | 'email' | 'meeting' | 'task' | 'note';
  title: string;
  description?: string;
  contact_id?: string;
  deal_id?: string;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  assigned_to: string;
}

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*, contacts(*), deals(*)')
        .order('due_date', { ascending: true, nullsFirst: false });
      
      if (error) throw error;
      return data;
    }
  });
}

export function useActivity(id: string) {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*, contacts(*), deals(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (activity: ActivityInsert) => {
      const { data, error } = await supabase
        .from('activities')
        .insert(activity)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: 'Success',
        description: 'Activity created successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create activity',
        variant: 'destructive'
      });
    }
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ActivityInsert> }) => {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', data.id] });
      toast({
        title: 'Success',
        description: 'Activity updated successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update activity',
        variant: 'destructive'
      });
    }
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: 'Success',
        description: 'Activity deleted successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete activity',
        variant: 'destructive'
      });
    }
  });
}

export function useCompleteActivity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('activities')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', data.id] });
      toast({
        title: 'Success',
        description: 'Activity marked as complete'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to complete activity',
        variant: 'destructive'
      });
    }
  });
}
