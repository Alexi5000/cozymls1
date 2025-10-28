import { useState } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent } from '@/shared/ui/card';
import { TouchButton } from '@/shared/ui/touch-button';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { MobileListItem } from '@/shared/ui/mobile-list-item';
import { Skeleton } from '@/shared/ui/skeleton';
import { EmptyState } from '@/shared/ui/empty-state';
import { DeleteConfirmDialog } from '@/shared/ui/delete-confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useActivities, useDeleteActivity, useCompleteActivity } from '@/integrations/supabase/hooks/use-activities';
import { ActivityDialog } from '@/features/activities';
import { logger } from '@/shared/lib/logger';
import { Plus, Calendar, Phone, Mail, Users, Clock, MoreVertical, Edit, Trash2, CheckCircle, ListTodo } from 'lucide-react';

export function ActivitiesPage() {
  const isMobile = useIsMobile();
  const { data: activities, isLoading, refetch } = useActivities();
  const deleteActivity = useDeleteActivity();
  const completeActivity = useCompleteActivity();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  
  const activityIcons = {
    call: Phone,
    email: Mail,
    meeting: Users,
    note: Calendar,
    task: Calendar,
  };

  const typeColors = {
    call: 'bg-blue-100 text-blue-800',
    email: 'bg-green-100 text-green-800',
    meeting: 'bg-purple-100 text-purple-800',
    note: 'bg-gray-100 text-gray-800',
    task: 'bg-orange-100 text-orange-800',
  };

  logger.database('QUERY', 'activities', { count: activities?.length });

  const handleRefresh = async () => {
    logger.ui('ActivitiesPage', 'Refreshing activities');
    await refetch();
  };

  const handleAddActivity = () => {
    logger.ui('ActivitiesPage', 'Opening add activity dialog');
    setEditingActivityId(undefined);
    setDialogOpen(true);
  };

  const handleEditActivity = (activityId: string) => {
    logger.ui('ActivitiesPage', 'Opening edit activity dialog', { activityId });
    setEditingActivityId(activityId);
    setDialogOpen(true);
  };

  const handleCompleteActivity = async (activityId: string) => {
    logger.info('ActivitiesPage', 'Marking activity as complete', { activityId });
    await completeActivity.mutateAsync(activityId);
  };

  const handleDeleteClick = (activityId: string) => {
    logger.ui('ActivitiesPage', 'Opening delete confirmation', { activityId });
    setActivityToDelete(activityId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!activityToDelete) return;
    
    logger.warn('ActivitiesPage', 'Deleting activity', { activityId: activityToDelete });
    await deleteActivity.mutateAsync(activityToDelete);
    setDeleteDialogOpen(false);
    setActivityToDelete(null);
  };

  if (isLoading) {
    const content = (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );

    return isMobile ? (
      <MobileLayout title="Activities" onRefresh={handleRefresh}>{content}</MobileLayout>
    ) : (
      <Layout title="Activities">{content}</Layout>
    );
  }

  const content = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Recent Activities</h1>
          <p className="text-sm md:text-base text-muted-foreground">Track all interactions with your contacts</p>
        </div>
        {isMobile ? (
          <TouchButton className="w-full sm:w-auto" onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </TouchButton>
        ) : (
          <Button onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        )}
      </div>

      {!activities || activities.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="No activities yet"
          description="Start tracking your interactions by creating your first activity."
          actionLabel="Add Activity"
          onAction={handleAddActivity}
        />
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            const isCompleted = Boolean(activity.completed_at);
            
            if (isMobile) {
              return (
                <MobileListItem
                  key={activity.id}
                  title={activity.title}
                  subtitle={activity.contacts ? `Contact: ${activity.contacts.name}` : undefined}
                  description={activity.description || undefined}
                  icon={<Icon className="h-5 w-5 text-primary" />}
                  badge={
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${typeColors[activity.type]}`}>
                        {activity.type}
                      </Badge>
                      {activity.due_date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(activity.due_date).toLocaleDateString()}
                        </div>
                      )}
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  }
                  enableHaptic
                />
              );
            }
            
            return (
              <Card key={activity.id} className={isCompleted ? 'opacity-60' : ''}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-semibold truncate">{activity.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${typeColors[activity.type]}`}>
                            {activity.type}
                          </Badge>
                          {activity.due_date && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(activity.due_date).toLocaleDateString()}
                            </div>
                          )}
                          {isCompleted && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background z-50">
                              {!isCompleted && (
                                <DropdownMenuItem onClick={() => handleCompleteActivity(activity.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Complete
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleEditActivity(activity.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteClick(activity.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      )}
                      
                      {activity.contacts && (
                        <p className="text-sm font-medium">
                          Contact: {activity.contacts.name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ActivityDialog
        activityId={editingActivityId}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <DeleteConfirmDialog
        title="Delete Activity"
        description="Are you sure you want to delete this activity? This action cannot be undone."
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteActivity.isPending}
      />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Activities" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Activities">
      {content}
    </Layout>
  );
}
