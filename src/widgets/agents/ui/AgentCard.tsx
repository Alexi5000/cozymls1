import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Phone, Mail, MoreVertical, TrendingUp, Users, DollarSign } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import type { User } from '@/entities/user';

interface AgentCardProps {
  agent: User;
}

export function AgentCard({ agent }: AgentCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'manager': return 'default';
      case 'agent': return 'secondary';
      default: return 'outline';
    }
  };

  // Mock performance data
  const performanceData = {
    deals: Math.floor(Math.random() * 20) + 5,
    revenue: Math.floor(Math.random() * 500000) + 100000,
    clients: Math.floor(Math.random() * 50) + 10
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{agent.name}</h3>
              <Badge variant={getRoleBadgeVariant(agent.role)} className="capitalize">
                {agent.role}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit Agent</DropdownMenuItem>
              <DropdownMenuItem>View Performance</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Remove Agent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" />
            {agent.email}
          </div>
          {agent.phone && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              {agent.phone}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center text-primary mb-1">
              <TrendingUp className="h-3 w-3 mr-1" />
            </div>
            <div className="text-sm font-medium">{performanceData.deals}</div>
            <div className="text-xs text-muted-foreground">Deals</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-primary mb-1">
              <DollarSign className="h-3 w-3 mr-1" />
            </div>
            <div className="text-sm font-medium">${(performanceData.revenue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-primary mb-1">
              <Users className="h-3 w-3 mr-1" />
            </div>
            <div className="text-sm font-medium">{performanceData.clients}</div>
            <div className="text-xs text-muted-foreground">Clients</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}