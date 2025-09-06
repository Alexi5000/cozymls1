import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { reportStore } from '@/shared/lib/report-store';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { FileText, BarChart3, Calendar, Download } from 'lucide-react';

export function ReportsStats() {
  const isMobile = useIsMobile();
  const analytics = reportStore.getReportAnalytics();

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
      <Card className="luxury-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-white/80">Total Reports</p>
              <p className="text-2xl font-display font-bold text-white">{analytics.totalReports}</p>
            </div>
            <FileText className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>

      <Card className="luxury-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-white/80">Templates Used</p>
              <p className="text-2xl font-display font-bold text-white">{analytics.templatesUsed}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>

      <Card className="luxury-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-white/80">Recent Reports</p>
              <p className="text-2xl font-display font-bold text-white">{analytics.recentReports}</p>
            </div>
            <Calendar className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>

      <Card className="luxury-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-white/80">Downloads</p>
              <p className="text-2xl font-display font-bold text-white">
                {Object.values(analytics.reportsByCategory).reduce((sum, count) => sum + count, 0) * 3}
              </p>
            </div>
            <Download className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
