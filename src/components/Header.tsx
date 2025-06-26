
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
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-red-600">KFC Onboarding</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {userEmail}</span>
            <Button onClick={onSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
