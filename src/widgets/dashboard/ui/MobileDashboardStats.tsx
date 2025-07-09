import React, { memo } from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MobileDashboardStatsProps {
  stats: Array<{
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ComponentType<any>;
    color: string;
  }>;
}

export const MobileDashboardStats = memo(function MobileDashboardStats({ stats }: MobileDashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';
        
        return (
          <Card key={stat.label} className="mobile-card mobile-shadow overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <Badge 
                  variant={isPositive ? "default" : "secondary"}
                  className={`text-xs ${isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}
                >
                  {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  {stat.label}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});