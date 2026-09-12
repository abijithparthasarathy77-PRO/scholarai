import { Scholarship } from '../types';

export const initialScholarships: Scholarship[] = [
  {
    id: 'sch-tata-merit',
    name: 'Tata Merit Endowment for Higher Education',
    provider: 'Tata Trusts',
    categoryTag: 'Corporate CSR & Endowment',
    fundingAmount: 100000,
    fundingType: 'Annual',
    deadline: '2026-09-14',
    daysLeft: 2,
    urgency: 'CRITICAL',
    eligibleDegrees: ['B.Com (Honours)', 'B.A. Economics', 'B.Sc Statistics', 'B.B.A', 'Chartered Accountancy'],
    eligibleLocations: ['Pan-India', 'Maharashtra', 'Delhi-NCR', 'Karnataka', 'Tamil Nadu'],
    maxFamilyIncome: 600000,
    minAcademicScore: 75,
    minGpa: 3.5,
    eligibleCategories: ['All Categories', 'General-EWS', 'Merit'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Annual Family Income Certificate (Tahsildar)',
      'Bonafide Student Certificate (Current Year)',
      'Dean / HOD Academic Endorsement Letter'
    ],
    applicationUrl: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education',
    description: 'Premier merit-cum-means endowment supporting high-performing undergraduate commerce, economics, and quantitative science scholars across recognized Indian universities.',
    whyItMatches: 'Your 86% academic score exceeds the 75% cutoff, and your B.Com Hons program at St. Xavier’s is fully aligned.',
    matchScore: 94,
    priorityScore: 94,
    readinessScore: 86,
    priorityRankLabel: 'CRITICAL PRIORITY',
    nextAction: 'Get Dean Endorsement from Commerce Dept Head',
    blockers: [
      'Dean Endorsement letter is missing from your document vault.',
      'Annual Income Certificate expired on 31 Mar 2025; renewal required.'
    ],
    whyYouQualify: [
      {
        criterion: 'Academic Rigor Threshold',
        requirement: 'Minimum 75% aggregate or 3.50 CGPA in previous academic year',
        studentData: '86.4% aggregate (GPA: 3.82/4.00) at St. Xavier’s College',
        result: 'EXCEEDS',
        explanation: 'Your academic score outperforms the institutional qualification bar by 11.4 percentage points.'
      },
      {
        criterion: 'Degree & Discipline Alignment',
        requirement: 'Enrolled in accredited 3 or 4-year undergraduate commerce/economics program',
        studentData: '2nd Year B.Com (Honours) — Commerce & Financial Studies',
        result: 'PASS',
        explanation: 'Direct program match under approved Section 4.2 Financial Studies annexure.'
      },
      {
        criterion: 'State & Domicile Eligibility',
        requirement: 'Valid Indian citizen with domicile in recognized State/UT',
        studentData: 'Maharashtra Domicile (Resident of Mumbai)',
        result: 'PASS',
        explanation: 'Maharashtra is an approved tier-1 priority domicile zone for this endowment.'
      },
      {
        criterion: 'Household Income Ceiling',
        requirement: 'Gross household annual income not exceeding ₹6,00,000 p.a.',
        studentData: 'Verified family annual income: ₹3,20,000 p.a. (General-EWS)',
        result: 'PASS',
        explanation: 'Your family income falls comfortably within the ₹6.0L threshold, placing you in high need band.'
      },
      {
        criterion: 'Institutional Accreditation',
        requirement: 'Recognized NAAC ‘A’ or autonomous college affiliated to UGC',
        studentData: "St. Xavier's College, Autonomous (NAAC Grade A+)",
        result: 'EXCEEDS',
        explanation: "St. Xavier's Mumbai holds tier-1 autonomy classification conferring maximum institutional weight."
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 95,
        requirement: '>= 75% / 3.50 GPA',
        studentValue: '86.4% / 3.82 GPA',
        explanation: 'Top 5% percentile performance across peer applicants.',
        weight: 25
      },
      degreeAlignment: {
        score: 100,
        requirement: 'B.Com / B.A. Econ / B.Sc',
        studentValue: 'B.Com (Honours)',
        explanation: 'Direct core curriculum alignment with financial scholarship scope.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra / Mumbai',
        explanation: 'Fully compliant with national and state residency mandates.',
        weight: 15
      },
      financialNeed: {
        score: 88,
        requirement: 'Income < ₹6,00,000',
        studentValue: '₹3,20,000 (EWS Tier)',
        explanation: 'High need score; priority allocation for incomes below ₹4.0L.',
        weight: 25
      },
      cohortCategory: {
        score: 90,
        requirement: 'Open / EWS / Merit',
        studentValue: 'General-EWS',
        explanation: 'Qualifies under reserved EWS financial opportunity quota.',
        weight: 15
      },
      overallScore: 94
    },
    applicationProcess: [
      { step: 1, title: 'Eligibility Self-Check', desc: 'Verify marksheet and domicile upload.', duration: '10 mins' },
      { step: 2, title: 'Dean Endorsement', desc: 'Submit physical form to Head of Department for formal endorsement stamp.', duration: '24-48 hrs' },
      { step: 3, title: 'Portal Dossier Submission', desc: 'Upload scanned signed packet to Tata Trusts Individual Grants system.', duration: '15 mins' },
      { step: 4, title: 'Document Scrutiny', desc: 'Independent verification by trust trustees.', duration: '2 weeks' },
      { step: 5, title: 'Direct Bank Transfer', desc: 'Disbursement of ₹1,00,000 to registered SBI bank account.', duration: 'Post-approval' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-reliance-ug',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    categoryTag: 'Corporate CSR Flagship',
    fundingAmount: 200000,
    fundingType: 'Annual',
    deadline: '2026-09-17',
    daysLeft: 5,
    urgency: 'URGENT',
    eligibleDegrees: ['B.Com (Honours)', 'B.Sc', 'B.A', 'B.Tech', 'B.B.A'],
    eligibleLocations: ['Pan-India'],
    maxFamilyIncome: 1500000,
    minAcademicScore: 60,
    minGpa: 3.0,
    eligibleCategories: ['All Categories', 'General-EWS', 'OBC', 'SC', 'ST'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Annual Family Income Certificate (Tahsildar)',
      'Bonafide Student Certificate (Current Year)',
      'Student Bank Account Proof / Cancelled Cheque'
    ],
    applicationUrl: 'https://www.scholarships.reliancefoundation.org/',
    description: 'Flagship nationwide scholarship up to ₹2,00,000 over the course of degree study, combined with leadership training, mentorship network, and alumni opportunities.',
    whyItMatches: 'Your GPA of 3.82 places you comfortably in the top tier; aptitude assessment required.',
    matchScore: 91,
    priorityScore: 88,
    readinessScore: 74,
    priorityRankLabel: 'HIGH PRIORITY',
    nextAction: 'Schedule Online Aptitude Test Slot',
    blockers: [
      'Mandatory cognitive test slot unselected.',
      'Income Certificate expired (31 Mar 2025).'
    ],
    whyYouQualify: [
      {
        criterion: 'Class 12 / 1st Year Aggregate',
        requirement: 'Minimum 60% in previous terminal examination',
        studentData: '86.4% aggregate',
        result: 'EXCEEDS',
        explanation: 'Exceeds qualification barrier by 26.4 points.'
      },
      {
        criterion: 'Income Threshold',
        requirement: 'Family income <= ₹15,00,000 (Preference < ₹2.5L & ₹5.0L)',
        studentData: '₹3,20,000 p.a.',
        result: 'PASS',
        explanation: 'Enters the high-preference lower income tier.'
      },
      {
        criterion: 'Study Program',
        requirement: 'Full-time regular undergraduate course at recognized university',
        studentData: "Full-time B.Com (Honours) at St. Xavier's",
        result: 'PASS',
        explanation: 'Meets full-time regular degree criteria.'
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 92,
        requirement: '>= 60%',
        studentValue: '86.4%',
        explanation: 'Significant competitive advantage in academic scoring matrix.',
        weight: 25
      },
      degreeAlignment: {
        score: 94,
        requirement: 'UG Regular',
        studentValue: 'B.Com (Honours)',
        explanation: 'Directly supported standard 3-year undergraduate program.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra',
        explanation: 'Universal Indian national eligibility satisfied.',
        weight: 15
      },
      financialNeed: {
        score: 85,
        requirement: 'Income < ₹15.0L',
        studentValue: '₹3,20,000',
        explanation: 'Qualifies for high priority needs band (< ₹5.0L).',
        weight: 25
      },
      cohortCategory: {
        score: 86,
        requirement: 'All streams',
        studentValue: 'General-EWS',
        explanation: 'Favorable weighting across all cohort categories.',
        weight: 15
      },
      overallScore: 91
    },
    applicationProcess: [
      { step: 1, title: 'Registration & Eligibility Form', desc: 'Fill personal and family academic details.', duration: '20 mins' },
      { step: 2, title: 'Mandatory Aptitude Test', desc: 'Online 60-minute proctored assessment covering verbal, analytical, and numerical reasoning.', duration: '60 mins' },
      { step: 3, title: 'Document Scrutiny', desc: 'AI-assisted verification of marksheet and income credentials.', duration: '1 week' },
      { step: 4, title: 'Selection Announcement', desc: 'Shortlist of 5,000 scholars announced nationally.', duration: 'Late October' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-hdfc-badhte',
    name: 'HDFC Badhte Kadam Scholarship',
    provider: 'HDFC Bank Parivartan',
    categoryTag: 'Corporate CSR',
    fundingAmount: 75000,
    fundingType: 'One-Time',
    deadline: '2026-09-21',
    daysLeft: 9,
    urgency: 'UPCOMING',
    eligibleDegrees: ['B.Com (Honours)', 'B.Com General', 'B.A', 'B.Sc', 'Professional Diploma'],
    eligibleLocations: ['Pan-India'],
    maxFamilyIncome: 600000,
    minAcademicScore: 60,
    minGpa: 3.0,
    eligibleCategories: ['General-EWS', 'Crisis Affected', 'Single Parent', 'Merit-Need'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Bonafide Student Certificate (Current Year)',
      'Student Bank Account Proof / Cancelled Cheque'
    ],
    applicationUrl: 'https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/parivartan',
    description: 'High-impact financial assistance designed to reduce college drop-out rates for students from economically modest backgrounds pursuing higher education.',
    whyItMatches: 'All core documents are ready. 95% readiness score makes this your easiest immediate submission.',
    matchScore: 89,
    priorityScore: 85,
    readinessScore: 95,
    priorityRankLabel: 'HIGH PRIORITY',
    nextAction: 'Final Review & Click Submit on Buddy4Study Portal',
    blockers: [],
    whyYouQualify: [
      {
        criterion: 'Academic Minimum',
        requirement: 'At least 60% marks in previous year',
        studentData: '86.4% verified aggregate',
        result: 'EXCEEDS',
        explanation: 'Exceeds threshold by 26.4%.'
      },
      {
        criterion: 'Income Proof',
        requirement: 'Family annual income under ₹6,00,000',
        studentData: '₹3,20,000',
        result: 'PASS',
        explanation: 'Under limits.'
      },
      {
        criterion: 'Course Validity',
        requirement: 'General or professional graduation course in recognized college',
        studentData: "B.Com at St. Xavier's",
        result: 'PASS',
        explanation: 'Full qualification.'
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 88,
        requirement: '>= 60%',
        studentValue: '86.4%',
        explanation: 'Solid academic foundation.',
        weight: 20
      },
      degreeAlignment: {
        score: 92,
        requirement: 'UG Regular',
        studentValue: 'B.Com (Honours)',
        explanation: 'Directly supported graduation discipline.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra',
        explanation: 'Pan-India coverage.',
        weight: 15
      },
      financialNeed: {
        score: 92,
        requirement: 'Income < ₹6.0L',
        studentValue: '₹3,20,000',
        explanation: 'High priority bracket.',
        weight: 30
      },
      cohortCategory: {
        score: 88,
        requirement: 'EWS / Need',
        studentValue: 'General-EWS',
        explanation: 'Meets targeted criteria.',
        weight: 15
      },
      overallScore: 89
    },
    applicationProcess: [
      { step: 1, title: 'Direct Portal Form', desc: 'Fill scholarship application via Parivartan portal.', duration: '15 mins' },
      { step: 2, title: 'Document Upload', desc: 'Attach verified marksheet and photo ID.', duration: '5 mins' },
      { step: 3, title: 'Telephonic Verification', desc: 'Randomized 5-minute telephonic check with college registrar.', duration: '1 day' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-aditya-birla',
    name: 'Aditya Birla Scholarship for Higher Education',
    provider: 'Aditya Birla Group',
    categoryTag: 'Prestige Corporate Fellowship',
    fundingAmount: 150000,
    fundingType: 'Annual',
    deadline: '2026-09-30',
    daysLeft: 18,
    urgency: 'UPCOMING',
    eligibleDegrees: ['B.Com (Honours)', 'B.A. Economics', 'B.Tech', 'Chartered Accountancy'],
    eligibleLocations: ['Pan-India'],
    maxFamilyIncome: 1200000,
    minAcademicScore: 85,
    minGpa: 3.75,
    eligibleCategories: ['Merit', 'All Categories'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Bonafide Student Certificate (Current Year)',
      'Statement of Purpose Essay (500 Words)',
      'Letter of Recommendation'
    ],
    applicationUrl: 'https://www.adityabirlascholars.net/',
    description: 'Prestigious fellowship fostering visionary leadership among top undergraduate scholars with substantial annual stipend, mentorship by group executives, and project grants.',
    whyItMatches: 'Your 3.82 GPA clears the rigorous 3.75 cutoff; requires a polished Statement of Purpose (SOP).',
    matchScore: 84,
    priorityScore: 78,
    readinessScore: 70,
    priorityRankLabel: 'RECOMMENDED',
    nextAction: 'Draft 500-Word Statement of Purpose',
    blockers: ['SOP essay draft incomplete', 'Recommendation letter required'],
    whyYouQualify: [
      {
        criterion: 'Academic Excellence Cutoff',
        requirement: 'Minimum GPA of 3.75 or 85% aggregate across top premier institutions',
        studentData: 'GPA: 3.82 / 86.4% aggregate',
        result: 'PASS',
        explanation: 'Meets the stringent academic cutoff by 0.07 GPA points.'
      },
      {
        criterion: 'Institution Standing',
        requirement: 'Enrolled in Tier-1 national autonomous or central institution',
        studentData: "St. Xavier's College, Mumbai (NAAC A+ Autonomous)",
        result: 'PASS',
        explanation: 'Institutional standing qualifies under commerce cohort.'
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 86,
        requirement: '>= 3.75 GPA',
        studentValue: '3.82 GPA',
        explanation: 'Meets high cutoff with marginal safety buffer.',
        weight: 35
      },
      degreeAlignment: {
        score: 95,
        requirement: 'B.Com / Econ',
        studentValue: 'B.Com (Honours)',
        explanation: 'Preferred discipline alignment.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra',
        explanation: 'Universal national eligibility.',
        weight: 10
      },
      financialNeed: {
        score: 70,
        requirement: 'Merit-Primary',
        studentValue: '₹3,20,000',
        explanation: 'Merit weight predominates financial need.',
        weight: 15
      },
      cohortCategory: {
        score: 85,
        requirement: 'Merit cohort',
        studentValue: 'General-EWS',
        explanation: 'Fully eligible under general merit pool.',
        weight: 20
      },
      overallScore: 84
    },
    applicationProcess: [
      { step: 1, title: 'Dean Nomination', desc: 'College submits shortlisted top 5% student list.', duration: 'Internal' },
      { step: 2, title: 'SOP & Essay Submission', desc: 'Candidate submits 500-word essay on leadership and community impact.', duration: '3 days' },
      { step: 3, title: 'National Interview Round', desc: 'Panel interview in Mumbai with senior industry leaders.', duration: '1 day' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-maha-postmatric',
    name: 'Maharashtra State Post-Matric EWS Scholarship',
    provider: 'Govt. of Maharashtra (MahaDBT)',
    categoryTag: 'State Government Scheme',
    fundingAmount: 40000,
    fundingType: 'Annual',
    deadline: '2026-10-12',
    daysLeft: 30,
    urgency: 'UPCOMING',
    eligibleDegrees: ['B.Com (Honours)', 'B.Com', 'B.A', 'B.Sc', 'All Recognized UG/PG'],
    eligibleLocations: ['Maharashtra'],
    maxFamilyIncome: 800000,
    minAcademicScore: 50,
    minGpa: 2.5,
    eligibleCategories: ['General-EWS', 'EBC'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Annual Family Income Certificate (Tahsildar)',
      'Bonafide Student Certificate (Current Year)',
      'Economically Weaker Section (EWS) Certificate',
      'Student Bank Account Proof / Cancelled Cheque'
    ],
    applicationUrl: 'https://mahadbt.maharashtra.gov.in/',
    description: 'Statutory tuition fee and maintenance concession scheme for Economically Weaker Section students holding Maharashtra State Domicile pursuing degree courses.',
    whyItMatches: 'State domicile and EWS certificate match 100%. Application is already drafted and in submitted pipeline.',
    matchScore: 96,
    priorityScore: 82,
    readinessScore: 100,
    priorityRankLabel: 'RECOMMENDED',
    nextAction: 'Application submitted (App ID: MH-2026-9921); track college verification status',
    blockers: [],
    whyYouQualify: [
      {
        criterion: 'Domicile Certificate',
        requirement: 'Compulsory Maharashtra State Domicile',
        studentData: 'Maharashtra Domicile (Registered Mumbai resident)',
        result: 'PASS',
        explanation: 'Verified state domicile satisfies primary gatekeeper rule.'
      },
      {
        criterion: 'EWS Quota Status',
        requirement: 'Valid EWS Certificate issued by Tehsildar or Sub-Divisional Officer',
        studentData: 'Valid EWS Certificate (Exp: 31 Mar 2026)',
        result: 'PASS',
        explanation: 'Statutory compliance complete.'
      },
      {
        criterion: 'Income Limit',
        requirement: 'Annual income <= ₹8,00,000 p.a.',
        studentData: '₹3,20,000 p.a.',
        result: 'PASS',
        explanation: 'Well within permissible state limits.'
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 98,
        requirement: '>= 50%',
        studentValue: '86.4%',
        explanation: 'Far exceeds baseline qualifying requirement.',
        weight: 15
      },
      degreeAlignment: {
        score: 100,
        requirement: 'Any recognized UG',
        studentValue: 'B.Com (Honours)',
        explanation: 'Full course fee reimbursement coverage.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Maharashtra Resident',
        studentValue: 'Maharashtra',
        explanation: 'Target domicile match.',
        weight: 30
      },
      financialNeed: {
        score: 95,
        requirement: '< ₹8.0L',
        studentValue: '₹3,20,000',
        explanation: 'Fully qualifies for tier-1 maintenance allowance.',
        weight: 20
      },
      cohortCategory: {
        score: 100,
        requirement: 'General-EWS',
        studentValue: 'General-EWS',
        explanation: 'Direct scheme match.',
        weight: 15
      },
      overallScore: 96
    },
    applicationProcess: [
      { step: 1, title: 'MahaDBT Portal Login', desc: 'Authenticate with student credentials.', duration: 'Done' },
      { step: 2, title: 'Department Scrutiny', desc: 'College administrative desk marks verification.', duration: 'In Progress' },
      { step: 3, title: 'Disbursement Order', desc: 'Direct credit through PFMS DBT mechanism.', duration: 'Expected Nov 2026' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-sitaram-jindal',
    name: 'Sitaram Jindal Foundation Scholarship',
    provider: 'Sitaram Jindal Foundation',
    categoryTag: 'Charitable Trust Endowment',
    fundingAmount: 36000,
    fundingType: 'Annual',
    deadline: '2026-10-06',
    daysLeft: 24,
    urgency: 'UPCOMING',
    eligibleDegrees: ['B.Com (Honours)', 'B.A', 'B.Sc', 'B.Com General'],
    eligibleLocations: ['Pan-India'],
    maxFamilyIncome: 400000,
    minAcademicScore: 70,
    minGpa: 3.2,
    eligibleCategories: ['All Categories', 'EWS', 'Merit-Need'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Annual Family Income Certificate (Tahsildar)',
      'Bonafide Student Certificate (Current Year)'
    ],
    applicationUrl: 'https://www.sitaramjindalfoundation.org/scholarships.php',
    description: 'Long-standing philanthropic grant providing monthly stipend to undergraduate scholars from low-income households with commendable academic records.',
    whyItMatches: 'Your family income (₹3.2L) is below the ₹4.0L cap and academic score (86%) well exceeds the 70% cutoff.',
    matchScore: 85,
    priorityScore: 76,
    readinessScore: 80,
    priorityRankLabel: 'RECOMMENDED',
    nextAction: 'Download physical application annexure & college stamp',
    blockers: ['Income Certificate renewal pending'],
    whyYouQualify: [
      {
        criterion: 'Academic Percentage',
        requirement: 'Minimum 70% marks in qualifying exam',
        studentData: '86.4% verified',
        result: 'EXCEEDS',
        explanation: '16.4 points above cutoff.'
      },
      {
        criterion: 'Income Ceiling',
        requirement: 'Family income <= ₹4,00,000 p.a.',
        studentData: '₹3,20,000 p.a.',
        result: 'PASS',
        explanation: 'Meets the stringent charitable income limit.'
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 85,
        requirement: '>= 70%',
        studentValue: '86.4%',
        explanation: 'Very strong academic profile.',
        weight: 25
      },
      degreeAlignment: {
        score: 90,
        requirement: 'B.Com / B.A / B.Sc',
        studentValue: 'B.Com (Honours)',
        explanation: 'Direct course alignment.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra',
        explanation: 'Pan-India scheme.',
        weight: 15
      },
      financialNeed: {
        score: 84,
        requirement: '< ₹4.0L',
        studentValue: '₹3,20,000',
        explanation: 'Meets income requirements.',
        weight: 25
      },
      cohortCategory: {
        score: 85,
        requirement: 'Open / Need',
        studentValue: 'General-EWS',
        explanation: 'Fully eligible.',
        weight: 15
      },
      overallScore: 85
    },
    applicationProcess: [
      { step: 1, title: 'Offline Application Form', desc: 'Download Annexure A and fill student particulars.', duration: '15 mins' },
      { step: 2, title: 'Principal Endorsement', desc: 'Obtain college seal and principal signature.', duration: '1-2 days' },
      { step: 3, title: 'Postal Dispatch', desc: 'Send registered post to Bangalore foundation office.', duration: '3 days' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-kc-mahindra',
    name: 'K.C. Mahindra All India Post-Matric Scholarship',
    provider: 'K.C. Mahindra Education Trust',
    categoryTag: 'Corporate Trust Grant',
    fundingAmount: 80000,
    fundingType: 'Annual',
    deadline: '2026-09-24',
    daysLeft: 12,
    urgency: 'UPCOMING',
    eligibleDegrees: ['B.Com (Honours)', 'B.Sc', 'Polytechnic Diploma', 'Professional Degrees'],
    eligibleLocations: ['Pan-India'],
    maxFamilyIncome: 500000,
    minAcademicScore: 65,
    minGpa: 3.0,
    eligibleCategories: ['All Categories', 'EWS', 'Underprivileged'],
    requiredDocuments: [
      '1st Year Consolidated Marksheet / Transcript',
      'Annual Family Income Certificate (Tahsildar)',
      'Bonafide Student Certificate (Current Year)',
      'Student Bank Account Proof / Cancelled Cheque'
    ],
    applicationUrl: 'https://www.kcmet.org/what-we-do-Scholarships-Grants.aspx',
    description: 'Empowering promising college students across India who demonstrate perseverance, high integrity, and financial need to finish their degrees without debt.',
    whyItMatches: 'Strong fit across academic merit and financial need criteria.',
    matchScore: 87,
    priorityScore: 81,
    readinessScore: 82,
    priorityRankLabel: 'HIGH PRIORITY',
    nextAction: 'Fill online portal registration & upload transcript',
    blockers: ['Income Certificate renewal pending'],
    whyYouQualify: [
      {
        criterion: 'Academic Minimum',
        requirement: '65% minimum in previous college examination',
        studentData: '86.4%',
        result: 'EXCEEDS',
        explanation: '21.4 points above qualifying floor.'
      },
      {
        criterion: 'Income Eligibility',
        requirement: 'Annual income <= ₹5,00,000',
        studentData: '₹3,20,000',
        result: 'PASS',
        explanation: 'Fully qualifies.'
      }
    ],
    whyYouDontQualify: [],
    fiveD: {
      academicRigor: {
        score: 87,
        requirement: '>= 65%',
        studentValue: '86.4%',
        explanation: 'High percentile standing.',
        weight: 25
      },
      degreeAlignment: {
        score: 88,
        requirement: 'UG Regular',
        studentValue: 'B.Com (Honours)',
        explanation: 'Eligible course.',
        weight: 20
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra',
        explanation: 'Nationwide eligibility.',
        weight: 15
      },
      financialNeed: {
        score: 88,
        requirement: '< ₹5.0L',
        studentValue: '₹3,20,000',
        explanation: 'Eligible with priority points.',
        weight: 25
      },
      cohortCategory: {
        score: 86,
        requirement: 'Open / Need',
        studentValue: 'General-EWS',
        explanation: 'Fully compliant.',
        weight: 15
      },
      overallScore: 87
    },
    applicationProcess: [
      { step: 1, title: 'Online Form', desc: 'Complete web application on KCMET portal.', duration: '20 mins' },
      { step: 2, title: 'Interview Shortlist', desc: 'Virtual regional interaction with trust mentors.', duration: '30 mins' }
    ],
    isDemoData: true
  },
  {
    id: 'sch-infosys-stem',
    name: 'Infosys Foundation STEM Stars Scholarship',
    provider: 'Infosys Foundation',
    categoryTag: 'Corporate CSR — Targeted',
    fundingAmount: 100000,
    fundingType: 'Annual',
    deadline: '2026-09-26',
    daysLeft: 14,
    urgency: 'UPCOMING',
    eligibleDegrees: ['B.Tech', 'B.E.', 'B.Sc Computer Science', 'Integrated M.Sc Data Science'],
    eligibleLocations: ['Pan-India'],
    maxFamilyIncome: 800000,
    minAcademicScore: 75,
    minGpa: 3.5,
    eligibleCategories: ['Female Candidates Only', 'STEM Cohort'],
    requiredDocuments: [
      'Class 12 / JEE Scorecard',
      'Bonafide Certificate',
      'Annual Income Certificate'
    ],
    applicationUrl: 'https://www.infosys.com/infosys-foundation/stem-stars.html',
    description: 'Specialized scholarship program dedicated exclusively to encouraging female students pursuing undergraduate degrees in Science, Technology, Engineering, and Mathematics (STEM).',
    whyItMatches: 'Discipline mismatch and cohort exclusion. Displayed to demonstrate transparent Explainable AI disqualification reasons.',
    matchScore: 42,
    priorityScore: 30,
    readinessScore: 40,
    priorityRankLabel: 'BACKUP',
    nextAction: 'Not recommended for application due to hard criteria mismatches',
    blockers: [
      'Degree Mismatch: B.Com (Honours) is not recognized under STEM engineering/data disciplines.',
      'Cohort Mismatch: Scheme is restricted exclusively to female candidates.'
    ],
    whyYouQualify: [
      {
        criterion: 'Academic Rigor Floor',
        requirement: 'Minimum 75% in qualifying exams',
        studentData: '86.4% aggregate',
        result: 'EXCEEDS',
        explanation: 'Academic score meets numerical threshold.'
      },
      {
        criterion: 'Income Ceiling',
        requirement: 'Family income <= ₹8,00,000 p.a.',
        studentData: '₹3,20,000 p.a.',
        result: 'PASS',
        explanation: 'Income criteria satisfied.'
      }
    ],
    whyYouDontQualify: [
      {
        criterion: 'Eligible Degree Programs (Hard Requirement)',
        requirement: 'B.Tech / B.E. / B.Sc Computer Science / STEM fields',
        studentData: 'B.Com (Honours) — Commerce & Financial Studies',
        result: 'FAIL',
        explanation: 'The scholarship exclusively funds technological and engineering disciplines; Commerce curricula are not eligible.'
      },
      {
        criterion: 'Target Cohort / Gender Criteria (Hard Requirement)',
        requirement: 'Female candidates enrolled in accredited STEM programs',
        studentData: 'Identified as Male',
        result: 'FAIL',
        explanation: 'Program mandate is designated strictly for women in STEM to bridge gender disparity.'
      }
    ],
    fiveD: {
      academicRigor: {
        score: 88,
        requirement: '>= 75%',
        studentValue: '86.4%',
        explanation: 'Academic performance meets requirements.',
        weight: 20
      },
      degreeAlignment: {
        score: 15,
        requirement: 'B.Tech / STEM only',
        studentValue: 'B.Com (Honours)',
        explanation: 'Hard mismatch: Non-STEM commerce qualification.',
        weight: 30
      },
      stateDomicile: {
        score: 100,
        requirement: 'Pan-India',
        studentValue: 'Maharashtra',
        explanation: 'Pan-India eligibility satisfied.',
        weight: 10
      },
      financialNeed: {
        score: 85,
        requirement: '< ₹8.0L',
        studentValue: '₹3,20,000',
        explanation: 'Qualifies on financial bounds.',
        weight: 15
      },
      cohortCategory: {
        score: 0,
        requirement: 'Female STEM Candidates',
        studentValue: 'Male',
        explanation: 'Hard mismatch: Scheme restricted to women in STEM.',
        weight: 25
      },
      overallScore: 42
    },
    applicationProcess: [
      { step: 1, title: 'Ineligible Profile', desc: 'Direct application disabled due to gender and degree constraints.', duration: 'N/A' }
    ],
    isDemoData: true
  }
];
