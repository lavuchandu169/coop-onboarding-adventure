
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OnboardingForm from "@/components/OnboardingForm";
import Header from "@/components/Header";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
}

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    position: '',
    department: '',
    startDate: ''
  });

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive",
      });
      return;
    }

    // Save form logic would go here
    toast({
      title: "Success!",
      description: `Form "${formName}" saved successfully!`,
    });
    
    setSaveDialogOpen(false);
    setFormName('');
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
      <Header userEmail={user.email || ''} onSignOut={handleSignOut} />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Welcome to KFC Onboarding Adventure!
            </h1>
            <p className="text-xl text-gray-600">
              Please complete your onboarding information below
            </p>
          </div>
          
          <OnboardingForm
            formData={formData}
            onInputChange={handleInputChange}
            saveDialogOpen={saveDialogOpen}
            setSaveDialogOpen={setSaveDialogOpen}
            formName={formName}
            setFormName={setFormName}
            onSaveForm={handleSaveForm}
          />
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
