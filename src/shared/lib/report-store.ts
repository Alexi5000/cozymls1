import { Report, ReportTemplate, ReportData, ReportConfig } from '@/entities/report';
import { mockReports, mockReportTemplates, mockReportData } from '@/entities/report';

class ReportStore {
  private reports: Report[] = [...mockReports];
  private templates: ReportTemplate[] = [...mockReportTemplates];
  private reportData: Record<string, ReportData[]> = { ...mockReportData };

  // Report Templates
  getTemplates(): ReportTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): ReportTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  createTemplate(template: Omit<ReportTemplate, 'id' | 'createdAt' | 'updatedAt'>): ReportTemplate {
    const newTemplate: ReportTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.templates.push(newTemplate);
    return newTemplate;
  }

  updateTemplate(id: string, updates: Partial<ReportTemplate>): ReportTemplate | null {
    const index = this.templates.findIndex(template => template.id === id);
    if (index === -1) return null;

    this.templates[index] = {
      ...this.templates[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.templates[index];
  }

  deleteTemplate(id: string): boolean {
    const index = this.templates.findIndex(template => template.id === id);
    if (index === -1) return false;

    this.templates.splice(index, 1);
    return true;
  }

  // Reports
  getReports(): Report[] {
    return this.reports;
  }

  getReport(id: string): Report | undefined {
    return this.reports.find(report => report.id === id);
  }

  getReportsByTemplate(templateId: string): Report[] {
    return this.reports.filter(report => report.templateId === templateId);
  }

  createReport(report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>): Report {
    const newReport: Report = {
      ...report,
      id: `report-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.reports.push(newReport);
    return newReport;
  }

  updateReport(id: string, updates: Partial<Report>): Report | null {
    const index = this.reports.findIndex(report => report.id === id);
    if (index === -1) return null;

    this.reports[index] = {
      ...this.reports[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.reports[index];
  }

  deleteReport(id: string): boolean {
    const index = this.reports.findIndex(report => report.id === id);
    if (index === -1) return false;

    this.reports.splice(index, 1);
    return true;
  }

  // Report Data
  getReportData(templateId: string): ReportData[] {
    return this.reportData[templateId] || [];
  }

  setReportData(templateId: string, data: ReportData[]): void {
    this.reportData[templateId] = data;
  }

  // Generate Report
  generateReport(templateId: string, config: ReportConfig, name: string, description?: string): Report {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    let data = this.getReportData(templateId);
    
    // Apply filters
    if (config.filters.length > 0) {
      data = data.filter(row => {
        return config.filters.every(filter => {
          const value = row[filter.field];
          switch (filter.operator) {
            case 'equals':
              return value === filter.value;
            case 'contains':
              return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
            case 'greater':
              return Number(value) > Number(filter.value);
            case 'less':
              return Number(value) < Number(filter.value);
            case 'between':
              return Number(value) >= Number(filter.value[0]) && Number(value) <= Number(filter.value[1]);
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (config.sortBy) {
      data.sort((a, b) => {
        const aVal = a[config.sortBy!];
        const bVal = b[config.sortBy!];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return config.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return this.createReport({
      templateId,
      name,
      description,
      data,
      config,
      generatedBy: 'Current User',
    });
  }

  // Analytics
  getReportAnalytics() {
    const totalReports = this.reports.length;
    const templatesUsed = new Set(this.reports.map(r => r.templateId)).size;
    const recentReports = this.reports.filter(r => 
      r.createdAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    const reportsByCategory = this.templates.reduce((acc, template) => {
      const count = this.reports.filter(r => r.templateId === template.id).length;
      acc[template.category] = (acc[template.category] || 0) + count;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalReports,
      templatesUsed,
      recentReports,
      reportsByCategory,
    };
  }
}

export const reportStore = new ReportStore();