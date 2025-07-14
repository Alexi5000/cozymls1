import { useMemo } from 'react';
import { reportStore } from '@/shared/lib/report-store';
import { Report, ReportTemplate } from '@/entities/report';

export function useReports() {
  const reports = useMemo(() => reportStore.getReports(), []);
  const templates = useMemo(() => reportStore.getTemplates(), []);
  
  return {
    reports,
    templates,
    getReport: (id: string) => reportStore.getReport(id),
    getTemplate: (id: string) => reportStore.getTemplate(id),
    generateReport: reportStore.generateReport.bind(reportStore),
    deleteReport: reportStore.deleteReport.bind(reportStore),
  };
}

export function useReport(reportId: string | null) {
  const report = useMemo(() => 
    reportId ? reportStore.getReport(reportId) : null, 
    [reportId]
  );
  
  const template = useMemo(() => 
    report ? reportStore.getTemplate(report.templateId) : null, 
    [report]
  );

  return { report, template };
}

export function useReportFormatting() {
  const formatValue = (value: any, type: string) => {
    if (type === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
    if (type === 'number') {
      return new Intl.NumberFormat('en-US').format(value);
    }
    if (type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'sales': return 'bg-blue-100 text-blue-800';
      case 'properties': return 'bg-green-100 text-green-800';
      case 'agents': return 'bg-purple-100 text-purple-800';
      case 'market': return 'bg-orange-100 text-orange-800';
      case 'financial': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return { formatValue, getCategoryColor };
}
