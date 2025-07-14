import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { User } from "@/entities/user/model/types";
import { formatUserRole, formatLastLogin } from "@/entities/user/lib/formatters";
import { getUserRoleColor, getUserInitials } from "@/entities/user/lib/helpers";
import { Mail, Phone, Calendar, User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: User;
  onEmail?: (user: User) => void;
  onCall?: (user: User) => void;
  onViewProfile?: (user: User) => void;
  compact?: boolean;
}

export function UserCard({ 
  user, 
  onEmail, 
  onCall, 
  onViewProfile,
  compact = false 
}: UserCardProps) {
  const userInitials = getUserInitials(user.name);
  const roleColor = getUserRoleColor(user.role);
  const formattedRole = formatUserRole(user.role);
  const lastLoginFormatted = user.lastLogin ? formatLastLogin(user.lastLogin) : 'Never';

  if (compact) {
    return (
      <Card className="hover-lift animate-scale-in">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
                  <span className="text-sm font-bold text-white">{userInitials}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Badge className={`${roleColor} text-xs font-medium`}>
              {formattedRole}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover-lift animate-scale-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
                <span className="text-lg font-bold text-white">{userInitials}</span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-bold text-foreground">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Badge className={`${roleColor} font-medium`}>
            {formattedRole}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* User Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {user.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{user.phone}</span>
              </div>
            )}
            {user.department && (
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{user.department}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Last login: {lastLoginFormatted}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t border-border">
            {onEmail && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 hover-glow"
                onClick={() => onEmail(user)}
              >
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
            )}
            {onCall && user.phone && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 hover-glow"
                onClick={() => onCall(user)}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            )}
            {onViewProfile && (
              <Button
                size="sm"
                className="flex-1 btn-primary"
                onClick={() => onViewProfile(user)}
              >
                View Profile
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
