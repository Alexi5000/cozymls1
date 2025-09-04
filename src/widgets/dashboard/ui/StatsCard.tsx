import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { LucideIcon } from 'lucide-react';
import { useResponsiveBreakpoint } from '@/shared/hooks/use-responsive-breakpoint';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  style?: React.CSSProperties;
}

export function StatsCard({ title, value, change, icon: Icon, trend = 'neutral', style }: StatsCardProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className="stats-card hover-lift group animate-scale-in mobile-card" style={style}>
      <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${isMobile ? 'pb-2 p-3' : 'pb-3 p-6'}`}>
        <CardTitle className={`font-semibold text-white/90 uppercase tracking-wide leading-tight ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {title}
        </CardTitle>
        <div className={`bg-white/20 rounded-lg flex items-center justify-center shadow-elegant flex-shrink-0 group-hover:animate-glow ${isMobile ? 'w-8 h-8' : 'w-12 h-12 rounded-xl'}`}>
          <Icon className={`text-white ${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
        </div>
      </CardHeader>
      <CardContent className={`pt-0 relative z-10 ${isMobile ? 'p-3' : 'p-6'}`}>
        <div className={`font-bold font-display text-white ${isMobile ? 'text-xl mb-1' : 'text-3xl mb-2'}`}>
          {value}
        </div>
        {change && (
          <p className={`font-medium text-white/80 leading-tight ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}