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
import { useDeal, useCreateDeal, useUpdateDeal } from '@/integrations/supabase/hooks/use-deals';
import { useContacts } from '@/integrations/supabase/hooks/use-contacts';
import { useProperties } from '@/integrations/supabase/hooks/use-properties';
import { dealFormSchema, type DealFormData } from '../lib/validation';
import { logger } from '@/shared/lib/logger';
import { Loader2 } from 'lucide-react';

interface DealDialogProps {
  dealId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DealDialog({ dealId, isOpen, onClose }: DealDialogProps) {
  const { user } = useAuth();
  const { data: deal, isLoading: isLoadingDeal } = useDeal(dealId || '');
  const { data: contacts } = useContacts();
  const { data: properties } = useProperties();
  const createDeal = useCreateDeal();
  const updateDeal = useUpdateDeal();

  const isEditing = Boolean(dealId);
  const isLoading = createDeal.isPending || updateDeal.isPending;

  const form = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: {
      title: '',
      contact_id: '',
      property_id: null,
      value: 0,
      stage: 'prospect',
      probability: 25,
      expected_close_date: '',
    },
  });

  useEffect(() => {
    if (deal && isEditing) {
      logger.info('DealDialog', 'Loading deal for edit', { dealId });
      form.reset({
        title: deal.title,
        contact_id: deal.contact_id,
        property_id: deal.property_id || null,
        value: Number(deal.value),
        stage: deal.stage,
        probability: deal.probability,
        expected_close_date: deal.expected_close_date,
      });
    }
  }, [deal, isEditing, form, dealId]);

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = async (data: DealFormData) => {
    logger.form('DealDialog', 'Submitting deal form', { isEditing, dealId });

    try {
      if (isEditing && dealId) {
        await updateDeal.mutateAsync({ id: dealId, updates: data });
      } else {
        if (!user?.id) {
          logger.error('DealDialog', 'User not authenticated');
          return;
        }
        await createDeal.mutateAsync({ 
          title: data.title,
          contact_id: data.contact_id,
          property_id: data.property_id || undefined,
          value: data.value,
          stage: data.stage,
          probability: data.probability,
          expected_close_date: data.expected_close_date,
          agent_id: user.id 
        });
      }
      logger.info('DealDialog', 'Deal saved successfully', { isEditing });
      onClose();
    } catch (error) {
      logger.error('DealDialog', 'Failed to save deal', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Deal' : 'Add New Deal'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update deal information below.' : 'Fill in the details to create a new deal.'}
          </DialogDescription>
        </DialogHeader>

        {isLoadingDeal && isEditing ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Deal title" {...field} />
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
                      <FormLabel>Contact *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contacts?.data?.map((contact) => (
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
                  name="property_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {properties?.data?.map((property) => (
                            <SelectItem key={property.id} value={property.id}>
                              {property.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="probability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Probability (%) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          placeholder="25" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stage *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="prospect">Prospect</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="proposal">Proposal</SelectItem>
                          <SelectItem value="negotiation">Negotiation</SelectItem>
                          <SelectItem value="closed-won">Closed Won</SelectItem>
                          <SelectItem value="closed-lost">Closed Lost</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expected_close_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Close Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isEditing ? 'Update Deal' : 'Create Deal'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
