import React, { useState } from 'react';
import { Scholarship, ApplicationItem } from '../../types';
import { FundingFunnel } from '../visual/FundingFunnel';
import { OpportunityMap } from '../visual/OpportunityMap';
import { ProfileOptimizer } from './ProfileOptimizer';
import { PriorityBadge, UrgencyBadge, ApplicationStatusBadge } from '../ui/Badge';
import { ScoreRing } from '../ui/ScoreRing';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface StrategyViewProps {
  scholarships: Scholarship[];
  applications: ApplicationItem[];
  onViewDossier: (scholarship: Scholarship) => void;
  onNavigate: (viewId: string) => void;
  onFixBlockers: () => void;
}

export const StrategyView: React.FC<StrategyViewProps> = ({
  scholarships,
  applications,
  onViewDossier,
  onNavigate,
  onFixBlockers
}) => {
  const [portfolioTab, setPortfolioTab] = useState<string>('all');

  // Ranked scholarships
  const priorityRanked = [...scholarships].sort((a, b) => b.priorityScore - a.priorityScore);

  // Filter portfolio applications
  const filteredApps = applications.filter((app) => {
    if (portfolioTab === 'all') return true;
    return app.status.toLowerCase() === portfolioTab.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-[#8B5CF6]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Compass size={18} className="text-[#22D3EE]" />
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#22D3EE]">
              Strategic Intelligence Layer
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            MY SCHOLARSHIP STRATEGY
          </h1>

          <p className="text-sm text-[#A7B0C0] mt-1 leading-relaxed">
            Your AI-ranked roadmap to maximizing scholarship opportunities. ScholarAI balances deadline proximity, document readiness, and monetary yield into an actionable execution sequence.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40">
              ₹4.85L Qualified Pool
            </span>
            <span className="px-3 py-1 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40">
              ₹2.10L In Active Pipeline
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40">
              1 Critical 48h Action
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 self-start md:self-auto">
          <ScoreRing score={86} size={64} strokeWidth={6} variant="violet-cyan" />
          <div>
            <span className="text-[10px] text-[#A7B0C0] uppercase font-bold tracking-wider block">
              Strategy Health
            </span>
            <span className="text-sm font-display font-extrabold text-white">86% Optimized</span>
            <span className="text-[11px] text-[#34D399] block mt-0.5">Top Tier Alignment</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: 3D OPPORTUNITY FUNDING FUNNEL */}
      <FundingFunnel />

      {/* SECTION 2: 3D OPPORTUNITY MAP GRAPH NETWORK */}
      <OpportunityMap />

      {/* SECTION 3: TOP STRATEGIC ACTION QUEUE */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#8B5CF6]" />
              <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                1. Priority Strategic Queue
              </h3>
            </div>
            <p className="text-xs text-[#A7B0C0] mt-0.5">
              Strict algorithmic ranking ordered by AI Priority Score to eliminate decision fatigue
            </p>
          </div>

          <button
            onClick={() => onNavigate('pipeline')}
            className="text-xs font-bold text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            <span>Open Pipeline Kanban</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="space-y-3">
          {priorityRanked.slice(0, 4).map((sch, idx) => (
            <div
              key={sch.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6]/30 to-[#22D3EE]/30 flex items-center justify-center font-display font-extrabold text-sm text-white shrink-0">
                  #{idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-white hover:text-[#22D3EE] transition-colors cursor-pointer" onClick={() => onViewDossier(sch)}>
                      {sch.name}
                    </h4>
                    <PriorityBadge priority={sch.priorityRankLabel} score={sch.priorityScore} />
                    <UrgencyBadge urgency={sch.urgency} daysLeft={sch.daysLeft} />
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#A7B0C0]">
                    <span className="text-white font-semibold">₹{sch.fundingAmount.toLocaleString('en-IN')}</span>
                    <span>•</span>
                    <span>5D Match: <strong className="text-[#34D399]">{sch.matchScore}%</strong></span>
                    <span>•</span>
                    <span>Readiness: <strong className="text-[#22D3EE]">{sch.readinessScore}%</strong></span>
                  </div>

                  <p className="text-xs text-[#FBBF24] font-medium pt-0.5">
                    Next Action: {sch.nextAction}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  onClick={() => onViewDossier(sch)}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-colors"
                >
                  View Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: AI PROFILE OPTIMIZER */}
      <ProfileOptimizer
        profileStrength={82}
        onFixIncomeCert={onFixBlockers}
        onNavigateProfile={() => onNavigate('profile')}
      />

      {/* SECTION 5: SCHOLARSHIP PORTFOLIO TABLE */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#34D399]" />
              <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                Scholarship Application Portfolio
              </h3>
            </div>
            <p className="text-xs text-[#A7B0C0] mt-0.5">
              Lifecycle status across interested, preparing, submitted, and awarded applications
            </p>
          </div>

          {/* Portfolio Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
            {['all', 'interested', 'preparing', 'ready to apply', 'applied', 'awarded'].map((tab) => (
              <button
                key={tab}
                onClick={() => setPortfolioTab(tab)}
                className={`px-2.5 py-1 rounded-xl whitespace-nowrap capitalize transition-colors ${
                  portfolioTab === tab
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-white/5 text-[#A7B0C0] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A7B0C0]">
            <thead className="bg-white/5 text-[10px] text-[#A7B0C0] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Scholarship Name</th>
                <th className="p-3">Funding</th>
                <th className="p-3">Stage</th>
                <th className="p-3">5D Match</th>
                <th className="p-3">Readiness</th>
                <th className="p-3">Next Action</th>
                <th className="p-3 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApps.map((app) => {
                const sch = scholarships.find((s) => s.id === app.scholarshipId);
                return (
                  <tr key={app.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-3 font-semibold text-white">
                      <div>
                        <span>{app.scholarshipName}</span>
                        <span className="block text-[10px] text-[#64748B]">{app.provider}</span>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-white">
                      ₹{app.fundingAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <ApplicationStatusBadge status={app.status} />
                    </td>
                    <td className="p-3 font-semibold text-[#34D399]">
                      {app.matchScore}%
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span>{app.readinessScore}%</span>
                        <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              app.readinessScore >= 85 ? 'bg-[#34D399]' : 'bg-[#FBBF24]'
                            }`}
                            style={{ width: `${app.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 max-w-xs truncate text-[#F8FAFC]">
                      {app.nextAction}
                    </td>
                    <td className="p-3 text-right">
                      {sch && (
                        <button
                          onClick={() => onViewDossier(sch)}
                          className="text-[#22D3EE] hover:underline font-bold"
                        >
                          Dossier
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
