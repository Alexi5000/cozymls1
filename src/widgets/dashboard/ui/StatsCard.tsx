import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({ title, value, change, icon: Icon, trend = 'neutral' }: StatsCardProps) {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className="stats-card hover-lift group animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-3 p-3 md:p-6">
        <CardTitle className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide leading-tight">
          {title}
        </CardTitle>
        <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-primary rounded-lg md:rounded-xl flex items-center justify-center shadow-elegant flex-shrink-0 group-hover:animate-glow">
          <Icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-3 md:p-6 relative z-10">
        <div className="text-xl md:text-3xl font-bold font-display text-foreground mb-1 md:mb-2">
          {value}
        </div>
        {change && (
          <p className={`text-xs md:text-sm font-medium ${trendColor[trend]} leading-tight`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}