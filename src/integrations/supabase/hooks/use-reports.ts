import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/shared/hooks/use-toast';
import { logger } from '@/shared/lib/logger';

export interface Report {
  id: string;
  name: string;
  description?: string;
  template_id: string;
  data: any;
  config: any;
  generated_by: string;
  created_at: string;
  updated_at: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  chart_type?: string;
  fields: any;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function useReports(userId?: string) {
  return useQuery({
    queryKey: ['reports', userId],
    queryFn: async () => {
      logger.database('useReports', 'Fetching reports', { userId });
      
      let query = supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('generated_by', userId);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('useReports', 'Failed to fetch reports', { error });
        throw error;
      }

      return data as Report[];
    },
    enabled: !!userId,
  });
}

export function useReport(reportId?: string) {
  return useQuery({
    queryKey: ['report', reportId],
    queryFn: async () => {
      if (!reportId) return null;
      
      logger.database('useReport', 'Fetching report', { reportId });
      
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .single();

      if (error) {
        logger.error('useReport', 'Failed to fetch report', { error });
        throw error;
      }

      return data as Report;
    },
    enabled: !!reportId,
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (report: Omit<Report, 'id' | 'created_at' | 'updated_at'>) => {
      logger.database('useCreateReport', 'Creating report', { report });
      
      const { data, error } = await supabase
        .from('reports')
        .insert(report)
        .select()
        .single();

      if (error) {
        logger.error('useCreateReport', 'Failed to create report', { error });
        throw error;
      }

      return data as Report;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: 'Report created',
        description: 'Your report has been generated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create report',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Report> }) => {
      logger.database('useUpdateReport', 'Updating report', { id, updates });
      
      const { data, error } = await supabase
        .from('reports')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('useUpdateReport', 'Failed to update report', { error });
        throw error;
      }

      return data as Report;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['report'] });
      toast({
        title: 'Report updated',
        description: 'Your report has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update report',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      logger.database('useDeleteReport', 'Deleting report', { id });
      
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('useDeleteReport', 'Failed to delete report', { error });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: 'Report deleted',
        description: 'Report has been deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete report',
        variant: 'destructive',
      });
    },
  });
}

// Report Templates
export function useReportTemplates() {
  return useQuery({
    queryKey: ['report-templates'],
    queryFn: async () => {
      logger.database('useReportTemplates', 'Fetching report templates');
      
      const { data, error } = await supabase
        .from('report_templates')
        .select('*')
        .order('name');

      if (error) {
        logger.error('useReportTemplates', 'Failed to fetch templates', { error });
        throw error;
      }

      return data as ReportTemplate[];
    },
  });
}

export function useReportTemplate(templateId?: string) {
  return useQuery({
    queryKey: ['report-template', templateId],
    queryFn: async () => {
      if (!templateId) return null;
      
      logger.database('useReportTemplate', 'Fetching template', { templateId });
      
      const { data, error } = await supabase
        .from('report_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) {
        logger.error('useReportTemplate', 'Failed to fetch template', { error });
        throw error;
      }

      return data as ReportTemplate;
    },
    enabled: !!templateId,
  });
}
