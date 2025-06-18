
import { Bell, Search, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-18 border-b border-gray-200 bg-white px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties, agents..."
            className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center ml-2">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
