import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { StudentProfile } from '../../types';
import {
  GraduationCap,
  IndianRupee,
  MapPin,
  Users,
  FileText,
  Compass,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: Partial<StudentProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    degree: 'B.Com (Honours)',
    institution: "St. Xavier's College, Mumbai",
    academicScore: 86,
    familyAnnualIncome: 320000,
    stateDomicile: 'Maharashtra',
    category: 'General-EWS',
    hasIncomeCert: true,
    hasTranscript: true,
    targetFunding: 500000
  });

  const totalSteps = 6;

  const stepsInfo = [
    {
      step: 1,
      title: 'Academic Profile',
      icon: <GraduationCap size={18} className="text-[#8B5CF6]" />,
      whyUse: 'Your academic profile helps us identify scholarships where your academic performance meets or exceeds stated cutoff requirements.'
    },
    {
      step: 2,
      title: 'Financial Information',
      icon: <IndianRupee size={18} className="text-[#22D3EE]" />,
      whyUse: 'Your financial information determines eligibility for need-based endowments and government fee concession schemes.'
    },
    {
      step: 3,
      title: 'Location & Domicile',
      icon: <MapPin size={18} className="text-[#34D399]" />,
      whyUse: 'Domicile verification unlocks state-specific statutory scholarship quotas and regional trust grants.'
    },
    {
      step: 4,
      title: 'Cohort Category',
      icon: <Users size={18} className="text-[#FBBF24]" />,
      whyUse: 'Category status matches you with reserved financial inclusion grants and special affirmative fellowships.'
    },
    {
      step: 5,
      title: 'Document Vault Baseline',
      icon: <FileText size={18} className="text-[#FB7185]" />,
      whyUse: 'Auditing document availability calculates accurate application readiness scores and flags missing blockers.'
    },
    {
      step: 6,
      title: 'Strategic Preferences',
      icon: <Compass size={18} className="text-[#8B5CF6]" />,
      whyUse: 'Preferences guide the AI Priority Engine to rank opportunities according to your timeline and target funding needs.'
    }
  ];

  const activeInfo = stepsInfo[currentStep - 1];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      onComplete(data as any);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title="Build Your Scholarship Strategy"
      subtitle="Guided 6-step personalized intelligence onboarding"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#A7B0C0]">
            <span className="font-semibold text-white">
              Step 0{currentStep} of 0{totalSteps}: {activeInfo.title}
            </span>
            <span className="text-[#22D3EE] font-bold">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Explainability Callout: "What ScholarAI uses this information for" */}
        <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#8B5CF6]/30 flex items-start gap-2.5 text-xs">
          <Info size={16} className="text-[#22D3EE] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider block">
              What ScholarAI uses this information for:
            </span>
            <p className="text-[#A7B0C0] mt-0.5 leading-relaxed">{activeInfo.whyUse}</p>
          </div>
        </div>

        {/* Step Dynamic Content */}
        <div className="py-2">
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                  Enrolled Degree Program
                </label>
                <input
                  type="text"
                  value={data.degree}
                  onChange={(e) => setData({ ...data, degree: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                  Academic Performance / Aggregate Marks (%)
                </label>
                <input
                  type="number"
                  value={data.academicScore}
                  onChange={(e) => setData({ ...data, academicScore: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                  Family Gross Annual Income (₹)
                </label>
                <input
                  type="number"
                  value={data.familyAnnualIncome}
                  onChange={(e) => setData({ ...data, familyAnnualIncome: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                />
                <span className="text-[11px] text-[#64748B] mt-1 block">
                  Used strictly for matching against scholarship income thresholds; never shared.
                </span>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                  State Domicile
                </label>
                <select
                  value={data.stateDomicile}
                  onChange={(e) => setData({ ...data, stateDomicile: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                >
                  <option value="Maharashtra" className="bg-[#121A2E]">Maharashtra</option>
                  <option value="Delhi-NCR" className="bg-[#121A2E]">Delhi-NCR</option>
                  <option value="Karnataka" className="bg-[#121A2E]">Karnataka</option>
                  <option value="Tamil Nadu" className="bg-[#121A2E]">Tamil Nadu</option>
                  <option value="Pan-India" className="bg-[#121A2E]">Other State (Pan-India)</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                  Cohort / Reservation Classification
                </label>
                <select
                  value={data.category}
                  onChange={(e) => setData({ ...data, category: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                >
                  <option value="General-EWS" className="bg-[#121A2E]">General-EWS</option>
                  <option value="General" className="bg-[#121A2E]">General (Open)</option>
                  <option value="OBC-NCL" className="bg-[#121A2E]">OBC-NCL</option>
                  <option value="SC" className="bg-[#121A2E]">SC</option>
                  <option value="ST" className="bg-[#121A2E]">ST</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-3 animate-fadeIn">
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1">
                Which key documents do you currently possess?
              </label>
              <label className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-white cursor-pointer hover:bg-white/10">
                <span>Official Annual Income Certificate</span>
                <input
                  type="checkbox"
                  checked={data.hasIncomeCert}
                  onChange={(e) => setData({ ...data, hasIncomeCert: e.target.checked })}
                  className="accent-[#8B5CF6] w-4 h-4"
                />
              </label>
              <label className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-white cursor-pointer hover:bg-white/10">
                <span>1st Year Official College Transcript / Marksheet</span>
                <input
                  type="checkbox"
                  checked={data.hasTranscript}
                  onChange={(e) => setData({ ...data, hasTranscript: e.target.checked })}
                  className="accent-[#8B5CF6] w-4 h-4"
                />
              </label>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                  Target Scholarship Funding Goal (₹)
                </label>
                <input
                  type="number"
                  value={data.targetFunding}
                  onChange={(e) => setData({ ...data, targetFunding: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex items-center gap-2 text-xs text-[#34D399]">
                <CheckCircle2 size={16} />
                <span>Ready to generate your personalized AI Matching Dashboard & Ranked Strategy!</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(currentStep - 1)}
            className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'opacity-30 cursor-not-allowed border-transparent text-[#64748B]'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#A7B0C0] hover:text-white'
            }`}
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity"
          >
            <span>{currentStep === totalSteps ? 'Build My Strategy' : 'Next Step'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </Modal>
  );
};
