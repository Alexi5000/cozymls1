import { Layout } from '@/widgets/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';

export function SimpleDashboardPage() {
  console.log('SimpleDashboardPage rendering');

  const stats = [
    { title: "Active Properties", value: "1,234", icon: Home },
    { title: "In Escrow", value: "45", icon: TrendingUp },
    { title: "Monthly Revenue", value: "$2.1M", icon: DollarSign },
    { title: "Active Agents", value: "12", icon: Users },
  ];

  return (
    <Layout title="Dashboard">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Dawn!</h1>
          <p className="text-muted-foreground">Your real estate dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Activity content will go here</p>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Market insights content</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deals Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Deals overview content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}