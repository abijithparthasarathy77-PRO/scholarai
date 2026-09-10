import React, { useState } from 'react';
import { Scholarship, StudentProfile } from '../types';
import { StorageService } from '../services/storageService';
import { X, FileQuestion, Send, CheckCircle2 } from 'lucide-react';

interface ManualReviewModalProps {
  scholarship: Scholarship;
  student: StudentProfile;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export const ManualReviewModal: React.FC<ManualReviewModalProps> = ({
  scholarship,
  student,
  onClose,
  onSubmitSuccess,
}) => {
  const [reason, setReason] = useState('Interdisciplinary Coursework / Minor Equivalence');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [supportingExplanation, setSupportingExplanation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.addManualReview({
      id: `rev_${Date.now()}`,
      student_id: student.user_id,
      student_name: student.name,
      scholarship_id: scholarship.id,
      scholarship_title: scholarship.title,
      reason,
      additional_info: additionalInfo,
      supporting_explanation: supportingExplanation || 'Requesting administrative discretion regarding course classification.',
      status: 'Pending Review',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      if (onSubmitSuccess) onSubmitSuccess();
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close review modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Review Request Submitted</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your appeal has been queued for review by the Chief Scholarship Evaluator. You can track this under Manual Audits.
            </p>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
              Status: Pending Review
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <FileQuestion className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Request Manual Eligibility Audit</h3>
                <p className="text-xs text-slate-500">Appeal an automated AI exclusion decision to an institutional officer</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-4 text-xs">
              <span className="text-slate-400 font-bold uppercase block text-[10px]">Scholarship Target</span>
              <strong className="text-slate-800 font-semibold block text-sm mt-0.5">{scholarship.title}</strong>
              <span className="text-slate-500 block mt-0.5">Applicant: {student.name} ({student.degree})</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary Basis for Audit Appeal
                </label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden"
                >
                  <option value="Interdisciplinary Coursework / Minor Equivalence">Interdisciplinary Coursework / Minor Equivalence</option>
                  <option value="Income Certificate Re-assessment / Tahsildar Slip">Income Certificate Re-assessment / Tahsildar Slip</option>
                  <option value="Dual State Domicile / Border District Exemption">Dual State Domicile / Border District Exemption</option>
                  <option value="Quota / Reserved Category Certificate Pending">Quota / Reserved Category Certificate Pending</option>
                  <option value="Other Exceptional Circumstances">Other Exceptional Circumstances</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Relevant Coursework / Context Details
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enrolled in Applied Financial Econometrics with STEM Computing"
                  value={additionalInfo}
                  onChange={e => setAdditionalInfo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Supporting Explanation & Justification
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why the automated taxonomy should be reviewed by an administrator..."
                  value={supportingExplanation}
                  onChange={e => setSupportingExplanation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Audit Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
