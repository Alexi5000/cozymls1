import { useMemo } from 'react';
import { Activity } from '@/entities/activity';

interface ActivityFilters {
  type: string;
  priority: string;
  status: string;
}

export function useActivitiesFilter(
  activities: Activity[],
  searchQuery: string,
  filters: ActivityFilters
) {
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
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
  }, [activities, searchQuery, filters]);

  return filteredActivities;
}
