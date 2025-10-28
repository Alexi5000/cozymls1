import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { TrendingUp, Home, Users, DollarSign, Sparkles, ArrowUpRight } from 'lucide-react';
import { AddPropertyDialog } from '@/widgets/properties/ui/AddPropertyDialog';
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { LASER_FLOW_CONFIG } from './animations/laser-flow-config';
import { logger } from '@/shared/lib/logger';

// 🎬 Lazy load LaserFlow for better initial page load
const LaserFlow = lazy(() => import('./animations/LaserFlow'));

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
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 🎨 Log LaserFlow configuration for debugging
  useEffect(() => {
    if (!prefersReducedMotion) {
      logger.ui('LaserFlow', 'Configuration loaded', {
        color: LASER_FLOW_CONFIG.COLOR,
        zIndex: LASER_FLOW_CONFIG.HERO_Z_INDEX,
        position: {
          horizontal: LASER_FLOW_CONFIG.HORIZONTAL_BEAM_OFFSET,
          vertical: LASER_FLOW_CONFIG.VERTICAL_BEAM_OFFSET,
        },
        container: {
          top: isMobile ? LASER_FLOW_CONFIG.CONTAINER_TOP_MOBILE : LASER_FLOW_CONFIG.CONTAINER_TOP_DESKTOP,
          right: isMobile ? LASER_FLOW_CONFIG.CONTAINER_RIGHT_MOBILE : LASER_FLOW_CONFIG.CONTAINER_RIGHT_DESKTOP,
          width: isMobile ? LASER_FLOW_CONFIG.CONTAINER_WIDTH_MOBILE : LASER_FLOW_CONFIG.CONTAINER_WIDTH_DESKTOP,
          height: LASER_FLOW_CONFIG.CONTAINER_HEIGHT,
        },
        size: {
          vertical: LASER_FLOW_CONFIG.VERTICAL_SIZING,
          horizontal: LASER_FLOW_CONFIG.HORIZONTAL_SIZING,
        }
      });
    }
  }, [prefersReducedMotion, isMobile]);

  const achievements = [
    { label: "Top Performer", icon: Sparkles },
    { label: "Rising Star", icon: TrendingUp },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="hero-section relative rounded-2xl p-8 md:p-12 mb-8">
        {/* 🎨 LaserFlow Overlay - Positioned over top-right cards */}
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <div 
              className="absolute rounded-2xl overflow-hidden pointer-events-none"
              style={{ 
                top: isMobile ? LASER_FLOW_CONFIG.CONTAINER_TOP_MOBILE : LASER_FLOW_CONFIG.CONTAINER_TOP_DESKTOP,
                right: isMobile ? LASER_FLOW_CONFIG.CONTAINER_RIGHT_MOBILE : LASER_FLOW_CONFIG.CONTAINER_RIGHT_DESKTOP,
                width: isMobile ? LASER_FLOW_CONFIG.CONTAINER_WIDTH_MOBILE : LASER_FLOW_CONFIG.CONTAINER_WIDTH_DESKTOP,
                height: LASER_FLOW_CONFIG.CONTAINER_HEIGHT,
                opacity: LASER_FLOW_CONFIG.HERO_OPACITY,
                zIndex: LASER_FLOW_CONFIG.HERO_Z_INDEX,
              }}
            >
              <LaserFlow
                wispDensity={LASER_FLOW_CONFIG.WISP_DENSITY}
                flowSpeed={LASER_FLOW_CONFIG.FLOW_SPEED}
                verticalSizing={LASER_FLOW_CONFIG.VERTICAL_SIZING}
                horizontalSizing={LASER_FLOW_CONFIG.HORIZONTAL_SIZING}
                fogIntensity={LASER_FLOW_CONFIG.FOG_INTENSITY}
                fogScale={LASER_FLOW_CONFIG.FOG_SCALE}
                wispSpeed={LASER_FLOW_CONFIG.WISP_SPEED}
                wispIntensity={LASER_FLOW_CONFIG.WISP_INTENSITY}
                flowStrength={LASER_FLOW_CONFIG.FLOW_STRENGTH}
                decay={LASER_FLOW_CONFIG.DECAY}
                falloffStart={LASER_FLOW_CONFIG.FALLOFF_START}
                fogFallSpeed={LASER_FLOW_CONFIG.FOG_FALL_SPEED}
                horizontalBeamOffset={LASER_FLOW_CONFIG.HORIZONTAL_BEAM_OFFSET}
                verticalBeamOffset={LASER_FLOW_CONFIG.VERTICAL_BEAM_OFFSET}
                mouseSmoothTime={LASER_FLOW_CONFIG.MOUSE_SMOOTH_TIME}
                mouseTiltStrength={LASER_FLOW_CONFIG.MOUSE_TILT_STRENGTH}
                color={LASER_FLOW_CONFIG.COLOR}
              />
            </div>
          </Suspense>
        )}

        <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Welcome Message */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Welcome back, {userName}! 
              </h1>
              <div className="text-2xl md:text-3xl">👋</div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
              Your real estate empire is thriving. Here's your latest performance snapshot.
            </p>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {achievements.map((achievement, index) => (
                <Badge 
                  key={achievement.label}
                  className="bg-muted text-foreground border-border hover:bg-muted/80 px-4 py-2 text-sm font-medium animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <achievement.icon className="w-4 h-4 mr-2" />
                  {achievement.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                className="border-border hover:bg-muted/50 transition-all duration-300 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} mx-auto mb-3 flex items-center justify-center shadow-glow`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <AddPropertyDialog>
              <Button className="border-border text-foreground hover:bg-muted px-6 py-3">
                Add New Property
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </AddPropertyDialog>
            <Button 
              variant="outline" 
              className="border-border text-foreground hover:bg-muted px-6 py-3"
              onClick={() => navigate('/reports')}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}