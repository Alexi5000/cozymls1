import { Bell, Search, User, Settings } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 md:h-16 border-b border-gray-200 bg-white px-4 md:px-6 lg:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 min-w-0">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search - Hidden on small mobile, shown on tablet+ */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties, agents..."
            className="pl-10 w-40 md:w-60 lg:w-80 bg-gray-50 border-gray-200 focus:bg-white text-sm"
          />
        </div>
        
        {/* Search button for mobile */}
        <Button variant="ghost" size="icon" className="sm:hidden text-gray-500 hover:text-gray-700">
          <Search className="h-5 w-5" />
        </Button>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 h-8 w-8 md:h-10 md:w-10">
            <Bell className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex text-gray-500 hover:text-gray-700">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-full flex items-center justify-center ml-1 md:ml-2">
            <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}