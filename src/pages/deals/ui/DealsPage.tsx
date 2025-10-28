import { useState } from 'react';
import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';
import { MobileOptimizedCard } from '@/shared/ui/mobile-optimized-card';
import { Skeleton } from '@/shared/ui/skeleton';
import { EmptyState } from '@/shared/ui/empty-state';
import { DeleteConfirmDialog } from '@/shared/ui/delete-confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useDeals, useDeleteDeal } from '@/integrations/supabase/hooks/use-deals';
import { DealDialog } from '@/features/deals';
import { logger } from '@/shared/lib/logger';
import { Plus, Calendar, DollarSign, MoreVertical, Edit, Trash2, Briefcase } from 'lucide-react';

export function DealsPage() {
  const isMobile = useIsMobile();
  const { data: deals, isLoading, refetch } = useDeals();
  const deleteDeal = useDeleteDeal();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDealId, setEditingDealId] = useState<string | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dealToDelete, setDealToDelete] = useState<string | null>(null);

  const stageColors = {
    prospect: 'bg-gray-100 text-gray-800',
    qualified: 'bg-blue-100 text-blue-800',
    proposal: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-orange-100 text-orange-800',
    'closed-won': 'bg-green-100 text-green-800',
    'closed-lost': 'bg-red-100 text-red-800',
  };

  logger.database('QUERY', 'deals', { count: deals?.length });

  const handleRefresh = async () => {
    logger.ui('DealsPage', 'Refreshing deals');
    await refetch();
  };

  const handleAddDeal = () => {
    logger.ui('DealsPage', 'Opening add deal dialog');
    setEditingDealId(undefined);
    setDialogOpen(true);
  };

  const handleEditDeal = (dealId: string) => {
    logger.ui('DealsPage', 'Opening edit deal dialog', { dealId });
    setEditingDealId(dealId);
    setDialogOpen(true);
  };

  const handleDeleteClick = (dealId: string) => {
    logger.ui('DealsPage', 'Opening delete confirmation', { dealId });
    setDealToDelete(dealId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!dealToDelete) return;
    
    logger.warn('DealsPage', 'Deleting deal', { dealId: dealToDelete });
    await deleteDeal.mutateAsync(dealToDelete);
    setDeleteDialogOpen(false);
    setDealToDelete(null);
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
      <MobileLayout title="Deals" onRefresh={handleRefresh}>{content}</MobileLayout>
    ) : (
      <Layout title="Deals">{content}</Layout>
    );
  }

  const content = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Deals</h2>
        <Button onClick={handleAddDeal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {!deals || deals.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No deals yet"
          description="Start tracking your sales opportunities by creating your first deal."
          actionLabel="Add Deal"
          onAction={handleAddDeal}
        />
      ) : (
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {deals.map((deal) => {
            const DealCard = isMobile ? MobileOptimizedCard : Card;
            return (
              <DealCard key={deal.id} 
                className={isMobile ? "" : "hover:shadow-lg transition-shadow"}
                {...(isMobile && { enableHaptic: true })}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{deal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {deal.contacts?.name || 'No contact'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={stageColors[deal.stage]}>
                        {deal.stage.replace('-', ' ')}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background z-50">
                          <DropdownMenuItem onClick={() => handleEditDeal(deal.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(deal.id)}
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
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-semibold">
                        ${Number(deal.value).toLocaleString()}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Probability</span>
                        <span className="text-sm font-medium">{deal.probability}%</span>
                      </div>
                      <Progress value={deal.probability} className="h-2" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Expected: {new Date(deal.expected_close_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </DealCard>
            );
          })}
        </div>
      )}

      <DealDialog
        dealId={editingDealId}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <DeleteConfirmDialog
        title="Delete Deal"
        description="Are you sure you want to delete this deal? This action cannot be undone."
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteDeal.isPending}
      />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Deals" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Deals">
      {content}
    </Layout>
  );
}
