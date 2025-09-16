import { useState } from 'react';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { ActivityCard } from './ActivityCard';
import { MobileActivityCard } from './MobileActivityCard';
import { Activity } from '@/entities/activity';
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
  
  // Filter activities based on search and filters
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filters.type === 'all' || activity.type === filters.type;
    const matchesPriority = filters.priority === 'all' || activity.priority === filters.priority;
    
    let matchesStatus = true;
    if (filters.status === 'completed') {
      matchesStatus = !!activity.completedAt;
    } else if (filters.status === 'pending') {
      matchesStatus = !activity.completedAt;
    } else if (filters.status === 'overdue') {
      matchesStatus = !activity.completedAt && 
                     activity.dueDate && 
                     new Date(activity.dueDate) < new Date();
    } else if (filters.status === 'due-today') {
      matchesStatus = !activity.completedAt && 
                     activity.dueDate && 
                     new Date(activity.dueDate).toDateString() === new Date().toDateString();
    }
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  // Sort activities by priority and due date
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    // Completed activities go to bottom
    if (a.completedAt && !b.completedAt) return 1;
    if (!a.completedAt && b.completedAt) return -1;
    
    // Sort by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Sort by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Sort by created date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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