import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the complete form data to console for inspection
    console.log('📋 FORM SUBMISSION DATA:');
    console.log('=======================');
    console.log('Raw form data:', formData);
    console.log('=======================');
    
    // Also log formatted data for easier reading
    console.log('Formatted submission:');
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== false) {
        console.log(`${key}: ${value}`);
      }
    });
    console.log('=======================');
    
    try {
      const response = await fetch('https://formsubmit.co/jennifer.delahunt@yum.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('📤 SUBMISSION RESPONSE:');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Onboarding form submitted successfully! Check the console for submission data.",
        });
        // Reset form
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

  return (
    <div className="min-h-screen bg-gray-100">
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
          <h2 className="section-title kfc-red">The Day Before the Delicious Debut!</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task4"
                checked={formData.day_before_welcome_call_confirm_excitement}
                onCheckedChange={(checked) => handleInputChange('day_before_welcome_call_confirm_excitement', checked)}
              />
              <label htmlFor="task4" className="text-sm">
                Time for a Welcome Call! Ring up your new Team Member to roll out the red carpet and make sure they're still cluckin' excited!
              </label>
            </div>
            <div className="flex items-start space-x-3 ml-6">
              <Checkbox
                id="task4_2"
                checked={formData.day_before_welcome_call_confirm_shifts}
                onCheckedChange={(checked) => handleInputChange('day_before_welcome_call_confirm_shifts', checked)}
              />
              <label htmlFor="task4_2" className="text-sm text-gray-600">
                Chat about any prior commitments and lock in their shifts for their first week.
              </label>
            </div>
            <div className="flex items-start space-x-3 ml-6">
              <Checkbox
                id="task4_3"
                checked={formData.day_before_welcome_call_explain_first_day}
                onCheckedChange={(checked) => handleInputChange('day_before_welcome_call_explain_first_day', checked)}
              />
              <label htmlFor="task4_3" className="text-sm text-gray-600">
                Give 'em the delicious scoop on their first day and what to expect – no surprises, just good vibes!
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task5"
                checked={formData.day_before_inform_crew}
                onCheckedChange={(checked) => handleInputChange('day_before_inform_crew', checked)}
              />
              <label htmlFor="task5" className="text-sm">
                Spread the Word! Let the whole crew know a new superstar is joining the team!
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task6"
                checked={formData.day_before_check_uniform}
                onCheckedChange={(checked) => handleInputChange('day_before_check_uniform', checked)}
              />
              <label htmlFor="task6" className="text-sm">
                Gear Up! Check that their shiny new uniform has arrived and is ready.
              </label>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
              <div>
                <label htmlFor="completion_date_prior" className="block font-semibold text-gray-700 mb-2">
                  Completion Date:
                </label>
                <Input
                  type="date"
                  id="completion_date_prior"
                  value={formData.day_before_completion_date}
                  onChange={(e) => handleInputChange('day_before_completion_date', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="signature_prior" className="block font-semibold text-gray-700 mb-2">
                  Signature of ARGM/RGM:
                </label>
                <Input
                  type="text"
                  id="signature_prior"
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
          <h2 className="section-title kfc-red">The Big First Shift: Let's Make it Legendary!</h2>
          <div className="mb-4 p-3 bg-yellow-100 rounded-md">
            <p className="font-semibold text-yellow-800">
              <span className="font-bold text-red-600">Heads Up, Colonel!</span> New TMs cannot go behind the Food Counter unless they have their Induction Training completed on Vault! Safety first, flavor always!
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task7"
                checked={formData.first_shift_manager_onboarding}
                onCheckedChange={(checked) => handleInputChange('first_shift_manager_onboarding', checked)}
              />
              <label htmlFor="task7" className="text-sm">
                The RGM or ARGM should be scheduled to personally meet the New TM in store for their first shift and complete Onboarding.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task8"
                checked={formData.first_shift_warm_welcome}
                onCheckedChange={(checked) => handleInputChange('first_shift_warm_welcome', checked)}
              />
              <label htmlFor="task8" className="text-sm">
                Give a warm welcome to the new Team Member to make them feel at home.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task9"
                checked={formData.first_shift_prepare_locker}
                onCheckedChange={(checked) => handleInputChange('first_shift_prepare_locker', checked)}
              />
              <label htmlFor="task9" className="text-sm">
                Prepare their locker and personal space for the first day.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task10"
                checked={formData.first_shift_welcome_table}
                onCheckedChange={(checked) => handleInputChange('first_shift_welcome_table', checked)}
              />
              <label htmlFor="task10" className="text-sm">
                Introduce them at the welcome table to the team.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task11"
                checked={formData.first_shift_check_vault_id}
                onCheckedChange={(checked) => handleInputChange('first_shift_check_vault_id', checked)}
              />
              <label htmlFor="task11" className="text-sm">
                Check their Vault ID and access permissions.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task12"
                checked={formData.first_shift_check_clock_in}
                onCheckedChange={(checked) => handleInputChange('first_shift_check_clock_in', checked)}
              />
              <label htmlFor="task12" className="text-sm">
                Ensure they know how to clock in and out.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task13"
                checked={formData.first_shift_agenda_kfc_welcome}
                onCheckedChange={(checked) => handleInputChange('first_shift_agenda_kfc_welcome', checked)}
              />
              <label htmlFor="task13" className="text-sm">
                Agenda item: KFC Welcome presentation.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task14"
                checked={formData.first_shift_agenda_vault_induction}
                onCheckedChange={(checked) => handleInputChange('first_shift_agenda_vault_induction', checked)}
              />
              <label htmlFor="task14" className="text-sm">
                Agenda item: Vault Induction training.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task15"
                checked={formData.first_shift_agenda_store_tour}
                onCheckedChange={(checked) => handleInputChange('first_shift_agenda_store_tour', checked)}
              />
              <label htmlFor="task15" className="text-sm">
                Agenda item: Store tour.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="task16"
                checked={formData.first_shift_agenda_hr_policies}
                onCheckedChange={(checked) => handleInputChange('first_shift_agenda_hr_policies', checked)}
              />
              <label htmlFor="task16" className="text-sm">
                Agenda item: HR policies overview.
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
                  Signature of ARGM/RGM:
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
          <h2 className="section-title kfc-red">Induction Vault: Welcome to the Coop!</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="induction1"
                checked={formData.induction_vault_welcome_to_kfc}
                onCheckedChange={(checked) => handleInputChange('induction_vault_welcome_to_kfc', checked)}
              />
              <label htmlFor="induction1" className="text-sm">
                Welcome to KFC presentation.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="induction2"
                checked={formData.induction_vault_culture}
                onCheckedChange={(checked) => handleInputChange('induction_vault_culture', checked)}
              />
              <label htmlFor="induction2" className="text-sm">
                Company culture overview.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="induction3"
                checked={formData.induction_vault_behind_the_bucket}
                onCheckedChange={(checked) => handleInputChange('induction_vault_behind_the_bucket', checked)}
              />
              <label htmlFor="induction3" className="text-sm">
                Behind the Bucket insights.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="induction4"
                checked={formData.induction_vault_serious_stuff}
                onCheckedChange={(checked) => handleInputChange('induction_vault_serious_stuff', checked)}
              />
              <label htmlFor="induction4" className="text-sm">
                Serious stuff: policies and procedures.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="induction5"
                checked={formData.induction_vault_answer_questions}
                onCheckedChange={(checked) => handleInputChange('induction_vault_answer_questions', checked)}
              />
              <label htmlFor="induction5" className="text-sm">
                Answer any questions.
              </label>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
              <div>
                <label htmlFor="completion_date_induction" className="block font-semibold text-gray-700 mb-2">
                  Completion Date:
                </label>
                <Input
                  type="date"
                  id="completion_date_induction"
                  value={formData.induction_vault_completion_date}
                  onChange={(e) => handleInputChange('induction_vault_completion_date', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="signature_induction" className="block font-semibold text-gray-700 mb-2">
                  Signature of ARGM/RGM:
                </label>
                <Input
                  type="text"
                  id="signature_induction"
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
          <h2 className="section-title kfc-red">Compliance Vault: Safety and Standards</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="compliance1"
                checked={formData.compliance_vault_fire_safety}
                onCheckedChange={(checked) => handleInputChange('compliance_vault_fire_safety', checked)}
              />
              <label htmlFor="compliance1" className="text-sm">
                Fire safety training.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="compliance2"
                checked={formData.compliance_vault_health_safety}
                onCheckedChange={(checked) => handleInputChange('compliance_vault_health_safety', checked)}
              />
              <label htmlFor="compliance2" className="text-sm">
                Health and safety overview.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="compliance3"
                checked={formData.compliance_vault_harassment}
                onCheckedChange={(checked) => handleInputChange('compliance_vault_harassment', checked)}
              />
              <label htmlFor="compliance3" className="text-sm">
                Harassment policies.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="compliance4"
                checked={formData.compliance_vault_food_safety}
                onCheckedChange={(checked) => handleInputChange('compliance_vault_food_safety', checked)}
              />
              <label htmlFor="compliance4" className="text-sm">
                Food safety training.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="compliance5"
                checked={formData.compliance_vault_check_in}
                onCheckedChange={(checked) => handleInputChange('compliance_vault_check_in', checked)}
              />
              <label htmlFor="compliance5" className="text-sm">
                Check-in procedures.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="compliance6"
                checked={formData.compliance_vault_ensure_break}
                onCheckedChange={(checked) => handleInputChange('compliance_vault_ensure_break', checked)}
              />
              <label htmlFor="compliance6" className="text-sm">
                Ensure breaks are taken.
              </label>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
              <div>
                <label htmlFor="completion_date_compliance" className="block font-semibold text-gray-700 mb-2">
                  Completion Date:
                </label>
                <Input
                  type="date"
                  id="completion_date_compliance"
                  value={formData.compliance_vault_completion_date}
                  onChange={(e) => handleInputChange('compliance_vault_completion_date', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="signature_compliance" className="block font-semibold text-gray-700 mb-2">
                  Signature of ARGM/RGM:
                </label>
                <Input
                  type="text"
                  id="signature_compliance"
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
          <h2 className="section-title kfc-red">Tour: Show Them the Ropes</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="tour1"
                checked={formData.tour_introduce_to_crew}
                onCheckedChange={(checked) => handleInputChange('tour_introduce_to_crew', checked)}
              />
              <label htmlFor="tour1" className="text-sm">
                Introduce to crew members.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="tour2"
                checked={formData.tour_show_restaurant}
                onCheckedChange={(checked) => handleInputChange('tour_show_restaurant', checked)}
              />
              <label htmlFor="tour2" className="text-sm">
                Show around the restaurant.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="tour3"
                checked={formData.tour_explain_fire_safety}
                onCheckedChange={(checked) => handleInputChange('tour_explain_fire_safety', checked)}
              />
              <label htmlFor="tour3" className="text-sm">
                Explain fire safety procedures.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="tour4"
                checked={formData.tour_show_welfare_area}
                onCheckedChange={(checked) => handleInputChange('tour_show_welfare_area', checked)}
              />
              <label htmlFor="tour4" className="text-sm">
                Show welfare areas.
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
                  Signature of ARGM/RGM:
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
          <h2 className="section-title kfc-red">HR: Policies and Planning</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="hr1"
                checked={formData.hr_review_work_planner}
                onCheckedChange={(checked) => handleInputChange('hr_review_work_planner', checked)}
              />
              <label htmlFor="hr1" className="text-sm">
                Review work planner.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="hr2"
                checked={formData.hr_check_preplanned_time_off}
                onCheckedChange={(checked) => handleInputChange('hr_check_preplanned_time_off', checked)}
              />
              <label htmlFor="hr2" className="text-sm">
                Check preplanned time off.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="hr3"
                checked={formData.hr_explain_sickness_policy}
                onCheckedChange={(checked) => handleInputChange('hr_explain_sickness_policy', checked)}
              />
              <label htmlFor="hr3" className="text-sm">
                Explain sickness policy.
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
                  Signature of ARGM/RGM:
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
          <h2 className="section-title kfc-red">Day Two: Buddy and Practice</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="daytwo1"
                checked={formData.day_two_meet_buddy}
                onCheckedChange={(checked) => handleInputChange('day_two_meet_buddy', checked)}
              />
              <label htmlFor="daytwo1" className="text-sm">
                Meet with assigned buddy.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="daytwo2"
                checked={formData.day_two_guided_practice}
                onCheckedChange={(checked) => handleInputChange('day_two_guided_practice', checked)}
              />
              <label htmlFor="daytwo2" className="text-sm">
                Guided practice on tasks.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="daytwo3"
                checked={formData.day_two_assess_readiness}
                onCheckedChange={(checked) => handleInputChange('day_two_assess_readiness', checked)}
              />
              <label htmlFor="daytwo3" className="text-sm">
                Assess readiness for solo work.
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
                  Signature of ARGM/RGM:
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
          <h2 className="section-title kfc-red">Day 4 to 30: Growing Independence</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="day4to30_1"
                checked={formData.day_4_to_30_working_unaided}
                onCheckedChange={(checked) => handleInputChange('day_4_to_30_working_unaided', checked)}
              />
              <label htmlFor="day4to30_1" className="text-sm">
                Working unaided on tasks.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="day4to30_2"
                checked={formData.day_4_to_30_feedback_sessions}
                onCheckedChange={(checked) => handleInputChange('day_4_to_30_feedback_sessions', checked)}
              />
              <label htmlFor="day4to30_2" className="text-sm">
                Regular feedback sessions.
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="day4to30_3"
                checked={formData.day_4_to_30_vault_modules_completed}
                onCheckedChange={(checked) => handleInputChange('day_4_to_30_vault_modules_completed', checked)}
              />
              <label htmlFor="day4to30_3" className="text-sm">
                Vault training modules completed.
              </label>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
              <div>
                <label htmlFor="completion_date_day4to30" className="block font-semibold text-gray-700 mb-2">
                  Completion Date:
                </label>
                <Input
                  type="date"
                  id="completion_date_day4to30"
                  value={formData.day_4_to_30_completion_date}
                  onChange={(e) => handleInputChange('day_4_to_30_completion_date', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="signature_day4to30" className="block font-semibold text-gray-700 mb-2">
                  Signature of ARGM/RGM:
                </label>
                <Input
                  type="text"
                  id="signature_day4to30"
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
          <h2 className="section-title kfc-red">Final Sign Off: The Big Finish!</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="final_sign_off"
                checked={formData.final_sign_off}
                onCheckedChange={(checked) => handleInputChange('final_sign_off', checked)}
              />
              <label htmlFor="final_sign_off" className="text-sm">
                Final sign off by ARGM/RGM.
              </label>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
              <div>
                <label htmlFor="completion_date_final" className="block font-semibold text-gray-700 mb-2">
                  Completion Date:
                </label>
                <Input
                  type="date"
                  id="completion_date_final"
                  value={formData.final_sign_off_completion_date}
                  onChange={(e) => handleInputChange('final_sign_off_completion_date', e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="signature_final" className="block font-semibold text-gray-700 mb-2">
                  Signature of ARGM/RGM:
                </label>
                <Input
                  type="text"
                  id="signature_final"
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
  );
};

export default Index;
