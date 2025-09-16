import { useState } from 'react';
import { ResponsiveLayout } from '@/widgets/layout/ui/ResponsiveLayout';
import { 
  ActivitiesHeader,
  ActivitiesStats,
  ActivitiesGrid,
  ActivityFilters,
  AddActivityDialog
} from '@/widgets/activities';
import { mockActivities } from '@/entities/activity';

export function ActivitiesPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all',
  });

  const handleRefresh = async (): Promise<void> => {
    // Simulate refresh action
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <ResponsiveLayout 
      title="Activities"
      onRefresh={handleRefresh}
    >
      <div className="space-y-6">
        <ActivitiesHeader
          onAddActivity={() => setShowAddDialog(true)}
          onToggleFilters={() => setShowFilters(!showFilters)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ActivitiesStats />

        {showFilters && (
          <ActivityFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        <ActivitiesGrid
          activities={mockActivities}
          searchQuery={searchQuery}
          filters={filters}
        />

        <AddActivityDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
        />
      </div>
    </ResponsiveLayout>
  );
}