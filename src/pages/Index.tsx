
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import OnboardingForm from '@/components/OnboardingForm';
import SavedFormsList from '@/components/SavedFormsList';
import { useSavedForms } from '@/hooks/useSavedForms';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { CheckSquare, FileText, Users, Clock } from 'lucide-react';

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to KFC Onboarding</h2>
          <p className="text-lg text-gray-600 mb-6">
            Get started with your employee onboarding process. Choose from our basic form or comprehensive checklist.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Basic Onboarding Form
                </CardTitle>
                <CardDescription>
                  Quick and simple form to collect essential employee information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Perfect for getting started with basic employee details like name, contact information, position, and start date.
                </p>
                <div className="text-sm text-gray-500">
                  • Personal Information
                  • Contact Details  
                  • Position & Department
                  • Start Date
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  Comprehensive Checklist
                </CardTitle>
                <CardDescription>
                  Complete onboarding checklist with all necessary steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive checklist covering all aspects of employee onboarding from documentation to training.
                </p>
                <Link to="/comprehensive">
                  <Button className="w-full">
                    Go to Comprehensive Checklist
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Onboarding Form</CardTitle>
                <CardDescription>
                  Fill out the essential information to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OnboardingForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  saveDialogOpen={saveDialogOpen}
                  setSaveDialogOpen={setSaveDialogOpen}
                  formName={formName}
                  setFormName={setFormName}
                  onSaveForm={handleSaveForm}
                />
              </CardContent>
            </Card>
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
