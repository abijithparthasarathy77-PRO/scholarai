import React from 'react';
import { StudentProfile, Scholarship, MatchResult, StudentDocument } from '../types';
import { AISynthesisMatrix } from '../components/AISynthesisMatrix';
import { UrgencyModule } from '../components/UrgencyModule';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Card3D } from '../components/Card3D';
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
      {/* Student Banner Header with 3D Tilt */}
      <Card3D maxTilt={6} glare={true}>
        <div className="rounded-3xl border border-white/80 dark:border-slate-800 p-6 sm:p-7 shadow-xl backdrop-blur-2xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden group preserve-3d">
          {/* Subtle Ambient Shimmer Corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-sky-500/5 to-transparent pointer-events-none rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />

          <div className="flex items-start sm:items-center space-x-4 z-10 preserve-3d">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 text-white font-black text-xl flex items-center justify-center shadow-lg shrink-0 translate-z-40 group-hover:rotate-6 transition-transform">
              AS
            </div>
            <div className="translate-z-20">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  {student.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25">
                  ID: STU-2026-XAV-0482
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-500/10 text-inherit border border-inherit/20">
                  {student.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 mr-0.5" />
                  <span>Enrolled Student</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 font-medium">
                {student.year} • <strong className="text-inherit font-bold">{student.degree}</strong> • {student.institution}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs opacity-70 mt-1.5">
                <span>Academic Standing: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{student.GPA} GPA</strong> ({student.percentage}%)</span>
                <span>•</span>
                <span>State Domicile: <strong className="text-inherit font-semibold">{student.domicile}</strong></span>
                <span>•</span>
                <span>Annual Household Income: <strong className="text-inherit font-semibold">₹{student.annual_income_inr.toLocaleString('en-IN')}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto z-10 translate-z-30">
            <button
              onClick={() => onNavigateTab('discover')}
              className="px-5 py-3 btn-animated-glow text-white rounded-xl text-xs font-bold shadow-lg flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Discover All 28 Schemes</span>
            </button>
          </div>
        </div>
      </Card3D>

      {/* TOP 4 KEY METRICS WITH INTERACTIVE 3D TILT */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Qualified Opportunities */}
        <Card3D maxTilt={7} glare={true} liftOnHover={-8} depthZ={24}>
          <div className="scholar-card p-5 rounded-2xl border shadow-sm preserve-3d h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 translate-z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Qualified Schemes</span>
                <div className="p-2 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 rounded-xl translate-z-30">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-inherit tracking-tight translate-z-40">28</div>
            </div>
            <div className="mt-2 pt-2 border-t border-inherit/10 flex items-center justify-between text-[11px] translate-z-10">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">100% Verified</span>
              <span className="opacity-60">+3 new this week</span>
            </div>
          </div>
        </Card3D>

        {/* Metric 2: Potential Funding */}
        <Card3D maxTilt={7} glare={true} liftOnHover={-8} depthZ={24}>
          <div className="scholar-card p-5 rounded-2xl border shadow-sm preserve-3d h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 translate-z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Potential Grants</span>
                <div className="p-2 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-xl translate-z-30">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight translate-z-40">₹4,85,000</div>
            </div>
            <div className="mt-2 pt-2 border-t border-inherit/10 flex items-center justify-between text-[11px] translate-z-10">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">DBT Direct Transfer</span>
              <span className="opacity-60">Cumulative</span>
            </div>
          </div>
        </Card3D>

        {/* Metric 3: Upcoming Deadlines */}
        <Card3D maxTilt={7} glare={true} liftOnHover={-8} depthZ={24}>
          <div className="scholar-card p-5 rounded-2xl border shadow-sm preserve-3d h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 translate-z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Deadlines</span>
                <div className="p-2 bg-rose-500/15 text-rose-600 dark:text-rose-400 rounded-xl translate-z-30">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 tracking-tight translate-z-40">5</div>
            </div>
            <div className="mt-2 pt-2 border-t border-inherit/10 flex items-center justify-between text-[11px] translate-z-10">
              <span className="text-rose-600 dark:text-rose-400 font-bold">Next in 34h</span>
              <span className="opacity-60">Tata Endowment</span>
            </div>
          </div>
        </Card3D>

        {/* Metric 4: Profile Verification */}
        <Card3D maxTilt={7} glare={true} liftOnHover={-8} depthZ={24}>
          <div className="scholar-card p-5 rounded-2xl border shadow-sm preserve-3d h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 translate-z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Health</span>
                <div className="p-2 bg-sky-500/15 text-sky-600 dark:text-sky-400 rounded-xl translate-z-30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400 tracking-tight translate-z-40">88%</div>
            </div>
            <div className="mt-2 pt-2 border-t border-inherit/10 flex items-center justify-between text-[11px] translate-z-10">
              <span className="text-amber-600 dark:text-amber-400 font-bold">1 Doc Needs Renewal</span>
              <span className="opacity-60">Income Cert</span>
            </div>
          </div>
        </Card3D>
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
