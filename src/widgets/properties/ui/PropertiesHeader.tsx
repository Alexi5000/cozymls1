import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { AddPropertyDialog } from './AddPropertyDialog';

export function PropertiesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Property Listings</h2>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your MLS property inventory</p>
      </div>
      <AddPropertyDialog>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 md:px-6 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </AddPropertyDialog>
    </div>
  );
}