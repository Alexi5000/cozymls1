import { useIsMobile } from '@/shared/hooks/use-mobile';
import { ActivityCard } from "@/widgets/activities/ui/ActivityCard";
import { MobileActivityCard } from "@/widgets/activities/ui/MobileActivityCard";
import { Activity } from '@/entities/activity';
import { useActivitiesFilter, useActivitiesSort } from '@/features/activities';
import { toast } from 'sonner';

interface ActivitiesGridProps {
  activities: Activity[];
  searchQuery: string;
  filters: {
    type: string;
    priority: string;
    status: string;
  };
}

export function ActivitiesGrid({ activities, searchQuery, filters }: ActivitiesGridProps) {
  const isMobile = useIsMobile();
  
  // Use extracted business logic hooks
  const filteredActivities = useActivitiesFilter(activities, searchQuery, filters);
  const sortedActivities = useActivitiesSort(filteredActivities);

  const handleEditActivity = (activity: Activity) => {
    toast.info(`Edit activity: ${activity.title}`);
  };

  const handleCompleteActivity = (activity: Activity) => {
    toast.success(`Activity completed: ${activity.title}`);
  };

  const handleDeleteActivity = (activity: Activity) => {
    toast.error(`Activity deleted: ${activity.title}`);
  };

  const handleActivityClick = (activity: Activity) => {
    toast.info(`View activity: ${activity.title}`);
  };

  if (sortedActivities.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No activities found</h3>
        <p className="text-muted-foreground">
          {searchQuery || filters.type !== 'all' || filters.priority !== 'all' || filters.status !== 'all'
            ? 'Try adjusting your search or filters.'
            : 'Get started by creating your first activity.'}
        </p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-2">
        {sortedActivities.map((activity) => (
          <MobileActivityCard
            key={activity.id}
            activity={activity}
            onClick={handleActivityClick}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedActivities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onEdit={handleEditActivity}
          onComplete={handleCompleteActivity}
          onDelete={handleDeleteActivity}
        />
      ))}
    </div>
  );
}