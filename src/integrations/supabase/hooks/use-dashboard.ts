import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/shared/hooks/use-auth';

export function useDashboardStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .rpc('get_dashboard_stats', { user_id: user.id });
      
      if (error) throw error;
      
      return data?.[0] || {
        total_contacts: 0,
        active_deals: 0,
        total_revenue: 0,
        monthly_growth: 0
      };
    },
    enabled: !!user?.id
  });
}

export function useRecentActivities() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recent-activities', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*, contacts(*)')
        .eq('assigned_to', user?.id)
        .is('completed_at', null)
        .order('due_date', { ascending: true })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });
}

export function useRecentDeals() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recent-deals', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deals')
        .select('*, contacts(*), properties(*)')
        .eq('agent_id', user?.id)
        .not('stage', 'in', '("closed-won","closed-lost")')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });
}
