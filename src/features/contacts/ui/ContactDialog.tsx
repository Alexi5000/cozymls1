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
import { useContact, useCreateContact, useUpdateContact } from '@/integrations/supabase/hooks/use-contacts';
import { contactFormSchema, type ContactFormData } from '../lib/validation';
import { logger } from '@/shared/lib/logger';
import { Loader2 } from 'lucide-react';

interface ContactDialogProps {
  contactId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDialog({ contactId, isOpen, onClose }: ContactDialogProps) {
  const { user } = useAuth();
  const { data: contact, isLoading: isLoadingContact } = useContact(contactId || '');
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();

  const isEditing = Boolean(contactId);
  const isLoading = createContact.isPending || updateContact.isPending;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'lead',
      tags: [],
      notes: '',
    },
  });

  // Load contact data when editing
  useEffect(() => {
    if (contact && isEditing) {
      logger.info('ContactDialog', 'Loading contact for edit', { contactId });
      form.reset({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company || '',
        status: contact.status,
        tags: contact.tags || [],
        notes: contact.notes || '',
      });
    }
  }, [contact, isEditing, form, contactId]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = async (data: ContactFormData) => {
    logger.form('ContactDialog', 'Submitting contact form', { 
      isEditing, 
      contactId,
      hasUser: !!user 
    });

    try {
      if (isEditing && contactId) {
        await updateContact.mutateAsync({ 
          id: contactId, 
          updates: data 
        });
      } else {
        if (!user?.id) {
          logger.error('ContactDialog', 'User not authenticated');
          return;
        }
        await createContact.mutateAsync({ 
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          status: data.status,
          tags: data.tags,
          notes: data.notes,
          created_by: user.id 
        });
      }
      logger.info('ContactDialog', 'Contact saved successfully', { isEditing });
      onClose();
    } catch (error) {
      logger.error('ContactDialog', 'Failed to save contact', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update contact information below.' 
              : 'Fill in the details to create a new contact.'}
          </DialogDescription>
        </DialogHeader>

        {isLoadingContact && isEditing ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any additional notes..." 
                        className="min-h-[100px]"
                        {...field} 
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
                  {isEditing ? 'Update Contact' : 'Create Contact'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
