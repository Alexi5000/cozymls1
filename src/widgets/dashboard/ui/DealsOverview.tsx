import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { mockDeals } from '@/entities/deal';

export function DealsOverview() {
  const dealsByStage = mockDeals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalDeals = mockDeals.length;

  return (
    <Card className="luxury-card hover-lift animate-scale-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-display font-bold text-foreground">Deals Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(dealsByStage).map(([stage, count], index) => {
            const percentage = (count / totalDeals) * 100;
            return (
              <div key={stage} className="space-y-3 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between items-center">
                  <span className="capitalize font-semibold text-foreground">
                    {stage.replace('-', ' ')}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">{count} deals</span>
                </div>
                <div className="relative overflow-hidden rounded-full">
                  <div className="h-3 bg-muted rounded-full">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out animate-shimmer"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}