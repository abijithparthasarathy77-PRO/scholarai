import React from 'react';
import { StudentProfile, Scholarship, MatchResult, StudentDocument } from '../types';
import { AISynthesisMatrix } from '../components/AISynthesisMatrix';
import { UrgencyModule } from '../components/UrgencyModule';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { 
  Sparkles, 
  GraduationCap, 
  Coins, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

interface StudentDashboardProps {
  student: StudentProfile;
  scholarships: Scholarship[];
  matchResults: Map<string, MatchResult>;
  documents: StudentDocument[];
  onViewScholarship: (scholarship: Scholarship) => void;
  onApplyOrSave: (scholarship: Scholarship) => void;
  onOpenAdvisor: () => void;
  onNavigateTab: (tab: string) => void;
  onRenewDocument?: (docId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  scholarships,
  matchResults,
  documents,
  onViewScholarship,
  onApplyOrSave,
  onOpenAdvisor,
  onNavigateTab,
  onRenewDocument,
}) => {
  // Urgent scholarship for Urgency Module: Tata Merit Endowment
  const urgentScholarship = scholarships.find(s => s.id === 'sch_tata_merit_endowment') || scholarships[0];

  // Top 3 matched opportunities
  const eligibleScholarships = scholarships
    .filter(s => {
      const match = matchResults.get(s.id);
      return match && match.is_eligible;
    })
    .sort((a, b) => {
      const scoreA = matchResults.get(a.id)?.overall_score || 0;
      const scoreB = matchResults.get(b.id)?.overall_score || 0;
      return scoreB - scoreA;
    });

  // Calculate synthetic aggregate dimension scores for Aarav Sharma
  const topMatch = matchResults.get('sch_national_merit_commerce') || matchResults.get(urgentScholarship.id);
  const dimensions = topMatch?.dimension_scores || [];

  // Expired document alert
  const expiredDoc = documents.find(d => d.is_expired || d.status === 'expired');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Student Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 text-white font-black text-xl flex items-center justify-center shadow-md shrink-0">
            AS
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {student.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Sample Student Profile
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {student.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {student.year} • <strong className="text-slate-900">{student.degree}</strong> • {student.institution}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
              <span>GPA: <strong className="text-indigo-600">{student.GPA}</strong> ({student.percentage}%)</span>
              <span>•</span>
              <span>Domicile: <strong className="text-slate-700">{student.domicile}</strong></span>
              <span>•</span>
              <span>Income: <strong className="text-slate-700">₹{student.annual_income_inr.toLocaleString('en-IN')}/yr</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <button
            onClick={() => onNavigateTab('discover')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Discover All 28 Matches</span>
          </button>
        </div>
      </div>

      {/* TOP 4 KEY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Qualified Opportunities */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Qualified Opportunities</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">28</div>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">Verified schemes matching criteria</p>
        </div>

        {/* Metric 2: Potential Funding */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Potential Funding</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">₹4,85,000</div>
          <p className="text-[10px] text-slate-500 mt-1 italic leading-tight">
            *Potential opportunity value, not guaranteed funds.
          </p>
        </div>

        {/* Metric 3: Upcoming Deadlines */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Deadlines</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">5</div>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">Closing within the next 30 days</p>
        </div>

        {/* Metric 4: Profile Verification */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Verification</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-700 tracking-tight">88%</div>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">1 expired document needs update</p>
        </div>
      </div>

      {/* DOCUMENT EXPIRED BLOCKER NOTICE */}
      {expiredDoc && (
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-600 text-white rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-slate-900 font-bold block">
                Verification Blocker: Tahsildar Income Certificate Expired
              </strong>
              <span className="text-slate-600">
                Your uploaded certificate expired on 31-Mar-2026. Renewing it will elevate match status on 3 high-value schemes.
              </span>
            </div>
          </div>

          <button
            onClick={() => onRenewDocument && onRenewDocument(expiredDoc.id)}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow-2xs transition-colors shrink-0"
          >
            Update Document (FY 2026-27)
          </button>
        </div>
      )}

      {/* CRITICAL URGENCY MODULE */}
      <UrgencyModule
        urgentScholarship={urgentScholarship}
        onActionClick={onViewScholarship}
      />

      {/* 5D AI SYNTHESIS MATRIX */}
      <AISynthesisMatrix
        dimensions={dimensions}
        overallScore={topMatch?.overall_score || 92}
      />

      {/* TOP MATCHED OPPORTUNITIES SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Top Matched Opportunities for Your Profile
            </h2>
            <p className="text-xs text-slate-500">
              Ranked with transparent explainability. Every percentage is justified across 5 dimensions.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('discover')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>View all 28 schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {eligibleScholarships.slice(0, 3).map(sch => {
            const match = matchResults.get(sch.id)!;
            return (
              <ScholarshipCard
                key={sch.id}
                scholarship={sch}
                matchResult={match}
                onViewDetails={onViewScholarship}
                onApplyOrSave={onApplyOrSave}
              />
            );
          })}
        </div>
      </div>

      {/* AI ADVISOR CALLOUT PROMPT */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-6 rounded-3xl border border-indigo-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">
              ScholarAI Advisor Co-Pilot
            </span>
          </div>
          <h3 className="text-lg font-bold">Have questions about your scholarship eligibility?</h3>
          <p className="text-xs text-indigo-200/80 max-w-xl">
            Ask our grounded AI assistant: "Which scholarships should I prioritize?", "Why am I not eligible for this scholarship?", or "What documents am I missing?"
          </p>
        </div>

        <button
          onClick={onOpenAdvisor}
          className="px-5 py-3 bg-white hover:bg-slate-100 text-indigo-950 rounded-xl text-xs font-black shadow-sm transition-all shrink-0 flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Launch AI Advisor</span>
        </button>
      </div>
    </div>
  );
};
