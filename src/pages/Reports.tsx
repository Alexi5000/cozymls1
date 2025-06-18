
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Home, 
  Users, 
  Calendar,
  FileText,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Reports() {
  const salesMetrics = {
    monthlyListings: 45,
    activeSales: 28,
    avgDaysOnMarket: 32,
    totalCommission: 125000,
    monthlyGrowth: 12.5
  };

  const agentPerformance = [
    { name: 'Sarah Thompson', listings: 12, sales: 8, commission: 45000 },
    { name: 'Mike Rodriguez', listings: 10, sales: 6, commission: 32000 },
    { name: 'Emma Chen', listings: 8, sales: 7, commission: 38000 },
    { name: 'David Wilson', listings: 15, sales: 7, commission: 28000 }
  ];

  const marketTrends = [
    { area: 'Downtown', avgPrice: 485000, growth: 8.2, properties: 156 },
    { area: 'Suburbia West', avgPrice: 325000, growth: 5.7, properties: 234 },
    { area: 'Riverside', avgPrice: 675000, growth: 12.1, properties: 89 },
    { area: 'Historic District', avgPrice: 425000, growth: 3.4, properties: 167 }
  ];

  return (
    <Layout title="Reports & Analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Real Estate Analytics</h2>
            <p className="text-gray-600 mt-1">Track performance and market insights</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cozy-card p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Monthly Listings
              </CardTitle>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-gray-900 mb-2">{salesMetrics.monthlyListings}</div>
              <p className="text-sm font-medium text-green-600">+{salesMetrics.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card className="cozy-card p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Active Sales
              </CardTitle>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-gray-900 mb-2">{salesMetrics.activeSales}</div>
              <p className="text-sm font-medium text-gray-500">Properties in escrow</p>
            </CardContent>
          </Card>

          <Card className="cozy-card p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Avg Days on Market
              </CardTitle>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-gray-900 mb-2">{salesMetrics.avgDaysOnMarket}</div>
              <p className="text-sm font-medium text-blue-600">5 days faster than avg</p>
            </CardContent>
          </Card>

          <Card className="cozy-card p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Commission
              </CardTitle>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${(salesMetrics.totalCommission / 1000).toFixed(0)}K
              </div>
              <p className="text-sm font-medium text-green-600">+18% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Agent Performance & Market Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agent Performance */}
          <Card className="cozy-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Agent Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div key={agent.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{agent.listings} listings</span>
                        <span>{agent.sales} sales</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${(agent.commission / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-gray-500">commission</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Trends */}
          <Card className="cozy-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                Market Trends by Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((area) => (
                  <div key={area.area} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{area.area}</h4>
                        <p className="text-sm text-gray-600">{area.properties} properties</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ${(area.avgPrice / 1000).toFixed(0)}K
                        </div>
                        <Badge className={area.growth > 5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          +{area.growth}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(area.growth / 15) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
