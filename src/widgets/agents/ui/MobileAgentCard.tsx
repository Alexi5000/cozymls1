import { MobileOptimizedCard } from '@/shared/ui/mobile-optimized-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Phone, Mail, TrendingUp, DollarSign, Users } from 'lucide-react';
import type { User } from '@/entities/user';

interface MobileAgentCardProps {
  agent: User;
}

export function MobileAgentCard({ agent }: MobileAgentCardProps) {
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
    <MobileOptimizedCard>
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={agent.avatar} alt={agent.name} />
          <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{agent.name}</h3>
              <Badge variant={getRoleBadgeVariant(agent.role)} className="capitalize text-xs">
                {agent.role}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1 mb-3">
            <div className="flex items-center text-xs text-muted-foreground">
              <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
              <span className="truncate">{agent.email}</span>
            </div>
            {agent.phone && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>{agent.phone}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <TrendingUp className="h-3 w-3" />
              </div>
              <div className="text-sm font-medium">{performanceData.deals}</div>
              <div className="text-xs text-muted-foreground">Deals</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <DollarSign className="h-3 w-3" />
              </div>
              <div className="text-sm font-medium">${(performanceData.revenue / 1000).toFixed(0)}K</div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <Users className="h-3 w-3" />
              </div>
              <div className="text-sm font-medium">{performanceData.clients}</div>
              <div className="text-xs text-muted-foreground">Clients</div>
            </div>
          </div>
        </div>
      </div>
    </MobileOptimizedCard>
  );
}