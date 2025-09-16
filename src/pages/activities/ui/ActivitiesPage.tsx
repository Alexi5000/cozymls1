import { ResponsiveLayout, Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { TouchButton } from '@/shared/ui/touch-button';
import { Badge } from '@/shared/ui/badge';
import { MobileListItem } from '@/shared/ui/mobile-list-item';
import { mockActivities } from '@/entities/activity';
import { mockContacts } from '@/entities/contact';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Plus, Calendar, Phone, Mail, Users, Clock } from 'lucide-react';

export function ActivitiesPage() {
  const isMobile = useIsMobile();
  
  const activityIcons = {
    call: Phone,
    email: Mail,
    meeting: Users,
    note: Calendar,
    task: Calendar,
  };

  const typeColors = {
    call: 'bg-blue-100 text-blue-800',
    email: 'bg-green-100 text-green-800',
    meeting: 'bg-purple-100 text-purple-800',
    note: 'bg-gray-100 text-gray-800',
    task: 'bg-orange-100 text-orange-800',
  };

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const content = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Recent Activities</h1>
          <p className="text-sm md:text-base text-gray-500">Track all interactions with your contacts and properties</p>
        </div>
        <TouchButton className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </TouchButton>
      </div>

      <div className="space-y-3">
        {mockActivities.map((activity) => {
          const contact = mockContacts.find(c => c.id === activity.contactId);
          const Icon = activityIcons[activity.type];
          
          if (isMobile) {
            return (
              <MobileListItem
                key={activity.id}
                title={activity.title}
                subtitle={contact ? `Contact: ${contact.name}` : undefined}
                description={activity.description}
                icon={<Icon className="h-5 w-5 text-primary" />}
                badge={
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${typeColors[activity.type]}`}>
                      {activity.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'No due date'}
                    </div>
                  </div>
                }
                enableHaptic
              />
            );
          }
          
          return (
            <Card key={activity.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{activity.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${typeColors[activity.type]}`}>
                          {activity.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'No due date'}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    
                    {contact && (
                      <p className="text-sm font-medium text-gray-900">
                        Contact: {contact.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Activities" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Activities">
      {content}
    </Layout>
  );
}