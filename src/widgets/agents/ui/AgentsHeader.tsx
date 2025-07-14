import { Plus, Filter, Download } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { AddAgentDialog } from "@/widgets/agents/ui/AddAgentDialog";
import { useState } from 'react';

export function AgentsHeader() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Agents</h1>
        <p className="text-muted-foreground">Manage your team members and track their performance</p>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      <AddAgentDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
      />
    </div>
  );
}