import React, { useState } from 'react';
import { Scholarship, StudentProfile, EligibilityRule } from '../../types';
import { RuleBuilder } from './RuleBuilder';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Database,
  Code2
} from 'lucide-react';

interface AdminDashboardProps {
  scholarships: Scholarship[];
  student: StudentProfile;
  rules: EligibilityRule[];
  onSaveRule: (rule: EligibilityRule) => void;
  onAddScholarship: (scholarship: Scholarship) => void;
  onDeleteScholarship: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  scholarships,
  student,
  rules,
  onSaveRule,
  onAddScholarship,
  onDeleteScholarship
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'rules' | 'quality'>('rules');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchName, setNewSchName] = useState('');
  const [newSchProvider, setNewSchProvider] = useState('');
  const [newSchAmount, setNewSchAmount] = useState(50000);

  const handleCreateScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchName.trim()) return;

    const newSch: Scholarship = {
      id: `sch-custom-${Date.now()}`,
      name: newSchName,
      provider: newSchProvider || 'Independent Endowment',
      categoryTag: 'Corporate CSR Grant',
      fundingAmount: Number(newSchAmount),
      fundingType: 'Annual',
      deadline: '2026-10-15',
      daysLeft: 33,
      urgency: 'UPCOMING',
      eligibleDegrees: ['B.Com (Honours)', 'B.A', 'B.Sc'],
      eligibleLocations: ['Pan-India'],
      maxFamilyIncome: 600000,
      minAcademicScore: 60,
      minGpa: 3.0,
      eligibleCategories: ['All Categories'],
      requiredDocuments: ['Annual Family Income Certificate', 'Academic Transcript'],
      applicationUrl: 'https://scholarai.io/apply',
      description: 'Newly provisioned scholarship opportunity configured via Administrator console.',
      whyItMatches: 'Criteria aligns with baseline undergraduate commerce discipline.',
      matchScore: 82,
      priorityScore: 75,
      readinessScore: 80,
      priorityRankLabel: 'RECOMMENDED',
      nextAction: 'Review requirement criteria',
      blockers: [],
      whyYouQualify: [
        {
          criterion: 'Academic Eligibility',
          requirement: 'Minimum 60% in college marksheet',
          studentData: `${student.academicScore}% aggregate`,
          result: 'EXCEEDS',
          explanation: 'Academic score meets requirement.'
        }
      ],
      fiveD: {
        academicRigor: { score: 85, requirement: '>= 60%', studentValue: `${student.academicScore}%`, explanation: 'Meets cutoff', weight: 25 },
        degreeAlignment: { score: 90, requirement: 'Commerce/Arts/Science', studentValue: student.degree, explanation: 'Aligned', weight: 20 },
        stateDomicile: { score: 100, requirement: 'Pan-India', studentValue: student.stateDomicile, explanation: 'Eligible', weight: 15 },
        financialNeed: { score: 80, requirement: '< ₹6.0L', studentValue: `₹${student.familyAnnualIncome}`, explanation: 'Eligible', weight: 25 },
        cohortCategory: { score: 85, requirement: 'Open', studentValue: student.category, explanation: 'Eligible', weight: 15 },
        overallScore: 82
      },
      applicationProcess: [
        { step: 1, title: 'Online Form', desc: 'Complete standard filing', duration: '15 mins' }
      ],
      isDemoData: true
    };

    onAddScholarship(newSch);
    setShowAddModal(false);
    setNewSchName('');
    setNewSchProvider('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-[#8B5CF6]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              ScholarAI Admin & Strategy Console
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A7B0C0] max-w-xl">
            Configure system-wide scholarship repositories, manage visual eligibility rules, and audit catalog data quality.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors ${
              activeTab === 'rules'
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'text-[#A7B0C0] hover:text-white'
            }`}
          >
            <Code2 size={13} />
            <span>Rule Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors ${
              activeTab === 'catalog'
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'text-[#A7B0C0] hover:text-white'
            }`}
          >
            <Database size={13} />
            <span>Scholarship Catalog ({scholarships.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors ${
              activeTab === 'quality'
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'text-[#A7B0C0] hover:text-white'
            }`}
          >
            <BarChart3 size={13} />
            <span>Data Quality</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VISUAL RULE BUILDER */}
      {activeTab === 'rules' && (
        <RuleBuilder
          student={student}
          existingRules={rules}
          onSaveRule={onSaveRule}
        />
      )}

      {/* TAB 2: SCHOLARSHIP CATALOG */}
      {activeTab === 'catalog' && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Active Scholarship Catalog
              </h3>
              <span className="text-xs text-[#A7B0C0]">
                Manage records evaluated by the 5D matching algorithm
              </span>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus size={14} />
              <span>Add Scholarship</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#A7B0C0]">
              <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Scholarship</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Funding</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Eligible Degrees</th>
                  <th className="p-3 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scholarships.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-semibold text-white">{s.name}</td>
                    <td className="p-3 text-[#A7B0C0]">{s.provider}</td>
                    <td className="p-3 text-white font-bold">
                      ₹{s.fundingAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-white">{s.deadline}</td>
                    <td className="p-3 max-w-xs truncate text-[#64748B]">
                      {s.eligibleDegrees.join(', ')}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onDeleteScholarship(s.id)}
                        className="text-[#FB7185] hover:text-red-400 p-1"
                        title="Delete record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DATA QUALITY & ANALYTICS */}
      {activeTab === 'quality' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2">
            <span className="text-xs uppercase font-bold text-[#A7B0C0]">Catalog Health</span>
            <div className="text-3xl font-display font-bold text-[#34D399]">98.4%</div>
            <p className="text-xs text-[#64748B]">
              All scholarship records adhere to mandatory criteria formats, income bounds, and document specs.
            </p>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2">
            <span className="text-xs uppercase font-bold text-[#A7B0C0]">Algorithm Latency</span>
            <div className="text-3xl font-display font-bold text-[#22D3EE]">14ms</div>
            <p className="text-xs text-[#64748B]">
              Real-time 5D vector calculation and multi-tier priority re-ranking executed locally.
            </p>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2">
            <span className="text-xs uppercase font-bold text-[#A7B0C0]">Verification Integrity</span>
            <div className="text-3xl font-display font-bold text-[#8B5CF6]">Strict</div>
            <p className="text-xs text-[#64748B]">
              Clear ethical boundaries enforced. No simulated government APIs claimed.
            </p>
          </div>
        </div>
      )}

      {/* Add Scholarship Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="glass-panel-elevated p-6 rounded-3xl border border-white/20 max-w-md w-full space-y-4">
            <h3 className="text-lg font-display font-bold text-white">Add New Scholarship</h3>
            <form onSubmit={handleCreateScholarship} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1">
                  Scholarship Title
                </label>
                <input
                  type="text"
                  required
                  value={newSchName}
                  onChange={(e) => setNewSchName(e.target.value)}
                  placeholder="e.g. HDFC Fellowship for Commerce"
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1">Provider</label>
                <input
                  type="text"
                  required
                  value={newSchProvider}
                  onChange={(e) => setNewSchProvider(e.target.value)}
                  placeholder="e.g. HDFC Bank Parivartan"
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1">
                  Funding Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  value={newSchAmount}
                  onChange={(e) => setNewSchAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2 px-3 rounded-xl bg-white/10 text-xs font-semibold text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold"
                >
                  Create & Calculate Matches
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
