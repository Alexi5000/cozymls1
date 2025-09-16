import { useState } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useToast } from '@/shared/hooks/use-toast';
import { reportStore } from '@/shared/lib/report-store';
import { ReportBuilder, ReportCard, ReportViewer } from '@/widgets/reports';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus,
  Search,
  Filter,
  FileText,
  Calendar,
  Download
} from 'lucide-react';

export function ReportsPage() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewingReportId, setViewingReportId] = useState<string | null>(null);
  
  const reports = reportStore.getReports();
  const analytics = reportStore.getReportAnalytics();
  
  const filteredReports = reports.filter(report => {
    const template = reportStore.getTemplate(report.templateId);
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReportGenerated = (reportId: string) => {
    toast({
      title: "Report Generated",
      description: "Your report has been created successfully.",
    });
    // Optionally auto-open the new report
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
    // Here you would typically refetch data
  };

  const categories = ['all', 'sales', 'properties', 'agents', 'market', 'financial'];

  const content = (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>{analytics.totalReports}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>All generated reports</p>
          </CardContent>
        </Card>

        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Templates Used</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>{analytics.templatesUsed}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>Active templates</p>
          </CardContent>
        </Card>

        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Recent Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>{analytics.recentReports}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>This week</p>
          </CardContent>
        </Card>

        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>24</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>Total downloads</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Reports Dashboard</CardTitle>
              <p className="text-muted-foreground text-sm">
                Create, manage, and analyze your business reports
              </p>
            </div>
            <ReportBuilder onReportGenerated={handleReportGenerated}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Report
              </Button>
            </ReportBuilder>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <div className={`grid gap-4 ${
          isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onView={setViewingReportId}
              onDelete={handleDeleteReport}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No reports match your current filters.' 
                : 'Get started by creating your first report.'}
            </p>
            <ReportBuilder onReportGenerated={handleReportGenerated}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Report
              </Button>
            </ReportBuilder>
          </CardContent>
        </Card>
      )}

      {/* Report Viewer Modal */}
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