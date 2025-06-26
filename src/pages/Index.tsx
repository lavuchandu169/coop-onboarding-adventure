
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import OnboardingForm from '@/components/OnboardingForm';
import SavedFormsList from '@/components/SavedFormsList';
import { useSavedForms } from '@/hooks/useSavedForms';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
}

const Index = () => {
  const { user, signOut } = useAuth();
  const { savedForms, loading, saveForm, loadForm, deleteForm } = useSavedForms();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    startDate: ''
  });
  
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveForm = async () => {
    if (formName.trim()) {
      const success = await saveForm(formName, formData, 'basic');
      if (success) {
        setSaveDialogOpen(false);
        setFormName('');
      }
    }
  };

  const handleLoadForm = async (formId: string) => {
    const loadedData = await loadForm(formId);
    if (loadedData) {
      setFormData(loadedData);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={user.email || ''} onSignOut={signOut} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <Link to="/comprehensive">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto mb-4 text-sm sm:text-base"
            >
              Go to Comprehensive Onboarding Checklist
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
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
          
          <div className="xl:col-span-1">
            <SavedFormsList
              savedForms={savedForms}
              loading={loading}
              onLoadForm={handleLoadForm}
              onDeleteForm={deleteForm}
              formType="basic"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
