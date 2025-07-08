import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, Target, Zap } from 'lucide-react';

export function MarketInsights() {
  const insights = [
    {
      title: "Market Hotspot",
      description: "Downtown district showing 34% price increase",
      trend: "up",
      value: "+34%",
      icon: Target,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Inventory Alert", 
      description: "Only 12 homes under $500K available",
      trend: "down",
      value: "12 left",
      icon: Zap,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Best ROI",
      description: "Suburban properties averaging 18% returns",
      trend: "up", 
      value: "+18%",
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <Card className="luxury-card hover-lift animate-scale-in">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-xl font-display font-bold text-foreground flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div 
              key={insight.title}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-subtle transition-all duration-300 hover-lift group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center shadow-elegant group-hover:animate-glow`}>
                <insight.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {insight.title}
                  </h4>
                  <Badge 
                    className={`text-xs px-2 py-1 ${
                      insight.trend === 'up' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {insight.value}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </div>
              
              <div className="flex items-center">
                {insight.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-amber-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Market Summary */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary font-display">42</div>
              <div className="text-xs text-muted-foreground">Active Markets</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-display">89%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-display">24h</div>
              <div className="text-xs text-muted-foreground">Data Refresh</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}