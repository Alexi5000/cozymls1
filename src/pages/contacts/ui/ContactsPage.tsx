import { useState } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { MobileOptimizedCard } from '@/shared/ui/mobile-optimized-card';
import { Skeleton } from '@/shared/ui/skeleton';
import { EmptyState } from '@/shared/ui/empty-state';
import { DeleteConfirmDialog } from '@/shared/ui/delete-confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useContacts, useDeleteContact } from '@/integrations/supabase/hooks/use-contacts';
import { ContactDialog } from '@/features/contacts';
import { logger } from '@/shared/lib/logger';
import { Plus, Phone, Mail, Building, MoreVertical, Edit, Trash2, Users } from 'lucide-react';

export function ContactsPage() {
  const isMobile = useIsMobile();
  const { data: contacts, isLoading, refetch } = useContacts();
  const deleteContact = useDeleteContact();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  
  const statusColors = {
    lead: 'bg-yellow-100 text-yellow-800',
    prospect: 'bg-blue-100 text-blue-800',
    client: 'bg-green-100 text-green-800',
  };

  logger.database('QUERY', 'contacts', { count: contacts?.length });

  const handleRefresh = async () => {
    logger.ui('ContactsPage', 'Refreshing contacts');
    await refetch();
  };

  const handleAddContact = () => {
    logger.ui('ContactsPage', 'Opening add contact dialog');
    setEditingContactId(undefined);
    setDialogOpen(true);
  };

  const handleEditContact = (contactId: string) => {
    logger.ui('ContactsPage', 'Opening edit contact dialog', { contactId });
    setEditingContactId(contactId);
    setDialogOpen(true);
  };

  const handleDeleteClick = (contactId: string) => {
    logger.ui('ContactsPage', 'Opening delete confirmation', { contactId });
    setContactToDelete(contactId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;
    
    logger.warn('ContactsPage', 'Deleting contact', { contactId: contactToDelete });
    await deleteContact.mutateAsync(contactToDelete);
    setDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  if (isLoading) {
    const content = (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );

    return isMobile ? (
      <MobileLayout title="Contacts" onRefresh={handleRefresh}>{content}</MobileLayout>
    ) : (
      <Layout title="Contacts">{content}</Layout>
    );
  }

  const content = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Contacts</h2>
        <Button onClick={handleAddContact}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {!contacts || contacts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No contacts yet"
          description="Get started by adding your first contact to manage your relationships."
          actionLabel="Add Contact"
          onAction={handleAddContact}
        />
      ) : (
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {contacts.map((contact) => {
            const ContactCard = isMobile ? MobileOptimizedCard : Card;
            return (
              <ContactCard key={contact.id} 
                className={isMobile ? "" : "hover:shadow-lg transition-shadow"}
                {...(isMobile && { enableHaptic: true })}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      {contact.company && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Building className="h-3 w-3" />
                          {contact.company}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[contact.status]}>
                        {contact.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background z-50">
                          <DropdownMenuItem onClick={() => handleEditContact(contact.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(contact.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                    
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {contact.notes && (
                      <p className="text-sm text-muted-foreground mt-3 p-2 bg-muted rounded line-clamp-2">
                        {contact.notes}
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      Last contact: {new Date(contact.last_contact).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </ContactCard>
            );
          })}
        </div>
      )}

      <ContactDialog
        contactId={editingContactId}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <DeleteConfirmDialog
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteContact.isPending}
      />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Contacts" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Contacts">
      {content}
    </Layout>
  );
}