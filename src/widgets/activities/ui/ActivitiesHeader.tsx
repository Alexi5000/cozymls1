import { Plus, Calendar, Filter } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface ActivitiesHeaderProps {
  onAddActivity: () => void;
  onToggleFilters: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ActivitiesHeader({ 
  onAddActivity, 
  onToggleFilters, 
  searchQuery, 
  onSearchChange 
}: ActivitiesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
        <p className="text-muted-foreground">
          Manage your tasks, calls, meetings, and follow-ups
        </p>
      </div>
      
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button variant="outline" size="icon" onClick={onToggleFilters}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Button onClick={onAddActivity} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Activity
        </Button>
      </div>
    </div>
  );
}