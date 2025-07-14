import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ReportBuilder } from "@/widgets/reports/ui/ReportBuilder";
import { Plus, Search } from 'lucide-react';

interface ReportsHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onReportGenerated: (reportId: string) => void;
}

export function ReportsHeader({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onReportGenerated
}: ReportsHeaderProps) {
  const categories = ['all', 'sales', 'properties', 'agents', 'market', 'financial'];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Reports Dashboard</CardTitle>
            <p className="text-muted-foreground text-sm">
              Create, manage, and analyze your business reports
            </p>
          </div>
          <ReportBuilder onReportGenerated={onReportGenerated}>
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
