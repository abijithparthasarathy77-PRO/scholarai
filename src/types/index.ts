export type UrgencyLevel = 'CRITICAL' | 'URGENT' | 'UPCOMING';
export type PriorityLevel = 'CRITICAL PRIORITY' | 'HIGH PRIORITY' | 'RECOMMENDED' | 'BACKUP';
export type ApplicationStatus = 'Interested' | 'Preparing' | 'Ready to Apply' | 'Applied' | 'Awarded';
export type DocumentStatus = 'READY' | 'EXPIRED' | 'MISSING' | 'NEEDS_REVIEW';
export type AICheckStatus = 'Verified' | 'Expired' | 'Missing' | 'Pending Review';

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  degree: string;
  degreeLevel: string; // Undergraduate, Postgraduate, etc.
  discipline: string; // Commerce, Engineering, etc.
  year: string;
  institution: string;
  institutionType: string; // Tier 1, State Univ, Autonomous
  gpa: number;
  academicScore: number; // percentage
  stateDomicile: string;
  district: string;
  familyAnnualIncome: number;
  category: string; // General-EWS, OBC-NCL, SC, ST, Merit
  gender: string;
  achievements: string[];
  preferences: {
    targetFunding: number;
    preferredFields: string[];
    maxEffort: string;
  };
  profileCompleteness: number;
}

export interface StudentDocument {
  id: string;
  name: string;
  category: 'Income' | 'Academic' | 'Institutional' | 'Financial' | 'Category' | 'Endorsement';
  status: DocumentStatus;
  issueDate?: string;
  expiryDate?: string;
  fileUrl?: string;
  aiCheckStatus: AICheckStatus;
  aiCheckNotes: string;
  requiredFor: string[]; // List of scholarship names/IDs
}

export interface DimensionScore {
  score: number; // 0-100
  requirement: string;
  studentValue: string;
  explanation: string;
  weight: number;
}

export interface FiveDMatch {
  academicRigor: DimensionScore;
  degreeAlignment: DimensionScore;
  stateDomicile: DimensionScore;
  financialNeed: DimensionScore;
  cohortCategory: DimensionScore;
  overallScore: number;
}

export interface QualificationPoint {
  criterion: string;
  requirement: string;
  studentData: string;
  result: 'PASS' | 'EXCEEDS' | 'PARTIAL' | 'FAIL';
  explanation: string;
}

export interface ApplicationStep {
  step: number;
  title: string;
  desc: string;
  duration: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  categoryTag: string; // 'Merit-Need', 'Corporate CSR', 'State Govt', 'Industry Endowment'
  fundingAmount: number;
  fundingType: 'One-Time' | 'Annual' | 'Full-Ride' | 'Stipend';
  deadline: string; // YYYY-MM-DD
  daysLeft: number;
  urgency: UrgencyLevel;
  eligibleDegrees: string[];
  eligibleLocations: string[];
  maxFamilyIncome: number;
  minAcademicScore: number;
  minGpa: number;
  eligibleCategories: string[];
  requiredDocuments: string[];
  applicationUrl: string;
  description: string;
  whyItMatches: string;
  matchScore: number; // 0-100
  priorityScore: number; // 0-100
  readinessScore: number; // 0-100
  priorityRankLabel: PriorityLevel;
  nextAction: string;
  blockers: string[];
  whyYouQualify: QualificationPoint[];
  whyYouDontQualify?: QualificationPoint[];
  fiveD: FiveDMatch;
  applicationProcess: ApplicationStep[];
  isDemoData: boolean;
}

export interface ApplicationItem {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  provider: string;
  fundingAmount: number;
  deadline: string;
  daysLeft: number;
  urgency: UrgencyLevel;
  status: ApplicationStatus;
  matchScore: number;
  readinessScore: number;
  priorityScore: number;
  blockers: string[];
  nextAction: string;
  lastUpdated: string;
}

export interface RuleCondition {
  field: 'degree' | 'academicScore' | 'gpa' | 'familyIncome' | 'domicile' | 'category';
  operator: '=' | '>=' | '<=' | 'INCLUDES';
  value: string | number;
}

export interface EligibilityRule {
  id: string;
  name: string;
  targetScholarship: string;
  conditions: RuleCondition[];
  logicOperator: 'AND' | 'OR';
  outcome: 'Potentially Eligible' | 'Ineligible' | 'Manual Review Required';
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'scholar_ai';
  timestamp: string;
  content: string;
  why?: string[];
  blockerAlert?: string;
  nextAction?: {
    text: string;
    actionType?: 'view_scholarship' | 'view_documents' | 'view_deadlines' | 'view_pipeline' | 'open_modal';
    targetId?: string;
  };
  highlightedScholarship?: {
    id: string;
    name: string;
    fundingAmount: number;
    matchScore: number;
    priorityScore: number;
    deadlineDays: number;
  };
}

export interface StrategyMetrics {
  totalOpportunities: number;
  qualifiedOpportunities: number;
  potentialFunding: number;
  inProgressFunding: number;
  submittedFunding: number;
  awardedFunding: number;
  upcomingDeadlinesCount: number;
  overallReadiness: number;
  profileStrength: number;
}
