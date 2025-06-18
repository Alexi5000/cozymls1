
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockDeals } from '@/lib/mock-data';

export function DealsOverview() {
  const dealsByStage = mockDeals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalDeals = mockDeals.length;
  const stageColors = {
    prospect: 'bg-gray-500',
    qualified: 'bg-blue-500',
    proposal: 'bg-yellow-500',
    negotiation: 'bg-orange-500',
    'closed-won': 'bg-green-500',
    'closed-lost': 'bg-red-500',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(dealsByStage).map(([stage, count]) => {
            const percentage = (count / totalDeals) * 100;
            return (
              <div key={stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">
                    {stage.replace('-', ' ')}
                  </span>
                  <span className="text-gray-500">{count} deals</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
