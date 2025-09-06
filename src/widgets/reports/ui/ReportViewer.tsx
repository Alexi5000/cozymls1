import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Report } from '@/entities/report';
import { useReport, useReportFormatting } from '@/features/reports';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  AreaChart, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  Pie,
  Cell,
  Area
} from 'recharts';
import { 
  Download, 
  Printer, 
  Share2,
  Calendar,
  User,
  TrendingUp
} from 'lucide-react';

interface ReportViewerProps {
  reportId: string | null;
  onClose: () => void;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export function ReportViewer({ reportId, onClose }: ReportViewerProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  
  const { report, template } = useReport(reportId);
  const { formatValue } = useReportFormatting();

  if (!report || !template) {
    return null;
  }

  const chartType = report.config.chartType || template.chartType || 'table';

  const renderChart = () => {
    const data = report.data;

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={template.fields[0]?.name} />
              <YAxis />
              <Tooltip />
              <Legend />
              {template.fields.slice(1).map((field, index) => (
                field.type === 'number' || field.type === 'currency' ? (
                  <Bar 
                    key={field.name}
                    dataKey={field.name} 
                    fill={COLORS[index % COLORS.length]}
                    name={field.label}
                  />
                ) : null
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={template.fields[0]?.name} />
              <YAxis />
              <Tooltip />
              <Legend />
              {template.fields.slice(1).map((field, index) => (
                field.type === 'number' || field.type === 'currency' ? (
                  <Line 
                    key={field.name}
                    type="monotone" 
                    dataKey={field.name} 
                    stroke={COLORS[index % COLORS.length]}
                    name={field.label}
                    strokeWidth={2}
                  />
                ) : null
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie': {
        const pieField = template.fields.find(f => f.type === 'number' || f.type === 'currency');
        const labelField = template.fields.find(f => f.type === 'string');
        
        if (!pieField || !labelField) return <div>No suitable data for pie chart</div>;

        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={pieField.name}
                nameKey={labelField.name}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      }

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={template.fields[0]?.name} />
              <YAxis />
              <Tooltip />
              <Legend />
              {template.fields.slice(1).map((field, index) => (
                field.type === 'number' || field.type === 'currency' ? (
                  <Area 
                    key={field.name}
                    type="monotone" 
                    dataKey={field.name} 
                    stackId="1"
                    stroke={COLORS[index % COLORS.length]}
                    fill={COLORS[index % COLORS.length]}
                    name={field.label}
                  />
                ) : null
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return renderTable();
    }
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {template.fields.map((field) => (
              <th key={field.name} className="border border-gray-200 px-4 py-2 text-left font-medium">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {report.data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {template.fields.map((field) => (
                <td key={field.name} className="border border-gray-200 px-4 py-2">
                  {formatValue(row[field.name], field.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const handleDownload = () => {
    const dataStr = JSON.stringify(report.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={!!reportId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-display text-slate-800">{report.name}</DialogTitle>
              {report.description && (
                <p className="text-slate-600 mt-1 font-body">{report.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date Range</p>
                    <p className="text-sm text-muted-foreground">
                      {report.config.dateRange.start.toLocaleDateString()} - {' '}
                      {report.config.dateRange.end.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Generated By</p>
                    <p className="text-sm text-muted-foreground">{report.generatedBy}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Data Points</p>
                    <p className="text-sm text-muted-foreground">{report.data.length} records</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Template</p>
                  <Badge>{template.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart/Table Toggle */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'chart' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('chart')}
            >
              Chart View
            </Button>
            <Button
              variant={activeTab === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('table')}
            >
              Table View
            </Button>
          </div>

          {/* Chart/Table Content */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-slate-800">{activeTab === 'chart' ? 'Chart View' : 'Table View'}</CardTitle>
            </CardHeader>
            <CardContent>
              {activeTab === 'chart' ? renderChart() : renderTable()}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}