import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { TouchButton } from '@/shared/ui/touch-button';
import { mockActivities } from '@/entities/activity';
import { Calendar, Phone, Mail, Users, Clock, ArrowRight, ChevronRight } from 'lucide-react';

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
  call: 'bg-blue-500',
  email: 'bg-emerald-500', 
  meeting: 'bg-purple-500',
  note: 'bg-amber-500',
  task: 'bg-rose-500',
};

export const MobileRecentActivity = memo(function MobileRecentActivity() {
  const recentActivities = mockActivities.slice(0, 4); // Show fewer on mobile

  return (
    <Card className="mobile-card mobile-shadow">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="mobile-title flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Recent Activities
          </CardTitle>
          <TouchButton variant="ghost" size="sm" className="text-primary">
            <ArrowRight className="w-4 h-4" />
          </TouchButton>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {recentActivities.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            const bgColor = typeColors[activity.type];
            
            return (
              <div 
                key={activity.id} 
                className="flex items-center gap-3 p-4 mobile-press"
              >
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="mobile-body font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <p className="mobile-caption flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    {activity.dueDate?.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${priorityColors[activity.priority]} text-xs`}>
                    {activity.priority}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Quick Action Bar */}
        <div className="p-4 border-t border-border/50 bg-muted/30">
          <div className="mobile-grid-2">
            <TouchButton size="sm" variant="outline" className="mobile-touch-target">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </TouchButton>
            <TouchButton size="sm" className="mobile-touch-target btn-primary">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TouchButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});