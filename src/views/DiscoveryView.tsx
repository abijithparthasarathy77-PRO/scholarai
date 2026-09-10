import React, { useState, useMemo } from 'react';
import { Scholarship, MatchResult, StudentProfile } from '../types';
import { parseNaturalLanguageQuery, ParsedSearchFilters } from '../services/intentParser';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { NonMatchCard } from '../components/NonMatchCard';
import { 
  Search, 
  Filter, 
  Sparkles, 
  XCircle, 
  CheckCircle2, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface DiscoveryViewProps {
  scholarships: Scholarship[];
  matchResults: Map<string, MatchResult>;
  student: StudentProfile;
  onViewDetails: (scholarship: Scholarship) => void;
  onApplyOrSave: (scholarship: Scholarship) => void;
  onRequestManualReview: (scholarship: Scholarship) => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  scholarships,
  matchResults,
  student,
  onViewDetails,
  onApplyOrSave,
  onRequestManualReview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'eligible' | 'ineligible'>('eligible');

  // Structured Filters state
  const [minMatch, setMinMatch] = useState<number | null>(null);
  const [minFunding, setMinFunding] = useState<number | null>(null);
  const [degreeFilter, setDegreeFilter] = useState<string>('All');
  const [deadlineFilter, setDeadlineFilter] = useState<string>('All');
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<string>('All');
  const [verificationFilter, setVerificationFilter] = useState<string>('All');

  // Natural language parsed intent tags
  const nlpFilters = useMemo(() => {
    return parseNaturalLanguageQuery(searchQuery);
  }, [searchQuery]);

  // Handle Preset NLP chip click
  const handleApplyPresetQuery = (queryText: string) => {
    setSearchQuery(queryText);
  };

  // Filter scholarships
  const { eligibleList, ineligibleList } = useMemo(() => {
    const eligible: Scholarship[] = [];
    const ineligible: Scholarship[] = [];

    scholarships.forEach(s => {
      const match = matchResults.get(s.id);
      if (!match) return;

      // Check NLP extracted criteria if active
      if (nlpFilters.degree && nlpFilters.degree !== 'All') {
        const dMatch = s.criteria.allowed_degrees.some(d => 
          d.toLowerCase().includes(nlpFilters.degree!.toLowerCase()) || d.toLowerCase() === 'all'
        );
        if (!dMatch) return;
      }

      if (nlpFilters.financialNeedOnly) {
        if (!s.criteria.max_annual_income && s.category_type !== 'Need-based') return;
      }

      if (nlpFilters.minFunding && s.funding_amount < nlpFilters.minFunding) {
        return;
      }

      if (nlpFilters.deadlineFilter === 'this_week' && s.days_remaining > 7) {
        return;
      }

      if (nlpFilters.deadlineFilter === 'this_month' && s.days_remaining > 30) {
        return;
      }

      // Check Structured Rail filters
      if (minMatch && match.overall_score < minMatch) return;
      if (minFunding && s.funding_amount < minFunding) return;
      if (degreeFilter !== 'All') {
        const degreeAllowed = s.criteria.allowed_degrees.some(d => 
          d.toLowerCase().includes(degreeFilter.toLowerCase()) || d.toLowerCase() === 'all'
        );
        if (!degreeAllowed) return;
      }
      if (deadlineFilter === 'this_week' && s.days_remaining > 7) return;
      if (deadlineFilter === 'this_month' && s.days_remaining > 30) return;
      if (categoryTypeFilter !== 'All' && s.category_type !== categoryTypeFilter) return;
      if (verificationFilter !== 'All' && s.verification_status !== verificationFilter) return;

      if (match.is_eligible) {
        eligible.push(s);
      } else {
        ineligible.push(s);
      }
    });

    // Sort eligible by match score descending
    eligible.sort((a, b) => {
      const scoreA = matchResults.get(a.id)?.overall_score || 0;
      const scoreB = matchResults.get(b.id)?.overall_score || 0;
      return scoreB - scoreA;
    });

    return { eligibleList: eligible, ineligibleList: ineligible };
  }, [
    scholarships,
    matchResults,
    nlpFilters,
    minMatch,
    minFunding,
    degreeFilter,
    deadlineFilter,
    categoryTypeFilter,
    verificationFilter,
  ]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setMinMatch(null);
    setMinFunding(null);
    setDegreeFilter('All');
    setDeadlineFilter('All');
    setCategoryTypeFilter('All');
    setVerificationFilter('All');
  };

  const hasActiveFilters = Boolean(
    searchQuery || minMatch || minFunding || degreeFilter !== 'All' || 
    deadlineFilter !== 'All' || categoryTypeFilter !== 'All' || verificationFilter !== 'All'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-sans">
          Discover Scholarships
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Explore opportunities using natural language or multi-dimensional eligibility criteria.
        </p>
      </div>

      {/* Natural Language Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-indigo-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Find scholarships for B.Com students with financial need closing this month..."
            className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* NLP Extracted Criteria Feedback Tags */}
        {nlpFilters.extractedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-indigo-900 mr-1 flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 mr-1" />
              AI Extracted Intent:
            </span>
            {nlpFilters.extractedTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
              >
                {tag.label}: <strong>{tag.value}</strong>
              </span>
            ))}
          </div>
        )}

        {/* Preset Sample Prompts for quick demo testing */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-1 text-xs">
          <span className="text-slate-400 font-semibold shrink-0 text-[11px]">Try example queries:</span>
          <button
            onClick={() => handleApplyPresetQuery("Find scholarships for B.Com students with financial need closing this month")}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-[11px] font-medium transition-colors"
          >
            "Find scholarships for B.Com students with financial need closing this month"
          </button>
          <button
            onClick={() => handleApplyPresetQuery("Scholarships closing this week with high funding")}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-[11px] font-medium transition-colors"
          >
            "Scholarships closing this week with high funding"
          </button>
        </div>
      </div>

      {/* Main Container: Filter Rail + Results Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filter Rail */}
        <div className="lg:col-span-1 space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Filter Criteria</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Filter 1: Match Score */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Match Percentage
            </label>
            <div className="space-y-1 text-xs font-medium text-slate-600">
              {[
                { label: 'All Match Scores', value: null },
                { label: '90%+ (Strong Match)', value: 90 },
                { label: '80%+ (Likely Eligible)', value: 80 },
                { label: '70%+ (Broad Match)', value: 70 },
              ].map(opt => (
                <label key={String(opt.value)} className="flex items-center space-x-2 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="matchFilter"
                    checked={minMatch === opt.value}
                    onChange={() => setMinMatch(opt.value)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Funding Amount */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Minimum Funding
            </label>
            <div className="space-y-1 text-xs font-medium text-slate-600">
              {[
                { label: 'Any Amount', value: null },
                { label: '₹25,000+ / year', value: 25000 },
                { label: '₹50,000+ / year', value: 50000 },
                { label: '₹1,00,000+ / year', value: 100000 },
              ].map(opt => (
                <label key={String(opt.value)} className="flex items-center space-x-2 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="fundingFilter"
                    checked={minFunding === opt.value}
                    onChange={() => setMinFunding(opt.value)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 3: Degree */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Degree Discipline
            </label>
            <select
              value={degreeFilter}
              onChange={e => setDegreeFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All Disciplines</option>
              <option value="B.Com">B.Com / Commerce</option>
              <option value="BBA">BBA / Management</option>
              <option value="BA">BA / Arts</option>
              <option value="B.Sc">B.Sc / Science</option>
              <option value="Engineering">Engineering / B.Tech</option>
            </select>
          </div>

          {/* Filter 4: Deadline */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Application Deadline
            </label>
            <select
              value={deadlineFilter}
              onChange={e => setDeadlineFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All Deadlines</option>
              <option value="this_week">Closing This Week (&lt; 7 days)</option>
              <option value="this_month">Closing This Month (&lt;= 30 days)</option>
            </select>
          </div>

          {/* Filter 5: Eligibility Category */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Opportunity Scheme Type
            </label>
            <select
              value={categoryTypeFilter}
              onChange={e => setCategoryTypeFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All Scheme Types</option>
              <option value="Merit">Merit-Based</option>
              <option value="Need-based">Need-Based (Means)</option>
              <option value="Government">Government / State</option>
              <option value="Corporate">Corporate CSR</option>
            </select>
          </div>

          {/* Filter 6: Verification Status */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Data Verification
            </label>
            <select
              value={verificationFilter}
              onChange={e => setVerificationFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All Sources</option>
              <option value="Verified">Verified Official Sources</option>
              <option value="Needs Verification">Needs Verification</option>
            </select>
          </div>
        </div>

        {/* Right Results Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tab Switcher: Eligible vs Ineligible */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('eligible')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'eligible'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Eligible Matches ({eligibleList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ineligible')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'ineligible'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-700 bg-rose-50/70 hover:bg-rose-100 border border-rose-200/60'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Why You're Not Eligible ({ineligibleList.length})</span>
              </button>
            </div>

            <span className="text-xs text-slate-500 hidden sm:inline">
              Candidate: <strong>{student.name}</strong>
            </span>
          </div>

          {/* ELIGIBLE MATCHES TAB */}
          {activeTab === 'eligible' && (
            <div>
              {eligibleList.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">No scholarships matched these criteria</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try broadening your filters or resetting the search query to view all 28 qualified opportunities.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eligibleList.map(sch => {
                    const match = matchResults.get(sch.id)!;
                    return (
                      <ScholarshipCard
                        key={sch.id}
                        scholarship={sch}
                        matchResult={match}
                        onViewDetails={onViewDetails}
                        onApplyOrSave={onApplyOrSave}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* INELIGIBLE EXCLUSIONS TAB (Non-Black-Box Exclusion Logic) */}
          {activeTab === 'ineligible' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50/60 border border-rose-200/70 rounded-2xl text-xs text-rose-900 leading-relaxed">
                <strong className="block font-bold mb-0.5">Non-Black-Box Exclusion Transparency</strong>
                These opportunities failed mandatory hard constraints (such as restricted gender criteria, stem-only requirement, or non-resident state domicile). 
                You can review the exact disqualifier below or submit a <strong>Manual Review Request</strong> if you believe special circumstances apply.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ineligibleList.map(sch => {
                  const match = matchResults.get(sch.id)!;
                  return (
                    <NonMatchCard
                      key={sch.id}
                      scholarship={sch}
                      matchResult={match}
                      onViewDetails={onViewDetails}
                      onRequestReview={onRequestManualReview}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
