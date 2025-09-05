import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';
import { MobileOptimizedCard } from '@/shared/ui/mobile-optimized-card';
import { mockDeals } from '@/entities/deal';
import { mockContacts } from '@/entities/contact';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Calendar, DollarSign } from 'lucide-react';

export function DealsGrid() {
  const isMobile = useIsMobile();
  
  const stageColors = {
    prospect: 'bg-white/20 text-white border-white/30',
    qualified: 'bg-white/20 text-white border-white/30',
    proposal: 'bg-white/20 text-white border-white/30',
    negotiation: 'bg-white/20 text-white border-white/30',
    'closed-won': 'bg-white/20 text-white border-white/30',
    'closed-lost': 'bg-white/20 text-white border-white/30',
  };

  const getContactName = (contactId: string) => {
    return mockContacts.find(c => c.id === contactId)?.name || 'Unknown';
  };

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {mockDeals.map((deal) => {
        const DealCard = isMobile ? MobileOptimizedCard : Card;
        return (
          <DealCard
            key={deal.id}
            className={isMobile ? "mobile-card" : "luxury-card hover:shadow-lg transition-shadow stats-card"}
            {...(isMobile && { enableHaptic: true })}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-display text-white">{deal.title}</CardTitle>
                  <p className="text-sm text-white/80 font-body">{getContactName(deal.contactId)}</p>
                </div>
                <Badge className={stageColors[deal.stage]}>
                  {deal.stage.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-white" />
                  <span className="text-lg font-semibold text-white font-display">
                    ${deal.value.toLocaleString()}
                  </span>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/80 font-body">Probability</span>
                    <span className="text-sm font-medium text-white font-body">{deal.probability}%</span>
                  </div>
                  <Progress value={deal.probability} className="h-2" />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-white/80 font-body">
                  <Calendar className="h-4 w-4" />
                  <span>Expected: {deal.expectedCloseDate.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </DealCard>
        );
      })}
    </div>
  );
}
