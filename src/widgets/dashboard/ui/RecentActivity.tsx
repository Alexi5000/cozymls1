import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { useRecentActivities } from '@/integrations/supabase/hooks';
import { useProperties } from '@/integrations/supabase/hooks';
import { PropertyCardDb } from '@/widgets/properties/ui/PropertyCardDb';
import { Calendar, Phone, Mail, Users, Clock, ArrowRight, Home } from 'lucide-react';
import { Skeleton } from '@/shared/ui/skeleton';

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Users,
  note: Calendar,
  task: Calendar,
};

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-accent/20 text-accent-foreground',
  high: 'bg-destructive/20 text-destructive',
};

const typeColors = {
  call: 'from-blue-500 to-blue-600',
  email: 'from-emerald-500 to-emerald-600', 
  meeting: 'from-purple-500 to-purple-600',
  note: 'from-amber-500 to-amber-600',
  task: 'from-rose-500 to-rose-600',
};

export function RecentActivity() {
  const { data: activities, isLoading: activitiesLoading } = useRecentActivities();
  const { data: propertiesData, isLoading: propertiesLoading } = useProperties();
  
  const recentActivities = activities?.slice(0, 6) || [];
  const featuredProperties = propertiesData?.data?.slice(0, 2) || [];

  return (
    <Card className="luxury-card hover-lift animate-scale-in">
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activities
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {activitiesLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : recentActivities.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No recent activities</p>
        ) : (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              const gradientColor = typeColors[activity.type];
              return (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-subtle transition-all duration-300 hover-lift group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center shadow-elegant group-hover:animate-glow`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.due_date ? new Date(activity.due_date).toLocaleDateString() : 'No due date'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${priorityColors[activity.priority]} font-medium text-xs px-2 py-1`}>
                      {activity.priority}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Featured Properties Section */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Featured Properties
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          {propertiesLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : featuredProperties.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No featured properties</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {featuredProperties.map((property, index) => (
                <div 
                  key={property.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <PropertyCardDb property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Action Bar */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 hover-glow">
              <Phone className="w-4 h-4 mr-1" />
              Schedule Call
            </Button>
            <Button size="sm" className="flex-1 btn-primary">
              <Mail className="w-4 h-4 mr-1" />
              Send Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}