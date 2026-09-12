import React from 'react';
import { ApplicationItem, ApplicationStatus, Scholarship } from '../../types';
import { PriorityBadge, UrgencyBadge } from '../ui/Badge';
import { ScoreRing } from '../ui/ScoreRing';
import {
  Kanban,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplicationKanbanProps {
  applications: ApplicationItem[];
  scholarships: Scholarship[];
  onMoveStage: (appId: string, newStage: ApplicationStatus) => void;
  onViewDossier: (scholarship: Scholarship) => void;
  onNavigateDiscover: () => void;
}

export const ApplicationKanban: React.FC<ApplicationKanbanProps> = ({
  applications,
  scholarships,
  onMoveStage,
  onViewDossier,
  onNavigateDiscover
}) => {
  const stages: { id: ApplicationStatus; title: string; color: string; glow: string }[] = [
    { id: 'Interested', title: 'Interested', color: '#64748B', glow: 'rgba(100, 116, 139, 0.4)' },
    { id: 'Preparing', title: 'Preparing', color: '#FBBF24', glow: 'rgba(251, 191, 36, 0.4)' },
    { id: 'Ready to Apply', title: 'Ready to Apply', color: '#22D3EE', glow: 'rgba(34, 211, 238, 0.4)' },
    { id: 'Applied', title: 'Applied', color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.4)' },
    { id: 'Awarded', title: 'Awarded', color: '#34D399', glow: 'rgba(52, 211, 153, 0.4)' }
  ];

  const handleStageChange = (app: ApplicationItem, direction: 'prev' | 'next') => {
    const stageOrder: ApplicationStatus[] = ['Interested', 'Preparing', 'Ready to Apply', 'Applied', 'Awarded'];
    const currentIndex = stageOrder.indexOf(app.status);
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex >= 0 && targetIndex < stageOrder.length) {
      const nextStage = stageOrder[targetIndex];
      onMoveStage(app.id, nextStage);

      // Celebrate if moved to Awarded
      if (nextStage === 'Awarded') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-elevated border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Kanban size={18} className="text-[#22D3EE]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Application Pipeline (Kanban)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A7B0C0]">
            Track and advance your active applications through stages from initial interest to disbursement
          </p>
        </div>

        <button
          onClick={onNavigateDiscover}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity self-start sm:self-auto shadow-md"
        >
          <Plus size={15} />
          <span>Add From Discover</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-start">
        {stages.map((stage) => {
          const columnApps = applications.filter((a) => a.status === stage.id);
          const stageTotalFunding = columnApps.reduce((sum, a) => sum + a.fundingAmount, 0);

          return (
            <div
              key={stage.id}
              className="glass-card p-4 rounded-3xl border border-white/10 flex flex-col space-y-3 min-h-[460px] bg-[#070B17]/60"
            >
              {/* Column Header */}
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h4 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                    {stage.title}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-[#A7B0C0] font-mono font-bold">
                    {columnApps.length}
                  </span>
                </div>

                <span className="text-[11px] font-display font-extrabold text-white">
                  ₹{stageTotalFunding.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1">
                {columnApps.map((app) => {
                  const sch = scholarships.find((s) => s.id === app.scholarshipId);
                  const isFirstStage = stage.id === 'Interested';
                  const isLastStage = stage.id === 'Awarded';

                  return (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3 group"
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1">
                        <UrgencyBadge urgency={app.urgency} daysLeft={app.daysLeft} />
                        <span className="text-xs font-bold text-white flex items-center gap-0.5">
                          <IndianRupee size={12} className="text-[#22D3EE]" />
                          <span>₹{app.fundingAmount.toLocaleString('en-IN')}</span>
                        </span>
                      </div>

                      {/* Title & Provider */}
                      <div>
                        <h5
                          onClick={() => sch && onViewDossier(sch)}
                          className="text-xs sm:text-sm font-bold text-white group-hover:text-[#22D3EE] transition-colors cursor-pointer line-clamp-2"
                        >
                          {app.scholarshipName}
                        </h5>
                        <span className="text-[11px] text-[#A7B0C0] block mt-0.5">{app.provider}</span>
                      </div>

                      {/* Match & Readiness Mini Strip */}
                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-black/40 text-[11px]">
                        <span className="text-[#A7B0C0]">
                          Match: <strong className="text-[#34D399]">{app.matchScore}%</strong>
                        </span>
                        <span className="text-[#A7B0C0]">
                          Readiness: <strong className="text-[#22D3EE]">{app.readinessScore}%</strong>
                        </span>
                      </div>

                      {/* Blockers or Next Action */}
                      {app.blockers.length > 0 ? (
                        <div className="p-2 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[11px] text-[#FBBF24] flex items-start gap-1.5">
                          <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{app.blockers[0]}</span>
                        </div>
                      ) : (
                        <div className="p-2 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 text-[11px] text-[#34D399] flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="shrink-0" />
                          <span>Ready for submission</span>
                        </div>
                      )}

                      {/* Stage Movement Controls */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                        <button
                          disabled={isFirstStage}
                          onClick={() => handleStageChange(app, 'prev')}
                          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                            isFirstStage
                              ? 'opacity-30 cursor-not-allowed border-transparent text-[#64748B]'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#A7B0C0] hover:text-white'
                          }`}
                          title="Move Back"
                        >
                          <ArrowLeft size={13} />
                        </button>

                        {sch && (
                          <button
                            onClick={() => onViewDossier(sch)}
                            className="text-[11px] text-[#22D3EE] hover:underline font-bold"
                          >
                            Dossier
                          </button>
                        )}

                        <button
                          disabled={isLastStage}
                          onClick={() => handleStageChange(app, 'next')}
                          className={`p-1.5 px-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                            isLastStage
                              ? 'opacity-30 cursor-not-allowed border-transparent text-[#64748B]'
                              : 'bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border-[#8B5CF6]/40 text-white'
                          }`}
                          title="Advance Stage"
                        >
                          <span>Next</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {columnApps.length === 0 && (
                  <div className="h-36 flex flex-col items-center justify-center text-center p-4 border border-dashed border-white/10 rounded-2xl text-xs text-[#64748B]">
                    <span>No applications in this stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
