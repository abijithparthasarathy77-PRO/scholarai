import React, { useState } from 'react';
import { StudentDocument } from '../../types';
import { DocumentBadge } from '../ui/Badge';
import {
  FileText,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Info,
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DocumentCenterProps {
  documents: StudentDocument[];
  onUpdateStatus: (docId: string, newStatus: StudentDocument['status'], notes?: string) => void;
  onNavigateDashboard: () => void;
}

export const DocumentCenter: React.FC<DocumentCenterProps> = ({
  documents,
  onUpdateStatus,
  onNavigateDashboard
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeUploadDoc, setActiveUploadDoc] = useState<StudentDocument | null>(null);

  const readyCount = documents.filter((d) => d.status === 'READY').length;
  const expiredCount = documents.filter((d) => d.status === 'EXPIRED').length;
  const missingCount = documents.filter((d) => d.status === 'MISSING').length;

  const filteredDocs = documents.filter((doc) => {
    if (selectedFilter === 'all') return true;
    return doc.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleSimulateResolve = (doc: StudentDocument) => {
    onUpdateStatus(
      doc.id,
      'READY',
      `AI Document Check: Renewed and verified active for FY 2026-27.`
    );
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-[#34D399]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Document Intelligence Center
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A7B0C0] max-w-xl">
            Audit, track, and validate eligibility credentials required for official scholarship filings.
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-[#22D3EE] bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start">
            <Info size={13} />
            <span>AI Document Check: Evaluates date validity, authority stamps, and formatting.</span>
          </div>
        </div>

        {/* Readiness overview */}
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 self-start md:self-auto">
          <div className="text-center">
            <span className="text-2xl font-display font-extrabold text-[#34D399] block">{readyCount}</span>
            <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Ready</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="text-center">
            <span className="text-2xl font-display font-extrabold text-[#FB7185] block">{expiredCount}</span>
            <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Expired</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="text-center">
            <span className="text-2xl font-display font-extrabold text-[#FBBF24] block">{missingCount}</span>
            <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Missing</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold pb-1">
        {[
          { id: 'all', label: `All Documents (${documents.length})` },
          { id: 'ready', label: `Ready (${readyCount})` },
          { id: 'expired', label: `Expired Blockers (${expiredCount})` },
          { id: 'missing', label: `Missing (${missingCount})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              selectedFilter === tab.id
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-white/5 text-[#A7B0C0] hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Document Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const isBlocked = doc.status === 'EXPIRED' || doc.status === 'MISSING';

          return (
            <div
              key={doc.id}
              className={`p-5 rounded-3xl glass-card border transition-all flex flex-col justify-between space-y-4 ${
                doc.status === 'EXPIRED'
                  ? 'border-[#FB7185]/40 bg-[#FB7185]/5'
                  : doc.status === 'MISSING'
                  ? 'border-[#FBBF24]/40 bg-[#FBBF24]/5'
                  : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        doc.status === 'READY'
                          ? 'bg-[#34D399]/20 text-[#34D399]'
                          : doc.status === 'EXPIRED'
                          ? 'bg-[#FB7185]/20 text-[#FB7185]'
                          : 'bg-[#FBBF24]/20 text-[#FBBF24]'
                      }`}
                    >
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white leading-tight">
                        {doc.name}
                      </h4>
                      <span className="text-[11px] text-[#8B5CF6] font-medium">{doc.category} Category</span>
                    </div>
                  </div>

                  <DocumentBadge status={doc.status} />
                </div>

                {/* AI Check Status Box */}
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-[#A7B0C0] space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold">
                    <span className="text-[#22D3EE]">AI Document Intelligence</span>
                    <span
                      className={
                        doc.aiCheckStatus === 'Verified'
                          ? 'text-[#34D399]'
                          : doc.aiCheckStatus === 'Expired'
                          ? 'text-[#FB7185]'
                          : 'text-[#FBBF24]'
                      }
                    >
                      {doc.aiCheckStatus}
                    </span>
                  </div>
                  <p className="text-xs text-[#F8FAFC] italic leading-relaxed">{doc.aiCheckNotes}</p>
                </div>

                {/* Required for tags */}
                {doc.requiredFor && doc.requiredFor.length > 0 && (
                  <div className="mt-3 text-[11px] text-[#64748B]">
                    <span className="font-semibold text-[#A7B0C0]">Required for: </span>
                    <span>{doc.requiredFor.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Action Resolution Button */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                {isBlocked ? (
                  <button
                    onClick={() => handleSimulateResolve(doc)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity shadow-md"
                  >
                    <Zap size={14} />
                    <span>
                      {doc.status === 'EXPIRED' ? 'Simulate Renew Certificate (Fix Blocker)' : 'Simulate Upload Document'}
                    </span>
                  </button>
                ) : (
                  <div className="w-full py-2 px-3 rounded-xl bg-white/5 border border-white/5 text-xs text-[#34D399] font-medium flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>Verified & Compliant</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#A7B0C0] flex items-center justify-between gap-4">
        <span>
          Renewing or uploading documents automatically recalibrates your 5D matching readiness across all applications.
        </span>
        <button
          onClick={onNavigateDashboard}
          className="text-[#22D3EE] hover:underline font-bold whitespace-nowrap"
        >
          Return to Dashboard →
        </button>
      </div>
    </div>
  );
};
