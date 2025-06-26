
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Welcome to KFC Onboarding Adventure!
            </h1>
            <p className="text-xl text-gray-600">
              Hello, {user.email}! You've successfully logged in.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <style>{`
        .text-red-600 { color: #FE0000; }
        .border-red-600 { border-color: #FE0000; }
        .hover\\:bg-red-50:hover { background-color: #FEF2F2; }
      `}</style>
    </div>
  );
};

export default Index;
