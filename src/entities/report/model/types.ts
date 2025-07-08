export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'properties' | 'agents' | 'market' | 'financial';
  fields: ReportField[];
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'table';
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportField {
  id: string;
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'currency';
  required: boolean;
  options?: string[];
}

export interface Report {
  id: string;
  templateId: string;
  name: string;
  description?: string;
  data: ReportData[];
  config: ReportConfig;
  createdAt: Date;
  updatedAt: Date;
  generatedBy: string;
}

export interface ReportData {
  [key: string]: any;
}

export interface ReportConfig {
  dateRange: {
    start: Date;
    end: Date;
  };
  filters: ReportFilter[];
  groupBy?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'table';
  showTotals?: boolean;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  value: any;
}

export interface DashboardReport {
  id: string;
  reportId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  title: string;
}