import React from 'react';
import { ScoreRing } from '../ui/ScoreRing';
import { Zap, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ProfileOptimizerProps {
  profileStrength?: number;
  onFixIncomeCert: () => void;
  onNavigateProfile: () => void;
}

export const ProfileOptimizer: React.FC<ProfileOptimizerProps> = ({
  profileStrength = 82,
  onFixIncomeCert,
  onNavigateProfile
}) => {
  const optimizationItems = [
    {
      id: 'opt-income',
      title: 'Renew Annual Income Certificate',
      impact: 'HIGH IMPACT',
      impactColor: 'coral',
      benefit: 'Unlocks +₹3,00,000 in Tata Merit & Reliance priority queues',
      currentStatus: 'Certificate expired on 31 Mar 2025',
      actionLabel: 'Renew in Vault',
      onAction: onFixIncomeCert
    },
    {
      id: 'opt-endorsement',
      title: 'Commerce HOD Recommendation Letter',
      impact: 'HIGH IMPACT',
      impactColor: 'amber',
      benefit: 'Clears mandatory requirement for Tata Trusts Endowment submission',
      currentStatus: 'Document missing from student vault',
      actionLabel: 'Upload Endorsement',
      onAction: onFixIncomeCert
    },
    {
      id: 'opt-achievements',
      title: 'Update Extracurricular & Leadership Honors',
      impact: 'MEDIUM IMPACT',
      impactColor: 'cyan',
      benefit: 'Strengthens holistic profile score for Aditya Birla Fellowship',
      currentStatus: '3 verified achievements logged',
      actionLabel: 'Edit Profile',
      onAction: onNavigateProfile
    }
  ];

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#FBBF24]" />
            <h3 className="text-lg font-display font-bold text-white tracking-tight">
              AI Profile Optimizer
            </h3>
          </div>
          <p className="text-xs text-[#A7B0C0] mt-0.5">
            Targeted enhancements to maximize your qualification breadth across competitive scholarships
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-2 px-3 rounded-2xl border border-white/10 self-start sm:self-auto">
          <ScoreRing score={profileStrength} size={48} strokeWidth={5} variant="violet-cyan" />
          <div className="text-left">
            <span className="text-[10px] text-[#A7B0C0] uppercase font-bold tracking-wider block">
              Profile Strength
            </span>
            <span className="text-xs font-bold text-white">82 / 100 Optimized</span>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations List */}
      <div className="space-y-3">
        {optimizationItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    item.impactColor === 'coral'
                      ? 'bg-[#FB7185]/20 text-[#FB7185] border border-[#FB7185]/40'
                      : item.impactColor === 'amber'
                      ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40'
                      : 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40'
                  }`}
                >
                  {item.impact}
                </span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
              </div>

              <p className="text-xs text-[#34D399] font-medium flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>{item.benefit}</span>
              </p>

              <span className="text-[11px] text-[#A7B0C0] block">{item.currentStatus}</span>
            </div>

            <button
              onClick={item.onAction}
              className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
            >
              <span>{item.actionLabel}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="pt-2 flex items-center gap-2 text-xs text-[#A7B0C0]">
        <ShieldAlert size={14} className="text-[#8B5CF6] shrink-0" />
        <span className="italic">
          Improving these areas increases the number of opportunities you can pursue; outcomes remain subject to official provider evaluation.
        </span>
      </div>
    </div>
  );
};
