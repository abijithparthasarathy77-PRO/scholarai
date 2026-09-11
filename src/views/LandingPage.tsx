import React from 'react';
import { ThemeMode } from '../types';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Search, 
  TrendingUp, 
  Coins, 
  Lock,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExploreDashboard: () => void;
  onExploreCatalog: () => void;
  onNavigateToLogin: () => void;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onExploreDashboard,
  onExploreCatalog,
  onNavigateToLogin,
  currentTheme,
  onSelectTheme,
}) => {
  return (
    <div className={`min-h-screen bg-transparent flex flex-col selection:bg-indigo-500 selection:text-white relative z-10 ${
      currentTheme === 'midnight' ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Top Notice */}
      <div className="bg-indigo-950/80 backdrop-blur-md text-indigo-200 text-xs py-2 px-4 text-center font-medium border-b border-indigo-800/40">
        ✨ <strong>ScholarAI 2026 Release</strong>: Non-black-box explainable eligibility engine with 5-dimensional audit is now active.
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className={`text-xl font-black tracking-tight font-sans ${
              currentTheme === 'midnight' ? 'text-white' : 'text-slate-950'
            }`}>
              SCHOLAR<span className="text-indigo-600">AI</span>
            </span>
            <span className="text-[11px] block font-semibold text-slate-400 -mt-1">
              Find the funding you're eligible for.
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeSwitcher 
            currentTheme={currentTheme} 
            onSelectTheme={onSelectTheme} 
            compact 
          />

          <button
            onClick={onExploreCatalog}
            className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
              currentTheme === 'midnight' 
                ? 'text-slate-300 hover:text-white' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Explore Schemes
          </button>
          <button
            onClick={onNavigateToLogin}
            className={`text-xs font-bold px-3 py-2 rounded-xl border shadow-2xs transition-colors ${
              currentTheme === 'midnight'
                ? 'text-indigo-300 border-indigo-500/40 bg-slate-900/80 hover:bg-slate-800'
                : 'text-indigo-600 hover:text-indigo-800 border-indigo-200 bg-white/90 hover:bg-indigo-50'
            }`}
          >
            Sign In / Login
          </button>
          <button
            onClick={onExploreDashboard}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-indigo-500/25 transition-all"
          >
            Launch Aarav's Demo
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>AI + Finance + EdTech Opportunity Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] font-sans">
            Stop searching. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600">
              Start matching.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            ScholarAI uses AI to analyze your academic, financial, demographic and geographic profile to help you discover scholarship opportunities that fit your eligibility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Find My Scholarships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreDashboard}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-sm font-bold shadow-2xs transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Demo Dashboard</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 pt-4">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>5D Explainable Criteria</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Non-Black-Box Exclusion</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Deadline Urgency Ticker</span>
            </span>
          </div>
        </div>

        {/* Hero Interactive Dashboard Preview Widget */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-indigo-500/10 via-slate-100 to-white border border-slate-300/80 shadow-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
            {/* Mock Header Inside Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                  AS
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Aarav Sharma's Financial Intelligence Dashboard
                  </h3>
                  <span className="text-xs text-slate-500">
                    2nd Year B.Com Hons • St. Xavier's Mumbai • General-EWS
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                Profile Verification: 88%
              </span>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Qualified Opportunities</span>
                <span className="text-lg font-extrabold text-slate-900">28 Schemes</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Potential Funding</span>
                <span className="text-lg font-extrabold text-emerald-700">₹4,85,000</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Upcoming Deadlines</span>
                <span className="text-lg font-extrabold text-amber-700">5 Approaching</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Top Match Score</span>
                <span className="text-lg font-extrabold text-indigo-700">95% Strong Match</span>
              </div>
            </div>

            {/* Sample Matched Card inside Preview */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                    48h Remaining
                  </span>
                  <span className="text-xs font-bold text-slate-900">Tata Trusts Individual Grants for Undergraduate Studies</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Why you match: Academic requirement satisfied (86.4% vs 75%) • B.Com discipline aligned • State eligible.
                </p>
              </div>

              <button
                onClick={onExploreDashboard}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold self-start sm:self-auto shrink-0 shadow-xs"
              >
                Inspect Live Match
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Differentiators Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Traditional Scholarship Portals Fail Students
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Directories dump thousands of outdated links. ScholarAI operates as an intelligent eligibility co-pilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">5-Dimensional Explainable Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No black-box percentages. We evaluate Academic Rigor, Degree Alignment, State Domicile, Financial Need, and Cohort Category with explicit mathematical weights.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Non-Black-Box Exclusion Logic</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand exactly why you are rejected with explicit disqualifiers. If an edge case exists, students can file a formal Manual Audit Request to an institutional officer.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Live Countdown & Pipeline Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real dynamic countdown clocks calculate hours, minutes, and seconds from official deadlines. Drag-and-drop your applications from Interested to Applied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p>© 2026 ScholarAI Platform. Built for EdTech & Student Financial Assistance.</p>
          <p className="text-[11px] text-slate-500">
            *All funding amounts represent prospective opportunity values disbursed through official authorities via Direct Benefit Transfer (DBT).
          </p>
        </div>
      </footer>
    </div>
  );
};
