import { ResponsiveLayout } from '@/widgets/layout/ui/ResponsiveLayout';
import { AgentsHeader } from '@/widgets/agents/ui/AgentsHeader';
import { AgentsGrid } from '@/widgets/agents/ui/AgentsGrid';
import { AgentsStats } from '@/widgets/agents/ui/AgentsStats';

export function AgentsPage() {
  const handleRefresh = async () => {
    // Implement refresh logic for mobile
    await new Promise(resolve => setTimeout(resolve, 1000));
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