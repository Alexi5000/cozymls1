
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, DollarSign, Home, TrendingUp, Calendar, Users } from 'lucide-react';
import { mockMLSStats } from '@/lib/mock-mls-data';

export default function Reports() {
  const stats = mockMLSStats;

  return (
    <Layout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Properties"
            value={stats.totalProperties.toLocaleString()}
            change="+12% from last month"
            icon={Home}
            trend="up"
          />
          <StatsCard
            title="Active Listings"
            value={stats.activeListings}
            change="+5% from last week"
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Avg. Days on Market"
            value={stats.avgDaysOnMarket}
            change="-3 days from last month"
            icon={Calendar}
            trend="up"
          />
          <StatsCard
            title="Avg. Property Price"
            value={`$${(stats.avgPrice / 1000).toFixed(0)}K`}
            change="+8% from last quarter"
            icon={DollarSign}
            trend="up"
          />
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="market">Market Overview</TabsTrigger>
            <TabsTrigger value="performance">Agent Performance</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="cozy-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Monthly Sales Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${(stats.monthlyVolume / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-sm text-gray-600">
                    Total transaction volume this month
                  </p>
                </CardContent>
              </Card>

              <Card className="cozy-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    New Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {stats.newListings}
                  </div>
                  <p className="text-sm text-gray-600">
                    Properties added this week
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="cozy-card">
              <CardHeader>
                <CardTitle>Market Activity by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: 'Downtown', listings: 45, avgPrice: '$850K', change: '+12%' },
                    { region: 'Westside', listings: 32, avgPrice: '$1.2M', change: '+8%' },
                    { region: 'North Hills', listings: 28, avgPrice: '$675K', change: '+15%' },
                    { region: 'East Side', listings: 19, avgPrice: '$550K', change: '+5%' },
                  ].map((region) => (
                    <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{region.region}</div>
                        <div className="text-sm text-gray-600">{region.listings} active listings</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{region.avgPrice}</div>
                        <div className="text-sm text-green-600">{region.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="cozy-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Performing Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Thompson', sales: 12, volume: '$4.2M', listings: 8 },
                    { name: 'Michael Chen', sales: 9, volume: '$3.8M', listings: 6 },
                    { name: 'Jennifer Davis', sales: 7, volume: '$2.9M', listings: 5 },
                  ].map((agent, index) => (
                    <div key={agent.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-gray-600">{agent.listings} active listings</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{agent.volume}</div>
                        <div className="text-sm text-gray-600">{agent.sales} sales this month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="cozy-card">
              <CardHeader>
                <CardTitle>Inventory Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { type: 'Single Family', count: 156, percentage: 45 },
                    { type: 'Condos', count: 89, percentage: 26 },
                    { type: 'Townhomes', count: 67, percentage: 20 },
                    { type: 'Multi-Family', count: 30, percentage: 9 },
                  ].map((item) => (
                    <div key={item.type} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{item.count}</div>
                      <div className="text-sm font-medium">{item.type}</div>
                      <div className="text-xs text-gray-600">{item.percentage}% of total</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="cozy-card">
              <CardHeader>
                <CardTitle>Price Range Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { range: '$0 - $500K', count: 45, trend: '+8%' },
                    { range: '$500K - $750K', count: 78, trend: '+12%' },
                    { range: '$750K - $1M', count: 89, trend: '+15%' },
                    { range: '$1M - $1.5M', count: 67, trend: '+5%' },
                    { range: '$1.5M+', count: 63, trend: '+18%' },
                  ].map((price) => (
                    <div key={price.range} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{price.range}</div>
                        <div className="text-sm text-gray-600">{price.count} properties</div>
                      </div>
                      <div className="text-green-600 font-medium">{price.trend}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
