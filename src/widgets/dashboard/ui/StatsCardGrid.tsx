import { StatsCard } from "@/widgets/dashboard/ui/StatsCard";
import { useResponsiveBreakpoint } from '@/shared/hooks/use-responsive-breakpoint';
import { LucideIcon } from 'lucide-react';

export interface StatsCardData {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

interface StatsCardGridProps {
  stats: StatsCardData[];
  className?: string;
}

export function StatsCardGrid({ stats, className = '' }: StatsCardGridProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-scale-in ${className}`}>
      {stats.map((stat, index) => (
        <StatsCard 
          key={stat.title}
          {...stat}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}
