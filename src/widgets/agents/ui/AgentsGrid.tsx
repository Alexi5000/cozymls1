import { mockUsers } from '@/entities/user';
import { AgentCard } from "@/widgets/agents/ui/AgentCard";
import { MobileAgentCard } from "@/widgets/agents/ui/MobileAgentCard";
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function AgentsGrid() {
  const isMobile = useIsMobile();

  // Filter users to show only agents (exclude admins for this demo)
  const agents = mockUsers.filter(user => user.role === 'agent' || user.role === 'manager');

  if (isMobile) {
    return (
      <div className="space-y-3">
        {agents.map((agent) => (
          <MobileAgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}