import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';

const stats = [
  {
    title: "Total Agents",
    value: "12",
    icon: Users,
    change: "+2 this month",
    trend: "up"
  },
  {
    title: "Active Agents",
    value: "10",
    icon: TrendingUp,
    change: "83% active rate",
    trend: "up"
  },
  {
    title: "Total Sales",
    value: "$2.4M",
    icon: DollarSign,
    change: "+15% from last month",
    trend: "up"
  },
  {
    title: "Avg. Deal Size",
    value: "$45K",
    icon: Target,
    change: "+8% from last month", 
    trend: "up"
  }
];

export function AgentsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}