import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ReportCard } from "@/widgets/reports/ui/ReportCard";
import { ReportBuilder } from "@/widgets/reports/ui/ReportBuilder";
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { reportStore } from '@/shared/lib/report-store';
import { Plus, FileText } from 'lucide-react';

interface ReportsGridProps {
  searchTerm: string;
  selectedCategory: string;
  onViewReport: (reportId: string) => void;
  onDeleteReport: (reportId: string) => void;
  onReportGenerated: (reportId: string) => void;
}

export function ReportsGrid({
  searchTerm,
  selectedCategory,
  onViewReport,
  onDeleteReport,
  onReportGenerated
}: ReportsGridProps) {
  const isMobile = useIsMobile();
  const reports = reportStore.getReports();
  
  const filteredReports = reports.filter(report => {
    const template = reportStore.getTemplate(report.templateId);
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filteredReports.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'No reports match your current filters.' 
              : 'Get started by creating your first report.'}
          </p>
          <ReportBuilder onReportGenerated={onReportGenerated}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Report
            </Button>
          </ReportBuilder>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid gap-4 ${
      isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {filteredReports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onView={onViewReport}
          onDelete={onDeleteReport}
        />
      ))}
    </div>
  );
}
