import React, { useState } from 'react';
import { StudentProfile, StudentDocument } from '../types';
import { 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  UploadCloud, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  FileText,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  student: StudentProfile;
  documents: StudentDocument[];
  onRenewDocument: (docId: string) => void;
  onUpdateStudent: (updated: StudentProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  documents,
  onRenewDocument,
  onUpdateStudent,
}) => {
  const [renewSuccess, setRenewSuccess] = useState(false);

  const verifiedDocsCount = documents.filter(d => d.status === 'verified').length;
  const expiredDoc = documents.find(d => d.is_expired || d.status === 'expired');

  // Dynamic profile strength calculation
  const calculatedStrength = expiredDoc ? 88 : 95;

  const handleSimulateRenew = (docId: string) => {
    onRenewDocument(docId);
    setRenewSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => setRenewSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-sans">
              Student Profile & Document Vault
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Maintain your academic credentials and verified statutory certificates for automated matching.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            Student ID: {student.user_id}
          </span>
        </div>
      </div>

      {renewSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-fadeIn shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Income Certificate successfully renewed for FY 2026-27! Your Profile Verification is now 95% and all match blockers are cleared.
          </span>
        </div>
      )}

      {/* PROFILE STRENGTH & SCORE BREAKDOWN */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
              AI Profile Readiness Engine
            </span>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                Profile Strength — {calculatedStrength}%
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                calculatedStrength >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {calculatedStrength >= 90 ? 'Exceptional' : 'Actionable Optimizations'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Profiles above 90% receive automated pre-endorsements from institutional nodal offices.
            </p>
          </div>

          <div className="w-full md:w-64">
            <div className="flex justify-between text-xs font-bold mb-1 text-slate-700">
              <span>Readiness</span>
              <span>{calculatedStrength}% / 100%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  calculatedStrength >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${calculatedStrength}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5 Area Strengths */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Academic</span>
            <span className="text-base font-extrabold text-slate-900">95%</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Financial</span>
            <span className="text-base font-extrabold text-slate-900">{expiredDoc ? '85%' : '95%'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Eligibility</span>
            <span className="text-base font-extrabold text-slate-900">100%</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Achievements</span>
            <span className="text-base font-extrabold text-slate-900">80%</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Documents</span>
            <span className="text-base font-extrabold text-slate-900">{expiredDoc ? '80%' : '100%'}</span>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
          <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">
            Actionable Optimization Suggestions
          </span>
          <ul className="space-y-2 text-xs text-indigo-900">
            {expiredDoc && (
              <li className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Renew Income Certificate (+7% boost):</strong> Upload your Tahsildar renewal certificate for FY 2026-27 to unlock strong match status on 3 corporate fellowships.
                </span>
              </li>
            )}
            <li className="flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                <strong>Add Extracurricular Achievements (+4% boost):</strong> Adding state or inter-college quiz awards improves selection scoring in Reliance Foundation and Aditya Birla programs.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>NPCI DBT Aadhaar Seeding:</strong> Your State Bank of India account is pending mapper confirmation. Ensure your mobile number is linked to the bank account.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* DOCUMENT AUDIT TABLE (Section 21) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Statutory Document Audit Table
            </h3>
            <p className="text-xs text-slate-500">
              Official document records submitted for eligibility scrutiny.
            </p>
          </div>

          <span className="text-xs text-slate-600 font-medium self-start sm:self-auto">
            Verified Records: <strong className="text-emerald-700 font-bold">{verifiedDocsCount} / {documents.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Uploaded File</th>
                <th className="py-3 px-4">Requirement</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => {
                const isExpired = doc.is_expired || doc.status === 'expired';
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{doc.document_type}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{doc.title}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">
                      {doc.file_name || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        Mandatory
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isExpired ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" />
                          Expired
                        </span>
                      ) : doc.status === 'verified' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Verified
                        </span>
                      ) : doc.status === 'ready' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-sky-600" />
                          Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                          Pending Scrutiny
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {doc.expiry_date ? (
                        <span className={isExpired ? 'text-rose-600 font-bold' : ''}>
                          {doc.expiry_date}
                        </span>
                      ) : (
                        <span className="text-slate-400">Permanent</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {isExpired ? (
                        <button
                          onClick={() => handleSimulateRenew(doc.id)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs shadow-2xs transition-colors flex items-center space-x-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Update Now</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 font-medium">Valid</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-slate-500 italic">
          *Note: ScholarAI avoids fabricating governmental verification unless integrated with official DigiLocker or state API gateways.
        </div>
      </div>
    </div>
  );
};
