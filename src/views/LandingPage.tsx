import React from 'react';
import { ThemeMode } from '../types';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Card3D } from '../components/Card3D';
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24 relative">
        {/* Floating Ambient Decorative Badge - Left */}
        <div className="hidden xl:flex absolute left-4 top-1/3 animate-float-slow items-center space-x-3 px-4 py-3 rounded-2xl glass-panel shadow-xl border border-white/80 z-20">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ₹
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block">
              High Eligibility
            </span>
            <span className="text-xs font-black text-inherit">₹3,75,000 Potential</span>
          </div>
        </div>

        {/* Floating Ambient Decorative Badge - Right */}
        <div className="hidden xl:flex absolute right-4 top-1/4 animate-float-reverse items-center space-x-3 px-4 py-3 rounded-2xl glass-panel shadow-xl border border-white/80 z-20">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 block">
              5D Match Engine
            </span>
            <span className="text-xs font-black text-inherit">95% Verified Score</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 text-xs font-bold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse pulse-radar"></span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>AI + Finance + EdTech Opportunity Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] font-sans">
            Stop searching. <br />
            <span className="animated-text-shimmer">
              Start matching.
            </span>
          </h1>

          <p className="text-base sm:text-lg opacity-75 leading-relaxed max-w-2xl mx-auto font-medium">
            ScholarAI uses AI to analyze your academic, financial, demographic and geographic profile to help you discover scholarship opportunities that fit your eligibility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-7 py-4 btn-animated-glow text-white rounded-xl text-sm font-black shadow-xl flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Find My Scholarships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onExploreDashboard}
              className={`w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold border shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] ${
                currentTheme === 'midnight'
                  ? 'bg-slate-900/80 border-slate-700 hover:bg-slate-800 text-white'
                  : 'bg-white/80 border-slate-200 hover:bg-white text-slate-800'
              }`}
            >
              <span>Explore Demo Dashboard</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
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

        {/* Hero Interactive Dashboard Preview Widget in 3D */}
        <Card3D maxTilt={7} glare={true} className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className={`rounded-3xl p-3 sm:p-5 border shadow-2xl backdrop-blur-xl preserve-3d ${
            currentTheme === 'midnight'
              ? 'bg-slate-900/60 border-slate-700/60 shadow-indigo-950/50'
              : 'bg-white/70 border-white/80 shadow-indigo-500/10'
          }`}>
            <div className={`rounded-2xl border p-5 sm:p-7 space-y-6 backdrop-blur-xl preserve-3d ${
              currentTheme === 'midnight'
                ? 'bg-slate-950/70 border-slate-800 text-slate-100'
                : 'bg-white/90 border-slate-200/80 text-slate-900'
            }`}>
              {/* Mock Header Inside Preview */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-inherit/20 gap-3 translate-z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white font-bold flex items-center justify-center text-sm shadow-xs translate-z-30">
                    AS
                  </div>
                  <div>
                    <h3 className="font-bold text-inherit text-sm sm:text-base">
                      Aarav Sharma's Financial Intelligence Dashboard
                    </h3>
                    <span className="text-xs opacity-70">
                      2nd Year B.Com Hons • St. Xavier's Mumbai • General-EWS
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 self-start sm:self-auto translate-z-20">
                  Profile Verification: 88%
                </span>
              </div>

              {/* Metrics Ribbon with 3D Pop-out */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left translate-z-30">
                <div className={`p-3 rounded-xl border ${currentTheme === 'midnight' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Qualified</span>
                  <p className="text-lg font-black text-inherit">28 Opportunities</p>
                </div>
                <div className={`p-3 rounded-xl border ${currentTheme === 'midnight' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Max Potential</span>
                  <p className="text-lg font-black text-inherit">₹3,75,000</p>
                </div>
                <div className={`p-3 rounded-xl border ${currentTheme === 'midnight' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Urgent Closes</span>
                  <p className="text-lg font-black text-inherit">1 in 48h</p>
                </div>
                <div className={`p-3 rounded-xl border ${currentTheme === 'midnight' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Action Needed</span>
                  <p className="text-lg font-black text-inherit">1 Expired Doc</p>
                </div>
              </div>

              {/* Simulated Live Urgent Alert */}
              <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left translate-z-20">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white pulse-radar">
                      48h Remaining
                    </span>
                    <span className="text-xs font-bold text-inherit">Tata Trusts Individual Grants for Undergraduate Studies</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1">
                    Why you match: Academic requirement satisfied (86.4% vs 75%) • B.Com discipline aligned • State eligible.
                  </p>
                </div>

                <button
                  onClick={onExploreDashboard}
                  className="px-4 py-2 btn-animated-glow text-white rounded-lg text-xs font-bold self-start sm:self-auto shrink-0 shadow-xs cursor-pointer"
                >
                  Inspect Live Match
                </button>
              </div>
            </div>
          </div>
        </Card3D>
      </section>

      {/* 3 Core Differentiators Section in 3D */}
      <section className={`border-t py-16 backdrop-blur-xl transition-colors ${
        currentTheme === 'midnight'
          ? 'bg-slate-950/80 border-slate-800/80 text-slate-100'
          : 'bg-white/70 border-slate-200/80 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-inherit tracking-tight">
              Why Traditional Scholarship Portals Fail Students
            </h2>
            <p className="text-xs sm:text-sm opacity-70">
              Directories dump thousands of outdated links. ScholarAI operates as an intelligent eligibility co-pilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card3D maxTilt={8} glare={true} liftOnHover={-8} depthZ={24} className="h-full">
              <div className={`p-6 rounded-2xl border space-y-3 backdrop-blur-xl h-full preserve-3d ${
                currentTheme === 'midnight'
                  ? 'bg-slate-900/70 border-slate-800 text-slate-200'
                  : 'bg-white/80 border-slate-200/80 text-slate-800'
              }`}>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center translate-z-30 shadow-sm">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-bold text-inherit text-base translate-z-20">5-Dimensional Explainable Scoring</h3>
                <p className="text-xs opacity-75 leading-relaxed translate-z-10">
                  No black-box percentages. We evaluate Academic Rigor, Degree Alignment, State Domicile, Financial Need, and Cohort Category with explicit mathematical weights.
                </p>
              </div>
            </Card3D>

            <Card3D maxTilt={8} glare={true} liftOnHover={-8} depthZ={24} className="h-full">
              <div className={`p-6 rounded-2xl border space-y-3 backdrop-blur-xl h-full preserve-3d ${
                currentTheme === 'midnight'
                  ? 'bg-slate-900/70 border-slate-800 text-slate-200'
                  : 'bg-white/80 border-slate-200/80 text-slate-800'
              }`}>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center translate-z-30 shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-inherit text-base translate-z-20">Non-Black-Box Exclusion Logic</h3>
                <p className="text-xs opacity-75 leading-relaxed translate-z-10">
                  Understand exactly why you are rejected with explicit disqualifiers. If an edge case exists, students can file a formal Manual Audit Request to an institutional officer.
                </p>
              </div>
            </Card3D>

            <Card3D maxTilt={8} glare={true} liftOnHover={-8} depthZ={24} className="h-full">
              <div className={`p-6 rounded-2xl border space-y-3 backdrop-blur-xl h-full preserve-3d ${
                currentTheme === 'midnight'
                  ? 'bg-slate-900/70 border-slate-800 text-slate-200'
                  : 'bg-white/80 border-slate-200/80 text-slate-800'
              }`}>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center translate-z-30 shadow-sm">
                  <Clock className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="font-bold text-inherit text-base translate-z-20">Live Countdown & Pipeline Tracking</h3>
                <p className="text-xs opacity-75 leading-relaxed translate-z-10">
                  Real dynamic countdown clocks calculate hours, minutes, and seconds from official deadlines. Drag-and-drop your applications from Interested to Applied.
                </p>
              </div>
            </Card3D>
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
