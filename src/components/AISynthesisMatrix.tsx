import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface AISynthesisMatrixProps {
  dimensions: DimensionScore[];
  overallScore: number;
}

export const AISynthesisMatrix: React.FC<AISynthesisMatrixProps> = ({ dimensions, overallScore }) => {
  const [selectedDimension, setSelectedDimension] = useState<DimensionScore | null>(null);
  const [isMatrixCollapsed, setIsMatrixCollapsed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Smoothly scroll dropdown into view when opened on smaller screens
  useEffect(() => {
    if (selectedDimension && dropdownRef.current) {
      dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedDimension]);

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

  const getDimensionIconWhite = (key: DimensionScore['key']) => {
    switch (key) {
      case 'academic':
        return <GraduationCap className="w-6 h-6 text-white" />;
      case 'degree':
        return <BookOpen className="w-6 h-6 text-white" />;
      case 'geographic':
        return <MapPin className="w-6 h-6 text-white" />;
      case 'financial':
        return <Coins className="w-6 h-6 text-white" />;
      case 'category':
        return <Users className="w-6 h-6 text-white" />;
    }
  };

  const getBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30';
    if (score >= 80) return 'bg-sky-500/15 text-sky-600 border-sky-500/30';
    if (score >= 60) return 'bg-amber-500/15 text-amber-600 border-amber-500/30';
    return 'bg-rose-500/15 text-rose-600 border-rose-500/30';
  };

  const handleDimensionClick = (dim: DimensionScore) => {
    if (selectedDimension?.key === dim.key) {
      setSelectedDimension(null); // Toggle close if touching the same dimension
    } else {
      setSelectedDimension(dim); // Open separate dropdown box for this dimension
    }
  };

  return (
    <div className="scholar-card rounded-2xl border p-6 shadow-xs relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-inherit/15 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h2 className="text-lg font-bold tracking-tight text-inherit">5D AI Synthesis Matrix</h2>
          </div>
          <p className="text-xs opacity-75 mt-0.5">
            Transparent eligibility evaluation across five verified dimensions. Touch any dimension to open its audit dropdown.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-semibold text-inherit">AI Aggregate Confidence:</span>
            <span className="text-sm font-extrabold text-indigo-600">{overallScore}%</span>
          </div>

          <button
            onClick={() => setIsMatrixCollapsed(!isMatrixCollapsed)}
            className="p-2 rounded-xl border border-inherit/20 hover:bg-slate-500/10 transition-colors text-xs font-semibold flex items-center space-x-1 cursor-pointer"
            title={isMatrixCollapsed ? 'Expand 5D Matrix' : 'Collapse 5D Matrix'}
          >
            <span className="text-[11px] opacity-75 hidden sm:inline">
              {isMatrixCollapsed ? 'Expand' : 'Collapse'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMatrixCollapsed ? '-rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grid of 5 Dimensions (collapsible) */}
      {!isMatrixCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-5">
          {dimensions.map((dim) => {
            const isSelected = selectedDimension?.key === dim.key;
            return (
              <button
                key={dim.key}
                onClick={() => handleDimensionClick(dim)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-500/15 ring-2 ring-indigo-500/30 shadow-md scale-[1.02]' 
                    : 'border-inherit/20 hover:border-indigo-400/50 hover:bg-slate-500/5 hover:shadow-xs bg-slate-500/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-white/90 border border-slate-200 shadow-2xs">
                      {getDimensionIcon(dim.key)}
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getBadgeColor(dim.score)}`}>
                      {dim.score}%
                    </span>
                  </div>
                  <h3 className={`text-sm font-semibold transition-colors ${
                    isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-inherit group-hover:text-indigo-600'
                  }`}>
                    {dim.name}
                  </h3>
                  <p className="text-xs opacity-75 mt-1 line-clamp-1">
                    {dim.student_value}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-inherit/15 flex items-center justify-between text-xs font-medium opacity-85">
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
                  <div className="flex items-center space-x-1">
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-600' : 'opacity-60'}`}>
                      {isSelected ? 'Open' : 'Audit'}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isSelected ? 'rotate-180 text-indigo-600' : 'opacity-60 group-hover:translate-y-0.5'
                    }`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* SEPARATE DROPDOWN BOX (Appears smoothly right below the 5 dimensions when one is touched!) */}
      {selectedDimension && !isMatrixCollapsed && (
        <div 
          ref={dropdownRef}
          className="mt-5 rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-indigo-500/10 via-slate-500/5 to-transparent p-5 sm:p-6 shadow-xl backdrop-blur-xl animate-nav-slide-down relative"
        >
          {/* Top Bar with Icon, Title, Badges, and Close Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-inherit/15">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shrink-0">
                {getDimensionIconWhite(selectedDimension.key)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-inherit">
                    {selectedDimension.name} Audit
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border flex items-center space-x-1 ${getBadgeColor(selectedDimension.score)}`}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span>{selectedDimension.score}% Match</span>
                  </span>
                </div>
                <p className="text-xs opacity-70 mt-0.5">
                  Weight in Matching Engine: <strong className="text-indigo-600">{Math.round(selectedDimension.weight * 100)}%</strong>
                  {' '}• Status: <strong className="text-inherit">{selectedDimension.status}</strong>
                </p>
              </div>
            </div>

            {/* Close Dropdown Button */}
            <button
              onClick={() => setSelectedDimension(null)}
              className="self-end sm:self-auto px-3.5 py-1.5 rounded-xl border border-inherit/25 hover:bg-slate-500/10 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Close Audit Dropdown"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span>Close Dropdown</span>
            </button>
          </div>

          {/* Details Grid (Requirement, Profile Data, AI Reasoning) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Left Column: Requirement & Student Data */}
            <div className="space-y-3">
              <div className="bg-slate-500/10 p-3.5 rounded-xl border border-inherit/15">
                <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 block mb-1">
                  Scheme Requirement Evaluated
                </span>
                <p className="text-xs font-semibold text-inherit">
                  {selectedDimension.requirement_value}
                </p>
              </div>

              <div className="bg-slate-500/10 p-3.5 rounded-xl border border-inherit/15">
                <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 block mb-1">
                  Verified Student Profile Data
                </span>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg border border-inherit/20 inline-block">
                  {selectedDimension.student_value}
                </p>
              </div>
            </div>

            {/* Right Column: AI Grounded Evaluation */}
            <div className="bg-slate-500/10 p-3.5 rounded-xl border border-inherit/15 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 block mb-1">
                  AI Grounded Evaluation & Justification
                </span>
                <p className="text-xs opacity-85 leading-relaxed">
                  {selectedDimension.explanation}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-inherit/15 flex items-center justify-between text-xs">
                <span className="opacity-60 text-[11px]">Audit Result:</span>
                <span className="font-bold text-emerald-600 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedDimension.status}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom dismiss bar */}
          <div className="mt-4 pt-3 border-t border-inherit/15 flex items-center justify-between">
            <span className="text-[11px] opacity-60">
              Click any other dimension above to switch audit view, or close when done.
            </span>
            <button
              onClick={() => setSelectedDimension(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <span>Done Viewing</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
