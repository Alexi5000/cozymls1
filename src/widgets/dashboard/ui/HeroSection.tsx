import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { TrendingUp, Home, Users, DollarSign, Sparkles, ArrowUpRight } from 'lucide-react';
import { AddPropertyDialog } from '@/widgets/properties/ui/AddPropertyDialog';
import { useResponsiveBreakpoint } from '@/shared/hooks/use-responsive-breakpoint';
import { ResponsiveContainer } from '@/shared/ui/enhanced-responsive-layout';
import { ResponsiveGridContainer } from '@/shared/ui';

interface HeroSectionProps {
  userName?: string;
  stats: {
    activeProperties: number;
    pendingSales: number;
    monthlyRevenue: number;
    newListings: number;
  };
}

export function HeroSection({ 
  userName = "Dawn", 
  stats 
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsiveBreakpoint();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const achievements = [
    { label: "Top Performer", icon: Sparkles },
    { label: "Rising Star", icon: TrendingUp },
  ];

  return (
    <ResponsiveContainer maxWidth="full" padding="none">
      <div className="relative overflow-hidden">
        {/* Hero Background */}
        <div className={`hero-section relative rounded-2xl mb-8 ${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'}`}>
          {/* Floating Elements - Hide on mobile for better performance */}
          {!isMobile && (
            <>
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/10 rounded-full animate-float opacity-60" />
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
            </>
          )}

          <div className={`relative z-10 transition-all duration-1000 mobile-will-change ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Welcome Message */}
          <div className={isMobile ? "mb-6" : "mb-8"}>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h1 className={`font-display font-bold text-white leading-tight ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-5xl'}`}>
                Welcome back, {userName}! 
              </h1>
              <div className={`animate-float ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}>👋</div>
            </div>
            
            <p className={`text-white/90 max-w-2xl leading-relaxed ${isMobile ? 'text-base mb-4' : isTablet ? 'text-lg mb-6' : 'text-xl mb-6'}`}>
              Your real estate empire is thriving. Here's your latest performance snapshot.
            </p>

            {/* Achievement Badges */}
            <div className={`flex flex-wrap gap-3 ${isMobile ? 'mb-6' : 'mb-8'}`}>
              {achievements.map((achievement, index) => (
                <Badge 
                  key={achievement.label}
                  className={`glass-effect text-white border-white/30 hover:bg-white/20 font-medium animate-scale-in mobile-tap-highlight-none ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <achievement.icon className="w-4 h-4 mr-2" />
                  {achievement.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <ResponsiveGridContainer 
            cols={{ mobile: 2, tablet: 4, desktop: 4 }}
            gap={isMobile ? "sm" : "md"}
            className="mb-6"
          >
            {[
              { 
                label: "Active Properties", 
                value: stats.activeProperties.toLocaleString(), 
                icon: Home, 
                change: `+${stats.newListings} new`,
                color: "from-blue-400 to-blue-600"
              },
              { 
                label: "Pending Sales", 
                value: stats.pendingSales.toString(), 
                icon: TrendingUp, 
                change: "+15% this week",
                color: "from-emerald-400 to-emerald-600"
              },
              { 
                label: "Monthly Revenue", 
                value: `$${(stats.monthlyRevenue / 1000000).toFixed(1)}M`, 
                icon: DollarSign, 
                change: "+22% growth",
                color: "from-amber-400 to-amber-600"
              },
              { 
                label: "Active Agents", 
                value: "12", 
                icon: Users, 
                change: "2 new agents",
                color: "from-purple-400 to-purple-600"
              }
            ].map((stat, index) => (
                <Card 
                key={stat.label}
                className="glass-effect border-white/20 hover:bg-white/20 transition-all duration-300 hover-lift animate-slide-up mobile-card mobile-tap-highlight-none"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className={`text-center ${isMobile ? 'p-3' : 'p-4'}`}>
                  <div className={`rounded-lg bg-gradient-to-br ${stat.color} mx-auto mb-3 flex items-center justify-center shadow-glow ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`}>
                    <stat.icon className={`text-white ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} />
                  </div>
                  <div className={`font-bold text-white mb-1 font-display leading-tight ${isMobile ? 'text-lg' : isTablet ? 'text-2xl' : 'text-3xl'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-white/80 mb-1 leading-tight ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-white/70 font-medium leading-tight ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGridContainer>

          {/* Quick Actions */}
          <div className={`flex gap-4 ${isMobile ? 'flex-col mt-6' : 'flex-col sm:flex-row mt-8'}`}>
            <AddPropertyDialog>
              <Button 
                className={`glass-effect border-white/30 text-white hover:bg-white/20 mobile-tap-highlight-none ${isMobile ? 'h-12 px-6 py-3' : 'px-6 py-3'}`}
                size={isMobile ? "lg" : "default"}
              >
                Add New Property
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </AddPropertyDialog>
            <Button 
              variant="outline" 
              className={`glass-effect border-white/30 text-white hover:bg-white/20 mobile-tap-highlight-none ${isMobile ? 'h-12 px-6 py-3' : 'px-6 py-3'}`}
              onClick={() => navigate('/reports')}
              size={isMobile ? "lg" : "default"}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
    </ResponsiveContainer>
  );
}