import React, { useState } from 'react';
import { ArrowDown, TrendingUp, ShieldAlert, Sparkles, Layers } from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  amount: number;
  count: number;
  description: string;
  color: string;
  glow: string;
}

interface FundingFunnelProps {
  className?: string;
}

export const FundingFunnel: React.FC<FundingFunnelProps> = ({ className = '' }) => {
  const [selectedStage, setSelectedStage] = useState<string>('prioritized');

  const stages: FunnelStage[] = [
    {
      id: 'discovered',
      name: 'DISCOVERED',
      amount: 485000,
      count: 28,
      description: 'Total financial pool of all 28 identified opportunities in the repository compatible with undergraduate study.',
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)'
    },
    {
      id: 'matched',
      name: 'MATCHED (5D FIT)',
      amount: 375000,
      count: 14,
      description: 'Scholarships where your 5D match score strictly exceeds 80% with zero disqualifying criteria.',
      color: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.4)'
    },
    {
      id: 'prioritized',
      name: 'PRIORITIZED',
      amount: 290000,
      count: 7,
      description: 'High-urgency, high-value opportunities ranked at the top of your AI Priority Engine roadmap.',
      color: '#22D3EE',
      glow: 'rgba(34, 211, 238, 0.4)'
    },
    {
      id: 'preparing',
      name: 'PREPARING',
      amount: 210000,
      count: 3,
      description: 'Active applications where document gathering, endorsements, or test scheduling is underway.',
      color: '#FBBF24',
      glow: 'rgba(251, 191, 36, 0.4)'
    },
    {
      id: 'submitted',
      name: 'SUBMITTED',
      amount: 75000,
      count: 1,
      description: 'Formal packets successfully submitted to trust/portal and awaiting college verification.',
      color: '#34D399',
      glow: 'rgba(52, 211, 153, 0.4)'
    },
    {
      id: 'awarded',
      name: 'AWARDED',
      amount: 0,
      count: 0,
      description: 'Confirmed grants credited directly to your bank account via DBT.',
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)'
    }
  ];

  const active = stages.find((s) => s.id === selectedStage) || stages[2];

  return (
    <div className={`glass-card p-6 rounded-3xl border border-white/10 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-[#22D3EE]" />
            <h3 className="text-lg font-display font-bold text-white tracking-tight">
              3D Opportunity Funding Funnel
            </h3>
          </div>
          <p className="text-xs text-[#A7B0C0] mt-1">
            Visualizing pipeline liquidity from initial discovery to confirmed award
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
          <TrendingUp size={14} className="text-[#34D399]" />
          <span className="text-[#F8FAFC] font-medium">₹2.10L in Active Preparation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Layered Funnel Diagram */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-2 py-2">
          {stages.map((stage, idx) => {
            const isSelected = selectedStage === stage.id;
            // Funnel width narrows gradually: 100% down to 50%
            const widthPercent = 100 - idx * 9;

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className="w-full flex flex-col items-center cursor-pointer transition-all duration-300"
              >
                <div
                  className={`relative py-2.5 px-4 rounded-xl flex items-center justify-between transition-all duration-300 border ${
                    isSelected
                      ? 'scale-[1.03] shadow-lg border-white/40'
                      : 'hover:scale-[1.01] border-white/10 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    width: `${widthPercent}%`,
                    background: isSelected
                      ? `linear-gradient(90deg, ${stage.color}35 0%, #17213A 100%)`
                      : 'rgba(23, 33, 58, 0.6)',
                    boxShadow: isSelected ? `0 0 20px ${stage.glow}` : 'none'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-xs font-display font-bold text-white tracking-wider">
                      {stage.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#A7B0C0] font-mono">
                      {stage.count} {stage.count === 1 ? 'opp' : 'opps'}
                    </span>
                  </div>

                  <div className="text-xs font-display font-extrabold text-white">
                    ₹{stage.amount.toLocaleString('en-IN')}
                  </div>
                </div>

                {idx < stages.length - 1 && (
                  <ArrowDown size={12} className="text-[#64748B] my-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Dossier Card */}
        <div className="lg:col-span-5 bg-[#0B1020]/90 p-5 rounded-2xl border border-white/15 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A7B0C0] uppercase tracking-wider font-semibold">
                Funnel Stage Analysis
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{
                  backgroundColor: `${active.color}25`,
                  color: active.color,
                  border: `1px solid ${active.color}50`
                }}
              >
                {active.name}
              </span>
            </div>

            <div className="text-3xl font-display font-extrabold text-white tracking-tight mb-1">
              ₹{active.amount.toLocaleString('en-IN')}
            </div>

            <div className="text-xs text-[#22D3EE] font-medium mb-3 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>{active.count} Qualified Opportunities</span>
            </div>

            <p className="text-xs text-[#A7B0C0] leading-relaxed mb-4">
              {active.description}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#FBBF24]">
            <ShieldAlert size={14} className="shrink-0" />
            <span>Potential Funding is an indicative pool, not guaranteed disbursement.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
