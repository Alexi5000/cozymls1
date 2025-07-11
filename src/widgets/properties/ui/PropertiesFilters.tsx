import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, Filter } from 'lucide-react';
import { usePropertiesContext } from '@/shared/providers/PropertiesProvider';

export function PropertiesFilters() {
  const { filters, updateFilters } = usePropertiesContext();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by address, MLS ID, or features..."
          className="pl-10"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
    </div>
  );
}