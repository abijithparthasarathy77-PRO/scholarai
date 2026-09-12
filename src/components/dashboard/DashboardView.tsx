import React from 'react';
import { StudentProfile, Scholarship, StudentDocument, ApplicationItem } from '../../types';
import { MetricCard } from '../ui/MetricCard';
import { ScholarshipCard } from '../discover/ScholarshipCard';
import { AIOrb } from '../visual/AIOrb';
import {
  Sparkles,
  Trophy,
  IndianRupee,
  Calendar,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Zap,
  Network,
  Bot
} from 'lucide-react';

interface DashboardViewProps {
  student: StudentProfile;
  scholarships: Scholarship[];
  documents: StudentDocument[];
  applications: ApplicationItem[];
  onNavigate: (viewId: string) => void;
  onViewDossier: (scholarship: Scholarship) => void;
  onAskAIWithPrompt: (prompt: string) => void;
  onFixBlockers: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  scholarships,
  documents,
  applications,
  onNavigate,
  onViewDossier,
  onAskAIWithPrompt,
  onFixBlockers
}) => {
  // Sort scholarships by Priority Score descending to answer "What should I apply for first?"
  const rankedScholarships = [...scholarships].sort((a, b) => b.priorityScore - a.priorityScore);
  const topPriority = rankedScholarships[0];
  const highPriorities = rankedScholarships.slice(0, 3);

  // Critical blocker count (missing or expired documents)
  const blockerDocs = documents.filter((d) => d.status === 'EXPIRED' || d.status === 'MISSING');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Greeting & AI Strategy Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden glass-panel-elevated border border-[#8B5CF6]/30">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8B5CF6]/20 via-[#22D3EE]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-[#22D3EE] mb-3">
              <Sparkles size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Opportunity Strategist Active</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Good morning, {student.name.split(' ')[0]}.
            </h1>

            <p className="text-sm sm:text-base text-[#A7B0C0] mt-2 leading-relaxed">
              ScholarAI analyzed your {student.degree} academic metrics, ₹3.2L income bracket, and document vault. Here is your prioritized action plan for today.
            </p>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <button
                onClick={() => onAskAIWithPrompt('What should I apply for first?')}
                className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
              >
                <Bot size={14} className="text-[#22D3EE]" />
                <span>"What should I apply for first?"</span>
              </button>

              <button
                onClick={onFixBlockers}
                className="py-1.5 px-3 rounded-xl bg-[#FBBF24]/15 hover:bg-[#FBBF24]/25 border border-[#FBBF24]/30 text-xs font-semibold text-[#FBBF24] flex items-center gap-1.5 transition-colors"
              >
                <Zap size={14} />
                <span>Fix 2 Document Blockers</span>
              </button>

              <button
                onClick={() => onNavigate('strategy')}
                className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#A7B0C0] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Network size={14} className="text-[#8B5CF6]" />
                <span>View Opportunity Map</span>
              </button>
            </div>
          </div>

          {/* AI Orb Visual Centerpiece */}
          <div className="hidden md:flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10">
            <AIOrb size="lg" interactive />
            <span className="text-[11px] font-semibold text-[#A7B0C0] mt-3">
              Strategy Confidence: <strong className="text-[#34D399]">94%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Qualified Opportunities"
          value="28"
          sublabel="14 High 5D Alignment"
          trend="+3 New This Week"
          trendPositive={true}
          icon={<Trophy size={18} />}
          glow="violet"
          onClick={() => onNavigate('discover')}
        />

        <MetricCard
          label="Potential Funding"
          value="₹4,85,000"
          sublabel="Across qualified scholarships"
          trend="₹2.10L in pipeline"
          trendPositive={true}
          icon={<IndianRupee size={18} />}
          disclaimer="Potential Funding is NOT guaranteed funding."
          glow="cyan"
          onClick={() => onNavigate('strategy')}
        />

        <MetricCard
          label="Upcoming Deadlines"
          value="5"
          sublabel="1 Critical (48h away)"
          trend="Action Required"
          trendPositive={false}
          icon={<Calendar size={18} />}
          glow="amber"
          onClick={() => onNavigate('deadlines')}
        />

        <MetricCard
          label="Application Readiness"
          value="86%"
          sublabel="Profile & document score"
          trend="2 Blockers Pending"
          trendPositive={false}
          icon={<CheckCircle2 size={18} />}
          glow="mint"
          onClick={onFixBlockers}
        />
      </div>

      {/* MAJOR MODULE: AI PRIORITY ENGINE ("WHAT SHOULD I APPLY FOR FIRST?") */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-ping" />
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                WHAT SHOULD I APPLY FOR FIRST?
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6]/25 to-[#22D3EE]/25 text-[#22D3EE] border border-[#8B5CF6]/40 font-bold uppercase tracking-wider">
                AI Priority Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A7B0C0] mt-1">
              Dynamic multi-factor ranking balancing eligibility fit, deadline urgency, funding amount, and document readiness
            </p>
          </div>

          <button
            onClick={() => onNavigate('discover')}
            className="text-xs font-bold text-[#22D3EE] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All 28 Opportunities</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Highlighted #1 Top Recommendation Card: Tata Merit Endowment */}
        {topPriority && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#17213A] via-[#121A2E] to-[#0B1020] border-2 border-[#8B5CF6]/50 shadow-[0_0_30px_rgba(139,92,246,0.2)] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#8B5CF6] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    #1 HIGHEST STRATEGIC PRIORITY
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FB7185]/20 text-[#FB7185] border border-[#FB7185]/40 text-xs font-bold">
                    DEADLINE: 48 HOURS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 text-xs font-bold">
                    MATCH: 94%
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                  {topPriority.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#A7B0C0] leading-relaxed max-w-2xl">
                  Tata Trusts provides ₹1,00,000 for top undergraduate commerce scholars. With an 86% academic aggregate at St. Xavier’s, you hold a commanding qualification rank, but the application closes in 48 hours.
                </p>

                {/* Key Metric Pills */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <div className="flex items-center gap-1 text-white font-bold">
                    <IndianRupee size={15} className="text-[#22D3EE]" />
                    <span>₹1,00,000</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#FBBF24] font-semibold">
                    <AlertTriangle size={14} />
                    <span>Blocker: Dean Endorsement & Income Renewal</span>
                  </div>
                </div>

                {/* Next Action Box */}
                <div className="p-3 rounded-2xl bg-[#070B17]/80 border border-white/10 flex items-center justify-between gap-3 max-w-xl">
                  <div>
                    <span className="text-[10px] text-[#A7B0C0] uppercase tracking-wider font-semibold block">
                      Immediate Next Action:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {topPriority.nextAction}
                    </span>
                  </div>
                  <button
                    onClick={() => onViewDossier(topPriority)}
                    className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold hover:opacity-95 transition-opacity shrink-0 shadow-md"
                  >
                    Open Dossier
                  </button>
                </div>
              </div>

              {/* Priority Score Ring Box */}
              <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-black/40 border border-white/10 self-center lg:self-auto text-center shrink-0">
                <span className="text-[10px] text-[#A7B0C0] uppercase font-bold tracking-wider mb-2">
                  AI Priority Score
                </span>
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-[#22D3EE] tracking-tight">
                  {topPriority.priorityScore}
                  <span className="text-base text-[#A7B0C0] font-normal">/100</span>
                </div>
                <span className="text-[11px] text-[#34D399] font-medium mt-1">
                  Readiness: {topPriority.readinessScore}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next Top Ranked Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {highPriorities.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onViewDossier={onViewDossier}
              isSaved={applications.some((a) => a.scholarshipId === scholarship.id)}
            />
          ))}
        </div>
      </div>

      {/* Critical Document Blockers Alert Banner */}
      {blockerDocs.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#FBBF24]/10 border border-[#FBBF24]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#FBBF24]/20 text-[#FBBF24] shrink-0 mt-0.5">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {blockerDocs.length} Action Items Blocking Highest-Priority Scholarships
              </h4>
              <p className="text-xs text-[#A7B0C0] mt-0.5">
                Renewing your Income Certificate will immediately increase your Tata Merit and Reliance readiness scores by +14 points.
              </p>
            </div>
          </div>

          <button
            onClick={onFixBlockers}
            className="py-2.5 px-5 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-md"
          >
            <Zap size={14} />
            <span>Resolve in Document Vault</span>
          </button>
        </div>
      )}
    </div>
  );
};
