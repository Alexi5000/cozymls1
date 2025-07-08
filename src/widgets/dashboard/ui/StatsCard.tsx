import { GlassCard } from '@/shared/ui/glass-card';
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
    <GlassCard 
      variant="divine" 
      glow={true}
      className="group hover:scale-105 transition-all duration-700 animate-scale-in"
    >
      <div className="flex flex-row items-center justify-between p-4 md:p-6">
        <div className="flex-1">
          <div className="text-xs md:text-sm font-bold text-muted-foreground/80 uppercase tracking-wider mb-2 md:mb-3">
            {title}
          </div>
          <div className="text-2xl md:text-4xl font-bold font-display text-foreground mb-1 md:mb-2 bg-gradient-divine bg-clip-text text-transparent">
            {value}
          </div>
          {change && (
            <p className={`text-xs md:text-sm font-semibold ${trendColor[trend]} leading-tight opacity-90`}>
              {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-divine rounded-2xl flex items-center justify-center shadow-divine flex-shrink-0 group-hover:animate-divine-glow transition-all duration-700">
          <Icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </div>
      </div>
    </GlassCard>
  );
}