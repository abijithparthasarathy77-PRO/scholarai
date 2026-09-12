import React, { useState } from 'react';
import { Scholarship, StudentDocument } from '../../types';
import { Modal } from '../ui/Modal';
import { FiveDMatchRadar } from '../visual/FiveDMatchRadar';
import { PriorityBadge, UrgencyBadge, DocumentBadge } from '../ui/Badge';
import { ScoreRing } from '../ui/ScoreRing';
import {
  IndianRupee,
  Calendar,
  ExternalLink,
  Bot,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  BookmarkPlus,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ScholarshipDossierProps {
  scholarship: Scholarship | null;
  isOpen: boolean;
  onClose: () => void;
  documents: StudentDocument[];
  onAskAI: (scholarship: Scholarship) => void;
  onAddToStrategy: (scholarship: Scholarship) => void;
  onFixBlockers: () => void;
  isSaved?: boolean;
}

export const ScholarshipDossier: React.FC<ScholarshipDossierProps> = ({
  scholarship,
  isOpen,
  onClose,
  documents,
  onAskAI,
  onAddToStrategy,
  onFixBlockers,
  isSaved = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | '5d' | 'why' | 'documents' | 'process'>('overview');

  if (!scholarship) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={scholarship.name}
      subtitle={`${scholarship.provider} • ${scholarship.categoryTag}`}
    >
      <div className="space-y-6">
        {/* Top Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <PriorityBadge priority={scholarship.priorityRankLabel} score={scholarship.priorityScore} />
            <UrgencyBadge urgency={scholarship.urgency} daysLeft={scholarship.daysLeft} />
            {scholarship.isDemoData && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#A7B0C0] font-mono">
                DEMO DATA
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <IndianRupee size={15} className="text-[#22D3EE]" />
              <span>₹{scholarship.fundingAmount.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-[#A7B0C0] font-normal">({scholarship.fundingType})</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#F8FAFC]">
              <Calendar size={14} className="text-[#8B5CF6]" />
              <span>
                {new Date(scholarship.deadline).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview & Readiness' },
            { id: '5d', label: '5D AI Matching' },
            { id: 'why', label: 'Explainable AI (Why)' },
            { id: 'documents', label: `Required Documents (${scholarship.requiredDocuments.length})` },
            { id: 'process', label: 'Application Process' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#8B5CF6]/30 to-[#22D3EE]/20 text-white border border-[#8B5CF6]/40 shadow-sm'
                  : 'text-[#A7B0C0] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & READINESS */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Description */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <h5 className="text-xs uppercase font-bold text-[#A7B0C0] tracking-wider mb-1">
                Scholarship Scope
              </h5>
              <p className="text-sm text-[#F8FAFC] leading-relaxed">{scholarship.description}</p>
            </div>

            {/* Application Readiness Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121A2E] to-[#0B1020] border border-[#8B5CF6]/30 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <ScoreRing
                    score={scholarship.readinessScore}
                    size={64}
                    strokeWidth={6}
                    variant={scholarship.readinessScore >= 85 ? 'mint' : 'amber'}
                  />
                  <div>
                    <h4 className="text-base font-display font-bold text-white">
                      Application Readiness: {scholarship.readinessScore}% READY
                    </h4>
                    <p className="text-xs text-[#A7B0C0]">
                      {scholarship.blockers.length === 0
                        ? 'All pre-requisites met. Ready for direct portal filing.'
                        : `${scholarship.blockers.length} critical blocker(s) requiring your attention`}
                    </p>
                  </div>
                </div>

                {scholarship.blockers.length > 0 && (
                  <button
                    onClick={() => {
                      onClose();
                      onFixBlockers();
                    }}
                    className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#FB7185] text-black text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity self-start sm:self-auto"
                  >
                    <Zap size={14} />
                    <span>Fix Blockers</span>
                  </button>
                )}
              </div>

              {/* Blockers list */}
              {scholarship.blockers.length > 0 ? (
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <span className="text-xs font-bold text-[#FBBF24] flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    <span>Current Blockers:</span>
                  </span>
                  {scholarship.blockers.map((b, i) => (
                    <div
                      key={i}
                      className="text-xs text-[#F8FAFC] bg-white/5 p-2.5 rounded-xl border border-white/5 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 flex items-center gap-2 text-xs text-[#34D399]">
                  <CheckCircle2 size={16} />
                  <span>Zero blockers detected. All required profile and document metrics satisfy requirements.</span>
                </div>
              )}
            </div>

            {/* Next Strategic Action */}
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B5CF6] tracking-wider block">
                  Recommended Next Strategic Action
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">{scholarship.nextAction}</p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onAskAI(scholarship);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#22D3EE] border border-[#22D3EE]/30 text-xs font-medium flex items-center gap-1.5 shrink-0"
              >
                <Bot size={15} />
                <span>Ask Advisor</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: 5D MATCHING */}
        {activeTab === '5d' && (
          <div className="animate-fadeIn">
            <FiveDMatchRadar fiveD={scholarship.fiveD} overallScore={scholarship.matchScore} />
          </div>
        )}

        {/* TAB 3: EXPLAINABLE AI (WHY) */}
        {activeTab === 'why' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Why You Qualify */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={18} className="text-[#34D399]" />
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Why You Qualify ({scholarship.whyYouQualify.length} Criteria Passed)
                </h4>
              </div>

              <div className="space-y-2.5">
                {scholarship.whyYouQualify.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">{item.criterion}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.result === 'EXCEEDS'
                            ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40'
                            : 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40'
                        }`}
                      >
                        {item.result}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#A7B0C0] mb-2 bg-[#070B17]/60 p-2 rounded-lg">
                      <div>
                        <span className="text-[10px] text-[#64748B] block uppercase">Requirement:</span>
                        <span className="text-[#F8FAFC]">{item.requirement}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#64748B] block uppercase">Your Data:</span>
                        <span className="text-[#22D3EE]">{item.studentData}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A7B0C0] italic">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why You Don't Qualify (If any) */}
            {scholarship.whyYouDontQualify && scholarship.whyYouDontQualify.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} className="text-[#FB7185]" />
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Disqualifying Factors ({scholarship.whyYouDontQualify.length} Mismatches)
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {scholarship.whyYouDontQualify.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FB7185]/10 border border-[#FB7185]/30"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-[#FB7185]">{item.criterion}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-[#FB7185]/20 text-[#FB7185] border border-[#FB7185]/40">
                          {item.result}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#A7B0C0] mb-2 bg-black/40 p-2 rounded-lg">
                        <div>
                          <span className="text-[10px] text-[#FB7185] block uppercase">Requirement:</span>
                          <span className="text-[#F8FAFC]">{item.requirement}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#FB7185] block uppercase">Your Data:</span>
                          <span className="text-[#F8FAFC]">{item.studentData}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#F8FAFC] italic">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REQUIRED DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-xs text-[#A7B0C0] mb-2">
              Status of required documents in your personal document intelligence vault:
            </p>

            {scholarship.requiredDocuments.map((docName, idx) => {
              const matchedDoc = documents.find(
                (d) => d.name.toLowerCase().includes(docName.toLowerCase()) || docName.toLowerCase().includes(d.name.toLowerCase())
              );
              const status = matchedDoc ? matchedDoc.status : 'MISSING';

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#22D3EE]">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{docName}</h5>
                      <span className="text-[11px] text-[#A7B0C0]">
                        {matchedDoc ? matchedDoc.aiCheckNotes : 'Not uploaded to document vault yet.'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DocumentBadge status={status} />
                  </div>
                </div>
              );
            })}

            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#A7B0C0]">
                <ShieldCheck size={16} className="text-[#34D399]" />
                <span>AI Document Check: Automatic formatting & expiration validation</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onFixBlockers();
                }}
                className="text-xs text-[#22D3EE] font-bold hover:underline"
              >
                Open Document Vault →
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: APPLICATION PROCESS */}
        {activeTab === 'process' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#A7B0C0]">
              Step-by-step verified workflow to complete your application for this scholarship:
            </p>

            <div className="space-y-3">
              {scholarship.applicationProcess.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-xs font-bold text-white">{step.title}</h5>
                      <span className="text-[10px] text-[#A7B0C0] flex items-center gap-1">
                        <Clock size={11} />
                        <span>{step.duration}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#A7B0C0] mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAI(scholarship);
            }}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#22D3EE] flex items-center gap-2 transition-colors"
          >
            <Bot size={15} />
            <span>Ask ScholarAI About This</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToStrategy(scholarship)}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                isSaved
                  ? 'bg-[#34D399]/20 border-[#34D399]/40 text-[#34D399]'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
              }`}
            >
              <BookmarkPlus size={15} />
              <span>{isSaved ? 'In My Strategy' : 'Add to My Strategy'}</span>
            </button>

            <a
              href={scholarship.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center gap-2 hover:opacity-95 transition-opacity shadow-md"
            >
              <span>Visit Official Portal</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
