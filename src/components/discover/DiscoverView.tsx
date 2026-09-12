import React, { useState, useMemo } from 'react';
import { Scholarship } from '../../types';
import { ScholarshipCard } from './ScholarshipCard';
import { parseNaturalLanguageQuery } from '../../services/nlpSearch';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface DiscoverViewProps {
  scholarships: Scholarship[];
  onViewDossier: (scholarship: Scholarship) => void;
  onAddToStrategy: (scholarship: Scholarship) => void;
  savedScholarshipIds: string[];
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  scholarships,
  onViewDossier,
  onAddToStrategy,
  savedScholarshipIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [fundingTier, setFundingTier] = useState<string>('All');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const nlpSuggestions = [
    'Find scholarships for B.Com students',
    'Show scholarships above ₹50,000',
    'Show scholarships closing this week',
    'Find scholarships I can apply for now'
  ];

  // Apply NLP search first, then apply multi-facet filters
  const filteredScholarships = useMemo(() => {
    const nlpResult = parseNaturalLanguageQuery(searchQuery, scholarships);
    let result = nlpResult.scholarships;

    if (selectedDegree !== 'All') {
      result = result.filter((s) => s.eligibleDegrees.some((d) => d.toLowerCase().includes(selectedDegree.toLowerCase())));
    }

    if (selectedLocation !== 'All') {
      result = result.filter(
        (s) =>
          s.eligibleLocations.includes('Pan-India') ||
          s.eligibleLocations.some((loc) => loc.toLowerCase().includes(selectedLocation.toLowerCase()))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(
        (s) =>
          s.eligibleCategories.includes('All Categories') ||
          s.eligibleCategories.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    if (minMatchScore > 0) {
      result = result.filter((s) => s.matchScore >= minMatchScore);
    }

    if (urgencyFilter !== 'All') {
      result = result.filter((s) => s.urgency === urgencyFilter);
    }

    if (fundingTier === 'under50k') {
      result = result.filter((s) => s.fundingAmount <= 50000);
    } else if (fundingTier === '50kTo100k') {
      result = result.filter((s) => s.fundingAmount > 50000 && s.fundingAmount <= 100000);
    } else if (fundingTier === 'over100k') {
      result = result.filter((s) => s.fundingAmount > 100000);
    }

    return result;
  }, [searchQuery, scholarships, selectedDegree, selectedLocation, selectedCategory, minMatchScore, urgencyFilter, fundingTier]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDegree('All');
    setSelectedLocation('All');
    setSelectedCategory('All');
    setMinMatchScore(0);
    setUrgencyFilter('All');
    setFundingTier('All');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDegree !== 'All' ||
    selectedLocation !== 'All' ||
    selectedCategory !== 'All' ||
    minMatchScore > 0 ||
    urgencyFilter !== 'All' ||
    fundingTier !== 'All';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Header & NLP Suggester */}
      <div className="p-6 rounded-3xl glass-panel-elevated border border-white/10 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-[#22D3EE]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Scholarship Discovery & Intelligence
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A7B0C0]">
            Use natural-language queries or multi-dimensional criteria to surface verified opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A7B0C0]">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask ScholarAI to find scholarships (e.g., 'Show scholarships above ₹50,000' or 'closing this week')..."
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl glass-input text-sm text-white placeholder:text-[#64748B] focus:border-[#8B5CF6] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-xs text-[#A7B0C0] hover:text-white px-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Natural Language Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mr-1">
            Try asking:
          </span>
          {nlpSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(suggestion)}
              className="py-1 px-3 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#A7B0C0] hover:text-[#22D3EE] border border-white/5 hover:border-[#22D3EE]/30 transition-colors"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Filters + Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Toggle Filters on Mobile */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white flex items-center gap-2"
          >
            <SlidersHorizontal size={14} />
            <span>{showFiltersMobile ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          <span className="text-xs text-[#A7B0C0]">{filteredScholarships.length} opportunities</span>
        </div>

        {/* Filter Sidebar */}
        <div
          className={`lg:col-span-3 glass-card p-5 rounded-3xl border border-white/10 space-y-5 ${
            showFiltersMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#8B5CF6]" />
              <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                Filters
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#22D3EE] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Degree Filter */}
          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider block mb-2">
              Degree & Discipline
            </label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
            >
              <option value="All" className="bg-[#121A2E]">All Degrees</option>
              <option value="B.Com" className="bg-[#121A2E]">B.Com / Commerce</option>
              <option value="B.Tech" className="bg-[#121A2E]">B.Tech / Engineering</option>
              <option value="B.A" className="bg-[#121A2E]">B.A / Economics</option>
              <option value="B.Sc" className="bg-[#121A2E]">B.Sc / Sciences</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider block mb-2">
              State / Domicile
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
            >
              <option value="All" className="bg-[#121A2E]">All Locations (Pan-India)</option>
              <option value="Maharashtra" className="bg-[#121A2E]">Maharashtra</option>
              <option value="Delhi" className="bg-[#121A2E]">Delhi-NCR</option>
              <option value="Karnataka" className="bg-[#121A2E]">Karnataka</option>
            </select>
          </div>

          {/* Funding Tier Filter */}
          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider block mb-2">
              Funding Amount
            </label>
            <select
              value={fundingTier}
              onChange={(e) => setFundingTier(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
            >
              <option value="All" className="bg-[#121A2E]">Any Funding Amount</option>
              <option value="under50k" className="bg-[#121A2E]">Under ₹50,000</option>
              <option value="50kTo100k" className="bg-[#121A2E]">₹50,000 - ₹1,00,000</option>
              <option value="over100k" className="bg-[#121A2E]">Above ₹1,00,000</option>
            </select>
          </div>

          {/* Urgency Filter */}
          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider block mb-2">
              Deadline Urgency
            </label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
            >
              <option value="All" className="bg-[#121A2E]">All Deadlines</option>
              <option value="CRITICAL" className="bg-[#121A2E]">Critical (&lt; 3 days)</option>
              <option value="URGENT" className="bg-[#121A2E]">Urgent (3 - 7 days)</option>
              <option value="UPCOMING" className="bg-[#121A2E]">Upcoming (7+ days)</option>
            </select>
          </div>

          {/* Minimum Match Score Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-[#A7B0C0] uppercase tracking-wider">
                Min 5D Match
              </span>
              <span className="font-display font-bold text-[#22D3EE]">{minMatchScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minMatchScore}
              onChange={(e) => setMinMatchScore(Number(e.target.value))}
              className="w-full accent-[#8B5CF6] bg-white/10 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Quick Clear */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-[#A7B0C0] hover:text-white border border-white/10 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Scholarship Results Grid */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A7B0C0] px-1">
            <span>
              Showing <strong className="text-white">{filteredScholarships.length}</strong> qualified scholarship opportunities
            </span>
            {hasActiveFilters && (
              <span className="text-[#22D3EE] flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Filters Applied</span>
              </span>
            )}
          </div>

          {filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  onViewDossier={onViewDossier}
                  onAddToStrategy={onAddToStrategy}
                  isSaved={savedScholarshipIds.includes(scholarship.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl glass-card text-center space-y-3 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#A7B0C0] mx-auto">
                <Search size={24} />
              </div>
              <h4 className="text-lg font-display font-bold text-white">No scholarships match your filters</h4>
              <p className="text-xs text-[#A7B0C0] max-w-sm mx-auto">
                Try loosening your filter constraints or resetting your search keywords to view available opportunities.
              </p>
              <button
                onClick={resetFilters}
                className="py-2 px-4 rounded-xl bg-[#8B5CF6] text-white text-xs font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 mt-2"
              >
                <RotateCcw size={13} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
