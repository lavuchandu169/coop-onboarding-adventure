
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, User, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userEmail: string;
  onSignOut: () => void;
}

const Header = ({ userEmail, onSignOut }: HeaderProps) => {
  const location = useLocation();
  
  // Extract initials from email for avatar
  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.slice(0, 2).toUpperCase();
  };
  
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                KFC Onboarding
              </h1>
            </div>
            
            <nav className="flex gap-2">
              <Link to="/">
                <Button 
                  variant={location.pathname === '/' ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center gap-2 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              
              <Link to="/comprehensive">
                <Button 
                  variant={location.pathname === '/comprehensive' ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center gap-2 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <CheckSquare className="h-4 w-4" />
                  Comprehensive
                </Button>
              </Link>
            </nav>
          </div>
          
          {/* Enhanced User Profile Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">Welcome back!</span>
              <span className="text-xs text-gray-500 truncate max-w-[200px]">
                {userEmail}
              </span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-12 w-12 rounded-full border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-lg"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={userEmail} />
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white font-semibold text-sm">
                      {getInitials(userEmail)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-64 p-2 bg-white shadow-xl border border-gray-200" align="end">
                <DropdownMenuLabel className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" alt={userEmail} />
                      <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white font-semibold">
                        {getInitials(userEmail)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">My Account</span>
                      <span className="text-sm text-gray-500 truncate max-w-[150px]">
                        {userEmail}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-gray-50 rounded-md">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-gray-50 rounded-md">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span>Preferences</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="p-3 cursor-pointer hover:bg-red-50 rounded-md text-red-600 hover:text-red-700"
                  onClick={onSignOut}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
