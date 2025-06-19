
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockDeals } from '@/lib/mock-data/deals';

export function DealsOverview() {
  const dealsByStage = mockDeals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalDeals = mockDeals.length;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Deals Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(dealsByStage).map(([stage, count]) => {
            const percentage = (count / totalDeals) * 100;
            return (
              <div key={stage} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="capitalize font-semibold text-gray-700">
                    {stage.replace('-', ' ')}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{count} deals</span>
                </div>
                <div className="relative">
                  <Progress value={percentage} className="h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
