
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
    pre_flight_completion_date: '',
    pre_flight_signature: '',
    day_before_completion_date: '',
    day_before_signature: '',
    first_shift_completion_date: '',
    first_shift_signature: '',
    induction_vault_completion_date: '',
    induction_vault_signature: '',
    compliance_vault_completion_date: '',
    compliance_vault_signature: '',
    tour_completion_date: '',
    tour_signature: '',
    hr_completion_date: '',
    hr_signature: '',
    day_two_completion_date: '',
    day_two_signature: '',
    day_4_to_30_completion_date: '',
    day_4_to_30_signature: '',
    final_sign_off_completion_date: '',
    final_sign_off_signature: '',
  });

  const handleInputChange = (field: string, value: string) => {
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
    <div className="min-h-screen bg-gray-50">
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

        <div className="text-center mb-8 bg-red-600 text-white p-4 sm:p-6 rounded-t-lg">
          <div className="text-2xl sm:text-4xl font-black italic mb-2">KFC</div>
          <div className="text-sm sm:text-lg font-bold">
            Team Member: Welcome to the Coop! <br className="sm:hidden" />
            Your Onboarding Adventure!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Member Name */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
                Our Newest Star's Name:
              </label>
              <Input
                value={formData.team_member_name}
                onChange={(e) => handleInputChange('team_member_name', e.target.value)}
                placeholder="Enter Team Member's Name"
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Pre-Flight Checks */}
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Once the Ink is Dry: Pre-Flight Checks!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Cook Up a Cracking Training Plan for their specific station! The RGM or ARGM should be in store to welcome them on their first shift – it's a big deal!</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Pair 'Em Up! Assign a friendly Station Buddy who's mirroring the New TM's shifts.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                The Day Before the Delicious Debut!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Time for a Welcome Call! Ring up your new Team Member to:</span>
                </label>
                
                <div className="ml-6 sm:ml-8 space-y-3">
                  <label className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 accent-red-600 flex-shrink-0" 
                    />
                    <span>Roll out the red carpet (KFC style!) and make sure they're still cluckin' excited for the role!</span>
                  </label>
                  
                  <label className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 accent-red-600 flex-shrink-0" 
                    />
                    <span>Chat about any prior commitments and lock in their shifts for their first week.</span>
                  </label>
                  
                  <label className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 accent-red-600 flex-shrink-0" 
                    />
                    <span>Give 'em the delicious scoop on their first day and what to expect – no surprises, just good vibes!</span>
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Spread the Word! Let the whole crew know a new superstar is joining the team!</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                The Big Day: First Shift Magic!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Red Carpet Welcome! The RGM or ARGM greets them personally - make it memorable!</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Meet & Greet Extravaganza! Introduce them to the fantastic crew they'll be working with.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Buddy System Activated! Connect them with their assigned Station Buddy for the shift.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>The Grand Tour! Show them around their new kingdom - from break room to customer area.</span>
                </label>

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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Knowledge Vault: Induction Learning!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Digital Learning Journey! Complete the Induction Vault training modules online.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Knowledge Check! Ensure all mandatory modules are completed and passed.</span>
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
                        Signature of Team Member:
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Safety First: Compliance Vault!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Safety Champions! Complete all mandatory compliance and safety training modules.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Certification Success! Achieve passing scores on all compliance assessments.</span>
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
                        Signature of Team Member:
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Behind the Scenes: Complete Store Tour!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>VIP Access! Complete tour of all areas including kitchen, storage, and customer areas.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Safety Spotlight! Understand all emergency procedures, exits, and safety protocols.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Equipment Expertise! Familiarization with all equipment they'll be using.</span>
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
                        Signature of Tour Guide:
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Paperwork Paradise: HR Documentation!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Documentation Complete! All HR forms completed and filed correctly.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Benefits Briefing! Explanation of all employee benefits and entitlements.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Policy Review! Understanding of all company policies and procedures.</span>
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
                        Signature of HR Representative:
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Day Two Delight: How's It Going?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Check-in Chat! How was their first day? Any questions or concerns?</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Feedback Loop! Address any immediate issues and provide encouragement.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Training Progress! Review training plan and adjust if needed.</span>
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
          <Card className="border-l-4 border-l-red-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                Building Confidence: Days 4-30 Journey!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Weekly Check-ins! Regular feedback sessions to monitor progress and address concerns.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Skill Building! Progressive training on all station responsibilities.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Team Integration! Fully integrated into team dynamics and culture.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                  />
                  <span>Performance Review! Mid-probation assessment and feedback session.</span>
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
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-green-600">
                🎉 Mission Accomplished: Final Sign-off! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-green-600 flex-shrink-0" 
                  />
                  <span>🌟 Superstar Status! Team member is fully trained and confident in their role.</span>
                </label>
                
                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-green-600 flex-shrink-0" 
                  />
                  <span>🏆 Final Assessment! Successful completion of probationary period review.</span>
                </label>

                <label className="flex items-start gap-3 text-sm sm:text-base">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-green-600 flex-shrink-0" 
                  />
                  <span>🎊 Welcome to the Family! Official confirmation of permanent team member status.</span>
                </label>

                <div className="border-t border-dashed border-gray-300 pt-4 mt-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Final Completion Date:
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
                        Final Signature of RGM:
                      </label>
                      <Input
                        value={formData.final_sign_off_signature}
                        onChange={(e) => handleInputChange('final_sign_off_signature', e.target.value)}
                        placeholder="Final Sign here"
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
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg py-3 px-8"
            >
              Complete Onboarding & Submit
            </Button>
          </div>
        </form>

        <footer className="text-center mt-8 pt-6 border-t-2 border-red-600">
          <div className="text-base sm:text-lg font-bold text-red-600">
            It's Finger Lickin' Good Onboarding!
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ComprehensiveOnboarding;
