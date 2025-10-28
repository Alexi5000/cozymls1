import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import { Bell, Eye, Calendar, User, DollarSign, Clock } from 'lucide-react';

interface NotificationsDropdownProps {
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'message' | 'alert' | 'system' | 'appointment';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Property Viewing Scheduled',
    message: 'New viewing for 123 Grafton Street at 2:00 PM today',
    time: '10 min ago',
    isRead: false,
    icon: <Calendar className="h-4 w-4 text-blue-500" />
  },
  {
    id: '2',
    type: 'alert',
    title: 'Price Reduction Alert',
    message: 'Property in Ballsbridge reduced by €50,000',
    time: '1 hour ago',
    isRead: false,
    icon: <DollarSign className="h-4 w-4 text-green-500" />
  },
  {
    id: '3',
    type: 'message',
    title: 'New Client Inquiry',
    message: 'Sarah Murphy is interested in 2-bed apartments in Dublin 4',
    time: '2 hours ago',
    isRead: false,
    icon: <User className="h-4 w-4 text-purple-500" />
  },
  {
    id: '4',
    type: 'system',
    title: 'Market Report Ready',
    message: 'Weekly Dublin property market analysis is now available',
    time: '4 hours ago',
    isRead: true,
    icon: <Bell className="h-4 w-4 text-gray-500" />
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Reminder: Valuation Tomorrow',
    message: 'Property valuation at 45 Pembroke Road at 10:00 AM',
    time: '6 hours ago',
    isRead: true,
    icon: <Clock className="h-4 w-4 text-orange-500" />
  }
];

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    // Mark all notifications as read
    // In real app, you would update the notification state
  };

  const handleNotificationClick = (notification: Notification) => {
    // Navigate to relevant page and mark as read
    // In real app, you would navigate to relevant page and mark as read
  };

  return (
    <Card className="absolute right-0 top-12 w-80 md:w-96 bg-white border shadow-luxury z-50 animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-muted-foreground hover:text-foreground w-fit p-0 h-auto"
            onClick={handleMarkAllRead}
          >
            Mark all as read
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="max-h-80 overflow-y-auto">
          {mockNotifications.map((notification, index) => (
            <div key={notification.id}>
              <div 
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                  !notification.isRead ? 'bg-blue-50/50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium truncate ${
                        !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
              {index < mockNotifications.length - 1 && <Separator />}
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => {
              // View all notifications
              onClose();
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}