import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useAuth } from '@/shared/hooks/use-auth';
import { useActivity, useCreateActivity, useUpdateActivity } from '@/integrations/supabase/hooks/use-activities';
import { useContacts } from '@/integrations/supabase/hooks/use-contacts';
import { useDeals } from '@/integrations/supabase/hooks/use-deals';
import { activityFormSchema, type ActivityFormData } from '../lib/validation';
import { logger } from '@/shared/lib/logger';
import { Loader2 } from 'lucide-react';

interface ActivityDialogProps {
  activityId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityDialog({ activityId, isOpen, onClose }: ActivityDialogProps) {
  const { user } = useAuth();
  const { data: activity, isLoading: isLoadingActivity } = useActivity(activityId || '');
  const { data: contacts } = useContacts();
  const { data: deals } = useDeals();
  const createActivity = useCreateActivity();
  const updateActivity = useUpdateActivity();

  const isEditing = Boolean(activityId);
  const isLoading = createActivity.isPending || updateActivity.isPending;

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      type: 'task',
      title: '',
      description: '',
      contact_id: null,
      deal_id: null,
      priority: 'medium',
      due_date: null,
    },
  });

  useEffect(() => {
    if (activity && isEditing) {
      logger.info('ActivityDialog', 'Loading activity for edit', { activityId });
      form.reset({
        type: activity.type,
        title: activity.title,
        description: activity.description || '',
        contact_id: activity.contact_id || null,
        deal_id: activity.deal_id || null,
        priority: activity.priority,
        due_date: activity.due_date || null,
      });
    }
  }, [activity, isEditing, form, activityId]);

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = async (data: ActivityFormData) => {
    logger.form('ActivityDialog', 'Submitting activity form', { isEditing, activityId });

    try {
      if (isEditing && activityId) {
        await updateActivity.mutateAsync({ id: activityId, updates: data });
      } else {
        if (!user?.id) {
          logger.error('ActivityDialog', 'User not authenticated');
          return;
        }
        await createActivity.mutateAsync({ 
          type: data.type,
          title: data.title,
          description: data.description,
          contact_id: data.contact_id || undefined,
          deal_id: data.deal_id || undefined,
          priority: data.priority,
          due_date: data.due_date || undefined,
          assigned_to: user.id 
        });
      }
      logger.info('ActivityDialog', 'Activity saved successfully', { isEditing });
      onClose();
    } catch (error) {
      logger.error('ActivityDialog', 'Failed to save activity', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update activity information below.' : 'Fill in the details to create a new activity.'}
          </DialogDescription>
        </DialogHeader>

        {isLoadingActivity && isEditing ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="task">Task</SelectItem>
                          <SelectItem value="note">Note</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Activity title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add details..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contact_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contacts?.map((contact) => (
                            <SelectItem key={contact.id} value={contact.id}>
                              {contact.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deal_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select deal (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {deals?.map((deal) => (
                            <SelectItem key={deal.id} value={deal.id}>
                              {deal.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isEditing ? 'Update Activity' : 'Create Activity'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
