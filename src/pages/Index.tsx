
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';
import { useSavedForms } from '@/hooks/useSavedForms';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Download, Save } from 'lucide-react';

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-red-600">KFC Onboarding</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Employee Onboarding Form</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <Input
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="Enter position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <Input
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Form
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Form</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Form Name
                          </label>
                          <Input
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Enter form name"
                          />
                        </div>
                        <Button onClick={handleSaveForm} className="w-full">
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button className="bg-red-600 hover:bg-red-700">
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved Forms */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Forms</CardTitle>
              </CardHeader>
              <CardContent>
                {formsLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : savedForms.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No saved forms yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {savedForms.map((form) => (
                      <div
                        key={form.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <div className="font-medium">{form.form_name}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(form.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLoadForm(form.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteForm(form.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
