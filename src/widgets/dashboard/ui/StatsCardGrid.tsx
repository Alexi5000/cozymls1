import { StatsCard } from "@/widgets/dashboard/ui/StatsCard";
import { useResponsiveBreakpoint } from '@/shared/hooks/use-responsive-breakpoint';
import { ResponsiveGridContainer } from '@/shared/ui';
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
    <ResponsiveGridContainer 
      cols={{ mobile: 1, tablet: 2, desktop: 4 }}
      gap={isMobile ? "sm" : "md"}
      className={`animate-scale-in ${className}`}
    >
      {stats.map((stat, index) => (
        <StatsCard 
          key={stat.title}
          {...stat}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </ResponsiveGridContainer>
  );
}
