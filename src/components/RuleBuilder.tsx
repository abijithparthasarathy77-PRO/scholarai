import React, { useState } from 'react';
import { EligibilityRule, RuleCondition } from '../types';
import { Plus, Trash2, Save, Play, CheckCircle2, Sliders, Shield } from 'lucide-react';

interface RuleBuilderProps {
  onSaveRule: (rule: EligibilityRule) => void;
  existingRules: EligibilityRule[];
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({ onSaveRule, existingRules }) => {
  const [ruleName, setRuleName] = useState('Central Commerce Merit Eligibility Filter');
  const [description, setDescription] = useState('Standard eligibility rules for B.Com candidates with economic need.');
  const [logic, setLogic] = useState<'AND' | 'OR'>('AND');
  const [conditions, setConditions] = useState<RuleCondition[]>([
    { id: 'c_course', field: 'degree', operator: '==', value: 'B.Com' },
    { id: 'c_academic', field: 'academic_percentage', operator: '>=', value: 75 },
    { id: 'c_income', field: 'annual_income', operator: '<=', value: 500000 },
    { id: 'c_state', field: 'state', operator: '==', value: 'Maharashtra' },
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const addCondition = () => {
    setConditions(prev => [
      ...prev,
      {
        id: `cond_${Date.now()}`,
        field: 'academic_percentage',
        operator: '>=',
        value: 70,
      },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(prev => prev.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: Partial<RuleCondition>) => {
    setConditions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleSave = () => {
    const newRule: EligibilityRule = {
      id: `rule_${Date.now()}`,
      name: ruleName,
      description,
      logic,
      conditions,
      created_at: new Date().toISOString(),
    };
    onSaveRule(newRule);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Visual Eligibility Rule Builder
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Construct and test boolean eligibility expressions for the AI matching engine.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Rule Logic</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Rule expression successfully compiled into matching engine!</span>
        </div>
      )}

      {/* Rule Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Rule Policy Name</label>
          <input
            type="text"
            value={ruleName}
            onChange={e => setRuleName(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden"
          />
        </div>
      </div>

      {/* Compound Connector Mode */}
      <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs">
        <span className="font-semibold text-slate-700">Logical Expression Evaluator:</span>
        <div className="flex rounded-lg bg-white p-0.5 border border-slate-200">
          <button
            type="button"
            onClick={() => setLogic('AND')}
            className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
              logic === 'AND' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AND (All must be true)
          </button>
          <button
            type="button"
            onClick={() => setLogic('OR')}
            className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
              logic === 'OR' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            OR (Any can be true)
          </button>
        </div>
      </div>

      {/* Conditions Chain */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
          Criteria Conditions ({conditions.length})
        </label>

        {conditions.map((cond, idx) => (
          <div key={cond.id} className="relative">
            {idx > 0 && (
              <div className="flex items-center justify-center my-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {logic}
                </span>
              </div>
            )}

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>

              {/* Field Select */}
              <select
                value={cond.field}
                onChange={e => updateCondition(cond.id, { field: e.target.value as any })}
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="degree">Field: Degree / Course</option>
                <option value="academic_percentage">Field: Academic Percentage</option>
                <option value="annual_income">Field: Household Income (INR)</option>
                <option value="state">Field: State Domicile</option>
                <option value="category">Field: Social Category</option>
              </select>

              {/* Operator Select */}
              <select
                value={cond.operator}
                onChange={e => updateCondition(cond.id, { operator: e.target.value as any })}
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-indigo-700"
              >
                <option value="==">== (Equals)</option>
                <option value=">">&gt; (Greater than)</option>
                <option value=">=">&gt;= (Greater or Equal)</option>
                <option value="<">&lt; (Less than)</option>
                <option value="<=">&lt;= (Less or Equal)</option>
                <option value="contains">contains (Sub-string)</option>
              </select>

              {/* Value Input */}
              <input
                type={cond.field === 'academic_percentage' || cond.field === 'annual_income' ? 'number' : 'text'}
                value={cond.value}
                onChange={e => updateCondition(cond.id, { 
                  value: cond.field === 'academic_percentage' || cond.field === 'annual_income' 
                    ? Number(e.target.value) 
                    : e.target.value 
                })}
                placeholder="Condition value..."
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
              />

              <button
                type="button"
                onClick={() => removeCondition(cond.id)}
                disabled={conditions.length <= 1}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-30"
                title="Remove condition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCondition}
          className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center justify-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Rule Condition</span>
        </button>
      </div>

      {/* Visual Resulting Expression Logic Preview */}
      <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs shadow-inner">
        <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mb-2">
          Compiled Logic Expression (AST Representation)
        </div>
        <div className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {conditions.map((c, i) => (
            <span key={c.id}>
              {i > 0 && <span className="text-amber-400 font-bold"> {logic} </span>}
              <span className="text-indigo-300">[{c.field.toUpperCase()}]</span> {c.operator} <span className="text-white">"{c.value}"</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
