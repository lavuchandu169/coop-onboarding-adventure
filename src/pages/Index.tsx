
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedForms } from '@/hooks/useSavedForms';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import OnboardingForm from '@/components/OnboardingForm';
import SavedFormsList from '@/components/SavedFormsList';

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { savedForms, saveForm, loadForm, deleteForm, loading: formsLoading } = useSavedForms();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    startDate: '',
  });

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveForm = async () => {
    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name.",
        variant: "destructive",
      });
      return;
    }

    await saveForm(formName, formData);
    setFormName('');
    setSaveDialogOpen(false);
  };

  const handleLoadForm = async (formId: string) => {
    const data = await loadForm(formId);
    if (data) {
      // Type assertion to ensure the data matches our form structure
      const typedData = data as {
        fullName: string;
        email: string;
        phone: string;
        position: string;
        department: string;
        startDate: string;
      };
      setFormData(typedData);
      toast({
        title: "Success!",
        description: "Form loaded successfully!",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={user.email} onSignOut={handleSignOut} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
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

          {/* Saved Forms */}
          <div>
            <SavedFormsList
              savedForms={savedForms}
              loading={formsLoading}
              onLoadForm={handleLoadForm}
              onDeleteForm={deleteForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
