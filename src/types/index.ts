export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
}

export interface StudentProfile {
  user_id: string;
  name: string;
  email: string;
  degree: string; // e.g. "B.Com Hons"
  degree_level: 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'Diploma';
  course: string; // "Commerce & Management"
  year: string; // "2nd Year"
  institution: string; // "St. Xavier's Mumbai"
  GPA: number; // e.g. 3.82
  percentage: number; // e.g. 86
  state: string; // "Maharashtra"
  domicile: string; // "Maharashtra"
  category: string; // "General-EWS"
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  income_range: string; // "< ₹3,50,000 / year"
  annual_income_inr: number; // 320000
  financial_need: 'High' | 'Moderate' | 'Low';
  achievements: string[];
  skills: string[];
  preferences: {
    funding_min: number;
    study_locations: string[];
    receive_deadline_alerts: boolean;
    auto_match_notification: boolean;
  };
  profile_strength_score: number; // 88%
}

export type EligibilityStatus = 
  | 'Strong Match'
  | 'Likely Eligible'
  | 'Needs Verification'
  | 'Missing Requirement'
  | 'Currently Ineligible';

export interface EligibilityCriteria {
  scholarship_id: string;
  min_percentage?: number; // e.g. 75
  min_gpa?: number; // e.g. 3.2
  allowed_degrees: string[]; // ['B.Com', 'B.Com Hons', 'BBA', 'All']
  degree_level: string[]; // ['Undergraduate']
  max_annual_income?: number; // e.g. 500000
  allowed_states: string[]; // ['Maharashtra', 'All-India']
  allowed_categories: string[]; // ['General-EWS', 'OBC', 'SC', 'ST', 'All']
  gender_requirement?: 'All' | 'Female' | 'Male';
  institution_requirements?: string[]; // e.g. ["Recognized UGC University"]
  required_documents: string[]; // ["Class XII Transcript", "Bonafide Certificate", "Income Certificate"]
  hard_requirements_summary: string[];
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  description: string;
  funding_amount: number;
  funding_formatted: string; // "₹75,000 / year"
  frequency: 'Annual' | 'One-time' | 'Semester-wise';
  deadline: string; // ISO date string e.g. "2026-09-12T23:59:59Z"
  days_remaining: number;
  source_url: string;
  source_name: string;
  status: 'Open' | 'Upcoming' | 'Closed';
  verification_status: 'Verified' | 'Needs Verification';
  verified_by?: string;
  verified_date?: string;
  category_type: 'Merit' | 'Need-based' | 'Category-based' | 'Corporate' | 'Government';
  payment_method: string; // "PFMS Direct Benefit Transfer (DBT)"
  created_at: string;
  criteria: EligibilityCriteria;
}

export interface DimensionScore {
  name: string;
  key: 'academic' | 'degree' | 'geographic' | 'financial' | 'category';
  score: number; // 0 to 100
  weight: number; // percentage (e.g. 0.25)
  student_value: string;
  requirement_value: string;
  status: 'Meets requirement' | 'Likely meets' | 'Verification required' | 'Not satisfied';
  explanation: string;
}

export interface MatchResult {
  student_id: string;
  scholarship_id: string;
  overall_score: number; // 0 to 100
  status: EligibilityStatus;
  is_eligible: boolean; // false if hard constraint fails
  academic_score: number;
  degree_score: number;
  geographic_score: number;
  financial_score: number;
  category_score: number;
  dimension_scores: DimensionScore[];
  why_you_qualify: string[];
  missing_requirements: string[];
  disqualifiers: string[];
  summary_explanation: string;
  generated_at: string;
}

export type ApplicationStage = 'interested' | 'preparing' | 'ready_to_apply' | 'applied';
export type PriorityLevel = 'Critical' | 'High' | 'Normal';

export interface Application {
  id: string;
  student_id: string;
  scholarship_id: string;
  scholarship_title: string;
  provider: string;
  funding_formatted: string;
  deadline: string;
  stage: ApplicationStage;
  progress_percentage: number;
  priority: PriorityLevel;
  notes?: string;
  checklist: { item: string; completed: boolean }[];
  submitted_at?: string;
  updated_at: string;
}

export type DocumentVerificationStatus = 'verified' | 'ready' | 'expired' | 'pending_verification' | 'missing';

export interface StudentDocument {
  id: string;
  student_id: string;
  document_type: string; // "Income Certificate"
  title: string;
  status: DocumentVerificationStatus;
  issue_date?: string;
  expiry_date?: string;
  is_expired: boolean;
  file_name?: string;
  action_label?: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  student_id: string;
  type: 'new_match' | 'deadline' | 'missing_document' | 'application' | 'profile';
  title: string;
  message: string;
  deadline?: string;
  read: boolean;
  created_at: string;
  action_link?: string;
}

export interface ManualReviewRequest {
  id: string;
  student_id: string;
  student_name: string;
  scholarship_id: string;
  scholarship_title: string;
  reason: string;
  additional_info: string;
  supporting_explanation: string;
  status: 'Pending Review' | 'Under Review' | 'Resolved';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface RuleCondition {
  id: string;
  field: 'degree' | 'academic_percentage' | 'annual_income' | 'state' | 'category';
  operator: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'contains' | 'in';
  value: string | number;
}

export interface EligibilityRule {
  id: string;
  name: string;
  scholarship_id?: string;
  conditions: RuleCondition[];
  logic: 'AND' | 'OR';
  description: string;
  created_at: string;
}

export type ThemeMode = 'aurora' | 'midnight' | 'sunset' | 'emerald';
