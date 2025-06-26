import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { useSavedForms } from "@/hooks/useSavedForms";
import { Save, Upload, Trash2 } from 'lucide-react';

// Define the form data interface
interface FormData {
  team_member_name: string;
  // Pre-flight checks
  pre_flight_training_plan: boolean;
  pre_flight_assign_buddy: boolean;
  pre_flight_schedule_reviews: boolean;
  pre_flight_completion_date: string;
  pre_flight_signature: string;
  // Day before
  day_before_welcome_call_confirm_excitement: boolean;
  day_before_welcome_call_confirm_shifts: boolean;
  day_before_welcome_call_explain_first_day: boolean;
  day_before_inform_crew: boolean;
  day_before_check_uniform: boolean;
  day_before_completion_date: string;
  day_before_signature: string;
  // First shift
  first_shift_manager_onboarding: boolean;
  first_shift_warm_welcome: boolean;
  first_shift_prepare_locker: boolean;
  first_shift_welcome_table: boolean;
  first_shift_check_vault_id: boolean;
  first_shift_check_clock_in: boolean;
  first_shift_agenda_kfc_welcome: boolean;
  first_shift_agenda_vault_induction: boolean;
  first_shift_agenda_store_tour: boolean;
  first_shift_agenda_hr_policies: boolean;
  first_shift_completion_date: string;
  first_shift_signature: string;
  // Induction vault
  induction_vault_welcome_to_kfc: boolean;
  induction_vault_culture: boolean;
  induction_vault_behind_the_bucket: boolean;
  induction_vault_serious_stuff: boolean;
  induction_vault_answer_questions: boolean;
  induction_vault_completion_date: string;
  induction_vault_signature: string;
  // Compliance vault
  compliance_vault_fire_safety: boolean;
  compliance_vault_health_safety: boolean;
  compliance_vault_harassment: boolean;
  compliance_vault_food_safety: boolean;
  compliance_vault_check_in: boolean;
  compliance_vault_ensure_break: boolean;
  compliance_vault_completion_date: string;
  compliance_vault_signature: string;
  // Tour
  tour_introduce_to_crew: boolean;
  tour_show_restaurant: boolean;
  tour_explain_fire_safety: boolean;
  tour_show_welfare_area: boolean;
  tour_completion_date: string;
  tour_signature: string;
  // HR
  hr_review_work_planner: boolean;
  hr_check_preplanned_time_off: boolean;
  hr_explain_sickness_policy: boolean;
  hr_completion_date: string;
  hr_signature: string;
  // Day two
  day_two_meet_buddy: boolean;
  day_two_guided_practice: boolean;
  day_two_assess_readiness: boolean;
  day_two_completion_date: string;
  day_two_signature: string;
  // Day 4 to 30
  day_4_to_30_working_unaided: boolean;
  day_4_to_30_feedback_sessions: boolean;
  day_4_to_30_vault_modules_completed: boolean;
  day_4_to_30_completion_date: string;
  day_4_to_30_signature: string;
  // Final sign off
  final_sign_off: boolean;
  final_sign_off_completion_date: string;
  final_sign_off_signature: string;
}

const Index = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const {
    savedForms,
    loading: formsLoading,
    saveForm,
    loadForm,
    deleteForm
  } = useSavedForms();

  // Save dialog state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  // formData state with proper typing
  const [formData, setFormData] = useState<FormData>({
    team_member_name: '',
    // Pre-flight checks
    pre_flight_training_plan: false,
    pre_flight_assign_buddy: false,
    pre_flight_schedule_reviews: false,
    pre_flight_completion_date: '',
    pre_flight_signature: '',
    // Day before
    day_before_welcome_call_confirm_excitement: false,
    day_before_welcome_call_confirm_shifts: false,
    day_before_welcome_call_explain_first_day: false,
    day_before_inform_crew: false,
    day_before_check_uniform: false,
    day_before_completion_date: '',
    day_before_signature: '',
    // First shift
    first_shift_manager_onboarding: false,
    first_shift_warm_welcome: false,
    first_shift_prepare_locker: false,
    first_shift_welcome_table: false,
    first_shift_check_vault_id: false,
    first_shift_check_clock_in: false,
    first_shift_agenda_kfc_welcome: false,
    first_shift_agenda_vault_induction: false,
    first_shift_agenda_store_tour: false,
    first_shift_agenda_hr_policies: false,
    first_shift_completion_date: '',
    first_shift_signature: '',
    // Induction vault
    induction_vault_welcome_to_kfc: false,
    induction_vault_culture: false,
    induction_vault_behind_the_bucket: false,
    induction_vault_serious_stuff: false,
    induction_vault_answer_questions: false,
    induction_vault_completion_date: '',
    induction_vault_signature: '',
    // Compliance vault
    compliance_vault_fire_safety: false,
    compliance_vault_health_safety: false,
    compliance_vault_harassment: false,
    compliance_vault_food_safety: false,
    compliance_vault_check_in: false,
    compliance_vault_ensure_break: false,
    compliance_vault_completion_date: '',
    compliance_vault_signature: '',
    // Tour
    tour_introduce_to_crew: false,
    tour_show_restaurant: false,
    tour_explain_fire_safety: false,
    tour_show_welfare_area: false,
    tour_completion_date: '',
    tour_signature: '',
    // HR
    hr_review_work_planner: false,
    hr_check_preplanned_time_off: false,
    hr_explain_sickness_policy: false,
    hr_completion_date: '',
    hr_signature: '',
    // Day two
    day_two_meet_buddy: false,
    day_two_guided_practice: false,
    day_two_assess_readiness: false,
    day_two_completion_date: '',
    day_two_signature: '',
    // Day 4 to 30
    day_4_to_30_working_unaided: false,
    day_4_to_30_feedback_sessions: false,
    day_4_to_30_vault_modules_completed: false,
    day_4_to_30_completion_date: '',
    day_4_to_30_signature: '',
    // Final sign off
    final_sign_off: false,
    final_sign_off_completion_date: '',
    final_sign_off_signature: ''
  });

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatFormForEmail = () => {
    const sections = [
      {
        title: "TEAM MEMBER DETAILS",
        items: [
          { label: "Team Member Name", value: formData.team_member_name }
        ]
      },
      {
        title: "PRE-FLIGHT CHECKS",
        items: [
          { label: "Training Plan Created", value: formData.pre_flight_training_plan ? "✅ Completed" : "❌ Not Done" },
          { label: "Buddy Assigned", value: formData.pre_flight_assign_buddy ? "✅ Completed" : "❌ Not Done" },
          { label: "Reviews Scheduled", value: formData.pre_flight_schedule_reviews ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.pre_flight_completion_date || "Not Set" },
          { label: "Signature", value: formData.pre_flight_signature || "Not Signed" }
        ]
      },
      {
        title: "DAY BEFORE",
        items: [
          { label: "Welcome Call - Confirm Excitement", value: formData.day_before_welcome_call_confirm_excitement ? "✅ Completed" : "❌ Not Done" },
          { label: "Welcome Call - Confirm Shifts", value: formData.day_before_welcome_call_confirm_shifts ? "✅ Completed" : "❌ Not Done" },
          { label: "Welcome Call - Explain First Day", value: formData.day_before_welcome_call_explain_first_day ? "✅ Completed" : "❌ Not Done" },
          { label: "Inform Crew", value: formData.day_before_inform_crew ? "✅ Completed" : "❌ Not Done" },
          { label: "Check Uniform", value: formData.day_before_check_uniform ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.day_before_completion_date || "Not Set" },
          { label: "Signature", value: formData.day_before_signature || "Not Signed" }
        ]
      },
      {
        title: "FIRST SHIFT",
        items: [
          { label: "Manager Onboarding", value: formData.first_shift_manager_onboarding ? "✅ Completed" : "❌ Not Done" },
          { label: "Warm Welcome", value: formData.first_shift_warm_welcome ? "✅ Completed" : "❌ Not Done" },
          { label: "Prepare Locker", value: formData.first_shift_prepare_locker ? "✅ Completed" : "❌ Not Done" },
          { label: "Welcome Table", value: formData.first_shift_welcome_table ? "✅ Completed" : "❌ Not Done" },
          { label: "Check Vault ID", value: formData.first_shift_check_vault_id ? "✅ Completed" : "❌ Not Done" },
          { label: "Check Clock In", value: formData.first_shift_check_clock_in ? "✅ Completed" : "❌ Not Done" },
          { label: "KFC Welcome Agenda", value: formData.first_shift_agenda_kfc_welcome ? "✅ Completed" : "❌ Not Done" },
          { label: "Vault Induction Agenda", value: formData.first_shift_agenda_vault_induction ? "✅ Completed" : "❌ Not Done" },
          { label: "Store Tour Agenda", value: formData.first_shift_agenda_store_tour ? "✅ Completed" : "❌ Not Done" },
          { label: "HR Policies Agenda", value: formData.first_shift_agenda_hr_policies ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.first_shift_completion_date || "Not Set" },
          { label: "Signature", value: formData.first_shift_signature || "Not Signed" }
        ]
      },
      {
        title: "INDUCTION VAULT",
        items: [
          { label: "Welcome to KFC", value: formData.induction_vault_welcome_to_kfc ? "✅ Completed" : "❌ Not Done" },
          { label: "Culture Overview", value: formData.induction_vault_culture ? "✅ Completed" : "❌ Not Done" },
          { label: "Behind the Bucket", value: formData.induction_vault_behind_the_bucket ? "✅ Completed" : "❌ Not Done" },
          { label: "Serious Stuff", value: formData.induction_vault_serious_stuff ? "✅ Completed" : "❌ Not Done" },
          { label: "Answer Questions", value: formData.induction_vault_answer_questions ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.induction_vault_completion_date || "Not Set" },
          { label: "Signature", value: formData.induction_vault_signature || "Not Signed" }
        ]
      },
      {
        title: "COMPLIANCE VAULT",
        items: [
          { label: "Fire Safety", value: formData.compliance_vault_fire_safety ? "✅ Completed" : "❌ Not Done" },
          { label: "Health & Safety", value: formData.compliance_vault_health_safety ? "✅ Completed" : "❌ Not Done" },
          { label: "Harassment Policies", value: formData.compliance_vault_harassment ? "✅ Completed" : "❌ Not Done" },
          { label: "Food Safety", value: formData.compliance_vault_food_safety ? "✅ Completed" : "❌ Not Done" },
          { label: "Check In Procedures", value: formData.compliance_vault_check_in ? "✅ Completed" : "❌ Not Done" },
          { label: "Ensure Breaks", value: formData.compliance_vault_ensure_break ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.compliance_vault_completion_date || "Not Set" },
          { label: "Signature", value: formData.compliance_vault_signature || "Not Signed" }
        ]
      },
      {
        title: "TOUR",
        items: [
          { label: "Introduce to Crew", value: formData.tour_introduce_to_crew ? "✅ Completed" : "❌ Not Done" },
          { label: "Show Restaurant", value: formData.tour_show_restaurant ? "✅ Completed" : "❌ Not Done" },
          { label: "Explain Fire Safety", value: formData.tour_explain_fire_safety ? "✅ Completed" : "❌ Not Done" },
          { label: "Show Welfare Area", value: formData.tour_show_welfare_area ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.tour_completion_date || "Not Set" },
          { label: "Signature", value: formData.tour_signature || "Not Signed" }
        ]
      },
      {
        title: "HR POLICIES",
        items: [
          { label: "Review Work Planner", value: formData.hr_review_work_planner ? "✅ Completed" : "❌ Not Done" },
          { label: "Check Preplanned Time Off", value: formData.hr_check_preplanned_time_off ? "✅ Completed" : "❌ Not Done" },
          { label: "Explain Sickness Policy", value: formData.hr_explain_sickness_policy ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.hr_completion_date || "Not Set" },
          { label: "Signature", value: formData.hr_signature || "Not Signed" }
        ]
      },
      {
        title: "DAY TWO",
        items: [
          { label: "Meet Buddy", value: formData.day_two_meet_buddy ? "✅ Completed" : "❌ Not Done" },
          { label: "Guided Practice", value: formData.day_two_guided_practice ? "✅ Completed" : "❌ Not Done" },
          { label: "Assess Readiness", value: formData.day_two_assess_readiness ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.day_two_completion_date || "Not Set" },
          { label: "Signature", value: formData.day_two_signature || "Not Signed" }
        ]
      },
      {
        title: "DAY 4 TO 30",
        items: [
          { label: "Working Unaided", value: formData.day_4_to_30_working_unaided ? "✅ Completed" : "❌ Not Done" },
          { label: "Feedback Sessions", value: formData.day_4_to_30_feedback_sessions ? "✅ Completed" : "❌ Not Done" },
          { label: "Vault Modules Completed", value: formData.day_4_to_30_vault_modules_completed ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.day_4_to_30_completion_date || "Not Set" },
          { label: "Signature", value: formData.day_4_to_30_signature || "Not Signed" }
        ]
      },
      {
        title: "FINAL SIGN OFF",
        items: [
          { label: "Final Sign Off", value: formData.final_sign_off ? "✅ Completed" : "❌ Not Done" },
          { label: "Completion Date", value: formData.final_sign_off_completion_date || "Not Set" },
          { label: "Signature", value: formData.final_sign_off_signature || "Not Signed" }
        ]
      }
    ];

    let formattedText = `🐔 KFC ONBOARDING FORM SUBMISSION\n`;
    formattedText += `==========================================\n`;
    formattedText += `Submitted on: ${new Date().toLocaleString()}\n`;
    formattedText += `Submitted by: ${user?.email || 'Unknown'}\n\n`;

    sections.forEach(section => {
      formattedText += `📋 ${section.title}\n`;
      formattedText += `${"=".repeat(section.title.length + 4)}\n`;
      section.items.forEach(item => {
        formattedText += `• ${item.label}: ${item.value}\n`;
      });
      formattedText += `\n`;
    });

    formattedText += `\n🎉 Thank you for completing the KFC Onboarding process!\n`;
    formattedText += `It's Finger Lickin' Good! 🍗\n`;

    return formattedText;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedForm = formatFormForEmail();
    
    console.log('📋 COMPLETE FORM SUBMISSION:');
    console.log('==============================');
    console.log(formattedForm);
    console.log('==============================');
    
    try {
      const response = await fetch('https://formsubmit.co/jennifer.delahunt@yum.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `🐔 KFC Onboarding Complete - ${formData.team_member_name || 'New Team Member'}`,
          message: formattedForm,
          _template: 'table'
        })
      });

      console.log('📤 SUBMISSION RESPONSE:');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Complete onboarding form submitted successfully!",
        });
        // Reset form after successful submission
        setFormData({
          team_member_name: '',
          pre_flight_training_plan: false,
          pre_flight_assign_buddy: false,
          pre_flight_schedule_reviews: false,
          pre_flight_completion_date: '',
          pre_flight_signature: '',
          day_before_welcome_call_confirm_excitement: false,
          day_before_welcome_call_confirm_shifts: false,
          day_before_welcome_call_explain_first_day: false,
          day_before_inform_crew: false,
          day_before_check_uniform: false,
          day_before_completion_date: '',
          day_before_signature: '',
          first_shift_manager_onboarding: false,
          first_shift_warm_welcome: false,
          first_shift_prepare_locker: false,
          first_shift_welcome_table: false,
          first_shift_check_vault_id: false,
          first_shift_check_clock_in: false,
          first_shift_agenda_kfc_welcome: false,
          first_shift_agenda_vault_induction: false,
          first_shift_agenda_store_tour: false,
          first_shift_agenda_hr_policies: false,
          first_shift_completion_date: '',
          first_shift_signature: '',
          induction_vault_welcome_to_kfc: false,
          induction_vault_culture: false,
          induction_vault_behind_the_bucket: false,
          induction_vault_serious_stuff: false,
          induction_vault_answer_questions: false,
          induction_vault_completion_date: '',
          induction_vault_signature: '',
          compliance_vault_fire_safety: false,
          compliance_vault_health_safety: false,
          compliance_vault_harassment: false,
          compliance_vault_food_safety: false,
          compliance_vault_check_in: false,
          compliance_vault_ensure_break: false,
          compliance_vault_completion_date: '',
          compliance_vault_signature: '',
          tour_introduce_to_crew: false,
          tour_show_restaurant: false,
          tour_explain_fire_safety: false,
          tour_show_welfare_area: false,
          tour_completion_date: '',
          tour_signature: '',
          hr_review_work_planner: false,
          hr_check_preplanned_time_off: false,
          hr_explain_sickness_policy: false,
          hr_completion_date: '',
          hr_signature: '',
          day_two_meet_buddy: false,
          day_two_guided_practice: false,
          day_two_assess_readiness: false,
          day_two_completion_date: '',
          day_two_signature: '',
          day_4_to_30_working_unaided: false,
          day_4_to_30_feedback_sessions: false,
          day_4_to_30_vault_modules_completed: false,
          day_4_to_30_completion_date: '',
          day_4_to_30_signature: '',
          final_sign_off: false,
          final_sign_off_completion_date: '',
          final_sign_off_signature: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('❌ FORM SUBMISSION ERROR:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
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

    try {
      await saveForm(formName, formData);
      toast({
        title: "Success!",
        description: "Form saved successfully!",
      });
      setSaveDialogOpen(false);
      setFormName('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form",
        variant: "destructive",
      });
    }
  };

  const handleLoadForm = async (formId: string) => {
    try {
      const loadedData = await loadForm(formId);
      // Safely convert the JSON data to FormData with proper type checking
      const convertedData = loadedData as unknown as FormData;
      setFormData(convertedData);
      toast({
        title: "Success!",
        description: "Form loaded successfully!",
      });
      setLoadDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form",
        variant: "destructive",
      });
    }
  };

  const handleDeleteForm = async (formId: string) => {
    try {
      await deleteForm(formId);
      toast({
        title: "Success!",
        description: "Form deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete form",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">KFC Onboarding</h1>
          <p className="text-gray-600 mb-6">Please sign in to access the onboarding form</p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userEmail={user.email || ''} onSignOut={signOut} />
      
      <style>{`
        .kfc-red { color: #FE0000; }
        .kfc-bg-red { background-color: #FE0000; }
        .header-kfc {
          font-weight: 900;
          font-size: 2.5rem;
          text-align: center;
          padding: 20px;
          background-color: #FE0000;
          color: white;
          border-bottom: 5px solid #A00000;
        }
        .kfc-logo-font {
          font-family: 'Impact', Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          font-style: italic;
          font-weight: bold;
          font-size: 3rem;
        }
        .section-card {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-left: 8px solid #FE0000;
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #333;
        }
      `}</style>

      <div className="flex">
        {/* Sidebar for form management */}
        <div className="w-80 bg-white shadow-lg p-6 fixed left-0 top-16 bottom-0 overflow-y-auto">
          <h3 className="font-bold text-lg mb-4 text-red-600">Form Management</h3>
          
          <div className="space-y-4">
            {/* Save Form */}
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Current Form
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Form</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter form name"
                  />
                  <Button onClick={handleSaveForm} className="w-full">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Load Form */}
            <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Load Saved Form
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Load Saved Form</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {formsLoading ? (
                    <div>Loading...</div>
                  ) : savedForms.length === 0 ? (
                    <div className="text-gray-500">No saved forms</div>
                  ) : (
                    savedForms.map((form) => (
                      <div key={form.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <div className="font-medium">{form.form_name}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(form.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleLoadForm(form.id)}
                          >
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteForm(form.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main form content */}
        <div className="flex-1 ml-80">
          <header className="header-kfc rounded-t-lg">
            <div className="kfc-logo-font">KFC</div>
            Team Member: Welcome to the Coop! <br className="md:hidden"/> Your Onboarding Adventure!
          </header>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-4 md:p-8">
            
            <div className="section-card">
              <div className="mb-6">
                <label htmlFor="newTmName" className="block text-lg font-semibold text-gray-700 mb-2">
                  Our Newest Star's Name:
                </label>
                <Input
                  type="text"
                  id="newTmName"
                  value={formData.team_member_name}
                  onChange={(e) => handleInputChange('team_member_name', e.target.value)}
                  className="w-full md:w-1/2"
                  placeholder="Enter Team Member's Name"
                />
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Once the Ink is Dry: Pre-Flight Checks!</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="task1"
                    checked={formData.pre_flight_training_plan}
                    onCheckedChange={(checked) => handleInputChange('pre_flight_training_plan', checked)}
                  />
                  <label htmlFor="task1" className="text-sm">
                    Cook Up a Cracking Training Plan for their specific station! The RGM or ARGM should be in store to welcome them on their first shift – it's a big deal!
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="task2"
                    checked={formData.pre_flight_assign_buddy}
                    onCheckedChange={(checked) => handleInputChange('pre_flight_assign_buddy', checked)}
                  />
                  <label htmlFor="task2" className="text-sm">
                    Pair 'Em Up! Assign a friendly Station Buddy who's mirroring the New TM's shifts.
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="task3"
                    checked={formData.pre_flight_schedule_reviews}
                    onCheckedChange={(checked) => handleInputChange('pre_flight_schedule_reviews', checked)}
                  />
                  <label htmlFor="task3" className="text-sm">
                    Let's Talk Chicken! Schedule regular feedback chats and an 'End of Probation' review.
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_acs" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_acs"
                      value={formData.pre_flight_completion_date}
                      onChange={(e) => handleInputChange('pre_flight_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_acs" className="block font-semibold text-gray-700 mb-2">
                      Signature of ARGM/RGM:
                    </label>
                    <Input
                      type="text"
                      id="signature_acs"
                      value={formData.pre_flight_signature}
                      onChange={(e) => handleInputChange('pre_flight_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Day Before</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_before_1"
                    checked={formData.day_before_welcome_call_confirm_excitement}
                    onCheckedChange={(checked) => handleInputChange('day_before_welcome_call_confirm_excitement', checked)}
                  />
                  <label htmlFor="day_before_1" className="text-sm">
                    Welcome Call - Confirm Excitement
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_before_2"
                    checked={formData.day_before_welcome_call_confirm_shifts}
                    onCheckedChange={(checked) => handleInputChange('day_before_welcome_call_confirm_shifts', checked)}
                  />
                  <label htmlFor="day_before_2" className="text-sm">
                    Welcome Call - Confirm Shifts
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_before_3"
                    checked={formData.day_before_welcome_call_explain_first_day}
                    onCheckedChange={(checked) => handleInputChange('day_before_welcome_call_explain_first_day', checked)}
                  />
                  <label htmlFor="day_before_3" className="text-sm">
                    Welcome Call - Explain First Day
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_before_4"
                    checked={formData.day_before_inform_crew}
                    onCheckedChange={(checked) => handleInputChange('day_before_inform_crew', checked)}
                  />
                  <label htmlFor="day_before_4" className="text-sm">
                    Inform Crew
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_before_5"
                    checked={formData.day_before_check_uniform}
                    onCheckedChange={(checked) => handleInputChange('day_before_check_uniform', checked)}
                  />
                  <label htmlFor="day_before_5" className="text-sm">
                    Check Uniform
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_day_before" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_day_before"
                      value={formData.day_before_completion_date}
                      onChange={(e) => handleInputChange('day_before_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_day_before" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_day_before"
                      value={formData.day_before_signature}
                      onChange={(e) => handleInputChange('day_before_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">First Shift</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_1"
                    checked={formData.first_shift_manager_onboarding}
                    onCheckedChange={(checked) => handleInputChange('first_shift_manager_onboarding', checked)}
                  />
                  <label htmlFor="first_shift_1" className="text-sm">
                    Manager Onboarding
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_2"
                    checked={formData.first_shift_warm_welcome}
                    onCheckedChange={(checked) => handleInputChange('first_shift_warm_welcome', checked)}
                  />
                  <label htmlFor="first_shift_2" className="text-sm">
                    Warm Welcome
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_3"
                    checked={formData.first_shift_prepare_locker}
                    onCheckedChange={(checked) => handleInputChange('first_shift_prepare_locker', checked)}
                  />
                  <label htmlFor="first_shift_3" className="text-sm">
                    Prepare Locker
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_4"
                    checked={formData.first_shift_welcome_table}
                    onCheckedChange={(checked) => handleInputChange('first_shift_welcome_table', checked)}
                  />
                  <label htmlFor="first_shift_4" className="text-sm">
                    Welcome Table
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_5"
                    checked={formData.first_shift_check_vault_id}
                    onCheckedChange={(checked) => handleInputChange('first_shift_check_vault_id', checked)}
                  />
                  <label htmlFor="first_shift_5" className="text-sm">
                    Check Vault ID
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_6"
                    checked={formData.first_shift_check_clock_in}
                    onCheckedChange={(checked) => handleInputChange('first_shift_check_clock_in', checked)}
                  />
                  <label htmlFor="first_shift_6" className="text-sm">
                    Check Clock In
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_7"
                    checked={formData.first_shift_agenda_kfc_welcome}
                    onCheckedChange={(checked) => handleInputChange('first_shift_agenda_kfc_welcome', checked)}
                  />
                  <label htmlFor="first_shift_7" className="text-sm">
                    KFC Welcome Agenda
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_8"
                    checked={formData.first_shift_agenda_vault_induction}
                    onCheckedChange={(checked) => handleInputChange('first_shift_agenda_vault_induction', checked)}
                  />
                  <label htmlFor="first_shift_8" className="text-sm">
                    Vault Induction Agenda
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_9"
                    checked={formData.first_shift_agenda_store_tour}
                    onCheckedChange={(checked) => handleInputChange('first_shift_agenda_store_tour', checked)}
                  />
                  <label htmlFor="first_shift_9" className="text-sm">
                    Store Tour Agenda
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="first_shift_10"
                    checked={formData.first_shift_agenda_hr_policies}
                    onCheckedChange={(checked) => handleInputChange('first_shift_agenda_hr_policies', checked)}
                  />
                  <label htmlFor="first_shift_10" className="text-sm">
                    HR Policies Agenda
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_first_shift" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_first_shift"
                      value={formData.first_shift_completion_date}
                      onChange={(e) => handleInputChange('first_shift_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_first_shift" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_first_shift"
                      value={formData.first_shift_signature}
                      onChange={(e) => handleInputChange('first_shift_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Induction Vault</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="induction_vault_1"
                    checked={formData.induction_vault_welcome_to_kfc}
                    onCheckedChange={(checked) => handleInputChange('induction_vault_welcome_to_kfc', checked)}
                  />
                  <label htmlFor="induction_vault_1" className="text-sm">
                    Welcome to KFC
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="induction_vault_2"
                    checked={formData.induction_vault_culture}
                    onCheckedChange={(checked) => handleInputChange('induction_vault_culture', checked)}
                  />
                  <label htmlFor="induction_vault_2" className="text-sm">
                    Culture Overview
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="induction_vault_3"
                    checked={formData.induction_vault_behind_the_bucket}
                    onCheckedChange={(checked) => handleInputChange('induction_vault_behind_the_bucket', checked)}
                  />
                  <label htmlFor="induction_vault_3" className="text-sm">
                    Behind the Bucket
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="induction_vault_4"
                    checked={formData.induction_vault_serious_stuff}
                    onCheckedChange={(checked) => handleInputChange('induction_vault_serious_stuff', checked)}
                  />
                  <label htmlFor="induction_vault_4" className="text-sm">
                    Serious Stuff
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="induction_vault_5"
                    checked={formData.induction_vault_answer_questions}
                    onCheckedChange={(checked) => handleInputChange('induction_vault_answer_questions', checked)}
                  />
                  <label htmlFor="induction_vault_5" className="text-sm">
                    Answer Questions
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_induction_vault" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_induction_vault"
                      value={formData.induction_vault_completion_date}
                      onChange={(e) => handleInputChange('induction_vault_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_induction_vault" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_induction_vault"
                      value={formData.induction_vault_signature}
                      onChange={(e) => handleInputChange('induction_vault_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Compliance Vault</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance_vault_1"
                    checked={formData.compliance_vault_fire_safety}
                    onCheckedChange={(checked) => handleInputChange('compliance_vault_fire_safety', checked)}
                  />
                  <label htmlFor="compliance_vault_1" className="text-sm">
                    Fire Safety
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance_vault_2"
                    checked={formData.compliance_vault_health_safety}
                    onCheckedChange={(checked) => handleInputChange('compliance_vault_health_safety', checked)}
                  />
                  <label htmlFor="compliance_vault_2" className="text-sm">
                    Health & Safety
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance_vault_3"
                    checked={formData.compliance_vault_harassment}
                    onCheckedChange={(checked) => handleInputChange('compliance_vault_harassment', checked)}
                  />
                  <label htmlFor="compliance_vault_3" className="text-sm">
                    Harassment Policies
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance_vault_4"
                    checked={formData.compliance_vault_food_safety}
                    onCheckedChange={(checked) => handleInputChange('compliance_vault_food_safety', checked)}
                  />
                  <label htmlFor="compliance_vault_4" className="text-sm">
                    Food Safety
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance_vault_5"
                    checked={formData.compliance_vault_check_in}
                    onCheckedChange={(checked) => handleInputChange('compliance_vault_check_in', checked)}
                  />
                  <label htmlFor="compliance_vault_5" className="text-sm">
                    Check In Procedures
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance_vault_6"
                    checked={formData.compliance_vault_ensure_break}
                    onCheckedChange={(checked) => handleInputChange('compliance_vault_ensure_break', checked)}
                  />
                  <label htmlFor="compliance_vault_6" className="text-sm">
                    Ensure Breaks
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_compliance_vault" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_compliance_vault"
                      value={formData.compliance_vault_completion_date}
                      onChange={(e) => handleInputChange('compliance_vault_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_compliance_vault" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_compliance_vault"
                      value={formData.compliance_vault_signature}
                      onChange={(e) => handleInputChange('compliance_vault_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Tour</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="tour_1"
                    checked={formData.tour_introduce_to_crew}
                    onCheckedChange={(checked) => handleInputChange('tour_introduce_to_crew', checked)}
                  />
                  <label htmlFor="tour_1" className="text-sm">
                    Introduce to Crew
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="tour_2"
                    checked={formData.tour_show_restaurant}
                    onCheckedChange={(checked) => handleInputChange('tour_show_restaurant', checked)}
                  />
                  <label htmlFor="tour_2" className="text-sm">
                    Show Restaurant
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="tour_3"
                    checked={formData.tour_explain_fire_safety}
                    onCheckedChange={(checked) => handleInputChange('tour_explain_fire_safety', checked)}
                  />
                  <label htmlFor="tour_3" className="text-sm">
                    Explain Fire Safety
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="tour_4"
                    checked={formData.tour_show_welfare_area}
                    onCheckedChange={(checked) => handleInputChange('tour_show_welfare_area', checked)}
                  />
                  <label htmlFor="tour_4" className="text-sm">
                    Show Welfare Area
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_tour" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_tour"
                      value={formData.tour_completion_date}
                      onChange={(e) => handleInputChange('tour_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_tour" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_tour"
                      value={formData.tour_signature}
                      onChange={(e) => handleInputChange('tour_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">HR Policies</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="hr_1"
                    checked={formData.hr_review_work_planner}
                    onCheckedChange={(checked) => handleInputChange('hr_review_work_planner', checked)}
                  />
                  <label htmlFor="hr_1" className="text-sm">
                    Review Work Planner
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="hr_2"
                    checked={formData.hr_check_preplanned_time_off}
                    onCheckedChange={(checked) => handleInputChange('hr_check_preplanned_time_off', checked)}
                  />
                  <label htmlFor="hr_2" className="text-sm">
                    Check Preplanned Time Off
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="hr_3"
                    checked={formData.hr_explain_sickness_policy}
                    onCheckedChange={(checked) => handleInputChange('hr_explain_sickness_policy', checked)}
                  />
                  <label htmlFor="hr_3" className="text-sm">
                    Explain Sickness Policy
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_hr" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_hr"
                      value={formData.hr_completion_date}
                      onChange={(e) => handleInputChange('hr_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_hr" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_hr"
                      value={formData.hr_signature}
                      onChange={(e) => handleInputChange('hr_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Day Two</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_two_1"
                    checked={formData.day_two_meet_buddy}
                    onCheckedChange={(checked) => handleInputChange('day_two_meet_buddy', checked)}
                  />
                  <label htmlFor="day_two_1" className="text-sm">
                    Meet Buddy
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_two_2"
                    checked={formData.day_two_guided_practice}
                    onCheckedChange={(checked) => handleInputChange('day_two_guided_practice', checked)}
                  />
                  <label htmlFor="day_two_2" className="text-sm">
                    Guided Practice
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_two_3"
                    checked={formData.day_two_assess_readiness}
                    onCheckedChange={(checked) => handleInputChange('day_two_assess_readiness', checked)}
                  />
                  <label htmlFor="day_two_3" className="text-sm">
                    Assess Readiness
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_day_two" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_day_two"
                      value={formData.day_two_completion_date}
                      onChange={(e) => handleInputChange('day_two_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_day_two" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_day_two"
                      value={formData.day_two_signature}
                      onChange={(e) => handleInputChange('day_two_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Day 4 to 30</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_4_to_30_1"
                    checked={formData.day_4_to_30_working_unaided}
                    onCheckedChange={(checked) => handleInputChange('day_4_to_30_working_unaided', checked)}
                  />
                  <label htmlFor="day_4_to_30_1" className="text-sm">
                    Working Unaided
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_4_to_30_2"
                    checked={formData.day_4_to_30_feedback_sessions}
                    onCheckedChange={(checked) => handleInputChange('day_4_to_30_feedback_sessions', checked)}
                  />
                  <label htmlFor="day_4_to_30_2" className="text-sm">
                    Feedback Sessions
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="day_4_to_30_3"
                    checked={formData.day_4_to_30_vault_modules_completed}
                    onCheckedChange={(checked) => handleInputChange('day_4_to_30_vault_modules_completed', checked)}
                  />
                  <label htmlFor="day_4_to_30_3" className="text-sm">
                    Vault Modules Completed
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_day_4_to_30" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_day_4_to_30"
                      value={formData.day_4_to_30_completion_date}
                      onChange={(e) => handleInputChange('day_4_to_30_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_day_4_to_30" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_day_4_to_30"
                      value={formData.day_4_to_30_signature}
                      onChange={(e) => handleInputChange('day_4_to_30_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title kfc-red">Final Sign Off</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="final_sign_off_1"
                    checked={formData.final_sign_off}
                    onCheckedChange={(checked) => handleInputChange('final_sign_off', checked)}
                  />
                  <label htmlFor="final_sign_off_1" className="text-sm">
                    Final Sign Off
                  </label>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  <div>
                    <label htmlFor="completion_date_final_sign_off" className="block font-semibold text-gray-700 mb-2">
                      Completion Date:
                    </label>
                    <Input
                      type="date"
                      id="completion_date_final_sign_off"
                      value={formData.final_sign_off_completion_date}
                      onChange={(e) => handleInputChange('final_sign_off_completion_date', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature_final_sign_off" className="block font-semibold text-gray-700 mb-2">
                      Signature:
                    </label>
                    <Input
                      type="text"
                      id="signature_final_sign_off"
                      value={formData.final_sign_off_signature}
                      onChange={(e) => handleInputChange('final_sign_off_signature', e.target.value)}
                      className="max-w-xs"
                      placeholder="Sign here"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                type="submit" 
                className="w-full md:w-1/2 kfc-bg-red hover:bg-red-700 text-white font-bold text-lg py-6 px-6"
              >
                Complete Onboarding & Submit
              </Button>
            </div>
          </form>

          <footer className="text-center p-5 mt-8 text-lg font-bold text-red-600 border-t-2 border-red-600">
            It's Finger Lickin' Good Onboarding!
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
