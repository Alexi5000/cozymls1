import { format } from 'date-fns';
import { 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Clock,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { MobileListItem } from '@/shared/ui/mobile-list-item';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
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
  call: 'bg-blue-500',
  email: 'bg-green-500',
  meeting: 'bg-purple-500',
  note: 'bg-orange-500',
  task: 'bg-gray-500',
};

interface MobileActivityCardProps {
  activity: Activity;
  onClick?: (activity: Activity) => void;
}

export function MobileActivityCard({ activity, onClick }: MobileActivityCardProps) {
  const Icon = activityIcons[activity.type];
  const contact = activity.contactId ? mockContacts.find(c => c.id === activity.contactId) : null;
  const isOverdue = activity.dueDate && !activity.completedAt && new Date(activity.dueDate) < new Date();
  const isDueToday = activity.dueDate && !activity.completedAt && 
    new Date(activity.dueDate).toDateString() === new Date().toDateString();

  return (
    <MobileListItem
      title={activity.title}
      onTap={() => onClick?.(activity)}
      className={activity.completedAt ? 'opacity-75' : ''}
      icon={
        <div className={`p-2 rounded-full ${typeColors[activity.type]} text-white`}>
          <Icon className="h-4 w-4" />
        </div>
      }
      badge={
        <div className="flex items-center gap-2">
          <Badge variant={priorityColors[activity.priority]} className="text-xs">
            {activity.priority}
          </Badge>
          {activity.completedAt && (
            <CheckCircle className="h-4 w-4 text-green-600" />
          )}
        </div>
      }
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground capitalize">{activity.type}</span>
        </div>
        
        {contact && (
          <div className="flex items-center gap-1">
            <Avatar className="h-4 w-4">
              <AvatarImage src={`https://avatar.vercel.sh/${contact.name}`} />
              <AvatarFallback className="text-xs">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate">{contact.name}</span>
          </div>
        )}
        
        {activity.dueDate && !activity.completedAt && (
          <div className={`flex items-center gap-1 text-xs ${
            isOverdue ? 'text-red-600' : isDueToday ? 'text-blue-600' : 'text-muted-foreground'
          }`}>
            <Clock className="h-3 w-3" />
            <span>
              {format(new Date(activity.dueDate), 'MMM d, h:mm a')}
              {isOverdue && ' (Overdue)'}
              {isDueToday && ' (Today)'}
            </span>
          </div>
        )}
        
        {activity.completedAt && (
          <div className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle className="h-3 w-3" />
            <span>Completed {format(new Date(activity.completedAt), 'MMM d')}</span>
          </div>
        )}
      </div>
    </MobileListItem>
  );
}