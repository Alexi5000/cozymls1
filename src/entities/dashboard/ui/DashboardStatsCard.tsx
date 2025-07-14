import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { formatCurrency, formatPercentage } from "@/entities/dashboard/lib/formatters";
import { LucideIcon } from 'lucide-react';

interface DashboardStatsCardProps {
  title: string;
  value: number;
  change?: number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  currency?: boolean;
  percentage?: boolean;
  className?: string;
}

export function DashboardStatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'neutral',
  currency = false,
  percentage = false,
  className = '',
}: DashboardStatsCardProps) {
  const formatValue = (val: number) => {
    if (currency) return formatCurrency(val);
    if (percentage) return formatPercentage(val);
    return val.toLocaleString();
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-emerald-600 bg-emerald-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendSymbol = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <Card className={`hover-lift animate-scale-in ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {formatValue(value)}
        </div>
        {change !== undefined && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
            <Badge className={`${getTrendColor(trend)} font-medium text-xs px-2 py-1`}>
              <span className="mr-1">{getTrendSymbol(trend)}</span>
              {change > 0 ? '+' : ''}{change}%
            </Badge>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
