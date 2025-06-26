
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaveFormDialog from './SaveFormDialog';

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
  return (
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
              onChange={(e) => onInputChange('fullName', e.target.value)}
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
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <Input
              value={formData.position}
              onChange={(e) => onInputChange('position', e.target.value)}
              placeholder="Enter position"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <Input
              value={formData.department}
              onChange={(e) => onInputChange('department', e.target.value)}
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
              onChange={(e) => onInputChange('startDate', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <SaveFormDialog
            open={saveDialogOpen}
            onOpenChange={setSaveDialogOpen}
            formName={formName}
            onFormNameChange={setFormName}
            onSave={onSaveForm}
          />

          <Button className="bg-red-600 hover:bg-red-700">
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
