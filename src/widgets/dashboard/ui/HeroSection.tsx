import { useState, useEffect } from 'react';
import { GlassCard } from '@/shared/ui/glass-card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { TrendingUp, Home, Users, DollarSign, Crown, Zap } from 'lucide-react';

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
  userName = "Sarah", 
  stats 
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const achievements = [
    { label: "Divine Performer", icon: Crown },
    { label: "Market Leader", icon: Zap },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="hero-section relative rounded-2xl p-8 md:p-12 mb-8">
        {/* Divine Floating Orbs */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-divine rounded-full animate-float opacity-20 blur-sm" />
        <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-warm rounded-full animate-float opacity-15 blur-sm" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-sunset rounded-full animate-breathe opacity-25 blur-sm" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-primary-ultra/30 rounded-full animate-float opacity-30" style={{ animationDelay: '2.5s' }} />

        <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Welcome Message */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white bg-gradient-to-r from-white via-white to-orange-200 bg-clip-text">
                Welcome back, {userName}
              </h1>
              <div className="text-3xl md:text-4xl animate-breathe">✨</div>
            </div>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
              Your real estate empire is thriving. Here's your latest performance snapshot.
            </p>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {achievements.map((achievement, index) => (
              <Badge 
                key={achievement.label}
                className="bg-gradient-divine text-white border-white/40 hover:bg-gradient-warm px-6 py-3 text-sm font-semibold animate-scale-in shadow-floating backdrop-blur-xl"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <achievement.icon className="w-5 h-5 mr-2" />
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
              <GlassCard 
                key={stat.label}
                variant="divine"
                glow={true}
                className="group animate-slide-up hover:scale-110 transition-all duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-divine group-hover:animate-divine-glow`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold text-white mb-2 font-display bg-gradient-to-br from-white to-orange-200 bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/90 mb-2 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-xs text-orange-200 font-semibold">
                    {stat.change}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Divine Actions */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <Button 
              variant="premium" 
              size="lg"
              className="bg-gradient-divine hover:bg-gradient-sunset px-8 py-4 text-lg font-semibold shadow-divine hover:shadow-luxury transition-all duration-700 hover:scale-105 backdrop-blur-xl"
            >
              Create Divine Property
              <Crown className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold hover:bg-white/25 transition-all duration-700"
            >
              Divine Analytics
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}