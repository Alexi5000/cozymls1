
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockActivities, mockContacts } from '@/lib/mock-data';
import { Plus, Calendar, Phone, Mail, Users, Clock } from 'lucide-react';

export default function Activities() {
  const activityIcons = {
    call: Phone,
    email: Mail,
    meeting: Users,
    note: Calendar,
    task: Calendar,
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const getContactName = (contactId?: string) => {
    if (!contactId) return 'No contact';
    return mockContacts.find(c => c.id === contactId)?.name || 'Unknown';
  };

  return (
    <Layout title="Activities">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Activities</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <p className="text-sm text-gray-600">{getContactName(activity.contactId)}</p>
                      </div>
                    </div>
                    <Badge className={priorityColors[activity.priority]}>
                      {activity.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activity.description && (
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    )}
                    
                    {activity.dueDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Due: {activity.dueDate.toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      {activity.completedAt && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
