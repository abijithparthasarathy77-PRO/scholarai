import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { StorageService } from '../services/storageService';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Lock, 
  GraduationCap, 
  Coins, 
  MapPin, 
  Award, 
  Sliders
} from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 1, title: 'Profile', subtitle: 'Basic Details' },
  { id: 2, title: 'Academics', subtitle: 'Course & Marks' },
  { id: 3, title: 'Financial', subtitle: 'Income Verification' },
  { id: 4, title: 'Eligibility', subtitle: 'State & Category' },
  { id: 5, title: 'Achievements', subtitle: 'Skills & Honors' },
  { id: 6, title: 'Review', subtitle: 'Matching Analysis' },
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudentProfile>(StorageService.getStudentProfile());

  const handleChange = (field: keyof StudentProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save profile
      StorageService.setStudentProfile(formData);
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-900 text-base">ScholarAI Setup</span>
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Exit to Dashboard
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step) => {
              const isDone = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col items-center flex-1 text-center">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`text-[10px] font-semibold mt-1 hidden sm:block ${
                    isCurrent ? 'text-indigo-600' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Content for Steps */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* STEP 1: Basic Profile */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Let's start with your contact identity.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={e => handleChange('gender', e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1.5">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Why we ask: Certain initiatives (e.g. L'Oréal STEM, Kotak Kanya) are gender-targeted fellowships.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academics */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Academic Rigor & Discipline</h3>
                <p className="text-xs text-slate-500">Evaluates Degree Alignment and Academic Rigor dimensions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree Program</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={e => handleChange('degree', e.target.value)}
                    placeholder="e.g. B.Com Hons"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree Level</label>
                  <select
                    value={formData.degree_level}
                    onChange={e => handleChange('degree_level', e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctoral">Doctoral</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enrolled Institution / College</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={e => handleChange('institution', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifying Class XII / Prev Year %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.percentage}
                    onChange={e => handleChange('percentage', Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cumulative GPA (out of 4.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.GPA}
                    onChange={e => handleChange('GPA', Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Financial */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Socioeconomic & Financial Need</h3>
                <p className="text-xs text-slate-500">Evaluates the Financial Need dimension and income ceilings.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Annual Gross Household Income (in ₹ INR)
                </label>
                <input
                  type="number"
                  value={formData.annual_income_inr}
                  onChange={e => handleChange('annual_income_inr', Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono font-bold text-indigo-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Financial Need Self-Assessment</label>
                <select
                  value={formData.financial_need}
                  onChange={e => handleChange('financial_need', e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                >
                  <option value="High">High Need (First-generation learner / Low income)</option>
                  <option value="Moderate">Moderate Need (Subsidies required)</option>
                  <option value="Low">Low Need (Primarily merit-oriented)</option>
                </select>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <div className="flex items-center space-x-1.5 font-bold mb-1 text-amber-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Privacy & Verification Disclosure</span>
                </div>
                Your income data is exclusively used to match income-capped merit-cum-means fellowships. 
                Documentary proof (Tahsildar Income Certificate / ITR) will be evaluated before award.
              </div>
            </div>
          )}

          {/* STEP 4: Eligibility & Domicile */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Domicile & Category Quotas</h3>
                <p className="text-xs text-slate-500">Evaluates State Domicile and Cohort Category dimensions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State Domicile</label>
                  <input
                    type="text"
                    value={formData.domicile}
                    onChange={e => {
                      handleChange('domicile', e.target.value);
                      handleChange('state', e.target.value);
                    }}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Social Category</label>
                  <select
                    value={formData.category}
                    onChange={e => handleChange('category', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="General-EWS">General-EWS (Economically Weaker Section)</option>
                    <option value="General">General / Open</option>
                    <option value="OBC-NCL">OBC (Non-Creamy Layer)</option>
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Achievements & Skills */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Achievements & Skills</h3>
                <p className="text-xs text-slate-500">Strengthens corporate CSR fellowship alignment.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notable Achievements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.achievements.join('\n')}
                  onChange={e => handleChange('achievements', e.target.value.split('\n').filter(Boolean))}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Skills & Certifications (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={e => handleChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* STEP 6: Review & Finalize */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Profile Complete & Ready for AI Engine</h3>
                <p className="text-xs text-slate-500">Your profile will now be evaluated across all verified scholarships.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidate:</span>
                  <strong className="text-slate-900">{formData.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Score:</span>
                  <strong className="text-indigo-600">{formData.percentage}% (GPA {formData.GPA})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course & College:</span>
                  <strong className="text-slate-900">{formData.degree} • {formData.institution}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Income & Category:</span>
                  <strong className="text-slate-900">₹{formData.annual_income_inr.toLocaleString('en-IN')} / yr • {formData.category}</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ScholarAI is ready to run the 5-dimensional matching matrix on your profile.</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handleBack}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <span>{currentStep === STEPS.length ? 'Run Matching Engine' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
