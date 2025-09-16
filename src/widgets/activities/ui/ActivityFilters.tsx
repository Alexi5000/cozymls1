import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';
import { X } from 'lucide-react';

interface ActivityFiltersProps {
  filters: {
    type: string;
    priority: string;
    status: string;
  };
  onFiltersChange: (filters: { type: string; priority: string; status: string }) => void;
  onClose?: () => void;
}

export function ActivityFilters({ filters, onFiltersChange, onClose }: ActivityFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFiltersChange({ type: 'all', priority: 'all', status: 'all' });
  };

  const hasActiveFilters = filters.type !== 'all' || filters.priority !== 'all' || filters.status !== 'all';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filters</CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear All
              </Button>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="due-today">Due Today</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}