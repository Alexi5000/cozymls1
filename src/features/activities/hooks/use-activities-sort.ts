import { useMemo } from 'react';
import { Activity } from '@/entities/activity';

export function useActivitiesSort(activities: Activity[]) {
  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => {
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
  }, [activities]);

  return sortedActivities;
}
