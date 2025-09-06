import { useState } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { ReportsStats, ReportsHeader, ReportsGrid, ReportViewer } from '@/widgets/reports';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useToast } from '@/shared/hooks/use-toast';
import { reportStore } from '@/shared/lib/report-store';

export function ReportsPage() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewingReportId, setViewingReportId] = useState<string | null>(null);

  const handleReportGenerated = (reportId: string) => {
    toast({
      title: "Report Generated",
      description: "Your report has been created successfully.",
    });
    setViewingReportId(reportId);
  };

  const handleDeleteReport = (reportId: string) => {
    reportStore.deleteReport(reportId);
    toast({
      title: "Report Deleted",
      description: "The report has been removed.",
    });
  };

  const handleRefresh = async () => {
    // Instant refresh for better UX
  };

  const content = (
    <div className="space-y-6">
      <ReportsStats />
      <ReportsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onReportGenerated={handleReportGenerated}
      />
      <ReportsGrid
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onViewReport={setViewingReportId}
        onDeleteReport={handleDeleteReport}
        onReportGenerated={handleReportGenerated}
      />
      <ReportViewer
        reportId={viewingReportId}
        onClose={() => setViewingReportId(null)}
      />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Reports" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Reports">
      {content}
    </Layout>
  );
}
