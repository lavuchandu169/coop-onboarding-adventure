
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Home, FileText, CheckSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png" 
              alt="KFC Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-xl text-gray-900">KFC Onboarding</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link 
                  to="/comprehensive" 
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <CheckSquare className="h-4 w-4" />
                  Comprehensive
                </Link>
                <Link 
                  to="/onboarding" 
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Welcome Form
                </Link>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link to="/auth">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
