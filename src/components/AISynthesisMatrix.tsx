import React, { useState } from 'react';
import { DimensionScore } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  Coins, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  X,
  ChevronRight
} from 'lucide-react';

interface AISynthesisMatrixProps {
  dimensions: DimensionScore[];
  overallScore: number;
}

export const AISynthesisMatrix: React.FC<AISynthesisMatrixProps> = ({ dimensions, overallScore }) => {
  const [selectedDimension, setSelectedDimension] = useState<DimensionScore | null>(null);

  const getDimensionIcon = (key: DimensionScore['key']) => {
    switch (key) {
      case 'academic':
        return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      case 'degree':
        return <BookOpen className="w-5 h-5 text-sky-600" />;
      case 'geographic':
        return <MapPin className="w-5 h-5 text-emerald-600" />;
      case 'financial':
        return <Coins className="w-5 h-5 text-amber-600" />;
      case 'category':
        return <Users className="w-5 h-5 text-purple-600" />;
    }
  };

  const getBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 80) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">5D AI Synthesis Matrix</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent eligibility evaluation across five verified dimensions. Click any dimension for deep audit.
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start sm:self-auto bg-indigo-50/80 border border-indigo-100/80 px-3 py-1.5 rounded-xl">
          <span className="text-xs font-semibold text-indigo-950">AI Aggregate Confidence:</span>
          <span className="text-sm font-extrabold text-indigo-700">{overallScore}%</span>
        </div>
      </div>

      {/* Grid of 5 Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mt-5">
        {dimensions.map((dim) => {
          const isSelected = selectedDimension?.key === dim.key;
          return (
            <button
              key={dim.key}
              onClick={() => setSelectedDimension(dim)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between ${
                isSelected 
                  ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/20 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 hover:shadow-xs bg-slate-50/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-2xs">
                    {getDimensionIcon(dim.key)}
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getBadgeColor(dim.score)}`}>
                    {dim.score}%
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {dim.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {dim.student_value}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-slate-600">
                <span className="flex items-center space-x-1">
                  {dim.status === 'Verification required' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  ) : dim.score >= 80 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span className="text-[11px] truncate max-w-[95px]">{dim.status}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Modal / Flyout when a dimension is clicked */}
      {selectedDimension && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedDimension(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
                {getDimensionIcon(selectedDimension.key)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-slate-900">{selectedDimension.name} Audit</h3>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getBadgeColor(selectedDimension.score)}`}>
                    {selectedDimension.score}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-500">Weight in matching engine: {Math.round(selectedDimension.weight * 100)}%</p>
              </div>
            </div>

            <div className="space-y-3.5 bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Evaluated Requirement
                </span>
                <p className="text-slate-800 font-medium">{selectedDimension.requirement_value}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Student Data Used
                </span>
                <p className="text-indigo-900 font-semibold bg-white p-2 rounded-lg border border-slate-200/70 inline-block text-xs">
                  {selectedDimension.student_value}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  AI Evaluation & Reasoning
                </span>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {selectedDimension.explanation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Verification Status
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs font-medium">
                    {selectedDimension.status === 'Verification required' ? (
                      <span className="inline-flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertTriangle className="w-3 h-3 mr-1 text-amber-500" />
                        Needs Verification
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />
                        Requirement Satisfied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedDimension(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
