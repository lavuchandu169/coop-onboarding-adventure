
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaveFormDialog from './SaveFormDialog';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
}

interface OnboardingFormProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  saveDialogOpen: boolean;
  setSaveDialogOpen: (open: boolean) => void;
  formName: string;
  setFormName: (name: string) => void;
  onSaveForm: () => void;
}

const OnboardingForm = ({
  formData,
  onInputChange,
  saveDialogOpen,
  setSaveDialogOpen,
  formName,
  setFormName,
  onSaveForm
}: OnboardingFormProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'position', 'department', 'startDate'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create FormData for FormSubmit.co
      const submitData = new FormData();
      submitData.append('_subject', 'KFC Basic Onboarding Form Submission');
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');
      
      // Add form data
      submitData.append('Full Name', formData.fullName);
      submitData.append('Email', formData.email);
      submitData.append('Phone', formData.phone || 'Not provided');
      submitData.append('Position', formData.position);
      submitData.append('Department', formData.department);
      submitData.append('Start Date', formData.startDate);
      submitData.append('Form Type', 'Basic Onboarding');
      submitData.append('Submission Time', new Date().toLocaleString());

      const response = await fetch('https://formsubmit.co/jennifer.delahunt@yum.com', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Employee onboarding form submitted successfully!",
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Employee Onboarding Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.fullName}
                onChange={(e) => onInputChange('fullName', e.target.value)}
                placeholder="Enter full name"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="Enter email"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Position <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.position}
                onChange={(e) => onInputChange('position', e.target.value)}
                placeholder="Enter position"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.department}
                onChange={(e) => onInputChange('department', e.target.value)}
                placeholder="Enter department"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => onInputChange('startDate', e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <SaveFormDialog
              open={saveDialogOpen}
              onOpenChange={setSaveDialogOpen}
              formName={formName}
              onFormNameChange={setFormName}
              onSave={onSaveForm}
            />

            <Button 
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
