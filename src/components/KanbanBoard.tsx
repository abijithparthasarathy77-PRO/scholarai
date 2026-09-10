import React, { useState } from 'react';
import { Application, ApplicationStage, Scholarship } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  MoveRight, 
  MoveLeft, 
  FileCheck, 
  Coins, 
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KanbanBoardProps {
  applications: Application[];
  onStageChange: (appId: string, newStage: ApplicationStage) => void;
  onOpenScholarship?: (scholarshipId: string) => void;
}

const COLUMNS: { id: ApplicationStage; title: string; subtitle: string; color: string }[] = [
  { id: 'interested', title: 'Interested', subtitle: 'Targeted for review', color: 'border-slate-300' },
  { id: 'preparing', title: 'Preparing', subtitle: 'Compiling credentials', color: 'border-sky-300' },
  { id: 'ready_to_apply', title: 'Ready to Apply', subtitle: 'Final verification', color: 'border-indigo-400' },
  { id: 'applied', title: 'Applied', subtitle: 'Under scrutiny', color: 'border-emerald-400' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  applications,
  onStageChange,
  onOpenScholarship,
}) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Compute diagnostics
  const urgentCount = applications.filter(a => {
    const diffHours = (new Date(a.deadline).getTime() - new Date().getTime()) / 3600000;
    return diffHours <= 72 && a.stage !== 'applied';
  }).length;

  const handleMove = (appId: string, currentStage: ApplicationStage, direction: 'next' | 'prev') => {
    const stageOrder: ApplicationStage[] = ['interested', 'preparing', 'ready_to_apply', 'applied'];
    const currentIdx = stageOrder.indexOf(currentStage);
    const targetIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;

    if (targetIdx >= 0 && targetIdx < stageOrder.length) {
      const nextStage = stageOrder[targetIdx];
      onStageChange(appId, nextStage);

      // Trigger celebration if moved to 'applied'
      if (nextStage === 'applied') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#10B981', '#F59E0B'],
        });
      }
    }
  };

  const getPriorityBadge = (priority: Application['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Diagnostics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3.5">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Pipeline Opportunity Value
            </span>
            <div className="text-xl font-extrabold text-slate-900">₹3,85,000</div>
            <span className="text-[10px] text-slate-500 italic block mt-0.5">
              *Potential value in active preparation, not guaranteed award.
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Documentation Readiness
            </span>
            <div className="text-xl font-extrabold text-emerald-700">4 / 5 Ready</div>
            <span className="text-[10px] text-amber-700 font-medium block mt-0.5">
              1 document requires Tahsildar renewal
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3.5">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Urgent Applications (&lt; 72 Hours)
            </span>
            <div className="text-xl font-extrabold text-rose-600">{urgentCount} Urgent</div>
            <span className="text-[10px] text-rose-700 font-medium block mt-0.5">
              Tata Merit Endowment closing soon
            </span>
          </div>
        </div>
      </div>

      {/* AI Strategy Panel: ScholarAI Priority Recommendation */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl border border-indigo-800/80 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                ScholarAI Priority Recommendation
              </span>
              <span className="text-xs text-indigo-200">AI Application Strategy</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Your strongest immediate opportunity is the <span className="text-amber-300">Tata Merit Endowment</span>
            </h3>
            <p className="text-xs text-indigo-200/90 leading-relaxed max-w-3xl">
              Tata Merit Endowment has high application readiness (95%), a closing deadline under 48 hours, 
              and strong eligibility alignment (95%). Finalize the income verification document first to submit before closure.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start lg:self-center shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">Calculated Urgency</span>
              <span className="text-xs font-extrabold text-rose-400">Priority: Very High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colApps = applications.filter(a => a.stage === col.id);
          return (
            <div
              key={col.id}
              className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200 flex flex-col min-h-[520px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-900 text-sm">{col.title}</h4>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-xs font-extrabold flex items-center justify-center border border-slate-300 shadow-2xs">
                      {colApps.length}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{col.subtitle}</span>
                </div>
              </div>

              {/* Cards list */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colApps.length === 0 ? (
                  <div className="h-40 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    No scholarships in this stage
                  </div>
                ) : (
                  colApps.map(app => (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:shadow-sm transition-all relative group"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getPriorityBadge(app.priority)}`}>
                          {app.priority} Priority
                        </span>
                        <CountdownTimer deadline={app.deadline} compact />
                      </div>

                      <h5 
                        onClick={() => onOpenScholarship && onOpenScholarship(app.scholarship_id)}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-2"
                      >
                        {app.scholarship_title}
                      </h5>

                      <div className="text-[11px] text-slate-500 mt-1 truncate">
                        {app.provider}
                      </div>

                      <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">{app.funding_formatted}</span>
                        <span className="text-[11px] text-emerald-700 font-semibold">{app.progress_percentage}% Ready</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            app.progress_percentage === 100 
                              ? 'bg-emerald-500' 
                              : app.progress_percentage >= 60 
                              ? 'bg-indigo-600' 
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${app.progress_percentage}%` }}
                        />
                      </div>

                      {/* Stage Transition Controls */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <button
                          disabled={col.id === 'interested'}
                          onClick={() => handleMove(app.id, col.id, 'prev')}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 disabled:hover:bg-transparent"
                          title="Move to previous stage"
                        >
                          <MoveLeft className="w-4 h-4" />
                        </button>

                        <span className="text-[10px] text-slate-400 font-medium">Stage Shift</span>

                        <button
                          disabled={col.id === 'applied'}
                          onClick={() => handleMove(app.id, col.id, 'next')}
                          className="p-1 rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 disabled:opacity-20 disabled:hover:bg-transparent"
                          title="Advance to next stage"
                        >
                          <MoveRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
