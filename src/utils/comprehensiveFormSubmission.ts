
import { ComprehensiveFormData } from '@/types/ComprehensiveFormData';

export const submitComprehensiveForm = async (formData: ComprehensiveFormData) => {
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

  return response;
};
