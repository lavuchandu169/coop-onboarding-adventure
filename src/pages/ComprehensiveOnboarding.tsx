
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComprehensiveOnboarding = () => {
  const { user, signOut } = useAuth();
  const [formData, setFormData] = useState({
    team_member_name: '',
    // Pre-flight checks
    pre_flight_training_plan: false,
    pre_flight_assign_buddy: false,
    pre_flight_schedule_reviews: false,
    pre_flight_completion_date: '',
    pre_flight_signature: '',
    // Day before
    day_before_welcome_call_main: false,
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
    first_shift_explain_agenda_main: false,
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
    final_sign_off_signature: '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F7F7' }}>
      <Header userEmail={user.email || ''} onSignOut={signOut} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Simple Form
            </Button>
          </Link>
        </div>

        {/* KFC Header */}
        <div className="text-center mb-8 p-6 rounded-t-lg" style={{ backgroundColor: '#FE0000', color: 'white', borderBottom: '5px solid #A00000' }}>
          <div className="text-4xl font-black italic mb-2" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>KFC</div>
          <div className="text-lg font-bold">
            Team Member: Welcome to the Coop! <br className="sm:hidden" />
            Your Onboarding Adventure!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Member Name */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardContent className="p-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Our Newest Star's Name:
              </label>
              <Input
                value={formData.team_member_name}
                onChange={(e) => handleInputChange('team_member_name', e.target.value)}
                placeholder="Enter Team Member's Name"
                className="w-full md:w-1/2"
              />
            </CardContent>
          </Card>

          {/* Pre-Flight Checks */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                Once the Ink is Dry: Pre-Flight Checks!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.pre_flight_training_plan}
                    onChange={(e) => handleInputChange('pre_flight_training_plan', e.target.checked)}
                  />
                  <span>Cook Up a Cracking Training Plan for their specific station! The RGM or ARGM should be in store to welcome them on their first shift – it's a big deal!</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.pre_flight_assign_buddy}
                    onChange={(e) => handleInputChange('pre_flight_assign_buddy', e.target.checked)}
                  />
                  <span>Pair 'Em Up! Assign a friendly Station Buddy who's mirroring the New TM's shifts.</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.pre_flight_schedule_reviews}
                    onChange={(e) => handleInputChange('pre_flight_schedule_reviews', e.target.checked)}
                  />
                  <span>Let's Talk Chicken! Schedule regular feedback chats and an 'End of Probation' review.</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.pre_flight_completion_date}
                        onChange={(e) => handleInputChange('pre_flight_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.pre_flight_signature}
                        onChange={(e) => handleInputChange('pre_flight_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Before Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                The Day Before the Delicious Debut!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_before_welcome_call_main}
                    onChange={(e) => handleInputChange('day_before_welcome_call_main', e.target.checked)}
                  />
                  <span>Time for a Welcome Call! Ring up your new Team Member to:</span>
                </label>
                
                <div className="ml-8 space-y-3">
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.day_before_welcome_call_confirm_excitement}
                      onChange={(e) => handleInputChange('day_before_welcome_call_confirm_excitement', e.target.checked)}
                    />
                    <span>Roll out the red carpet (KFC style!) and make sure they're still cluckin' excited for the role!</span>
                  </label>
                  
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.day_before_welcome_call_confirm_shifts}
                      onChange={(e) => handleInputChange('day_before_welcome_call_confirm_shifts', e.target.checked)}
                    />
                    <span>Chat about any prior commitments and lock in their shifts for their first week.</span>
                  </label>
                  
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.day_before_welcome_call_explain_first_day}
                      onChange={(e) => handleInputChange('day_before_welcome_call_explain_first_day', e.target.checked)}
                    />
                    <span>Give 'em the delicious scoop on their first day and what to expect – no surprises, just good vibes!</span>
                  </label>
                </div>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_before_inform_crew}
                    onChange={(e) => handleInputChange('day_before_inform_crew', e.target.checked)}
                  />
                  <span>Spread the Word! Let the whole crew know a new superstar is joining the team!</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_before_check_uniform}
                    onChange={(e) => handleInputChange('day_before_check_uniform', e.target.checked)}
                  />
                  <span>Gear Up! Check that their shiny new uniform has arrived and is ready.</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.day_before_completion_date}
                        onChange={(e) => handleInputChange('day_before_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.day_before_signature}
                        onChange={(e) => handleInputChange('day_before_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* First Shift Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                The Big First Shift: Let's Make it Legendary!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="mb-4 font-semibold text-yellow-600 bg-yellow-100 p-3 rounded-md">
                <span className="font-bold" style={{ color: '#FE0000' }}>Heads Up, Colonel!</span> New TMs cannot go behind the Food Counter unless they have their Induction Training completed on Vault! Safety first, flavor always!
              </div>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_manager_onboarding}
                    onChange={(e) => handleInputChange('first_shift_manager_onboarding', e.target.checked)}
                  />
                  <span>The RGM or ARGM should be scheduled to personally meet the New TM in store for their first shift and complete Onboarding.</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_warm_welcome}
                    onChange={(e) => handleInputChange('first_shift_warm_welcome', e.target.checked)}
                  />
                  <span>Make sure everyone knows the New TM is starting today and their name – let's give 'em a warm KFC welcome!</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_prepare_locker}
                    onChange={(e) => handleInputChange('first_shift_prepare_locker', e.target.checked)}
                  />
                  <span>Prepare a clean locker just for them.</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_welcome_table}
                    onChange={(e) => handleInputChange('first_shift_welcome_table', e.target.checked)}
                  />
                  <span>Set Up a VIP Welcome! A welcome table with their uniform (including name badge) in a welcome bucket. (If the uniform doesn't fit, they should inform you ASAP to order a different size).</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_check_vault_id}
                    onChange={(e) => handleInputChange('first_shift_check_vault_id', e.target.checked)}
                  />
                  <span>Ensure the New TM has received their Vault ID and it's working like a charm.</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_check_clock_in}
                    onChange={(e) => handleInputChange('first_shift_check_clock_in', e.target.checked)}
                  />
                  <span>Confirm the New TM can clock in properly – no hitches!</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.first_shift_explain_agenda_main}
                    onChange={(e) => handleInputChange('first_shift_explain_agenda_main', e.target.checked)}
                  />
                  <span>Explain the exciting agenda for the day:</span>
                </label>

                <div className="ml-8 space-y-3">
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.first_shift_agenda_kfc_welcome}
                      onChange={(e) => handleInputChange('first_shift_agenda_kfc_welcome', e.target.checked)}
                    />
                    <span>A Big KFC Welcome!</span>
                  </label>
                  
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.first_shift_agenda_vault_induction}
                      onChange={(e) => handleInputChange('first_shift_agenda_vault_induction', e.target.checked)}
                    />
                    <span>Vault Induction Training – The Essentials!</span>
                  </label>
                  
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.first_shift_agenda_store_tour}
                      onChange={(e) => handleInputChange('first_shift_agenda_store_tour', e.target.checked)}
                    />
                    <span>Store Tour with a Meet & Greet of the awesome team!</span>
                  </label>

                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 flex-shrink-0" 
                      style={{ accentColor: '#FE0000' }}
                      checked={formData.first_shift_agenda_hr_policies}
                      onChange={(e) => handleInputChange('first_shift_agenda_hr_policies', e.target.checked)}
                    />
                    <span>Workplanner and HR policies – The Know-How!</span>
                  </label>
                </div>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.first_shift_completion_date}
                        onChange={(e) => handleInputChange('first_shift_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.first_shift_signature}
                        onChange={(e) => handleInputChange('first_shift_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Induction Vault Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                Level Up with Induction 2.0 on Vault!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.induction_vault_welcome_to_kfc}
                    onChange={(e) => handleInputChange('induction_vault_welcome_to_kfc', e.target.checked)}
                  />
                  <span>Welcome to KFC</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.induction_vault_culture}
                    onChange={(e) => handleInputChange('induction_vault_culture', e.target.checked)}
                  />
                  <span>Our Amazing Culture</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.induction_vault_behind_the_bucket}
                    onChange={(e) => handleInputChange('induction_vault_behind_the_bucket', e.target.checked)}
                  />
                  <span>Behind the Bucket - The Inside Scoop!</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.induction_vault_serious_stuff}
                    onChange={(e) => handleInputChange('induction_vault_serious_stuff', e.target.checked)}
                  />
                  <span>The Serious Stuff (But Still Fun!)</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.induction_vault_answer_questions}
                    onChange={(e) => handleInputChange('induction_vault_answer_questions', e.target.checked)}
                  />
                  <span>Keep an eye on the New TM and be ready to answer any questions – we're all in this together!</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.induction_vault_completion_date}
                        onChange={(e) => handleInputChange('induction_vault_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.induction_vault_signature}
                        onChange={(e) => handleInputChange('induction_vault_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Vault Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                Stay Sharp: Compliance Training on Vault!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.compliance_vault_fire_safety}
                    onChange={(e) => handleInputChange('compliance_vault_fire_safety', e.target.checked)}
                  />
                  <span>Fire Safety and Security for TMs</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.compliance_vault_health_safety}
                    onChange={(e) => handleInputChange('compliance_vault_health_safety', e.target.checked)}
                  />
                  <span>Health and Safety</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.compliance_vault_harassment}
                    onChange={(e) => handleInputChange('compliance_vault_harassment', e.target.checked)}
                  />
                  <span>Harassment</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.compliance_vault_food_safety}
                    onChange={(e) => handleInputChange('compliance_vault_food_safety', e.target.checked)}
                  />
                  <span>Food Safety for TMs</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.compliance_vault_check_in}
                    onChange={(e) => handleInputChange('compliance_vault_check_in', e.target.checked)}
                  />
                  <span>Check in with the New TM – any questions on this important stuff?</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.compliance_vault_ensure_break}
                    onChange={(e) => handleInputChange('compliance_vault_ensure_break', e.target.checked)}
                  />
                  <span>Make sure the TM takes their well-deserved break!</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.compliance_vault_completion_date}
                        onChange={(e) => handleInputChange('compliance_vault_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.compliance_vault_signature}
                        onChange={(e) => handleInputChange('compliance_vault_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Tour Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                The Grand Tour & Crew Huddle!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.tour_introduce_to_crew}
                    onChange={(e) => handleInputChange('tour_introduce_to_crew', e.target.checked)}
                  />
                  <span>Introduce the New TM to all the friendly faces on shift that day.</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.tour_show_restaurant}
                    onChange={(e) => handleInputChange('tour_show_restaurant', e.target.checked)}
                  />
                  <span>Show the New TM every nook and cranny of the restaurant.</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.tour_explain_fire_safety}
                    onChange={(e) => handleInputChange('tour_explain_fire_safety', e.target.checked)}
                  />
                  <span>Explain Fire Safety like a pro and point out all fire exits – safety is key!</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.tour_show_welfare_area}
                    onChange={(e) => handleInputChange('tour_show_welfare_area', e.target.checked)}
                  />
                  <span>Show the New TM the welfare area and highlight our super important food safety policies.</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.tour_completion_date}
                        onChange={(e) => handleInputChange('tour_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.tour_signature}
                        onChange={(e) => handleInputChange('tour_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HR Documentation Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                The Nitty-Gritty: Schedules & HR Know-How
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.hr_review_work_planner}
                    onChange={(e) => handleInputChange('hr_review_work_planner', e.target.checked)}
                  />
                  <span>Go through the work planner with the New TM and make sure they're crystal clear on all their shifts.</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.hr_check_preplanned_time_off}
                    onChange={(e) => handleInputChange('hr_check_preplanned_time_off', e.target.checked)}
                  />
                  <span>Check if they have any pre-planned time off where they can't work and do your best to accommodate.</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.hr_explain_sickness_policy}
                    onChange={(e) => handleInputChange('hr_explain_sickness_policy', e.target.checked)}
                  />
                  <span>Explain the HR Policies regarding sickness and absence management – good to know!</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.hr_completion_date}
                        onChange={(e) => handleInputChange('hr_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.hr_signature}
                        onChange={(e) => handleInputChange('hr_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Two Check-in Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                Day Two: Doubling Down on Delicious!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_two_meet_buddy}
                    onChange={(e) => handleInputChange('day_two_meet_buddy', e.target.checked)}
                  />
                  <span>The New TM should meet their awesome Station Buddy.</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_two_guided_practice}
                    onChange={(e) => handleInputChange('day_two_guided_practice', e.target.checked)}
                  />
                  <span>The second shift should focus on training basic procedures and be a guided practice session – learning by doing!</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_two_assess_readiness}
                    onChange={(e) => handleInputChange('day_two_assess_readiness', e.target.checked)}
                  />
                  <span>Time for a quick check-in: Assess if the New TM will be ready to fly solo from Shift 3. If not, whip up a plan to get them there!</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.day_two_completion_date}
                        onChange={(e) => handleInputChange('day_two_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.day_two_signature}
                        onChange={(e) => handleInputChange('day_two_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Days 4-30 Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #FE0000' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold" style={{ color: '#FE0000' }}>
                Spreading Their Wings: Shift 4 to Day 30!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_4_to_30_working_unaided}
                    onChange={(e) => handleInputChange('day_4_to_30_working_unaided', e.target.checked)}
                  />
                  <span>The New TM should be getting more comfortable on their station and working unaided – watch them shine!</span>
                </label>
                
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_4_to_30_feedback_sessions}
                    onChange={(e) => handleInputChange('day_4_to_30_feedback_sessions', e.target.checked)}
                  />
                  <span>Planned Feedback sessions with the RGM or ARGM should be documented – keep track of that awesome progress!</span>
                </label>

                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#FE0000' }}
                    checked={formData.day_4_to_30_vault_modules_completed}
                    onChange={(e) => handleInputChange('day_4_to_30_vault_modules_completed', e.target.checked)}
                  />
                  <span>Vault Victory! All Vault modules for their first station should be smashed within the first 30 days.</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.day_4_to_30_completion_date}
                        onChange={(e) => handleInputChange('day_4_to_30_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.day_4_to_30_signature}
                        onChange={(e) => handleInputChange('day_4_to_30_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Sign-off Section */}
          <Card className="bg-white shadow-lg" style={{ borderLeft: '8px solid #00C851' }}>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold text-green-600">
                The Final Flourish: Vault Sign-Off & Real-World Awesome!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 flex-shrink-0" 
                    style={{ accentColor: '#00C851' }}
                    checked={formData.final_sign_off}
                    onChange={(e) => handleInputChange('final_sign_off', e.target.checked)}
                  />
                  <span>Official Sign Off on Vault and Practical Observation completed. They're ready to rock!</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date:
                      </label>
                      <Input
                        type="date"
                        value={formData.final_sign_off_completion_date}
                        onChange={(e) => handleInputChange('final_sign_off_completion_date', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Signature of ARGM/RGM:
                      </label>
                      <Input
                        value={formData.final_sign_off_signature}
                        onChange={(e) => handleInputChange('final_sign_off_signature', e.target.value)}
                        placeholder="Sign here"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              className="w-full sm:w-auto text-white font-bold text-base sm:text-lg py-3 px-8"
              style={{ backgroundColor: '#FE0000' }}
            >
              Complete Onboarding & Submit
            </Button>
          </div>
        </form>

        <footer className="text-center mt-8 pt-6" style={{ borderTop: '2px solid #FE0000' }}>
          <div className="text-base sm:text-lg font-bold" style={{ color: '#FE0000' }}>
            It's Finger Lickin' Good Onboarding!
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ComprehensiveOnboarding;
