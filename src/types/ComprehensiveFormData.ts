
export interface ComprehensiveFormData {
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
