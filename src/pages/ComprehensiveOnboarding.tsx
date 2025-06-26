import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSavedForms } from '@/hooks/useSavedForms';
import SaveFormDialog from '@/components/SaveFormDialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComprehensiveFormData {
  teamMemberName: string;
  preFlightChecks: {
    trainingPlan: boolean;
    assignBuddy: boolean;
    scheduleReviews: boolean;
    completionDate: string;
    signature: string;
  };
  dayBefore: {
    welcomeCallConfirmExcitement: boolean;
    welcomeCallConfirmShifts: boolean;
    welcomeCallExplainFirstDay: boolean;
    informCrew: boolean;
    checkUniform: boolean;
    completionDate: string;
    signature: string;
  };
  firstShift: {
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
    completionDate: string;
    signature: string;
  };
  inductionVault: {
    welcomeToKfc: boolean;
    cultureOverview: boolean;
    behindTheBucket: boolean;
    seriousStuff: boolean;
    answerQuestions: boolean;
    completionDate: string;
    signature: string;
  };
  complianceVault: {
    fireSafety: boolean;
    healthSafety: boolean;
    harassmentPolicies: boolean;
    foodSafety: boolean;
    checkInProcedures: boolean;
    ensureBreaks: boolean;
    completionDate: string;
    signature: string;
  };
  tour: {
    introduceToCrew: boolean;
    showRestaurant: boolean;
    explainFireSafety: boolean;
    showWelfareArea: boolean;
    completionDate: string;
    signature: string;
  };
  hrPolicies: {
    reviewWorkPlanner: boolean;
    checkPreplannedTimeOff: boolean;
    explainSicknessPolicy: boolean;
    completionDate: string;
    signature: string;
  };
  dayTwo: {
    meetBuddy: boolean;
    guidedPractice: boolean;
    assessReadiness: boolean;
    completionDate: string;
    signature: string;
  };
  day4To30: {
    workingUnaided: boolean;
    feedbackSessions: boolean;
    vaultModulesCompleted: boolean;
    completionDate: string;
    signature: string;
  };
  finalSignOff: {
    finalSignOff: boolean;
    completionDate: string;
    signature: string;
  };
}

const ComprehensiveOnboarding = () => {
  const { user } = useAuth();
  const { saveForm } = useSavedForms();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ComprehensiveFormData>({
    teamMemberName: '',
    preFlightChecks: {
      trainingPlan: false,
      assignBuddy: false,
      scheduleReviews: false,
      completionDate: '',
      signature: ''
    },
    dayBefore: {
      welcomeCallConfirmExcitement: false,
      welcomeCallConfirmShifts: false,
      welcomeCallExplainFirstDay: false,
      informCrew: false,
      checkUniform: false,
      completionDate: '',
      signature: ''
    },
    firstShift: {
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
      completionDate: '',
      signature: ''
    },
    inductionVault: {
      welcomeToKfc: false,
      cultureOverview: false,
      behindTheBucket: false,
      seriousStuff: false,
      answerQuestions: false,
      completionDate: '',
      signature: ''
    },
    complianceVault: {
      fireSafety: false,
      healthSafety: false,
      harassmentPolicies: false,
      foodSafety: false,
      checkInProcedures: false,
      ensureBreaks: false,
      completionDate: '',
      signature: ''
    },
    tour: {
      introduceToCrew: false,
      showRestaurant: false,
      explainFireSafety: false,
      showWelfareArea: false,
      completionDate: '',
      signature: ''
    },
    hrPolicies: {
      reviewWorkPlanner: false,
      checkPreplannedTimeOff: false,
      explainSicknessPolicy: false,
      completionDate: '',
      signature: ''
    },
    dayTwo: {
      meetBuddy: false,
      guidedPractice: false,
      assessReadiness: false,
      completionDate: '',
      signature: ''
    },
    day4To30: {
      workingUnaided: false,
      feedbackSessions: false,
      vaultModulesCompleted: false,
      completionDate: '',
      signature: ''
    },
    finalSignOff: {
      finalSignOff: false,
      completionDate: '',
      signature: ''
    }
  });

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');

  const handleCheckboxChange = (section: keyof ComprehensiveFormData, field: string, value: boolean) => {
    if (section === 'teamMemberName') return;
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof Omit<ComprehensiveFormData, 'teamMemberName'>],
        [field]: value
      }
    }));
  };

  const handleInputChange = (section: keyof ComprehensiveFormData, field: string, value: string) => {
    if (section === 'teamMemberName') {
      setFormData(prev => ({ ...prev, teamMemberName: value }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof Omit<ComprehensiveFormData, 'teamMemberName'>],
        [field]: value
      }
    }));
  };

  const handleSaveForm = async () => {
    if (formName.trim()) {
      await saveForm(formName, formData);
      setSaveDialogOpen(false);
      setFormName('');
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Success!",
      description: "Onboarding form submitted successfully!",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Please sign in to access the comprehensive onboarding checklist.</p>
            <Link to="/auth">
              <Button className="mt-4">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="bg-red-600 text-white py-6 px-4 text-center border-b-4 border-red-800">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-white hover:text-gray-200 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Main Form
          </Link>
          <div className="text-4xl font-black italic mb-2">KFC</div>
          <div className="text-xl font-bold">Team Member: Welcome to the Coop! Your Onboarding Adventure!</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Team Member Name */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardContent className="p-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Our Newest Star's Name:
            </label>
            <Input
              value={formData.teamMemberName}
              onChange={(e) => handleInputChange('teamMemberName', '', e.target.value)}
              placeholder="Enter Team Member's Name"
              className="w-full md:w-1/2"
            />
          </CardContent>
        </Card>

        {/* Pre-Flight Checks */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Once the Ink is Dry: Pre-Flight Checks!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.preFlightChecks.trainingPlan}
                onChange={(e) => handleCheckboxChange('preFlightChecks', 'trainingPlan', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Cook Up a Cracking Training Plan for their specific station! The RGM or ARGM should be in store to welcome them on their first shift – it's a big deal!</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.preFlightChecks.assignBuddy}
                onChange={(e) => handleCheckboxChange('preFlightChecks', 'assignBuddy', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Pair 'Em Up! Assign a friendly Station Buddy who's mirroring the New TM's shifts.</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.preFlightChecks.scheduleReviews}
                onChange={(e) => handleCheckboxChange('preFlightChecks', 'scheduleReviews', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Let's Talk Chicken! Schedule regular feedback chats and an 'End of Probation' review.</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.preFlightChecks.completionDate}
                  onChange={(e) => handleInputChange('preFlightChecks', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature of ARGM/RGM:</label>
                <Input
                  value={formData.preFlightChecks.signature}
                  onChange={(e) => handleInputChange('preFlightChecks', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day Before */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">The Day Before the Delicious Debut!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayBefore.welcomeCallConfirmExcitement}
                onChange={(e) => handleCheckboxChange('dayBefore', 'welcomeCallConfirmExcitement', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Welcome Call - Confirm Excitement</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayBefore.welcomeCallConfirmShifts}
                onChange={(e) => handleCheckboxChange('dayBefore', 'welcomeCallConfirmShifts', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Welcome Call - Confirm Shifts</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayBefore.welcomeCallExplainFirstDay}
                onChange={(e) => handleCheckboxChange('dayBefore', 'welcomeCallExplainFirstDay', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Welcome Call - Explain First Day</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayBefore.informCrew}
                onChange={(e) => handleCheckboxChange('dayBefore', 'informCrew', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Inform Crew</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayBefore.checkUniform}
                onChange={(e) => handleCheckboxChange('dayBefore', 'checkUniform', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Check Uniform</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.dayBefore.completionDate}
                  onChange={(e) => handleInputChange('dayBefore', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.dayBefore.signature}
                  onChange={(e) => handleInputChange('dayBefore', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* First Shift */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">The Big First Shift: Let's Make it Legendary!</CardTitle>
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
              <div key={key} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.firstShift[key as keyof typeof formData.firstShift] as boolean}
                  onChange={(e) => handleCheckboxChange('firstShift', key, e.target.checked)}
                  className="mt-1 w-5 h-5 accent-red-600"
                />
                <label className="text-sm">{label}</label>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.firstShift.completionDate}
                  onChange={(e) => handleInputChange('firstShift', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.firstShift.signature}
                  onChange={(e) => handleInputChange('firstShift', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Induction Vault */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Induction Vault</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.inductionVault.welcomeToKfc}
                onChange={(e) => handleCheckboxChange('inductionVault', 'welcomeToKfc', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Welcome to KFC</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.inductionVault.cultureOverview}
                onChange={(e) => handleCheckboxChange('inductionVault', 'cultureOverview', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Culture Overview</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.inductionVault.behindTheBucket}
                onChange={(e) => handleCheckboxChange('inductionVault', 'behindTheBucket', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Behind the Bucket</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.inductionVault.seriousStuff}
                onChange={(e) => handleCheckboxChange('inductionVault', 'seriousStuff', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Serious Stuff</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.inductionVault.answerQuestions}
                onChange={(e) => handleCheckboxChange('inductionVault', 'answerQuestions', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Answer Questions</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.inductionVault.completionDate}
                  onChange={(e) => handleInputChange('inductionVault', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.inductionVault.signature}
                  onChange={(e) => handleInputChange('inductionVault', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Vault */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Compliance Vault</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.complianceVault.fireSafety}
                onChange={(e) => handleCheckboxChange('complianceVault', 'fireSafety', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Fire Safety</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.complianceVault.healthSafety}
                onChange={(e) => handleCheckboxChange('complianceVault', 'healthSafety', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Health & Safety</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.complianceVault.harassmentPolicies}
                onChange={(e) => handleCheckboxChange('complianceVault', 'harassmentPolicies', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Harassment Policies</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.complianceVault.foodSafety}
                onChange={(e) => handleCheckboxChange('complianceVault', 'foodSafety', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Food Safety</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.complianceVault.checkInProcedures}
                onChange={(e) => handleCheckboxChange('complianceVault', 'checkInProcedures', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Check In Procedures</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.complianceVault.ensureBreaks}
                onChange={(e) => handleCheckboxChange('complianceVault', 'ensureBreaks', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Ensure Breaks</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.complianceVault.completionDate}
                  onChange={(e) => handleInputChange('complianceVault', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.complianceVault.signature}
                  onChange={(e) => handleInputChange('complianceVault', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tour */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Tour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.tour.introduceToCrew}
                onChange={(e) => handleCheckboxChange('tour', 'introduceToCrew', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Introduce to Crew</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.tour.showRestaurant}
                onChange={(e) => handleCheckboxChange('tour', 'showRestaurant', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Show Restaurant</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.tour.explainFireSafety}
                onChange={(e) => handleCheckboxChange('tour', 'explainFireSafety', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Explain Fire Safety</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.tour.showWelfareArea}
                onChange={(e) => handleCheckboxChange('tour', 'showWelfareArea', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Show Welfare Area</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.tour.completionDate}
                  onChange={(e) => handleInputChange('tour', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.tour.signature}
                  onChange={(e) => handleInputChange('tour', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HR Policies */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">HR Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.hrPolicies.reviewWorkPlanner}
                onChange={(e) => handleCheckboxChange('hrPolicies', 'reviewWorkPlanner', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Review Work Planner</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.hrPolicies.checkPreplannedTimeOff}
                onChange={(e) => handleCheckboxChange('hrPolicies', 'checkPreplannedTimeOff', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Check Preplanned Time Off</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.hrPolicies.explainSicknessPolicy}
                onChange={(e) => handleCheckboxChange('hrPolicies', 'explainSicknessPolicy', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Explain Sickness Policy</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.hrPolicies.completionDate}
                  onChange={(e) => handleInputChange('hrPolicies', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.hrPolicies.signature}
                  onChange={(e) => handleInputChange('hrPolicies', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day Two */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Day Two</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayTwo.meetBuddy}
                onChange={(e) => handleCheckboxChange('dayTwo', 'meetBuddy', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Meet Buddy</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayTwo.guidedPractice}
                onChange={(e) => handleCheckboxChange('dayTwo', 'guidedPractice', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Guided Practice</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.dayTwo.assessReadiness}
                onChange={(e) => handleCheckboxChange('dayTwo', 'assessReadiness', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Assess Readiness</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.dayTwo.completionDate}
                  onChange={(e) => handleInputChange('dayTwo', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.dayTwo.signature}
                  onChange={(e) => handleInputChange('dayTwo', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day 4 to 30 */}
        <Card className="mb-6 border-l-8 border-red-600">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Day 4 to 30</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.day4To30.workingUnaided}
                onChange={(e) => handleCheckboxChange('day4To30', 'workingUnaided', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Working Unaided</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.day4To30.feedbackSessions}
                onChange={(e) => handleCheckboxChange('day4To30', 'feedbackSessions', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Feedback Sessions</label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.day4To30.vaultModulesCompleted}
                onChange={(e) => handleCheckboxChange('day4To30', 'vaultModulesCompleted', e.target.checked)}
                className="mt-1 w-5 h-5 accent-red-600"
              />
              <label className="text-sm">Vault Modules Completed</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.day4To30.completionDate}
                  onChange={(e) => handleInputChange('day4To30', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.day4To30.signature}
                  onChange={(e) => handleInputChange('day4To30', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Sign Off */}
        <Card className="mb-6 border-l-8 border-green-600">
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Final Sign Off</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.finalSignOff.finalSignOff}
                onChange={(e) => handleCheckboxChange('finalSignOff', 'finalSignOff', e.target.checked)}
                className="mt-1 w-5 h-5 accent-green-600"
              />
              <label className="text-sm">Final Sign Off</label>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date:</label>
                <Input
                  type="date"
                  value={formData.finalSignOff.completionDate}
                  onChange={(e) => handleInputChange('finalSignOff', 'completionDate', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                <Input
                  value={formData.finalSignOff.signature}
                  onChange={(e) => handleInputChange('finalSignOff', 'signature', e.target.value)}
                  placeholder="Sign here"
                  className="max-w-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <SaveFormDialog
            open={saveDialogOpen}
            onOpenChange={setSaveDialogOpen}
            formName={formName}
            onFormNameChange={setFormName}
            onSave={handleSaveForm}
          />
          
          <Button 
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-3 px-6"
          >
            Complete Onboarding & Submit
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 mt-8 text-lg font-bold text-red-600 border-t-2 border-red-600">
        It's Finger Lickin' Good Onboarding!
      </footer>
    </div>
  );
};

export default ComprehensiveOnboarding;
