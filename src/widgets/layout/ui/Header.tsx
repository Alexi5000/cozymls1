import React, { useState, useCallback } from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { NotificationsDropdown } from "@/widgets/layout/ui/NotificationsDropdown";
import { SettingsDropdown } from "@/widgets/layout/ui/SettingsDropdown";
import { UserAccountDropdown } from "@/widgets/layout/ui/UserAccountDropdown";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
    setShowSettings(false);
    setShowUserMenu(false);
  }, []);

  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
    setShowNotifications(false);
    setShowUserMenu(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(prev => !prev);
    setShowNotifications(false);
    setShowSettings(false);
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setShowNotifications(false);
    setShowSettings(false);
    setShowUserMenu(false);
  }, []);

  return (
    <>
      {/* Backdrop overlay */}
      {(showNotifications || showSettings || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40 bg-black/20" 
          onClick={closeAllDropdowns}
        />
      )}
      
      <header className="relative h-14 md:h-16 border-b border-gray-200 bg-white px-4 md:px-6 lg:px-8 flex items-center justify-between shadow-sm z-50">
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
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-gray-700 h-8 w-8 md:h-10 md:w-10 relative"
                onClick={toggleNotifications}
              >
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
              
              {showNotifications && (
                <NotificationsDropdown onClose={closeAllDropdowns} />
              )}
            </div>
            
            {/* Settings */}
            <div className="relative hidden md:block">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleSettings}
              >
                <Settings className="h-5 w-5" />
              </Button>
              
              {showSettings && (
                <SettingsDropdown onClose={closeAllDropdowns} />
              )}
            </div>
            
            {/* User Account */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-full flex items-center justify-center ml-1 md:ml-2 hover:shadow-glow transition-all duration-200 hover:scale-105"
              >
                <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </button>
              
              {showUserMenu && (
                <UserAccountDropdown onClose={closeAllDropdowns} />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}