
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedForms } from '@/hooks/useSavedForms';
import Header from '@/components/Header';
import SavedFormsList from '@/components/SavedFormsList';
import SaveFormDialog from '@/components/SaveFormDialog';
import PreFlightChecks from '@/components/PreFlightChecks';
import CheckboxSection from '@/components/CheckboxSection';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ComprehensiveFormData } from '@/types/ComprehensiveFormData';
import { createDefaultFormData } from '@/utils/createDefaultFormData';
import { submitComprehensiveForm } from '@/utils/comprehensiveFormSubmission';

const ComprehensiveOnboarding = () => {
  const { user, signOut } = useAuth();
  const { savedForms, loading, saveForm, loadForm, deleteForm } = useSavedForms();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ComprehensiveFormData>(createDefaultFormData());
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');

  const handleInputChange = (field: keyof ComprehensiveFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveForm = async () => {
    if (formName.trim()) {
      const success = await saveForm(formName, formData, 'comprehensive');
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

  const handleSubmit = async () => {
    if (!formData.teamMemberName) {
      toast({
        title: "Missing Information",
        description: "Please enter the team member's name before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await submitComprehensiveForm(formData);

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Comprehensive onboarding form submitted successfully!",
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

  if (!user) {
    return null;
  }

  const dayBeforeItems = [
    { key: 'welcomeCallConfirmExcitement' as keyof ComprehensiveFormData, label: 'Welcome Call - Confirm Excitement' },
    { key: 'welcomeCallConfirmShifts' as keyof ComprehensiveFormData, label: 'Welcome Call - Confirm Shifts' },
    { key: 'welcomeCallExplainFirstDay' as keyof ComprehensiveFormData, label: 'Welcome Call - Explain First Day' },
    { key: 'informCrew' as keyof ComprehensiveFormData, label: 'Inform Crew' },
    { key: 'checkUniform' as keyof ComprehensiveFormData, label: 'Check Uniform' }
  ];

  const firstShiftItems = [
    { key: 'managerOnboarding' as keyof ComprehensiveFormData, label: 'Manager Onboarding' },
    { key: 'warmWelcome' as keyof ComprehensiveFormData, label: 'Warm Welcome' },
    { key: 'prepareLocker' as keyof ComprehensiveFormData, label: 'Prepare Locker' },
    { key: 'welcomeTable' as keyof ComprehensiveFormData, label: 'Welcome Table' },
    { key: 'checkVaultId' as keyof ComprehensiveFormData, label: 'Check Vault ID' },
    { key: 'checkClockIn' as keyof ComprehensiveFormData, label: 'Check Clock In' },
    { key: 'kfcWelcomeAgenda' as keyof ComprehensiveFormData, label: 'KFC Welcome Agenda' },
    { key: 'vaultInductionAgenda' as keyof ComprehensiveFormData, label: 'Vault Induction Agenda' },
    { key: 'storeTourAgenda' as keyof ComprehensiveFormData, label: 'Store Tour Agenda' },
    { key: 'hrPoliciesAgenda' as keyof ComprehensiveFormData, label: 'HR Policies Agenda' }
  ];

  const inductionVaultItems = [
    { key: 'welcomeToKfc' as keyof ComprehensiveFormData, label: 'Welcome to KFC' },
    { key: 'cultureOverview' as keyof ComprehensiveFormData, label: 'Culture Overview' },
    { key: 'behindTheBucket' as keyof ComprehensiveFormData, label: 'Behind The Bucket' },
    { key: 'seriousStuff' as keyof ComprehensiveFormData, label: 'Serious Stuff' },
    { key: 'answerQuestions' as keyof ComprehensiveFormData, label: 'Answer Questions' }
  ];

  const complianceVaultItems = [
    { key: 'fireSafety' as keyof ComprehensiveFormData, label: 'Fire Safety' },
    { key: 'healthSafety' as keyof ComprehensiveFormData, label: 'Health & Safety' },
    { key: 'harassmentPolicies' as keyof ComprehensiveFormData, label: 'Harassment Policies' },
    { key: 'foodSafety' as keyof ComprehensiveFormData, label: 'Food Safety' },
    { key: 'checkInProcedures' as keyof ComprehensiveFormData, label: 'Check-In Procedures' },
    { key: 'ensureBreaks' as keyof ComprehensiveFormData, label: 'Ensure Breaks' }
  ];

  const tourItems = [
    { key: 'introduceToCrew' as keyof ComprehensiveFormData, label: 'Introduce to Crew' },
    { key: 'showRestaurant' as keyof ComprehensiveFormData, label: 'Show Restaurant' },
    { key: 'explainFireSafety' as keyof ComprehensiveFormData, label: 'Explain Fire Safety' },
    { key: 'showWelfareArea' as keyof ComprehensiveFormData, label: 'Show Welfare Area' }
  ];

  const hrPoliciesItems = [
    { key: 'reviewWorkPlanner' as keyof ComprehensiveFormData, label: 'Review Work Planner' },
    { key: 'checkPreplannedTimeOff' as keyof ComprehensiveFormData, label: 'Check Pre-planned Time Off' },
    { key: 'explainSicknessPolicy' as keyof ComprehensiveFormData, label: 'Explain Sickness Policy' }
  ];

  const dayTwoItems = [
    { key: 'meetBuddy' as keyof ComprehensiveFormData, label: 'Meet Buddy' },
    { key: 'guidedPractice' as keyof ComprehensiveFormData, label: 'Guided Practice' },
    { key: 'assessReadiness' as keyof ComprehensiveFormData, label: 'Assess Readiness' }
  ];

  const day4To30Items = [
    { key: 'workingUnaided' as keyof ComprehensiveFormData, label: 'Working Unaided' },
    { key: 'feedbackSessions' as keyof ComprehensiveFormData, label: 'Feedback Sessions' },
    { key: 'vaultModulesCompleted' as keyof ComprehensiveFormData, label: 'Vault Modules Completed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header userEmail={user.email || ''} onSignOut={signOut} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          <div className="xl:col-span-3">
            <div className="space-y-6">
              {/* Header */}
              <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    🍗 KFC Comprehensive Onboarding Checklist
                  </CardTitle>
                  <p className="text-red-100">It's Finger Lickin' Good Onboarding!</p>
                </CardHeader>
              </Card>

              {/* Our Newest Star's Name */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Our Newest Star's Name:</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={formData.teamMemberName}
                    onChange={(e) => handleInputChange('teamMemberName', e.target.value)}
                    placeholder="Enter Team Member's Name"
                    className="text-lg font-medium"
                  />
                </CardContent>
              </Card>

              {/* Pre-Flight Checks */}
              <PreFlightChecks
                formData={formData}
                onInputChange={handleInputChange}
              />

              {/* All other sections using CheckboxSection */}
              <CheckboxSection
                title="Day Before"
                emoji="📞"
                items={dayBeforeItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="dayBeforeCompletionDate"
                signatureField="dayBeforeSignature"
              />

              <CheckboxSection
                title="First Shift"
                emoji="👋"
                items={firstShiftItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="firstShiftCompletionDate"
                signatureField="firstShiftSignature"
              />

              <CheckboxSection
                title="Induction Vault"
                emoji="📚"
                items={inductionVaultItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="inductionVaultCompletionDate"
                signatureField="inductionVaultSignature"
              />

              <CheckboxSection
                title="Compliance Vault"
                emoji="🛡️"
                items={complianceVaultItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="complianceVaultCompletionDate"
                signatureField="complianceVaultSignature"
              />

              <CheckboxSection
                title="Tour"
                emoji="🚶‍♂️"
                items={tourItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="tourCompletionDate"
                signatureField="tourSignature"
              />

              <CheckboxSection
                title="HR Policies"
                emoji="📜"
                items={hrPoliciesItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="hrPoliciesCompletionDate"
                signatureField="hrPoliciesSignature"
              />

              <CheckboxSection
                title="Day Two"
                emoji="📅"
                items={dayTwoItems}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="dayTwoCompletionDate"
                signatureField="dayTwoSignature"
              />

              <CheckboxSection
                title="Day 4 to 30"
                emoji="🗓️"
                items={day4To30Items}
                formData={formData}
                onInputChange={handleInputChange}
                completionDateField="day4To30CompletionDate"
                signatureField="day4To30Signature"
              />

              {/* Final Sign Off Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">✅ Final Sign Off</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="finalSignOff"
                      checked={formData.finalSignOff}
                      onChange={(e) => handleInputChange('finalSignOff', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="finalSignOff" className="font-medium">
                      Final Sign Off
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.finalSignOffCompletionDate}
                        onChange={(e) => handleInputChange('finalSignOffCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.finalSignOffSignature}
                        onChange={(e) => handleInputChange('finalSignOffSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <SaveFormDialog
                  open={saveDialogOpen}
                  onOpenChange={setSaveDialogOpen}
                  formName={formName}
                  onFormNameChange={setFormName}
                  onSave={handleSaveForm}
                />

                <Button 
                  onClick={handleSubmit}
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto text-lg py-3"
                >
                  🍗 Complete Onboarding & Submit
                </Button>
              </div>
            </div>
          </div>
          
          <div className="xl:col-span-1">
            <SavedFormsList
              savedForms={savedForms}
              loading={loading}
              onLoadForm={handleLoadForm}
              onDeleteForm={deleteForm}
              formType="comprehensive"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComprehensiveOnboarding;
