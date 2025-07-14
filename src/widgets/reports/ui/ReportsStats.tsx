import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { reportStore } from '@/shared/lib/report-store';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { FileText, BarChart3, Calendar, Download } from 'lucide-react';

export function ReportsStats() {
  const isMobile = useIsMobile();
  const analytics = reportStore.getReportAnalytics();

  return (
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
  );
}
