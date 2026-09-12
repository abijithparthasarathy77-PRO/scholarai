import { StudentProfile, StudentDocument, ApplicationItem } from '../types';

export const initialStudent: StudentProfile = {
  id: 'student-aarav-01',
  name: 'Aarav Sharma',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  degree: 'B.Com (Honours)',
  degreeLevel: 'Undergraduate',
  discipline: 'Commerce & Financial Studies',
  year: '2nd Year',
  institution: "St. Xavier's College, Mumbai",
  institutionType: 'Autonomous College (NAAC A+)',
  gpa: 3.82,
  academicScore: 86, // 86% aggregate
  stateDomicile: 'Maharashtra',
  district: 'Mumbai Suburban',
  familyAnnualIncome: 320000, // ₹3,20,000
  category: 'General-EWS',
  gender: 'Male',
  achievements: [
    'Ranked #2 in Inter-Collegiate Financial Literacy Quiz 2025',
    'Secretary, Xavierian Commerce Association (2024-25)',
    'Published student article on Microfinance in National College Journal'
  ],
  preferences: {
    targetFunding: 500000,
    preferredFields: ['Corporate CSR', 'Merit-cum-Means', 'State Govt.'],
    maxEffort: 'Moderate-High'
  },
  profileCompleteness: 92
};

export const initialDocuments: StudentDocument[] = [
  {
    id: 'doc-income',
    name: 'Annual Family Income Certificate (Tahsildar)',
    category: 'Income',
    status: 'EXPIRED',
    issueDate: '2024-03-15',
    expiryDate: '2025-03-31', // Expired!
    fileUrl: '/docs/income_cert_2024.pdf',
    aiCheckStatus: 'Expired',
    aiCheckNotes: 'Document expired on 31 Mar 2025. Requires renewal from District Revenue Office / Tahsildar.',
    requiredFor: ['Tata Merit Endowment', 'Reliance Foundation Undergraduate', 'HDFC Badhte Kadam']
  },
  {
    id: 'doc-transcript',
    name: '1st Year Consolidated Marksheet / Transcript',
    category: 'Academic',
    status: 'READY',
    issueDate: '2025-06-12',
    fileUrl: '/docs/bcom_yr1_marksheet.pdf',
    aiCheckStatus: 'Verified',
    aiCheckNotes: 'Aggregate verified: 86.4% (GPA: 3.82/4.0). Clear pass across all 8 modules.',
    requiredFor: ['Tata Merit Endowment', 'Reliance Foundation Undergraduate', 'Aditya Birla Scholarship', 'HDFC Badhte Kadam']
  },
  {
    id: 'doc-bonafide',
    name: 'Bonafide Student Certificate (Current Year)',
    category: 'Institutional',
    status: 'READY',
    issueDate: '2025-07-10',
    fileUrl: '/docs/st_xaviers_bonafide_2025.pdf',
    aiCheckStatus: 'Verified',
    aiCheckNotes: "Validated with institutional stamp: St. Xavier's College, Mumbai.",
    requiredFor: ['All Applied Scholarships']
  },
  {
    id: 'doc-bank',
    name: 'Student Bank Account Proof / Cancelled Cheque',
    category: 'Financial',
    status: 'READY',
    issueDate: '2025-01-20',
    fileUrl: '/docs/sbi_passbook.pdf',
    aiCheckStatus: 'Verified',
    aiCheckNotes: 'Direct Benefit Transfer (DBT) enabled State Bank of India account.',
    requiredFor: ['Disbursement & Direct Transfer']
  },
  {
    id: 'doc-ews',
    name: 'Economically Weaker Section (EWS) Certificate',
    category: 'Category',
    status: 'READY',
    issueDate: '2025-04-18',
    expiryDate: '2026-03-31',
    fileUrl: '/docs/ews_cert_valid.pdf',
    aiCheckStatus: 'Verified',
    aiCheckNotes: 'State of Maharashtra competent authority stamp verified. Valid for FY 2025-26.',
    requiredFor: ['Maharashtra Post-Matric EWS Scholarship', 'Tata Merit Endowment']
  },
  {
    id: 'doc-endorsement',
    name: 'Dean / HOD Academic Endorsement Letter',
    category: 'Endorsement',
    status: 'MISSING',
    aiCheckStatus: 'Missing',
    aiCheckNotes: 'Mandatory for Tata Merit Endowment prior to portal submission.',
    requiredFor: ['Tata Merit Endowment']
  }
];

export const initialApplications: ApplicationItem[] = [
  {
    id: 'app-tata-01',
    scholarshipId: 'sch-tata-merit',
    scholarshipName: 'Tata Merit Endowment for Higher Education',
    provider: 'Tata Trusts',
    fundingAmount: 100000,
    deadline: '2026-09-14', // 48 hours away
    daysLeft: 2,
    urgency: 'CRITICAL',
    status: 'Preparing',
    matchScore: 94,
    readinessScore: 86,
    priorityScore: 94,
    blockers: ['Dean Endorsement Required', 'Renew Income Certificate'],
    nextAction: 'Get Dean Endorsement from Commerce Dept Head',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'app-reliance-02',
    scholarshipId: 'sch-reliance-ug',
    scholarshipName: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    fundingAmount: 200000,
    deadline: '2026-09-17',
    daysLeft: 5,
    urgency: 'URGENT',
    status: 'Preparing',
    matchScore: 91,
    readinessScore: 74,
    priorityScore: 88,
    blockers: ['Renew Income Certificate', 'Aptitude Test Slot Selection'],
    nextAction: 'Book online cognitive aptitude test slot',
    lastUpdated: '1 day ago'
  },
  {
    id: 'app-hdfc-03',
    scholarshipId: 'sch-hdfc-badhte',
    scholarshipName: 'HDFC Badhte Kadam Scholarship',
    provider: 'HDFC Bank Parivartan',
    fundingAmount: 75000,
    deadline: '2026-09-21',
    daysLeft: 9,
    urgency: 'UPCOMING',
    status: 'Ready to Apply',
    matchScore: 89,
    readinessScore: 95,
    priorityScore: 85,
    blockers: [],
    nextAction: 'Final review of essay and submit on portal',
    lastUpdated: '3 days ago'
  },
  {
    id: 'app-birla-04',
    scholarshipId: 'sch-aditya-birla',
    scholarshipName: 'Aditya Birla Scholarship for Higher Education',
    provider: 'Aditya Birla Group',
    fundingAmount: 150000,
    deadline: '2026-09-30',
    daysLeft: 18,
    urgency: 'UPCOMING',
    status: 'Interested',
    matchScore: 84,
    readinessScore: 70,
    priorityScore: 78,
    blockers: ['Statement of Purpose Draft'],
    nextAction: 'Draft 500-word Statement of Purpose on leadership goals',
    lastUpdated: '5 days ago'
  },
  {
    id: 'app-mahadbt-05',
    scholarshipId: 'sch-maha-postmatric',
    scholarshipName: 'Maharashtra State Post-Matric EWS Scholarship',
    provider: 'Govt. of Maharashtra',
    fundingAmount: 40000,
    deadline: '2026-10-12',
    daysLeft: 30,
    urgency: 'UPCOMING',
    status: 'Applied',
    matchScore: 96,
    readinessScore: 100,
    priorityScore: 82,
    blockers: [],
    nextAction: 'Application submitted (App ID: MH-2026-9921); track college verification status',
    lastUpdated: '1 week ago'
  }
];
