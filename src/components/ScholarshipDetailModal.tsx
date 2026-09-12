import React from 'react';
import { Scholarship, MatchResult, StudentDocument } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Coins, 
  FileText, 
  Building, 
  Sparkles,
  ArrowRight,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship;
  matchResult: MatchResult;
  documents: StudentDocument[];
  onClose: () => void;
  onApplyOrSave: (scholarship: Scholarship) => void;
  onRenewDocument?: (docId: string) => void;
  isInPipeline?: boolean;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  matchResult,
  documents,
  onClose,
  onApplyOrSave,
  onRenewDocument,
  isInPipeline = false,
}) => {
  // Check if any required document is expired
  const incomeDoc = documents.find(d => d.document_type.toLowerCase().includes('income'));
  const hasExpiredIncomeCert = incomeDoc?.is_expired || incomeDoc?.status === 'expired';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full my-8 max-h-[92vh] flex flex-col relative overflow-hidden animate-modal-popup"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {matchResult.overall_score}% Match • {matchResult.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                {scholarship.verification_status} ({scholarship.source_name})
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Verified Official Scheme
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {scholarship.title}
            </h2>

            <div className="flex items-center space-x-2 text-xs text-slate-600 mt-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-800">{scholarship.provider}</span>
              <span>•</span>
              <span>Category: {scholarship.category_type}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close dossier"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {/* CRITICAL BLOCKER ALERT SYSTEM (if required doc expired/missing) */}
          {hasExpiredIncomeCert && (
            <div className="bg-rose-50 border-2 border-rose-300/80 rounded-2xl p-4 shadow-xs">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-200 text-rose-800 px-2 py-0.5 rounded">
                      Action Required — Document Blocker
                    </span>
                    <span className="text-xs font-semibold text-rose-700">Verification Required</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Income Certificate Expired (Valid until FY 2024-25 only)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    This scholarship mandates a currently valid income certificate issued for FY 2025-26. 
                    Your Tahsildar document expired on 31-Mar-2026. Submit updated certificate to finalize eligibility.
                  </p>
                  
                  <div className="mt-3 flex items-center space-x-3">
                    {onRenewDocument && incomeDoc && (
                      <button
                        onClick={() => onRenewDocument(incomeDoc.id)}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        Simulate Document Update (FY 2026-27)
                      </button>
                    )}
                    <span className="text-xs text-slate-500 italic">
                      *Note: Updating will re-verify documents against state revenue & DigiLocker records.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Funding Amount</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900">{scholarship.funding_formatted}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Disbursed: {scholarship.frequency}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
                <Calendar className="w-4 h-4 text-rose-600" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Deadline Countdown</span>
              </div>
              <div className="mt-1">
                <CountdownTimer deadline={scholarship.deadline} />
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Closes: {new Date(scholarship.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Payment Mechanism</span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{scholarship.payment_method}</div>
              <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Aadhaar Bank Linked</div>
            </div>
          </div>

          {/* Section: Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Program Overview</h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {scholarship.description}
            </p>
          </div>

          {/* Section: Why You Match (5 Dimensions) */}
          <div className="bg-indigo-50/40 rounded-2xl p-5 border border-indigo-100">
            <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Eligibility Evaluation Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {matchResult.dimension_scores.map(dim => (
                <div key={dim.key} className="bg-white p-3 rounded-xl border border-indigo-100/70 shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-slate-900 font-semibold">{dim.name}</strong>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      dim.score >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {dim.score}%
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">{dim.explanation}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-100 text-xs text-indigo-900">
              <strong>Evaluation Summary: </strong>
              <span>{matchResult.summary_explanation}</span>
            </div>
          </div>

          {/* Section: Document Audit Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Required Documentation Audit</span>
              </h3>
              <span className="text-xs text-slate-500">
                Self-attested copies required for nodal scrutiny
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Document</th>
                    <th className="py-2.5 px-3">Mandatory</th>
                    <th className="py-2.5 px-3">Student Status</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scholarship.criteria.required_documents.map((req, idx) => {
                    const matchDoc = documents.find(d => 
                      d.document_type.toLowerCase().includes(req.toLowerCase()) ||
                      req.toLowerCase().includes(d.document_type.toLowerCase())
                    );
                    const isExpired = matchDoc?.is_expired || matchDoc?.status === 'expired';
                    return (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{req}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                            Required
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          {isExpired ? (
                            <span className="inline-flex items-center text-rose-700 font-bold">
                              <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-500" />
                              Expired
                            </span>
                          ) : matchDoc ? (
                            <span className="inline-flex items-center text-emerald-700 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                              Ready ({matchDoc.status})
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-amber-700 font-medium">
                              <Clock className="w-3.5 h-3.5 mr-1 text-amber-500" />
                              Pending Upload
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          {isExpired ? (
                            <button
                              onClick={() => onRenewDocument && matchDoc && onRenewDocument(matchDoc.id)}
                              className="text-indigo-600 font-bold hover:underline"
                            >
                              Update Document
                            </button>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Application Process & Official Source */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-900 block">Official Scheme Authority & Source</span>
              <span className="text-slate-500 mt-0.5 block">
                Source: {scholarship.source_name} • Verified on {scholarship.verified_date || '2026-09-01'}
              </span>
            </div>
            <a
              href={scholarship.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            Back to Catalog
          </button>

          <button
            onClick={() => {
              onApplyOrSave(scholarship);
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center space-x-2 transition-all ${
              isInPipeline 
                ? 'bg-emerald-600 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isInPipeline ? 'Already in Application Pipeline' : 'Add to Application Pipeline'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
