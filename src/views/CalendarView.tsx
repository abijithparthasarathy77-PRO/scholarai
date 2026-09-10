import React, { useState, useMemo } from 'react';
import { Scholarship } from '../types';
import { CountdownTimer } from '../components/CountdownTimer';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Coins, 
  Building, 
  X, 
  Plus, 
  ArrowRight,
  ExternalLink,
  CalendarCheck,
  Smartphone,
  BookmarkPlus,
  Layers,
  FileText
} from 'lucide-react';

interface CalendarViewProps {
  scholarships: Scholarship[];
  onViewScholarship: (scholarship: Scholarship) => void;
  onApplyOrSave?: (scholarship: Scholarship) => void;
}

interface CalendarEvent {
  id: string;
  scholarshipId: string;
  title: string;
  provider: string;
  funding_formatted: string;
  funding_amount: number;
  dateStr: string; // "YYYY-MM-DD"
  day: number;
  month: number; // 0 to 11
  year: number;
  urgency: 'critical' | 'high' | 'normal';
  note: string;
  requiredDocs: string[];
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarView: React.FC<CalendarViewProps> = ({
  scholarships,
  onViewScholarship,
  onApplyOrSave,
}) => {
  // Navigation State
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = October (0-indexed)
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

  // Selected Day State for Touch / Click Detail
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>('2026-10-24');
  const [studentNotes, setStudentNotes] = useState<Record<string, string[]>>({
    '2026-10-24': ['Finalize Tata SOP draft with Economics professor.'],
    '2026-10-27': ['Collect Bonafide seal from College Counter #4.'],
  });
  const [customNoteInput, setCustomNoteInput] = useState('');

  // Reminder Modal State
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [selectedScholarshipForReminder, setSelectedScholarshipForReminder] = useState<Scholarship | null>(null);
  const [reminderSaved, setReminderSaved] = useState(false);

  // Distribute rich realistic scholarships across the entire year of 2026/2027
  const yearEvents: CalendarEvent[] = useMemo(() => {
    return [
      // January
      {
        id: 'ev_jan_15',
        scholarshipId: 'sch_kc_mahindra_pg',
        title: 'K. C. Mahindra Scholarships for Post-Graduate Studies Abroad',
        provider: 'K. C. Mahindra Education Trust',
        funding_formatted: '₹5,00,000 - ₹10,00,000 (Loan Grant)',
        funding_amount: 500000,
        dateStr: `${currentYear}-01-15`,
        day: 15,
        month: 0,
        year: currentYear,
        urgency: 'normal',
        note: 'Requires completed First Class UG degree and confirmed admission in foreign postgraduate institution.',
        requiredDocs: ['Undergraduate Degree Certificate', 'Foreign University Admit Letter', 'Passport'],
      },
      {
        id: 'ev_jan_28',
        scholarshipId: 'sch_dst_inspire',
        title: 'DST INSPIRE Scholarship for Higher Education (SHE)',
        provider: 'Department of Science & Technology (DST), Govt. of India',
        funding_formatted: '₹80,000 / year',
        funding_amount: 80000,
        dateStr: `${currentYear}-01-28`,
        day: 28,
        month: 0,
        year: currentYear,
        urgency: 'normal',
        note: 'Requires top 1% cutoff in Class XII Board examinations and enrollment in natural/basic sciences.',
        requiredDocs: ['Class XII Marksheet', 'College Admission Proof', 'Endorsement Form'],
      },

      // February
      {
        id: 'ev_feb_10',
        scholarshipId: 'sch_aicte_pragati',
        title: 'AICTE Pragati Scholarship Scheme for Girl Students',
        provider: 'All India Council for Technical Education (AICTE), Ministry of Education',
        funding_formatted: '₹50,000 / year',
        funding_amount: 50000,
        dateStr: `${currentYear}-02-10`,
        day: 10,
        month: 1,
        year: currentYear,
        urgency: 'normal',
        note: 'Empowers meritorious girl students admitted to AICTE approved technical colleges (B.Tech/Pharmacy/Arch).',
        requiredDocs: ['AICTE College Admission Proof', 'Income Certificate', 'Aadhaar Card'],
      },
      {
        id: 'ev_feb_22',
        scholarshipId: 'sch_dr_ambedkar_ebc',
        title: 'Dr. Ambedkar Centrally Sponsored Post-Matric Scholarship for EBC Students',
        provider: 'Ministry of Social Justice & Empowerment, Govt. of India',
        funding_formatted: '₹35,000 / year (Fee Waiver & Maintenance)',
        funding_amount: 35000,
        dateStr: `${currentYear}-02-22`,
        day: 22,
        month: 1,
        year: currentYear,
        urgency: 'normal',
        note: 'Centrally sponsored assistance for General category students from Economically Backward Classes (income <= 2.5L).',
        requiredDocs: ['EBC / Income Certificate', 'Class XII Transcript', 'Bonafide Certificate'],
      },

      // March
      {
        id: 'ev_mar_14',
        scholarshipId: 'sch_sbif_asha',
        title: 'SBIF Asha Scholarship Program 2026',
        provider: 'SBI Foundation',
        funding_formatted: '₹50,000 / year',
        funding_amount: 50000,
        dateStr: `${currentYear}-03-14`,
        day: 14,
        month: 2,
        year: currentYear,
        urgency: 'normal',
        note: 'Annual financial assistance for meritorious students with family income <= ₹3 Lakhs studying in recognized colleges.',
        requiredDocs: ['Class XII Marksheet', 'Income Certificate', 'Bonafide Certificate', 'Bank Account Details'],
      },
      {
        id: 'ev_mar_31',
        scholarshipId: 'sch_moma_post_matric',
        title: 'Post-Matric Scholarship Scheme for Minorities (MoMA)',
        provider: 'Ministry of Minority Affairs, Govt. of India',
        funding_formatted: '₹20,000 / year (Fee Waiver + Maintenance)',
        funding_amount: 20000,
        dateStr: `${currentYear}-03-31`,
        day: 31,
        month: 2,
        year: currentYear,
        urgency: 'normal',
        note: 'National Scholarship Portal window for students from notified minority communities with family income <= 2 Lakhs.',
        requiredDocs: ['Self-Declaration of Minority Community', 'Income Certificate', 'Bonafide Certificate'],
      },

      // April
      {
        id: 'ev_apr_12',
        scholarshipId: 'sch_national_merit_commerce',
        title: 'Central Sector Scheme of Scholarship for College and University Students (PM-USP CSSS)',
        provider: 'Department of Higher Education, Ministry of Education, Govt. of India',
        funding_formatted: '₹20,000 / year (₹12,000 UG / ₹20,000 PG)',
        funding_amount: 20000,
        dateStr: `${currentYear}-04-12`,
        day: 12,
        month: 3,
        year: currentYear,
        urgency: 'normal',
        note: 'Direct PFMS transfer for students scoring above 80th percentile in relevant stream in Class XII State Board exam.',
        requiredDocs: ['Class XII Transcript', 'Bonafide Certificate', 'Income Certificate', 'Aadhaar Seeded DBT Account'],
      },
      {
        id: 'ev_apr_25',
        scholarshipId: 'sch_tata_pankh',
        title: 'Tata Capital Pankh Scholarship Program',
        provider: 'Tata Capital Limited',
        funding_formatted: '₹40,000 / year',
        funding_amount: 40000,
        dateStr: `${currentYear}-04-25`,
        day: 25,
        month: 3,
        year: currentYear,
        urgency: 'normal',
        note: 'Corporate CSR support for undergraduate commerce, arts, and science scholars from low-income families.',
        requiredDocs: ['Income Certificate', 'College ID Card', 'Marksheet', 'Bonafide'],
      },

      // May
      {
        id: 'ev_may_10',
        scholarshipId: 'sch_canara_vidyajyothi',
        title: 'Canara Bank Vidya Jyothi Meritorious Student Scheme',
        provider: 'Canara Bank Jubilee Education Fund',
        funding_formatted: '₹30,000 / year',
        funding_amount: 30000,
        dateStr: `${currentYear}-05-10`,
        day: 10,
        month: 4,
        year: currentYear,
        urgency: 'normal',
        note: 'Encouraging academic rigor among economically disadvantaged undergraduate students with >= 70% marks.',
        requiredDocs: ['Class XII Marksheet', 'Income Certificate', 'Bonafide Certificate'],
      },
      {
        id: 'ev_may_28',
        scholarshipId: 'sch_kotak_kanya',
        title: 'Kotak Kanya Scholarship for Girl Scholars',
        provider: 'Kotak Education Foundation',
        funding_formatted: '₹1,50,000 / year',
        funding_amount: 150000,
        dateStr: `${currentYear}-05-28`,
        day: 28,
        month: 4,
        year: currentYear,
        urgency: 'normal',
        note: 'Restricted exclusively to female applicants pursuing professional graduation with >= 85% in Class XII.',
        requiredDocs: ['Class XII Marksheet', 'Income Certificate', 'Bonafide Certificate'],
      },

      // June
      {
        id: 'ev_jun_15',
        scholarshipId: 'sch_google_generation',
        title: 'Generation Google Scholarship (APAC) for Women in Computer Science',
        provider: 'Google LLC',
        funding_formatted: '₹2,10,000 ($2,500 USD Merit Grant)',
        funding_amount: 210000,
        dateStr: `${currentYear}-06-15`,
        day: 15,
        month: 5,
        year: currentYear,
        urgency: 'normal',
        note: 'Global award for women enrolled in Computer Science / Computer Engineering demonstrating academic excellence.',
        requiredDocs: ['Resume / CV', 'Academic Transcript', 'Two Essay Responses'],
      },
      {
        id: 'ev_jun_30',
        scholarshipId: 'sch_pwd_divyangjan',
        title: 'Post-Matric Scholarship Scheme for Students with Disabilities (Divyangjan)',
        provider: 'Department of Empowerment of Persons with Disabilities, Ministry of Social Justice',
        funding_formatted: '₹40,000 / year (Fee Waiver + Disability Support)',
        funding_amount: 40000,
        dateStr: `${currentYear}-06-30`,
        day: 30,
        month: 5,
        year: currentYear,
        urgency: 'normal',
        note: 'Statutory central scheme providing financial assistance to students with benchmark disabilities (40%+).',
        requiredDocs: ['UDID Disability Certificate (>=40%)', 'Income Certificate', 'Bonafide Certificate'],
      },

      // July
      {
        id: 'ev_jul_12',
        scholarshipId: 'sch_idfc_first_mba_ug',
        title: 'IDFC FIRST Bank MBA & Undergraduate Scholarship Program',
        provider: 'IDFC FIRST Bank CSR',
        funding_formatted: '₹1,00,000 / year (₹2,00,000 Total)',
        funding_amount: 100000,
        dateStr: `${currentYear}-07-12`,
        day: 12,
        month: 6,
        year: currentYear,
        urgency: 'normal',
        note: 'Financial assistance for students pursuing Commerce, Banking, and Financial services courses.',
        requiredDocs: ['Class XII Transcript', 'Bonafide Certificate', 'Income Certificate'],
      },
      {
        id: 'ev_jul_26',
        scholarshipId: 'sch_karnataka_epass',
        title: 'Karnataka State Post-Matric Vidyasiri Fee Concession Scheme',
        provider: 'Backward Classes Welfare Department, Govt. of Karnataka',
        funding_formatted: '₹35,000 / year (Fee Waiver + Stipend)',
        funding_amount: 35000,
        dateStr: `${currentYear}-07-26`,
        day: 26,
        month: 6,
        year: currentYear,
        urgency: 'normal',
        note: 'Exclusive statutory concession for permanent Karnataka domicile holders studying in state institutions.',
        requiredDocs: ['Karnataka Domicile RD Certificate', 'Income Certificate', 'College Fee Receipt'],
      },

      // August
      {
        id: 'ev_aug_10',
        scholarshipId: 'sch_infosys_foundation_stem',
        title: 'Infosys Foundation STEM Stars Excellence Award',
        provider: 'Infosys Foundation',
        funding_formatted: '₹1,00,000 / year',
        funding_amount: 100000,
        dateStr: `${currentYear}-08-10`,
        day: 10,
        month: 7,
        year: currentYear,
        urgency: 'normal',
        note: 'Financial grant for underprivileged girl students enrolled in top NIRF 100 institutes for engineering and computer science.',
        requiredDocs: ['JEE Scorecard', 'Class XII Marksheet', 'Income Certificate'],
      },
      {
        id: 'ev_aug_24',
        scholarshipId: 'sch_sitaram_jindal',
        title: 'Sitaram Jindal Foundation Scholarship Scheme (Category C & D)',
        provider: 'Sitaram Jindal Foundation',
        funding_formatted: '₹38,400 / year (₹3,200 / month)',
        funding_amount: 38400,
        dateStr: `${currentYear}-08-24`,
        day: 24,
        month: 7,
        year: currentYear,
        urgency: 'normal',
        note: 'Regular undergraduate commerce applicants with family income < 4 Lakhs.',
        requiredDocs: ['Class XII Transcript', 'Income Certificate', 'Bonafide Letter'],
      },

      // September
      {
        id: 'ev_sep_12',
        scholarshipId: 'sch_tata_merit_endowment',
        title: 'Tata Trusts Individual Grants for Undergraduate Studies',
        provider: 'Sir Ratan Tata Trust & Allied Philanthropic Trusts',
        funding_formatted: '₹1,00,000 / year',
        funding_amount: 100000,
        dateStr: `${currentYear}-09-12`,
        day: 12,
        month: 8,
        year: currentYear,
        urgency: 'critical',
        note: '🔴 URGENT: Closes in less than 48 hours! Final SOP & Tahsildar income renewal acknowledgment required.',
        requiredDocs: ['Statement of Purpose', 'Class XII Marksheet', 'Bonafide Certificate', 'Income Certificate'],
      },
      {
        id: 'ev_sep_18',
        scholarshipId: 'sch_national_merit_commerce',
        title: 'Central Sector Scheme of Scholarship for College and University Students (PM-USP CSSS)',
        provider: 'Department of Higher Education, Ministry of Education, Govt. of India',
        funding_formatted: '₹20,000 / year (₹12,000 UG / ₹20,000 PG)',
        funding_amount: 20000,
        dateStr: `${currentYear}-09-18`,
        day: 18,
        month: 8,
        year: currentYear,
        urgency: 'high',
        note: '🟡 NSP registration complete. Procure official college verification stamp before closing.',
        requiredDocs: ['NSP Registration ID', 'Aadhaar eKYC', 'College Seal', 'Income Slip'],
      },
      {
        id: 'ev_sep_24',
        scholarshipId: 'sch_aditya_birla',
        title: 'Aditya Birla Capital Scholarship for Undergraduate Scholars',
        provider: 'Aditya Birla Capital Foundation',
        funding_formatted: '₹60,000 / year',
        funding_amount: 60000,
        dateStr: `${currentYear}-09-24`,
        day: 24,
        month: 8,
        year: currentYear,
        urgency: 'normal',
        note: 'Undergraduate commerce and humanities scholars with verified parent ITR / income proof.',
        requiredDocs: ['Parent ITR / Income Certificate', 'Mark Sheet', 'Bonafide'],
      },
      {
        id: 'ev_sep_30',
        scholarshipId: 'sch_hdfc_badhte_kadam',
        title: "HDFC Bank Parivartan's ECSS (Educational Crisis Support Scholarship)",
        provider: 'HDFC Bank Parivartan CSR',
        funding_formatted: '₹50,000 / year',
        funding_amount: 50000,
        dateStr: `${currentYear}-09-30`,
        day: 30,
        month: 8,
        year: currentYear,
        urgency: 'normal',
        note: 'Disaster / economic hardship quota. Faculty recommendation letter requested.',
        requiredDocs: ['Income Self-Declaration', 'Academic Record', 'HOD Recommendation'],
      },

      // October (Target Month)
      {
        id: 'ev_oct_10',
        scholarshipId: 'sch_maha_ews_freeship',
        title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC/EWS)',
        provider: 'Directorate of Higher Education (DHE), Govt. of Maharashtra',
        funding_formatted: '₹48,000 / year (50% Tuition Fee Waiver)',
        funding_amount: 48000,
        dateStr: `${currentYear}-10-10`,
        day: 10,
        month: 9,
        year: currentYear,
        urgency: 'normal',
        note: '50% tuition and exam fee waiver under MahaDBT. College scrutiny in progress.',
        requiredDocs: ['Domicile Certificate', 'Income Certificate', 'Class XII Transcript', 'Bonafide Certificate'],
      },
      {
        id: 'ev_oct_18',
        scholarshipId: 'sch_reliance_foundation',
        title: 'Reliance Foundation Undergraduate Scholarship 2026',
        provider: 'Reliance Foundation',
        funding_formatted: '₹2,00,000 (Total Degree Grant - ₹50,000/yr)',
        funding_amount: 200000,
        dateStr: `${currentYear}-10-18`,
        day: 18,
        month: 9,
        year: currentYear,
        urgency: 'high',
        note: '🟡 Online aptitude test slot booking closes on October 18.',
        requiredDocs: ['Class XII Marksheet', 'Income Certificate', 'Aptitude Test Registration'],
      },
      {
        id: 'ev_oct_24',
        scholarshipId: 'sch_tata_merit_endowment',
        title: 'Tata Trusts Individual Grants for Undergraduate Studies',
        provider: 'Sir Ratan Tata Trust & Allied Philanthropic Trusts',
        funding_formatted: '₹1,00,000 / year',
        funding_amount: 100000,
        dateStr: `${currentYear}-10-24`,
        day: 24,
        month: 9,
        year: currentYear,
        urgency: 'critical',
        note: '🔴 CRITICAL INTAKE CUTOFF: Closes in 48 Hours! Final SOP & Tahsildar Income Slip Required.',
        requiredDocs: ['Statement of Purpose', 'Class XII Marksheet', 'Bonafide Letter', 'Income Certificate'],
      },
      {
        id: 'ev_oct_27',
        scholarshipId: 'sch_national_merit_commerce',
        title: 'Central Sector Scheme of Scholarship (PM-USP CSSS)',
        provider: 'Department of Higher Education, Ministry of Education, Govt. of India',
        funding_formatted: '₹20,000 / year (₹12,000 UG / ₹20,000 PG)',
        funding_amount: 20000,
        dateStr: `${currentYear}-10-27`,
        day: 27,
        month: 9,
        year: currentYear,
        urgency: 'high',
        note: '🟡 NSP Verification Stamp from College Authority Required before state board closing.',
        requiredDocs: ['NSP Application Form', 'College Verification Stamp', 'Income Proof'],
      },
      {
        id: 'ev_oct_29',
        scholarshipId: 'sch_loreal_women_stem',
        title: "L'Oréal India For Young Women in Science Scholarship (FYWIS)",
        provider: "L'Oréal India & UNESCO",
        funding_formatted: '₹85,000 / year (Up to ₹2,50,000 Total)',
        funding_amount: 85000,
        dateStr: `${currentYear}-10-29`,
        day: 29,
        month: 9,
        year: currentYear,
        urgency: 'normal',
        note: 'Exclusion Notice: Restricted to female candidates who completed Class 12 Science (PCM/PCB). Manual review appeal option available.',
        requiredDocs: ['Class XII Science Marksheet', 'College Admission Proof', 'Income Certificate'],
      },

      // November
      {
        id: 'ev_nov_12',
        scholarshipId: 'sch_sbif_asha',
        title: 'SBIF Asha Scholarship Program 2026 (Winter Cycle)',
        provider: 'SBI Foundation',
        funding_formatted: '₹50,000 / year',
        funding_amount: 50000,
        dateStr: `${currentYear}-11-12`,
        day: 12,
        month: 10,
        year: currentYear,
        urgency: 'normal',
        note: 'Winter grant cycle for students scoring >= 75% with family income <= ₹3 Lakhs.',
        requiredDocs: ['Class XII Marksheet', 'Income Certificate', 'Bonafide Certificate', 'Bank Account Details'],
      },
      {
        id: 'ev_nov_25',
        scholarshipId: 'sch_tata_pankh',
        title: 'Tata Capital Pankh Scholarship Program (Phase 2)',
        provider: 'Tata Capital Limited',
        funding_formatted: '₹40,000 / year',
        funding_amount: 40000,
        dateStr: `${currentYear}-11-25`,
        day: 25,
        month: 10,
        year: currentYear,
        urgency: 'normal',
        note: 'Phase 2 evaluation for undergraduate commerce and professional degree students.',
        requiredDocs: ['Class XII Transcript', 'Income Certificate', 'Bonafide Certificate'],
      },

      // December
      {
        id: 'ev_dec_15',
        scholarshipId: 'sch_maha_ews_freeship',
        title: 'Rajarshi Chhatrapati Shahu Maharaj Scheme (MahaDBT Term 2 Renewal)',
        provider: 'Govt. of Maharashtra (MahaDBT)',
        funding_formatted: '₹48,000 / year (50% Tuition Fee Waiver)',
        funding_amount: 48000,
        dateStr: `${currentYear}-12-15`,
        day: 15,
        month: 11,
        year: currentYear,
        urgency: 'normal',
        note: 'MahaDBT Term 2 fee waiver disbursement and college attendance certificate verification.',
        requiredDocs: ['College Term 2 Fee Receipt', 'Attendance Certificate', 'Income Certificate'],
      },
      {
        id: 'ev_dec_28',
        scholarshipId: 'sch_national_merit_commerce',
        title: 'Central Sector Scheme (PM-USP CSSS Final Verification Window)',
        provider: 'Department of Higher Education, Ministry of Education, Govt. of India',
        funding_formatted: '₹20,000 / year (₹12,000 UG / ₹20,000 PG)',
        funding_amount: 20000,
        dateStr: `${currentYear}-12-28`,
        day: 28,
        month: 11,
        year: currentYear,
        urgency: 'normal',
        note: 'Annual fiscal year-end verification closure for Central Sector PM-USP CSSS on NSP portal.',
        requiredDocs: ['NSP Registration ID', 'Aadhaar eKYC', 'College Seal', 'Income Slip'],
      },
    ];
  }, [currentYear]);

  // Calendar Math for Current Month
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayIndex = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  // Map events of the active month by day
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    yearEvents.forEach(ev => {
      if (ev.year === currentYear && ev.month === currentMonth) {
        const existing = map.get(ev.day) || [];
        existing.push(ev);
        map.set(ev.day, existing);
      }
    });
    return map;
  }, [yearEvents, currentYear, currentMonth]);

  // Handlers for month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleJumpToCurrent = () => {
    setCurrentYear(2026);
    setCurrentMonth(9); // October
    setSelectedDateStr('2026-10-24');
  };

  // When a day cell is clicked/touched
  const handleSelectDay = (day: number) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateStr = `${currentYear}-${pad(currentMonth + 1)}-${pad(day)}`;
    setSelectedDateStr(dateStr);
  };

  // Selected Date events and details
  const selectedDayEvents = useMemo(() => {
    if (!selectedDateStr) return [];
    return yearEvents.filter(ev => ev.dateStr === selectedDateStr);
  }, [yearEvents, selectedDateStr]);

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNoteInput.trim() || !selectedDateStr) return;
    setStudentNotes(prev => {
      const existing = prev[selectedDateStr] || [];
      return { ...prev, [selectedDateStr]: [...existing, customNoteInput.trim()] };
    });
    setCustomNoteInput('');
  };

  const handleOpenReminder = (scholarship: Scholarship) => {
    setSelectedScholarshipForReminder(scholarship);
    setReminderSaved(false);
    setReminderModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Header & Year / Month Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shadow-2xs">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-sans">
              Annual Scholarship Deadline Calendar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Navigate any month across the academic year. Click or touch any date to inspect scholarship criteria and action notes.
          </p>
        </div>

        {/* Manual Month & Year Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          {/* Quick Jump */}
          <button
            onClick={handleJumpToCurrent}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition-colors"
          >
            Jump to October 2026
          </button>

          {/* Month / Year Selectors */}
          <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-2xs">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Manual Month Dropdown */}
            <select
              value={currentMonth}
              onChange={e => setCurrentMonth(Number(e.target.value))}
              className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-transparent outline-hidden cursor-pointer"
            >
              {MONTH_NAMES.map((m, idx) => (
                <option key={idx} value={idx}>{m}</option>
              ))}
            </select>

            {/* Manual Year Dropdown */}
            <select
              value={currentYear}
              onChange={e => setCurrentYear(Number(e.target.value))}
              className="px-2 py-1 text-xs font-bold text-indigo-700 bg-transparent outline-hidden cursor-pointer border-l border-slate-200 ml-1"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
            </select>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'month' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month View
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'year' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12-Month Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Urgency Guide Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-slate-200 text-xs shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700">Urgency Tiers:</span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5 animate-pulse"></span>
            CRITICAL (&lt; 3 Days)
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
            HIGH (3–10 Days)
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-400 mr-1.5"></span>
            NORMAL (&gt; 10 Days)
          </span>
        </div>

        <div className="text-slate-500 font-medium text-[11px]">
          Viewing: <strong className="text-slate-900">{MONTH_NAMES[currentMonth]} {currentYear}</strong>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE MONTH CALENDAR WITH TOUCH / CLICK DETAILS */}
      {viewMode === 'month' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Calendar Grid (2 Cols on Desktop) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black text-slate-900">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  ({eventsByDay.size} active deadline days)
                </span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Touch or click any date to reveal scholarship details & notes
              </span>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 pb-1 uppercase tracking-wider">
              {DAYS_OF_WEEK.map((d, i) => (
                <div key={d} className={`py-1 ${i === 0 || i === 6 ? 'text-slate-300' : ''}`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Previous Month Padding */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div
                  key={`pad_${idx}`}
                  className="min-h-[75px] sm:min-h-[95px] rounded-2xl bg-slate-50/50 border border-transparent p-1.5 opacity-30 text-slate-300 text-xs select-none"
                >
                  <span className="text-[11px] font-semibold">
                    {new Date(currentYear, currentMonth, -firstDayIndex + idx + 1).getDate()}
                  </span>
                </div>
              ))}

              {/* Days of Current Month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const pad = (n: number) => String(n).padStart(2, '0');
                const dateStr = `${currentYear}-${pad(currentMonth + 1)}-${pad(day)}`;
                const isSelected = selectedDateStr === dateStr;
                const dayEvents = eventsByDay.get(day) || [];
                const hasCritical = dayEvents.some(e => e.urgency === 'critical');
                const hasHigh = dayEvents.some(e => e.urgency === 'high');
                const hasNormal = dayEvents.some(e => e.urgency === 'normal');

                return (
                  <div
                    key={day}
                    onClick={() => handleSelectDay(day)}
                    className={`min-h-[75px] sm:min-h-[95px] rounded-2xl p-1.5 sm:p-2 border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
                        : dayEvents.length > 0
                        ? 'border-slate-300 bg-white hover:border-indigo-400 hover:shadow-xs'
                        : 'border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    {/* Date Number & Event Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${
                        isSelected 
                          ? 'w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center -ml-0.5 -mt-0.5' 
                          : hasCritical 
                          ? 'text-rose-700 font-extrabold' 
                          : 'text-slate-800'
                      }`}>
                        {day}
                      </span>

                      {dayEvents.length > 0 && (
                        <span className={`w-2 h-2 rounded-full ${
                          hasCritical 
                            ? 'bg-rose-500 animate-ping' 
                            : hasHigh 
                            ? 'bg-amber-500' 
                            : 'bg-indigo-500'
                        }`} />
                      )}
                    </div>

                    {/* Scholarship Event Badges inside Cell */}
                    <div className="space-y-1 mt-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map(ev => (
                        <div
                          key={ev.id}
                          className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md truncate transition-transform group-hover:scale-[1.02] border ${
                            ev.urgency === 'critical'
                              ? 'bg-rose-600 text-white border-rose-700 shadow-2xs'
                              : ev.urgency === 'high'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          }`}
                          title={`${ev.title} - ${ev.funding_formatted}`}
                        >
                          {ev.title}
                        </div>
                      ))}

                      {dayEvents.length > 2 && (
                        <span className="text-[9px] text-slate-500 font-bold block text-right">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOUCH / CLICK DETAIL PANEL: Scholarship Details & Notes */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                  Scholarship Day Dossier
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedDateStr 
                    ? new Date(selectedDateStr).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
                    : 'Select a Date'}
                </h3>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {selectedDayEvents.length} Schemes
              </span>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-xs font-bold text-slate-700">No deadlines scheduled on this date</h4>
                <p className="text-[11px] text-slate-500">
                  Click on highlighted days with colorful pills (e.g. October 24 or 27) to inspect scholarship details.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayEvents.map(ev => {
                  const targetSch = scholarships.find(s => s.id === ev.scholarshipId) || scholarships[0];
                  return (
                    <div
                      key={ev.id}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        ev.urgency === 'critical'
                          ? 'border-rose-300 bg-rose-50/40 shadow-xs'
                          : ev.urgency === 'high'
                          ? 'border-amber-300 bg-amber-50/40'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                            ev.urgency === 'critical'
                              ? 'bg-rose-600 text-white border-rose-700'
                              : ev.urgency === 'high'
                              ? 'bg-amber-500 text-white border-amber-600'
                              : 'bg-slate-200 text-slate-800 border-slate-300'
                          }`}>
                            {ev.urgency === 'critical' ? '🔴 Critical Deadline' : ev.urgency === 'high' ? '🟡 High Urgency' : '🔵 Upcoming'}
                          </span>

                          <CountdownTimer deadline={`${ev.dateStr}T23:59:59Z`} compact />
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {ev.title}
                        </h4>
                        <div className="text-xs text-slate-500 mt-0.5">{ev.provider}</div>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Award Amount</span>
                          <strong className="text-slate-900 font-extrabold">{ev.funding_formatted}</strong>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Direct DBT Transfer
                        </span>
                      </div>

                      {/* Scholarship Note / Specific Action */}
                      <div className="p-2.5 bg-white/80 rounded-xl border border-slate-200 text-xs">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                          Intake Note & Blocker Check
                        </span>
                        <p className="text-slate-700 leading-relaxed text-[11px]">
                          {ev.note}
                        </p>
                      </div>

                      {/* Required Documents Tag Pills */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          Mandatory Documents Checklist:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {ev.requiredDocs.map((doc, didx) => (
                            <span
                              key={didx}
                              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-700 font-medium"
                            >
                              ✓ {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onViewScholarship(targetSch)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                        >
                          <span>Full Dossier</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleOpenReminder(targetSch)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"
                            title="Set deadline alert"
                          >
                            <Bell className="w-3.5 h-3.5" />
                          </button>

                          {onApplyOrSave && (
                            <button
                              onClick={() => onApplyOrSave(targetSch)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors flex items-center space-x-1"
                            >
                              <BookmarkPlus className="w-3.5 h-3.5" />
                              <span>Track</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Custom Student Action Note Form */}
            {selectedDateStr && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Your Personal Notes for this Date</span>
                </span>

                {/* List existing custom notes */}
                {studentNotes[selectedDateStr] && studentNotes[selectedDateStr].length > 0 && (
                  <ul className="space-y-1 text-xs">
                    {studentNotes[selectedDateStr].map((note, nidx) => (
                      <li key={nidx} className="p-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-[11px]">
                        📝 {note}
                      </li>
                    ))}
                  </ul>
                )}

                <form onSubmit={handleAddCustomNote} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={customNoteInput}
                    onChange={e => setCustomNoteInput(e.target.value)}
                    placeholder="Add student reminder note..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={!customNoteInput.trim()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL YEAR 12-MONTH MATRIX */}
      {viewMode === 'year' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              {currentYear} Academic Year Scholarship Intake Schedule
            </h3>
            <span className="text-xs text-slate-500">
              Click any month to open its detailed calendar view
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MONTH_NAMES.map((monthName, mIdx) => {
              const monthEvents = yearEvents.filter(e => e.month === mIdx);
              const isCurrent = mIdx === currentMonth;
              const hasCritical = monthEvents.some(e => e.urgency === 'critical');

              return (
                <div
                  key={monthName}
                  onClick={() => {
                    setCurrentMonth(mIdx);
                    setViewMode('month');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{monthName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      hasCritical 
                        ? 'bg-rose-100 text-rose-700' 
                        : monthEvents.length > 0 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {monthEvents.length} Schemes
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    {monthEvents.length === 0 ? (
                      <span className="text-[11px] text-slate-400 block italic py-2">
                        No primary schemes closing
                      </span>
                    ) : (
                      monthEvents.slice(0, 3).map(ev => (
                        <div
                          key={ev.id}
                          className="text-[11px] text-slate-700 font-medium truncate flex items-center space-x-1"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            ev.urgency === 'critical' ? 'bg-rose-500' : ev.urgency === 'high' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          <span className="truncate">{ev.title}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-indigo-600">
                    <span>Inspect {monthName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DEADLINE REMINDER CONFIGURATION MODAL */}
      {reminderModalOpen && selectedScholarshipForReminder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Configure Deadline Alert
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Scheme: <strong className="text-slate-800">{selectedScholarshipForReminder.title}</strong>
            </p>

            {reminderSaved ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Alert Schedule Configured</h4>
                <p className="text-xs text-slate-600">
                  Priority deadline notifications scheduled for 48h and 12h before closure.
                </p>
                <button
                  onClick={() => setReminderModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">In-App Urgency Banner</strong>
                      <span className="text-slate-500 text-[11px]">Direct dashboard countdown and notification panel</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Email Digest Dispatch</strong>
                      <span className="text-slate-500 text-[11px]">Dispatches to student email address</span>
                    </div>
                  </label>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 opacity-80">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center space-x-1.5">
                        <CalendarCheck className="w-4 h-4 text-slate-500" />
                        <span>Google Calendar / iCal Sync</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Integration not connected
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      External webhooks require user Google OAuth token consent.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button
                    onClick={() => setReminderModalOpen(false)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setReminderSaved(true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                  >
                    Save Alert Schedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
