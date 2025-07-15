
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Home, FileText, CheckSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="glass-nav sticky top-0 z-50 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover-lift">
            <div className="bg-white rounded-xl p-2 shadow-soft">
              <img 
                src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png" 
                alt="KFC Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">KFC</span>
              <span className="text-sm text-muted-foreground font-medium">Coop Hub</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                 <Link 
                   to="/comprehensive" 
                   className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-white/50 transition-all duration-200 hover-glow"
                 >
                   <CheckSquare className="h-4 w-4" />
                   Pro Checklist
                 </Link>
                 <Link 
                   to="/onboarding" 
                   className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-accent hover:bg-white/50 transition-all duration-200 hover-glow"
                 >
                   <FileText className="h-4 w-4" />
                   Coop Welcome
                 </Link>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={handleLogout}
                   className="flex items-center gap-2 hover-lift border-primary/20 hover:border-primary hover:bg-primary/10"
                 >
                   <LogOut className="h-4 w-4" />
                   Sign Out
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
                   <Button className="bg-gradient-primary hover-lift hover-glow animate-glow">
                     Join the Coop
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
