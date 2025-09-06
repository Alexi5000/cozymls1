import { ResponsiveLayout } from '@/widgets/layout/ui/ResponsiveLayout';
import { AgentsHeader } from '@/widgets/agents/ui/AgentsHeader';
import { AgentsGrid } from '@/widgets/agents/ui/AgentsGrid';
import { AgentsStats } from '@/widgets/agents/ui/AgentsStats';

export function AgentsPage() {
  const handleRefresh = async () => {
    // Instant refresh - no artificial delays
  };

  return (
    <ResponsiveLayout 
      title="Agents" 
      showSearch={true}
      onRefresh={handleRefresh}
    >
      <div className="space-y-6">
        <AgentsHeader />
        <AgentsStats />
        <AgentsGrid />
      </div>
    </ResponsiveLayout>
  );
}