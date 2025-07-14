import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';

export function ContactsHeader() {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">All Contacts</h2>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Add Contact
      </Button>
    </div>
  );
}
