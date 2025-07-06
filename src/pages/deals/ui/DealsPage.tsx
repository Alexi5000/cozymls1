import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';
import { MobileOptimizedCard } from '@/shared/ui/mobile-optimized-card';
import { mockDeals } from '@/entities/deal';
import { mockContacts } from '@/entities/contact';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Plus, Calendar, DollarSign } from 'lucide-react';

export function DealsPage() {
  const isMobile = useIsMobile();
  const stageColors = {
    prospect: 'bg-gray-100 text-gray-800',
    qualified: 'bg-blue-100 text-blue-800',
    proposal: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-orange-100 text-orange-800',
    'closed-won': 'bg-green-100 text-green-800',
    'closed-lost': 'bg-red-100 text-red-800',
  };

  const getContactName = (contactId: string) => {
    return mockContacts.find(c => c.id === contactId)?.name || 'Unknown';
  };

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const content = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Deals</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {mockDeals.map((deal) => {
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
                  <p className="text-sm text-muted-foreground">{getContactName(deal.contactId)}</p>
                </div>
                <Badge className={stageColors[deal.stage]}>
                  {deal.stage.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold">
                    ${deal.value.toLocaleString()}
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
                  <span>Expected: {deal.expectedCloseDate.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </DealCard>
        )})}
      </div>
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