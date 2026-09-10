import React, { useState } from 'react';
import { Scholarship, ManualReviewRequest, EligibilityRule, User } from '../types';
import { RuleBuilder } from '../components/RuleBuilder';
import { 
  Shield, 
  BookOpen, 
  Sliders, 
  FileQuestion, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Building, 
  Coins, 
  Calendar, 
  Clock, 
  Search,
  ExternalLink,
  Edit,
  Save,
  X
} from 'lucide-react';

interface AdminDashboardViewProps {
  adminUser: User;
  scholarships: Scholarship[];
  manualReviews: ManualReviewRequest[];
  rules: EligibilityRule[];
  onSaveRule: (rule: EligibilityRule) => void;
  onUpdateScholarship: (scholarship: Scholarship) => void;
  onUpdateManualReview: (reviewId: string, status: ManualReviewRequest['status'], notes?: string) => void;
  onSwitchToStudentView: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adminUser,
  scholarships,
  manualReviews,
  rules,
  onSaveRule,
  onUpdateScholarship,
  onUpdateManualReview,
  onSwitchToStudentView,
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'scholarships' | 'rules' | 'reviews'>('overview');
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [reviewModalData, setReviewModalData] = useState<{ id: string; status: ManualReviewRequest['status']; notes: string } | null>(null);
  const [searchScholarship, setSearchScholarship] = useState('');

  const pendingReviewsCount = manualReviews.filter(r => r.status === 'Pending Review').length;

  const handleToggleVerification = (sch: Scholarship) => {
    const updated: Scholarship = {
      ...sch,
      verification_status: sch.verification_status === 'Verified' ? 'Needs Verification' : 'Verified',
      verified_by: adminUser.name,
      verified_date: new Date().toISOString().split('T')[0],
    };
    onUpdateScholarship(updated);
  };

  const handleSaveScholarshipEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScholarship) {
      onUpdateScholarship(editingScholarship);
      setEditingScholarship(null);
    }
  };

  const filteredScholarships = scholarships.filter(s => 
    s.title.toLowerCase().includes(searchScholarship.toLowerCase()) ||
    s.provider.toLowerCase().includes(searchScholarship.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/80 border border-purple-400/40 text-white flex items-center justify-center shadow-md shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-400 text-purple-950">
                Institutional Authority
              </span>
              <span className="text-xs text-purple-200">ScholarAI Administration Suite</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-0.5">
              {adminUser.name}
            </h1>
            <p className="text-xs text-purple-200/80">
              Chief Scholarship Evaluator & Nodal Scrutiny Officer
            </p>
          </div>
        </div>

        <button
          onClick={onSwitchToStudentView}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors self-start md:self-auto"
        >
          Switch to Aarav Sharma (Student View)
        </button>
      </div>

      {/* Admin Sub-navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Dashboard Overview
        </button>

        <button
          onClick={() => setSubTab('scholarships')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            subTab === 'scholarships'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Scholarship Catalog ({scholarships.length})</span>
        </button>

        <button
          onClick={() => setSubTab('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            subTab === 'rules'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Eligibility Rule Builder</span>
        </button>

        <button
          onClick={() => setSubTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 relative ${
            subTab === 'reviews'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileQuestion className="w-3.5 h-3.5" />
          <span>Manual Reviews / Appeals</span>
          {pendingReviewsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping ml-1"></span>
          )}
        </button>
      </div>

      {/* SUB-TAB 1: OVERVIEW */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total Active Schemes</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{scholarships.length}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">100% indexed in engine</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Manual Audits Pending</span>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-1">{pendingReviewsCount}</div>
              <span className="text-[11px] text-rose-700 font-semibold">Awaiting officer review</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Configured Rules</span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1">{rules.length} Rules</div>
              <span className="text-[11px] text-indigo-600 font-semibold">Active AST conditions</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Verified Official Sources</span>
              <div className="text-2xl sm:text-3xl font-black text-purple-700 mt-1">
                {scholarships.filter(s => s.verification_status === 'Verified').length}
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">Audited against gazettes</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Administrative Duties & Quality Bar</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              As an authorized scholarship nodal officer, you can update scheme funding figures, certify official source gazettes, 
              construct visual multi-factor boolean eligibility rules, and resolve student exclusion appeals with formal administrative notes.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SCHOLARSHIPS MANAGER */}
      {subTab === 'scholarships' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchScholarship}
                onChange={e => setSearchScholarship(e.target.value)}
                placeholder="Search scholarship registry..."
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Scholarship & Provider</th>
                    <th className="py-3 px-4">Funding Amount</th>
                    <th className="py-3 px-4">Deadline</th>
                    <th className="py-3 px-4">Source Verification</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredScholarships.map(sch => (
                    <tr key={sch.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{sch.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{sch.provider}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {sch.funding_formatted}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-700">
                          {new Date(sch.deadline).toLocaleDateString('en-IN')}
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {sch.days_remaining} days left
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleVerification(sch)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                            sch.verification_status === 'Verified'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {sch.verification_status} (Click to toggle)
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setEditingScholarship(sch)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                          title="Edit scholarship parameters"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ELIGIBILITY RULE BUILDER */}
      {subTab === 'rules' && (
        <RuleBuilder
          existingRules={rules}
          onSaveRule={onSaveRule}
        />
      )}

      {/* SUB-TAB 4: MANUAL REVIEW AUDIT QUEUE */}
      {subTab === 'reviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Student Manual Review Queue</h3>
              <p className="text-xs text-slate-500">
                Review and adjudicate student appeals regarding automated AI eligibility exclusions.
              </p>
            </div>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold">
              {manualReviews.length} Total Appeals
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {manualReviews.map(rev => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                      Appeal Case ID: {rev.id}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {rev.scholarship_title}
                    </h4>
                    <span className="text-xs text-slate-500">
                      Applicant: <strong className="text-slate-800">{rev.student_name}</strong> • Reason: {rev.reason}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border self-start sm:self-auto ${
                    rev.status === 'Resolved' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : rev.status === 'Under Review'
                      ? 'bg-sky-50 text-sky-800 border-sky-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {rev.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-700">Student Submitted Context:</div>
                  <p className="text-slate-800 italic">{rev.supporting_explanation}</p>
                  {rev.additional_info && (
                    <div className="text-[11px] text-slate-500 pt-1">
                      Details: {rev.additional_info}
                    </div>
                  )}
                </div>

                {rev.admin_notes && (
                  <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-950">
                    <strong>Nodal Officer Note: </strong>
                    <span>{rev.admin_notes}</span>
                  </div>
                )}

                {/* Status Change Buttons */}
                <div className="flex items-center justify-end space-x-2 pt-2 text-xs font-semibold">
                  <button
                    onClick={() => onUpdateManualReview(rev.id, 'Under Review', 'Case pulled for transcript syllabus review.')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                  >
                    Mark Under Review
                  </button>
                  <button
                    onClick={() => onUpdateManualReview(rev.id, 'Resolved', 'Approved for manual override consideration based on curriculum rigor.')}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-2xs"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT SCHOLARSHIP MODAL */}
      {editingScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingScholarship(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-3">Edit Scholarship Scheme</h3>

            <form onSubmit={handleSaveScholarshipEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scholarship Title</label>
                <input
                  type="text"
                  value={editingScholarship.title}
                  onChange={e => setEditingScholarship({ ...editingScholarship, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Funding Display</label>
                  <input
                    type="text"
                    value={editingScholarship.funding_formatted}
                    onChange={e => setEditingScholarship({ ...editingScholarship, funding_formatted: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Numeric Amount (INR)</label>
                  <input
                    type="number"
                    value={editingScholarship.funding_amount}
                    onChange={e => setEditingScholarship({ ...editingScholarship, funding_amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Provider / Ministry</label>
                <input
                  type="text"
                  value={editingScholarship.provider}
                  onChange={e => setEditingScholarship({ ...editingScholarship, provider: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingScholarship(null)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
