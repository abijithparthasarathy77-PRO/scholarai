import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { ScoreRing } from '../ui/ScoreRing';
import {
  GraduationCap,
  IndianRupee,
  Award,
  Save,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  student: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ student, onSaveProfile }) => {
  const [formData, setFormData] = useState<StudentProfile>(student);
  const [newAchievement, setNewAchievement] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedNotice(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement.trim()]
    }));
    setNewAchievement('');
  };

  const handleRemoveAchievement = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Profile Completeness Ring */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#8B5CF6]/50 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-[#34D399] text-black">
              <ShieldCheck size={14} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#22D3EE]">
                Verified Student Profile
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30 font-semibold">
                DEMO PROFILE
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              {formData.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B0C0] mt-0.5">
              {formData.degree} • {formData.institution}
            </p>
          </div>
        </div>

        {/* Dimensional Completeness Ring */}
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 self-start md:self-auto">
          <ScoreRing
            score={formData.profileCompleteness}
            size={68}
            strokeWidth={6}
            variant="violet-cyan"
          />
          <div>
            <span className="text-[10px] text-[#A7B0C0] uppercase font-bold tracking-wider block">
              Profile Completeness
            </span>
            <span className="text-sm font-display font-extrabold text-white">
              {formData.profileCompleteness}% Complete
            </span>
            <span className="text-[11px] text-[#34D399] block mt-0.5">High Eligibility Coverage</span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: ACADEMIC DETAILS */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <GraduationCap size={18} className="text-[#8B5CF6]" />
            <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wider">
              1. Academic Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Current Degree / Program
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Year of Study
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Institution
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Academic Score / Aggregate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.academicScore}
                onChange={(e) => setFormData({ ...formData, academicScore: Number(e.target.value) })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Cumulative GPA (on 4.0 scale)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: Number(e.target.value) })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Discipline Area
              </label>
              <input
                type="text"
                value={formData.discipline}
                onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: FINANCIAL & DEMOGRAPHIC */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <IndianRupee size={18} className="text-[#22D3EE]" />
            <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wider">
              2. Financial & Demographic Eligibility
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Family Annual Income (₹)
              </label>
              <input
                type="number"
                value={formData.familyAnnualIncome}
                onChange={(e) => setFormData({ ...formData, familyAnnualIncome: Number(e.target.value) })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Social / Reservation Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              >
                <option value="General-EWS" className="bg-[#121A2E]">General-EWS</option>
                <option value="General" className="bg-[#121A2E]">General (Open)</option>
                <option value="OBC-NCL" className="bg-[#121A2E]">OBC-NCL</option>
                <option value="SC" className="bg-[#121A2E]">SC</option>
                <option value="ST" className="bg-[#121A2E]">ST</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                State Domicile
              </label>
              <input
                type="text"
                value={formData.stateDomicile}
                onChange={(e) => setFormData({ ...formData, stateDomicile: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs text-white"
              >
                <option value="Male" className="bg-[#121A2E]">Male</option>
                <option value="Female" className="bg-[#121A2E]">Female</option>
                <option value="Other" className="bg-[#121A2E]">Other / Non-Binary</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: ACHIEVEMENTS & EXTRACURRICULAR */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Award size={18} className="text-[#34D399]" />
            <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wider">
              3. Verified Achievements & Leadership
            </h3>
          </div>

          <div className="space-y-2.5">
            {formData.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 text-xs text-white"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                  <span>{ach}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(idx)}
                  className="text-[#64748B] hover:text-[#FB7185] p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Add Achievement Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Add competition, publication, or college leadership role..."
                className="flex-1 p-2.5 rounded-xl glass-input text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-white/10">
          <div className="flex items-center gap-2 text-xs text-[#A7B0C0]">
            <Sparkles size={14} className="text-[#8B5CF6]" />
            <span>Updating your profile recalculates 5D match weights across all scholarships.</span>
          </div>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="text-xs text-[#34D399] font-bold flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 size={14} />
                <span>Saved & Recalculated!</span>
              </span>
            )}
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity"
            >
              <Save size={15} />
              <span>Save & Re-calculate Matching</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
