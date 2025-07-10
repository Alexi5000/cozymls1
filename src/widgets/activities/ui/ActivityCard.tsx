import { format } from 'date-fns';
import { 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Clock,
  User,
  Building,
  MoreHorizontal,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Activity } from '@/entities/activity';
import { mockContacts } from '@/entities/contact';

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  task: CheckSquare,
};

const priorityColors = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
} as const;

const typeColors = {
  call: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  email: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  meeting: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  note: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  task: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

interface ActivityCardProps {
  activity: Activity;
  onEdit?: (activity: Activity) => void;
  onComplete?: (activity: Activity) => void;
  onDelete?: (activity: Activity) => void;
}

export function ActivityCard({ activity, onEdit, onComplete, onDelete }: ActivityCardProps) {
  const Icon = activityIcons[activity.type];
  const contact = activity.contactId ? mockContacts.find(c => c.id === activity.contactId) : null;
  const isOverdue = activity.dueDate && !activity.completedAt && new Date(activity.dueDate) < new Date();
  const isDueToday = activity.dueDate && !activity.completedAt && 
    new Date(activity.dueDate).toDateString() === new Date().toDateString();

  return (
    <Card className={`transition-all hover:shadow-md ${activity.completedAt ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base leading-6 flex items-center gap-2">
                {activity.title}
                {activity.completedAt && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={priorityColors[activity.priority]} className="text-xs">
                  {activity.priority}
                </Badge>
                <Badge variant="outline" className="text-xs capitalize">
                  {activity.type}
                </Badge>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(activity)}>
                Edit
              </DropdownMenuItem>
              {!activity.completedAt && (
                <DropdownMenuItem onClick={() => onComplete?.(activity)}>
                  Mark Complete
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => onDelete?.(activity)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {activity.description && (
          <p className="text-sm text-muted-foreground">{activity.description}</p>
        )}
        
        {contact && (
          <div className="flex items-center gap-2 text-sm">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://avatar.vercel.sh/${contact.name}`} />
              <AvatarFallback className="text-xs">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{contact.name}</span>
          </div>
        )}
        
        {activity.dealId && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>Deal #{activity.dealId}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
          {activity.dueDate && !activity.completedAt && (
            <div className={`flex items-center gap-1 text-sm ${
              isOverdue ? 'text-red-600' : isDueToday ? 'text-blue-600' : 'text-muted-foreground'
            }`}>
              <Clock className="h-4 w-4" />
              <span>
                {format(new Date(activity.dueDate), 'MMM d, h:mm a')}
              </span>
              {isOverdue && <span className="text-xs">(Overdue)</span>}
              {isDueToday && <span className="text-xs">(Today)</span>}
            </div>
          )}
          
          {activity.completedAt && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Completed {format(new Date(activity.completedAt), 'MMM d')}</span>
            </div>
          )}
          
          {!activity.dueDate && !activity.completedAt && (
            <div className="text-sm text-muted-foreground">
              Created {format(new Date(activity.createdAt), 'MMM d')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}