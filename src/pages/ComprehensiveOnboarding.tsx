
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedForms } from '@/hooks/useSavedForms';
import Header from '@/components/Header';
import SavedFormsList from '@/components/SavedFormsList';
import SaveFormDialog from '@/components/SaveFormDialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

interface ComprehensiveFormData {
  // Pre-Flight Checks
  teamMemberName: string;
  trainingPlanCreated: boolean;
  rgmWelcomeScheduled: boolean;
  stationBuddyAssigned: string;
  feedbackScheduled: boolean;
  preFlightCompletionDate: string;
  preFlightSignature: string;

  // Day Before
  welcomeCallConfirmExcitement: boolean;
  welcomeCallConfirmShifts: boolean;
  welcomeCallExplainFirstDay: boolean;
  informCrew: boolean;
  checkUniform: boolean;
  dayBeforeCompletionDate: string;
  dayBeforeSignature: string;

  // First Shift
  managerOnboarding: boolean;
  warmWelcome: boolean;
  prepareLocker: boolean;
  welcomeTable: boolean;
  checkVaultId: boolean;
  checkClockIn: boolean;
  kfcWelcomeAgenda: boolean;
  vaultInductionAgenda: boolean;
  storeTourAgenda: boolean;
  hrPoliciesAgenda: boolean;
  firstShiftCompletionDate: string;
  firstShiftSignature: string;

  // Induction Vault
  welcomeToKfc: boolean;
  cultureOverview: boolean;
  behindTheBucket: boolean;
  seriousStuff: boolean;
  answerQuestions: boolean;
  inductionVaultCompletionDate: string;
  inductionVaultSignature: string;

  // Compliance Vault
  fireSafety: boolean;
  healthSafety: boolean;
  harassmentPolicies: boolean;
  foodSafety: boolean;
  checkInProcedures: boolean;
  ensureBreaks: boolean;
  complianceVaultCompletionDate: string;
  complianceVaultSignature: string;

  // Tour
  introduceToCrew: boolean;
  showRestaurant: boolean;
  explainFireSafety: boolean;
  showWelfareArea: boolean;
  tourCompletionDate: string;
  tourSignature: string;

  // HR Policies
  reviewWorkPlanner: boolean;
  checkPreplannedTimeOff: boolean;
  explainSicknessPolicy: boolean;
  hrPoliciesCompletionDate: string;
  hrPoliciesSignature: string;

  // Day Two
  meetBuddy: boolean;
  guidedPractice: boolean;
  assessReadiness: boolean;
  dayTwoCompletionDate: string;
  dayTwoSignature: string;

  // Day 4 to 30
  workingUnaided: boolean;
  feedbackSessions: boolean;
  vaultModulesCompleted: boolean;
  day4To30CompletionDate: string;
  day4To30Signature: string;

  // Final Sign Off
  finalSignOff: boolean;
  finalSignOffCompletionDate: string;
  finalSignOffSignature: string;
}

const ComprehensiveOnboarding = () => {
  const { user, signOut } = useAuth();
  const { savedForms, loading, saveForm, loadForm, deleteForm } = useSavedForms();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ComprehensiveFormData>({
    teamMemberName: '',
    trainingPlanCreated: false,
    rgmWelcomeScheduled: false,
    stationBuddyAssigned: '',
    feedbackScheduled: false,
    preFlightCompletionDate: '',
    preFlightSignature: '',
    welcomeCallConfirmExcitement: false,
    welcomeCallConfirmShifts: false,
    welcomeCallExplainFirstDay: false,
    informCrew: false,
    checkUniform: false,
    dayBeforeCompletionDate: '',
    dayBeforeSignature: '',
    managerOnboarding: false,
    warmWelcome: false,
    prepareLocker: false,
    welcomeTable: false,
    checkVaultId: false,
    checkClockIn: false,
    kfcWelcomeAgenda: false,
    vaultInductionAgenda: false,
    storeTourAgenda: false,
    hrPoliciesAgenda: false,
    firstShiftCompletionDate: '',
    firstShiftSignature: '',
    welcomeToKfc: false,
    cultureOverview: false,
    behindTheBucket: false,
    seriousStuff: false,
    answerQuestions: false,
    inductionVaultCompletionDate: '',
    inductionVaultSignature: '',
    fireSafety: false,
    healthSafety: false,
    harassmentPolicies: false,
    foodSafety: false,
    checkInProcedures: false,
    ensureBreaks: false,
    complianceVaultCompletionDate: '',
    complianceVaultSignature: '',
    introduceToCrew: false,
    showRestaurant: false,
    explainFireSafety: false,
    showWelfareArea: false,
    tourCompletionDate: '',
    tourSignature: '',
    reviewWorkPlanner: false,
    checkPreplannedTimeOff: false,
    explainSicknessPolicy: false,
    hrPoliciesCompletionDate: '',
    hrPoliciesSignature: '',
    meetBuddy: false,
    guidedPractice: false,
    assessReadiness: false,
    dayTwoCompletionDate: '',
    dayTwoSignature: '',
    workingUnaided: false,
    feedbackSessions: false,
    vaultModulesCompleted: false,
    day4To30CompletionDate: '',
    day4To30Signature: '',
    finalSignOff: false,
    finalSignOffCompletionDate: '',
    finalSignOffSignature: '',
  });

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
    // Validate required fields
    if (!formData.teamMemberName) {
      toast({
        title: "Missing Information",
        description: "Please enter the team member's name before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create FormData for FormSubmit.co
      const submitData = new FormData();
      submitData.append('_subject', 'KFC Comprehensive Onboarding Checklist Submission');
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');
      
      // Add basic info
      submitData.append('Team Member Name', formData.teamMemberName);
      submitData.append('Form Type', 'Comprehensive Onboarding Checklist');
      submitData.append('Submission Time', new Date().toLocaleString());
      
      // Add checklist data
      submitData.append('Training Plan Created', formData.trainingPlanCreated ? 'Yes' : 'No');
      submitData.append('RGM Welcome Scheduled', formData.rgmWelcomeScheduled ? 'Yes' : 'No');
      submitData.append('Station Buddy Assigned', formData.stationBuddyAssigned || 'Not specified');
      submitData.append('Feedback Scheduled', formData.feedbackScheduled ? 'Yes' : 'No');
      submitData.append('Pre-flight Completion Date', formData.preFlightCompletionDate || 'Not set');
      submitData.append('Pre-flight Signature', formData.preFlightSignature || 'Not signed');
      
      // Add other sections
      submitData.append('Welcome Call - Confirm Excitement', formData.welcomeCallConfirmExcitement ? 'Yes' : 'No');
      submitData.append('Welcome Call - Confirm Shifts', formData.welcomeCallConfirmShifts ? 'Yes' : 'No');
      submitData.append('Welcome Call - Explain First Day', formData.welcomeCallExplainFirstDay ? 'Yes' : 'No');
      submitData.append('Day Before Completion Date', formData.dayBeforeCompletionDate || 'Not set');
      submitData.append('Day Before Signature', formData.dayBeforeSignature || 'Not signed');
      
      submitData.append('Manager Onboarding', formData.managerOnboarding ? 'Yes' : 'No');
      submitData.append('First Shift Completion Date', formData.firstShiftCompletionDate || 'Not set');
      submitData.append('First Shift Signature', formData.firstShiftSignature || 'Not signed');
      
      submitData.append('Final Sign Off', formData.finalSignOff ? 'Yes' : 'No');
      submitData.append('Final Sign Off Date', formData.finalSignOffCompletionDate || 'Not set');
      submitData.append('Final Sign Off Signature', formData.finalSignOffSignature || 'Not signed');

      const response = await fetch('https://formsubmit.co/jennifer.delahunt@yum.com', {
        method: 'POST',
        body: submitData
      });

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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">✈️ Once the Ink is Dry: Pre-Flight Checks!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="trainingPlan"
                      checked={formData.trainingPlanCreated}
                      onChange={(e) => handleInputChange('trainingPlanCreated', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="trainingPlan" className="font-medium">
                      Cook Up a Cracking Training Plan for their specific station!
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rgmWelcome"
                      checked={formData.rgmWelcomeScheduled}
                      onChange={(e) => handleInputChange('rgmWelcomeScheduled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="rgmWelcome" className="font-medium">
                      The RGM or ARGM should be in store to welcome them on their first shift – it's a big deal!
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium">Pair 'Em Up! Assign a friendly Station Buddy:</label>
                    <Input
                      value={formData.stationBuddyAssigned}
                      onChange={(e) => handleInputChange('stationBuddyAssigned', e.target.value)}
                      placeholder="Station Buddy Name"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="feedbackScheduled"
                      checked={formData.feedbackScheduled}
                      onChange={(e) => handleInputChange('feedbackScheduled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="feedbackScheduled" className="font-medium">
                      Let's Talk Chicken! Schedule regular feedback chats and an 'End of Probation' review.
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.preFlightCompletionDate}
                        onChange={(e) => handleInputChange('preFlightCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature of ARGM/RGM:</label>
                      <Input
                        value={formData.preFlightSignature}
                        onChange={(e) => handleInputChange('preFlightSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day Before Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">📞 Day Before</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'welcomeCallConfirmExcitement', label: 'Welcome Call - Confirm Excitement' },
                    { key: 'welcomeCallConfirmShifts', label: 'Welcome Call - Confirm Shifts' },
                    { key: 'welcomeCallExplainFirstDay', label: 'Welcome Call - Explain First Day' },
                    { key: 'informCrew', label: 'Inform Crew' },
                    { key: 'checkUniform', label: 'Check Uniform' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.dayBeforeCompletionDate}
                        onChange={(e) => handleInputChange('dayBeforeCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.dayBeforeSignature}
                        onChange={(e) => handleInputChange('dayBeforeSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* First Shift Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">👋 First Shift</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'managerOnboarding', label: 'Manager Onboarding' },
                    { key: 'warmWelcome', label: 'Warm Welcome' },
                    { key: 'prepareLocker', label: 'Prepare Locker' },
                    { key: 'welcomeTable', label: 'Welcome Table' },
                    { key: 'checkVaultId', label: 'Check Vault ID' },
                    { key: 'checkClockIn', label: 'Check Clock In' },
                    { key: 'kfcWelcomeAgenda', label: 'KFC Welcome Agenda' },
                    { key: 'vaultInductionAgenda', label: 'Vault Induction Agenda' },
                    { key: 'storeTourAgenda', label: 'Store Tour Agenda' },
                    { key: 'hrPoliciesAgenda', label: 'HR Policies Agenda' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.firstShiftCompletionDate}
                        onChange={(e) => handleInputChange('firstShiftCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.firstShiftSignature}
                        onChange={(e) => handleInputChange('firstShiftSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Induction Vault Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">📚 Induction Vault</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'welcomeToKfc', label: 'Welcome to KFC' },
                    { key: 'cultureOverview', label: 'Culture Overview' },
                    { key: 'behindTheBucket', label: 'Behind The Bucket' },
                    { key: 'seriousStuff', label: 'Serious Stuff' },
                    { key: 'answerQuestions', label: 'Answer Questions' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.inductionVaultCompletionDate}
                        onChange={(e) => handleInputChange('inductionVaultCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.inductionVaultSignature}
                        onChange={(e) => handleInputChange('inductionVaultSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Vault Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">🛡️ Compliance Vault</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'fireSafety', label: 'Fire Safety' },
                    { key: 'healthSafety', label: 'Health & Safety' },
                    { key: 'harassmentPolicies', label: 'Harassment Policies' },
                    { key: 'foodSafety', label: 'Food Safety' },
                    { key: 'checkInProcedures', label: 'Check-In Procedures' },
                    { key: 'ensureBreaks', label: 'Ensure Breaks' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.complianceVaultCompletionDate}
                        onChange={(e) => handleInputChange('complianceVaultCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.complianceVaultSignature}
                        onChange={(e) => handleInputChange('complianceVaultSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tour Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">🚶‍♂️ Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'introduceToCrew', label: 'Introduce to Crew' },
                    { key: 'showRestaurant', label: 'Show Restaurant' },
                    { key: 'explainFireSafety', label: 'Explain Fire Safety' },
                    { key: 'showWelfareArea', label: 'Show Welfare Area' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.tourCompletionDate}
                        onChange={(e) => handleInputChange('tourCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.tourSignature}
                        onChange={(e) => handleInputChange('tourSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* HR Policies Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">📜 HR Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'reviewWorkPlanner', label: 'Review Work Planner' },
                    { key: 'checkPreplannedTimeOff', label: 'Check Pre-planned Time Off' },
                    { key: 'explainSicknessPolicy', label: 'Explain Sickness Policy' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.hrPoliciesCompletionDate}
                        onChange={(e) => handleInputChange('hrPoliciesCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.hrPoliciesSignature}
                        onChange={(e) => handleInputChange('hrPoliciesSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day Two Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">📅 Day Two</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'meetBuddy', label: 'Meet Buddy' },
                    { key: 'guidedPractice', label: 'Guided Practice' },
                    { key: 'assessReadiness', label: 'Assess Readiness' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.dayTwoCompletionDate}
                        onChange={(e) => handleInputChange('dayTwoCompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.dayTwoSignature}
                        onChange={(e) => handleInputChange('dayTwoSignature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 4 to 30 Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">🗓️ Day 4 to 30</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'workingUnaided', label: 'Working Unaided' },
                    { key: 'feedbackSessions', label: 'Feedback Sessions' },
                    { key: 'vaultModulesCompleted', label: 'Vault Modules Completed' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formData[key as keyof ComprehensiveFormData] as boolean}
                        onChange={(e) => handleInputChange(key as keyof ComprehensiveFormData, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={key} className="font-medium">{label}</label>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date:</label>
                      <Input
                        type="date"
                        value={formData.day4To30CompletionDate}
                        onChange={(e) => handleInputChange('day4To30CompletionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature:</label>
                      <Input
                        value={formData.day4To30Signature}
                        onChange={(e) => handleInputChange('day4To30Signature', e.target.value)}
                        placeholder="Sign here"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

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
