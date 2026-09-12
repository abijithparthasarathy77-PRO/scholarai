import React, { useState } from 'react';
import { EligibilityRule, RuleCondition, StudentProfile } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import {
  Code2,
  Plus,
  Trash2,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Save
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RuleBuilderProps {
  student: StudentProfile;
  existingRules: EligibilityRule[];
  onSaveRule: (rule: EligibilityRule) => void;
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  student,
  existingRules,
  onSaveRule
}) => {
  const [ruleName, setRuleName] = useState('New Undergraduate Eligibility Rule');
  const [targetScholarship, setTargetScholarship] = useState('Tata Merit Endowment for Higher Education');
  const [logicOperator, setLogicOperator] = useState<'AND' | 'OR'>('AND');
  const [conditions, setConditions] = useState<RuleCondition[]>([
    { field: 'degree', operator: '=', value: 'B.Com (Honours)' },
    { field: 'academicScore', operator: '>=', value: 75 },
    { field: 'familyIncome', operator: '<=', value: 600000 },
    { field: 'domicile', operator: '=', value: 'Maharashtra' }
  ]);
  const [simulationResult, setSimulationResult] = useState<{
    passed: boolean;
    details: { condition: string; studentValue: string; pass: boolean }[];
  } | null>(null);

  const availableFields: { field: RuleCondition['field']; label: string }[] = [
    { field: 'degree', label: 'Degree Discipline' },
    { field: 'academicScore', label: 'Academic Score (%)' },
    { field: 'gpa', label: 'Cumulative GPA' },
    { field: 'familyIncome', label: 'Annual Family Income (₹)' },
    { field: 'domicile', label: 'State Domicile' },
    { field: 'category', label: 'Cohort Category' }
  ];

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { field: 'academicScore', operator: '>=', value: 60 }
    ]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleUpdateCondition = (index: number, key: keyof RuleCondition, value: any) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [key]: value };
    setConditions(updated);
  };

  // Live simulation test against student Aarav
  const runSimulation = () => {
    const details = conditions.map((cond) => {
      let studentVal: any = '';
      let pass = false;

      if (cond.field === 'degree') {
        studentVal = student.degree;
        pass = cond.operator === '=' ? studentVal.toLowerCase() === String(cond.value).toLowerCase() : studentVal.toLowerCase().includes(String(cond.value).toLowerCase());
      } else if (cond.field === 'academicScore') {
        studentVal = `${student.academicScore}%`;
        pass = cond.operator === '>=' ? student.academicScore >= Number(cond.value) : student.academicScore <= Number(cond.value);
      } else if (cond.field === 'gpa') {
        studentVal = student.gpa;
        pass = cond.operator === '>=' ? student.gpa >= Number(cond.value) : student.gpa <= Number(cond.value);
      } else if (cond.field === 'familyIncome') {
        studentVal = `₹${student.familyAnnualIncome.toLocaleString('en-IN')}`;
        pass = cond.operator === '<=' ? student.familyAnnualIncome <= Number(cond.value) : student.familyAnnualIncome >= Number(cond.value);
      } else if (cond.field === 'domicile') {
        studentVal = student.stateDomicile;
        pass = studentVal.toLowerCase().includes(String(cond.value).toLowerCase());
      } else if (cond.field === 'category') {
        studentVal = student.category;
        pass = studentVal.toLowerCase().includes(String(cond.value).toLowerCase());
      }

      return {
        condition: `${cond.field} ${cond.operator} ${cond.value}`,
        studentValue: String(studentVal),
        pass
      };
    });

    const passed =
      logicOperator === 'AND'
        ? details.every((d) => d.pass)
        : details.some((d) => d.pass);

    setSimulationResult({ passed, details });

    if (passed) {
      confetti({ particleCount: 40, spread: 40, origin: { y: 0.6 } });
    }
  };

  const handleSave = () => {
    const newRule: EligibilityRule = {
      id: `rule-${Date.now()}`,
      name: ruleName,
      targetScholarship,
      conditions,
      logicOperator,
      outcome: 'Potentially Eligible',
      createdAt: new Date().toISOString().split('T')[0]
    };
    onSaveRule(newRule);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
  };

  return (
    <div className="space-y-6">
      {/* Rule Builder Visual Canvas */}
      <GlassCard className="p-6 rounded-3xl border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-[#22D3EE]" />
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wider">
                Visual Eligibility Rule Builder
              </h3>
            </div>
            <p className="text-xs text-[#A7B0C0] mt-0.5">
              Construct transparent conditional evaluation logic for scholarship qualification criteria
            </p>
          </div>

          {/* Logic Operator Selector */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
            <span className="text-xs text-[#A7B0C0] font-semibold pl-2">Match:</span>
            <button
              onClick={() => setLogicOperator('AND')}
              className={`py-1 px-2.5 rounded-lg text-xs font-bold transition-colors ${
                logicOperator === 'AND'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-[#A7B0C0] hover:text-white'
              }`}
            >
              ALL (AND)
            </button>
            <button
              onClick={() => setLogicOperator('OR')}
              className={`py-1 px-2.5 rounded-lg text-xs font-bold transition-colors ${
                logicOperator === 'OR'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-[#A7B0C0] hover:text-white'
              }`}
            >
              ANY (OR)
            </button>
          </div>
        </div>

        {/* Rule Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
              Rule Identifier
            </label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
              Target Scholarship
            </label>
            <input
              type="text"
              value={targetScholarship}
              onChange={(e) => setTargetScholarship(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
            />
          </div>
        </div>

        {/* Visual Condition Blocks: IF ... AND/OR ... THEN */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#8B5CF6]/30 text-[#A78BFA] text-xs font-extrabold font-mono">
              IF
            </span>
            <span className="text-xs text-[#A7B0C0]">all the following criteria evaluate true:</span>
          </div>

          <div className="space-y-2.5">
            {conditions.map((cond, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#0B1020] border border-white/10 flex flex-wrap items-center gap-2 text-xs"
              >
                {idx > 0 && (
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[#22D3EE] font-mono">
                    {logicOperator}
                  </span>
                )}

                {/* Field */}
                <select
                  value={cond.field}
                  onChange={(e) => handleUpdateCondition(idx, 'field', e.target.value)}
                  className="p-2 rounded-xl glass-input text-xs text-white min-w-36"
                >
                  {availableFields.map((f) => (
                    <option key={f.field} value={f.field} className="bg-[#121A2E]">
                      {f.label}
                    </option>
                  ))}
                </select>

                {/* Operator */}
                <select
                  value={cond.operator}
                  onChange={(e) => handleUpdateCondition(idx, 'operator', e.target.value)}
                  className="p-2 rounded-xl glass-input text-xs text-[#22D3EE] font-bold min-w-20"
                >
                  <option value="=" className="bg-[#121A2E]">=</option>
                  <option value=">=" className="bg-[#121A2E]">&gt;=</option>
                  <option value="<=" className="bg-[#121A2E]">&lt;=</option>
                  <option value="INCLUDES" className="bg-[#121A2E]">INCLUDES</option>
                </select>

                {/* Value */}
                <input
                  type={typeof cond.value === 'number' ? 'number' : 'text'}
                  value={cond.value}
                  onChange={(e) =>
                    handleUpdateCondition(
                      idx,
                      'value',
                      typeof cond.value === 'number' ? Number(e.target.value) : e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded-xl glass-input text-xs text-white min-w-32"
                />

                {/* Remove Condition */}
                {conditions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(idx)}
                    className="p-2 rounded-lg text-[#64748B] hover:text-[#FB7185] transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCondition}
            className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#22D3EE] flex items-center gap-1.5 transition-colors"
          >
            <Plus size={13} />
            <span>Add Condition Clause</span>
          </button>

          {/* Outcome block: THEN */}
          <div className="p-3.5 rounded-2xl bg-[#34D399]/10 border border-[#34D399]/30 flex items-center gap-3 text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-[#34D399] text-black text-xs font-extrabold font-mono">
              THEN
            </span>
            <span className="font-bold text-white">
              Candidate is flagged as <strong className="text-[#34D399]">Potentially Eligible</strong> for submission
            </span>
          </div>
        </div>

        {/* Action Controls: Live Simulation & Save */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={runSimulation}
            className="py-2.5 px-5 rounded-xl bg-[#22D3EE] text-black text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md"
          >
            <Play size={14} />
            <span>Simulate Rule on Student (Aarav Sharma)</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:opacity-95"
          >
            <Save size={14} />
            <span>Save Rule to Engine</span>
          </button>
        </div>

        {/* Live Simulation Output Card */}
        {simulationResult && (
          <div
            className={`p-4 rounded-2xl border transition-all animate-fadeIn space-y-3 ${
              simulationResult.passed
                ? 'bg-[#34D399]/10 border-[#34D399]/30'
                : 'bg-[#FB7185]/10 border-[#FB7185]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {simulationResult.passed ? (
                  <CheckCircle2 size={18} className="text-[#34D399]" />
                ) : (
                  <XCircle size={18} className="text-[#FB7185]" />
                )}
                <h4 className="text-sm font-bold text-white">
                  Simulation Result:{' '}
                  <span className={simulationResult.passed ? 'text-[#34D399]' : 'text-[#FB7185]'}>
                    {simulationResult.passed ? 'POTENTIALLY ELIGIBLE (PASSED)' : 'INELIGIBLE (FAILED CRITERIA)'}
                  </span>
                </h4>
              </div>
              <span className="text-[11px] text-[#A7B0C0]">Profile: Aarav Sharma (B.Com Hons)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {simulationResult.details.map((d, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-[#A7B0C0] block">{d.condition}</span>
                    <span className="text-white font-medium">Aarav Value: {d.studentValue}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      d.pass ? 'bg-[#34D399]/20 text-[#34D399]' : 'bg-[#FB7185]/20 text-[#FB7185]'
                    }`}
                  >
                    {d.pass ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>

      {/* Existing Rules Catalog */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Layers size={18} className="text-[#8B5CF6]" />
          <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wider">
            Active System Rules ({existingRules.length})
          </h3>
        </div>

        <div className="space-y-3">
          {existingRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <h5 className="font-bold text-white text-sm">{rule.name}</h5>
                <span className="text-[11px] text-[#22D3EE] font-medium block">
                  Target: {rule.targetScholarship}
                </span>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {rule.conditions.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-[#A7B0C0] border border-white/5"
                    >
                      {c.field} {c.operator} {c.value}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 uppercase self-start sm:self-auto">
                {rule.outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
