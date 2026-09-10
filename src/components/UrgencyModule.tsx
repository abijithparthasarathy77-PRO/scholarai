import React from 'react';
import { Scholarship } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface UrgencyModuleProps {
  urgentScholarship: Scholarship;
  onActionClick: (scholarship: Scholarship) => void;
}

export const UrgencyModule: React.FC<UrgencyModuleProps> = ({ urgentScholarship, onActionClick }) => {
  return (
    <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent border border-rose-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-xs mt-0.5 animate-pulse">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-md">
                Critical Deadline Alert
              </span>
              <span className="text-xs text-slate-500">Action urgently recommended</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {urgentScholarship.title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Provider: <span className="font-medium text-slate-800">{urgentScholarship.provider}</span> • Award: <span className="font-bold text-emerald-700">{urgentScholarship.funding_formatted}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:self-center">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Time Remaining:</span>
            <CountdownTimer deadline={urgentScholarship.deadline} />
          </div>

          <button
            onClick={() => onActionClick(urgentScholarship)}
            className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xs hover:shadow-sm transition-all group"
          >
            <span>Complete Application</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-rose-200/50 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center space-x-1.5 text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Status in your pipeline: <strong className="text-slate-800 font-semibold">Ready to Apply (95% complete)</strong></span>
        </div>
        <span className="text-rose-700 font-medium">
          Priority: Very High (Closes in &lt; 48 hours)
        </span>
      </div>
    </div>
  );
};
