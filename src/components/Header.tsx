
import React from 'react';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userEmail: string;
  onSignOut: () => void;
}

const Header = ({ userEmail, onSignOut }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600">KFC Onboarding</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
              Welcome, {userEmail}
            </span>
            <Button onClick={onSignOut} variant="outline" size="sm" className="w-full sm:w-auto">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
