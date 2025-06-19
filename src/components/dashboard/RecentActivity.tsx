
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockActivities } from '@/lib/mock-data/activities';
import { Calendar, Phone, Mail, Users } from 'lucide-react';

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Users,
  note: Calendar,
  task: Calendar,
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export function RecentActivity() {
  const recentActivities = mockActivities.slice(0, 6);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.dueDate?.toLocaleDateString()}
                  </p>
                </div>
                <Badge className={`${priorityColors[activity.priority]} font-medium`}>
                  {activity.priority}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
