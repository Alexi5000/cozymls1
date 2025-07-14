// Example demonstrating path aliases usage
// This file shows how to use the configured path aliases in imports

// ❌ Old way - relative imports (hard to maintain)
// import { Button } from '../../../shared/ui/button';
// import { UserEntity } from '../../entities/user';
// import { DashboardWidget } from '../../widgets/dashboard';

// ✅ New way - clean alias imports
import { Button } from '@/shared/ui/button';
import { UserEntity } from '@/entities/user';
import { DashboardWidget } from '@/widgets/dashboard';

// ✅ Use barrel files for clean imports
import { Card, Input, Dialog } from '@/shared/ui';
import { 
  DashboardStats, 
  RecentActivities 
} from '@/widgets/dashboard';

// ✅ Import from specific layers
import { PropertyModel } from '@/entities/property';
import { PropertyFilters } from '@/features/property-filters';
import { PropertyCard } from '@/widgets/properties';

// Example component using the imports
export function ExampleComponent() {
  return (
    <Card>
      <h2>Path Aliases Example</h2>
      <p>This component demonstrates clean imports using path aliases.</p>
      
      <Button>Click me</Button>
      
      <Input placeholder="Search..." />
      
      <Dialog>
        <p>This is a dialog</p>
      </Dialog>
      
      <DashboardWidget />
      <DashboardStats />
      <RecentActivities />
      
      <PropertyCard property={null} />
    </Card>
  );
}

// Benefits of path aliases:
// 1. Clean, readable imports
// 2. Easy to refactor - no need to update relative paths
// 3. Consistent import structure
// 4. IDE autocomplete works better
// 5. Follows FSD architectural principles
