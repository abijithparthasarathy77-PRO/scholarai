import React from 'react';
import { AIOrb } from '../visual/AIOrb';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  FileCheck,
  TrendingUp,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
  onOpenOnboarding: () => void;
  onOpenAuth: () => void;
  onExploreScholarships: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onOpenOnboarding,
  onOpenAuth,
  onExploreScholarships
}) => {
  return (
    <div className="min-h-screen bg-[#070B17] text-[#F8FAFC] selection:bg-[#8B5CF6]/30 selection:text-[#22D3EE] overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B17]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white shadow-[0_0_16px_rgba(139,92,246,0.6)]">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white block leading-none">
                SCHOLAR<span className="text-[#22D3EE]">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A7B0C0] font-semibold">
                Strategy Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="py-2 px-4 rounded-xl text-xs font-semibold text-[#A7B0C0] hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onLaunchApp}
              className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold hover:opacity-95 transition-opacity shadow-md flex items-center gap-1.5"
            >
              <span>Launch Dashboard</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        {/* Subtle radial gradients */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#22D3EE]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#22D3EE] shadow-sm">
            <Sparkles size={13} className="text-[#8B5CF6]" />
            <span>Explainable AI Scholarship Opportunity Strategist</span>
          </div>

          {/* Headline from Section 7 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            Turn Scholarships <br />
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
              Into a Strategy.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#A7B0C0] leading-relaxed">
            ScholarAI uses explainable AI to discover, prioritize, and prepare scholarship opportunities built around your profile. Eliminate guesswork and know exactly what to do next.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenOnboarding}
              className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#9333EA] to-[#22D3EE] text-white text-sm font-bold shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition-transform flex items-center gap-2"
            >
              <span>Build My Scholarship Strategy</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onExploreScholarships}
              className="py-3.5 px-7 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-colors"
            >
              Explore Scholarships
            </button>
          </div>

          {/* 3D FUTURISTIC INTELLIGENCE DASHBOARD HERO VISUAL */}
          <div className="pt-12 relative max-w-4xl mx-auto">
            <div className="relative p-6 sm:p-8 rounded-3xl glass-panel-elevated border-2 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {/* Floating AI Orb */}
              <div className="absolute -top-10 right-10 hidden sm:block">
                <AIOrb size="md" interactive />
              </div>

              {/* Glowing Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#A7B0C0]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
                  <span>Verified Profile Vector: Aarav Sharma (2nd Yr B.Com)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#22D3EE]">
                  REAL-TIME 5D ENGINE
                </span>
              </div>

              {/* 4 Floating Connected Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {/* Connecting Glowing Lines */}
                <div className="hidden md:block absolute top-1/2 inset-x-8 h-[2px] bg-gradient-to-r from-[#8B5CF6]/40 via-[#22D3EE]/40 to-[#34D399]/40 pointer-events-none -translate-y-1/2" />

                {/* Card 1: MATCH */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#0B1020]/90 border border-[#8B5CF6]/40 shadow-lg text-center space-y-1 hover:translate-y-[-2px] transition-transform">
                  <span className="text-[10px] uppercase font-bold text-[#A7B0C0] tracking-wider">
                    5D MATCH
                  </span>
                  <div className="text-3xl font-display font-extrabold text-[#8B5CF6]">94%</div>
                  <span className="text-[10px] text-[#34D399] font-medium block">High Precision Fit</span>
                </div>

                {/* Card 2: POTENTIAL FUNDING */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#0B1020]/90 border border-[#22D3EE]/40 shadow-lg text-center space-y-1 hover:translate-y-[-2px] transition-transform">
                  <span className="text-[10px] uppercase font-bold text-[#A7B0C0] tracking-wider">
                    POTENTIAL FUNDING
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#22D3EE]">
                    ₹4.85L
                  </div>
                  <span className="text-[10px] text-[#A7B0C0] italic block">Indicative Pool</span>
                </div>

                {/* Card 3: READINESS */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#0B1020]/90 border border-[#34D399]/40 shadow-lg text-center space-y-1 hover:translate-y-[-2px] transition-transform">
                  <span className="text-[10px] uppercase font-bold text-[#A7B0C0] tracking-wider">
                    READINESS
                  </span>
                  <div className="text-3xl font-display font-extrabold text-[#34D399]">86%</div>
                  <span className="text-[10px] text-[#FBBF24] font-medium block">2 Action Blockers</span>
                </div>

                {/* Card 4: URGENT */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#0B1020]/90 border border-[#FB7185]/40 shadow-lg text-center space-y-1 hover:translate-y-[-2px] transition-transform">
                  <span className="text-[10px] uppercase font-bold text-[#A7B0C0] tracking-wider">
                    URGENT
                  </span>
                  <div className="text-3xl font-display font-extrabold text-[#FB7185]">3</div>
                  <span className="text-[10px] text-[#FB7185] font-medium block">1 Critical (48h)</span>
                </div>
              </div>

              {/* Sample Recommendation Preview */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 font-bold text-sm">
                    #1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Tata Merit Endowment for Higher Education</h4>
                    <span className="text-xs text-[#A7B0C0]">
                      Next Action: Obtain Dean Endorsement • Closes in 48 Hours
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLaunchApp}
                  className="py-1.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-[#22D3EE] transition-colors shrink-0"
                >
                  View Strategy Plan →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STRATEGY PILLARS */}
      <section className="py-20 px-6 border-t border-white/10 bg-[#0B1020]/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold tracking-widest text-[#8B5CF6] uppercase">
              The ScholarAI Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Built to Answer: "What Should I Do Next?"
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B0C0]">
              Traditional portals overwhelm you with hundreds of random listings. ScholarAI crafts a prioritized roadmap with explainable qualification logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                <Target size={20} />
              </div>
              <h3 className="text-base font-display font-bold text-white">5D Precision Matching</h3>
              <p className="text-xs text-[#A7B0C0] leading-relaxed">
                Evaluates Academic Rigor, Degree Alignment, State Domicile, Financial Need, and Cohort Categories into transparent multi-dimensional fit scores.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE]">
                <Clock size={20} />
              </div>
              <h3 className="text-base font-display font-bold text-white">Deadline Command Center</h3>
              <p className="text-xs text-[#A7B0C0] leading-relaxed">
                Triages impending applications into Critical (&lt;3 days), Urgent, and Upcoming windows so you never miss a verified grant window.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#34D399]/20 flex items-center justify-center text-[#34D399]">
                <FileCheck size={20} />
              </div>
              <h3 className="text-base font-display font-bold text-white">Document Intelligence</h3>
              <p className="text-xs text-[#A7B0C0] leading-relaxed">
                Audits required certificates, transcripts, and endorsements. Pinpoints blockers so you know exactly what paperwork to renew first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/10 text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#A7B0C0]">
            <Sparkles size={14} className="text-[#8B5CF6]" />
            <span className="font-bold text-white">ScholarAI Platform</span>
            <span>• Your AI-Powered Scholarship Strategist</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#A7B0C0]">Demo Mode: Aarav Sharma</span>
            <button
              onClick={onLaunchApp}
              className="text-[#22D3EE] hover:underline font-bold"
            >
              Launch App →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
