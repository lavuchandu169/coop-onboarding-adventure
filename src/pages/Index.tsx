
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OnboardingForm from "@/components/OnboardingForm";
import SavedFormsList from "@/components/SavedFormsList";
import Header from "@/components/Header";
import { useSavedForms } from "@/hooks/useSavedForms";

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
  const { savedForms, loading: formsLoading, saveForm, loadForm, deleteForm } = useSavedForms();

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

  const handleSaveForm = async () => {
    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive",
      });
      return;
    }

    await saveForm(formName, formData);
    setSaveDialogOpen(false);
    setFormName('');
  };

  const handleLoadForm = async (formId: string) => {
    const loadedData = await loadForm(formId);
    if (loadedData) {
      setFormData(loadedData);
      toast({
        title: "Success!",
        description: "Form loaded successfully!",
      });
    }
  };

  const handleDeleteForm = async (formId: string) => {
    await deleteForm(formId);
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Welcome to KFC Onboarding Adventure!
            </h1>
            <p className="text-xl text-gray-600">
              Please complete your onboarding information below
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
            
            <div className="lg:col-span-1">
              <SavedFormsList
                savedForms={savedForms}
                loading={formsLoading}
                onLoadForm={handleLoadForm}
                onDeleteForm={handleDeleteForm}
              />
            </div>
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
