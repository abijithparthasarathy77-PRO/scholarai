import React from 'react';
import { Application, ApplicationStage, Scholarship } from '../types';
import { KanbanBoard } from '../components/KanbanBoard';
import { Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ApplicationPipelineViewProps {
  applications: Application[];
  onStageChange: (appId: string, newStage: ApplicationStage) => void;
  onOpenScholarship: (scholarshipId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ApplicationPipelineView: React.FC<ApplicationPipelineViewProps> = ({
  applications,
  onStageChange,
  onOpenScholarship,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-sans">
              Application Pipeline Tracker
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your application lifecycle, checklist milestones, and deadline urgency.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('discover')}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto flex items-center space-x-1.5"
        >
          <span>Add More Schemes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Kanban Board with Diagnostics and AI Strategy Panel */}
      <KanbanBoard
        applications={applications}
        onStageChange={onStageChange}
        onOpenScholarship={onOpenScholarship}
      />
    </div>
  );
};
