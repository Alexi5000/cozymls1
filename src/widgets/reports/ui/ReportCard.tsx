import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Report, ReportTemplate } from '@/entities/report';
import { useReports, useReportFormatting } from '@/features/reports';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  AreaChart, 
  Table, 
  Download, 
  Eye, 
  MoreHorizontal,
  Calendar,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface ReportCardProps {
  report: Report;
  onView?: (reportId: string) => void;
  onDelete?: (reportId: string) => void;
}

const chartIcons = {
  bar: BarChart3,
  line: LineChart,
  pie: PieChart,
  area: AreaChart,
  table: Table,
};

export function ReportCard({ report, onView, onDelete }: ReportCardProps) {
  const { getTemplate } = useReports();
  const { getCategoryColor } = useReportFormatting();
  
  const template = getTemplate(report.templateId);
  const chartType = report.config.chartType || template?.chartType || 'table';
  const ChartIcon = chartIcons[chartType];

  const handleDownload = () => {
    // Simulate report download
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
    <Card className="luxury-card hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ChartIcon className="h-5 w-5 text-white/90" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg truncate font-display text-white">{report.name}</CardTitle>
              {report.description && (
                <p className="text-sm text-white/80 mt-1 line-clamp-2 font-body">
                  {report.description}
                </p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(report.id)}>
                <Eye className="h-4 w-4 mr-2" />
                View Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(report.id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          {template && (
            <Badge variant="outline" className="border-white/30 text-white/90 bg-white/10">
              {template.category}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs border-white/30 text-white/90 bg-white/10">
            {chartType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="font-body">
                {report.config.dateRange.start.toLocaleDateString()} - {' '}
                {report.config.dateRange.end.toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="font-body">{report.generatedBy}</span>
            </div>
            <div className="font-body">
              Created: {report.createdAt.toLocaleDateString()}
            </div>
          </div>
          
          <div className="text-sm text-white/80">
            <span className="font-medium font-body">{report.data.length}</span> <span className="font-body">data points</span>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              onClick={() => onView?.(report.id)}
              className="flex-1 border-white/30 text-white hover:bg-white/10 hover:text-white"
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Report
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDownload}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}