import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { logger } from '@/shared/lib/logger';

export interface ProfileUpdate {
  name?: string;
  phone?: string;
  department?: string;
  avatar_url?: string;
}

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      logger.database('useProfile', 'Fetching profile', { userId });
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('useProfile', 'Failed to fetch profile', { error });
        throw error;
      }

      return data;
    },
    enabled: !!userId,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: ProfileUpdate }) => {
      logger.database('useUpdateProfile', 'Updating profile', { userId, updates });
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('useUpdateProfile', 'Failed to update profile', { error });
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdatePassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (newPassword: string) => {
      logger.database('useUpdatePassword', 'Updating password');
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        logger.error('useUpdatePassword', 'Failed to update password', { error });
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: 'Password updated',
        description: 'Your password has been changed successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update password',
        variant: 'destructive',
      });
    },
  });
}
