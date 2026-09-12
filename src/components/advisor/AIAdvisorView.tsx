import React, { useState, useEffect, useRef } from 'react';
import { AIChatMessage, Scholarship, StudentProfile, StudentDocument } from '../../types';
import { AIOrb } from '../visual/AIOrb';
import {
  Send,
  Sparkles,
  Bot,
  User,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AIAdvisorViewProps {
  student: StudentProfile;
  scholarships: Scholarship[];
  documents: StudentDocument[];
  onViewDossier: (scholarship: Scholarship) => void;
  onFixBlockers: () => void;
  initialPrompt?: string;
}

export const AIAdvisorView: React.FC<AIAdvisorViewProps> = ({
  student,
  scholarships,
  documents,
  onViewDossier,
  onFixBlockers,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'scholar_ai',
      timestamp: '11:15 AM',
      content: `Hello ${student.name.split(' ')[0]}, I am your dedicated ScholarAI Strategy Advisor. I evaluate your ${student.degree} academic marks, ₹3.2L EWS income tier, and document vault status to provide transparent, explainable recommendations on what you should do next.`,
      why: [
        'Analyzed 28 active scholarship schemes against your 5D profile.',
        'Identified 1 Critical priority closing in 48 hours.'
      ],
      nextAction: {
        text: 'Review highest priority opportunity: Tata Merit Endowment',
        actionType: 'view_scholarship',
        targetId: 'sch-tata-merit'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    'What should I apply for first?',
    'What should I do next?',
    'Why am I eligible for Tata Merit?',
    'Why am I not eligible for Infosys STEM?',
    'Check my documents',
    'Improve my profile',
    'Show urgent deadlines'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent AI response
    setTimeout(() => {
      const response = generateAIResponse(query, student, scholarships, documents);
      setMessages((prev) => [...prev, response]);
    }, 450);
  };

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (
    query: string,
    student: StudentProfile,
    scholarships: Scholarship[],
    documents: StudentDocument[]
  ): AIChatMessage => {
    const q = query.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const tata = scholarships.find((s) => s.id === 'sch-tata-merit') || scholarships[0];
    const infosys = scholarships.find((s) => s.id === 'sch-infosys-stem');

    // 1. "What should I apply for first?"
    if (q.includes('apply for first') || q.includes('first') || q.includes('priority')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `Based on your 94% eligibility fit, deadline urgency, and 86% application readiness, **Tata Merit Endowment for Higher Education** is currently your highest-priority opportunity (Priority Score: 94/100).`,
        why: [
          'Strong 5D Match: Your 86.4% aggregate at St. Xavier’s comfortably exceeds the 75% cutoff.',
          'Critical Deadline: Closes in 48 hours (14 Sep 2026).',
          'High Monetary Yield: ₹1,00,000 grant.'
        ],
        blockerAlert: 'Dean Endorsement letter is missing from your vault, and your Income Certificate expired on 31 Mar 2025.',
        nextAction: {
          text: 'Get Dean Endorsement from Commerce Dept Head',
          actionType: 'view_scholarship',
          targetId: 'sch-tata-merit'
        },
        highlightedScholarship: {
          id: tata.id,
          name: tata.name,
          fundingAmount: tata.fundingAmount,
          matchScore: tata.matchScore,
          priorityScore: tata.priorityScore,
          deadlineDays: tata.daysLeft
        }
      };
    }

    // 2. "What should I do next?" (Core Question from Section 1 & Section 44)
    if (q.includes('what should i do next') || q.includes('do next') || q.includes('next action')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `Get your **Dean endorsement** first because it is the primary blocker for your highest-priority application (**Tata Merit Endowment**, closing in 48 hours). Simultaneously, upload your renewed Income Certificate to clear blockers for both Tata Merit and Reliance Foundation.`,
        why: [
          'Tata Trusts requires formal physical endorsement from your College Dean/HOD before online portal submission.',
          'Resolving this raises your readiness from 86% to 100% on a ₹1,00,000 grant.',
          'Next in queue: Schedule your Reliance Foundation online cognitive test.'
        ],
        blockerAlert: '2 document blockers currently constrain ₹3,00,000 in priority funding.',
        nextAction: {
          text: 'Open Document Vault to Renew Income Certificate & Upload Endorsement',
          actionType: 'view_documents'
        }
      };
    }

    // 3. "Why am I eligible for Tata Merit?"
    if (q.includes('tata') || (q.includes('eligible') && !q.includes('not'))) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `You qualify for **Tata Merit Endowment** across all 5 evaluation dimensions:`,
        why: [
          'Academic Rigor: Your verified 86.4% marksheet exceeds the 75% threshold by 11.4%.',
          'Degree Alignment: 2nd Year B.Com (Honours) satisfies Section 4.2 Financial Studies annexure.',
          'Domicile: Resident of Mumbai, Maharashtra (Tier-1 recognized domicile).',
          'Financial Need: Family income of ₹3.20L falls well within the ₹6.0L ceiling.'
        ],
        nextAction: {
          text: 'View Tata Merit Dossier & Criteria Breakdown',
          actionType: 'view_scholarship',
          targetId: 'sch-tata-merit'
        }
      };
    }

    // 4. "Why am I not eligible for Infosys STEM?"
    if (q.includes('not eligible') || q.includes('infosys') || q.includes('stem')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `Here is the transparent explainable AI rationale for why you do **NOT** qualify for the **Infosys Foundation STEM Stars Scholarship** (Match Score: 42%):`,
        why: [
          'Discipline Mismatch (Hard Veto): Requires B.Tech/B.E. engineering or STEM science degrees. Your course is B.Com (Honours) Commerce.',
          'Cohort Restriction (Hard Veto): Exclusively designated for female candidates in STEM to address gender disparity in technical education.',
          'Academic score (86%) and income (₹3.2L) pass, but the two hard criteria above disqualify you.'
        ],
        nextAction: {
          text: 'Explore commerce-aligned corporate scholarships instead',
          actionType: 'view_pipeline'
        },
        highlightedScholarship: infosys
          ? {
              id: infosys.id,
              name: infosys.name,
              fundingAmount: infosys.fundingAmount,
              matchScore: infosys.matchScore,
              priorityScore: infosys.priorityScore,
              deadlineDays: infosys.daysLeft
            }
          : undefined
      };
    }

    // 5. "Check my documents"
    if (q.includes('document') || q.includes('vault') || q.includes('cert')) {
      const expiredDocs = documents.filter((d) => d.status === 'EXPIRED');
      const missingDocs = documents.filter((d) => d.status === 'MISSING');
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `Document Intelligence Vault Audit: You have **${documents.length} registered documents**. 4 are verified READY, ${expiredDocs.length} is EXPIRED, and ${missingDocs.length} is MISSING.`,
        why: [
          `Expired: Annual Income Certificate (expired 31 Mar 2025).`,
          `Missing: Dean / HOD Academic Endorsement Letter.`,
          `Verified: 1st Year Marksheet (86.4%), Bonafide Certificate, Bank Account Proof, and Valid EWS Certificate.`
        ],
        blockerAlert: 'Renewing the Income Certificate and uploading the Dean letter will boost your application readiness to 100%.',
        nextAction: {
          text: 'Open Document Intelligence Center',
          actionType: 'view_documents'
        }
      };
    }

    // 6. "Improve my profile"
    if (q.includes('profile') || q.includes('improve') || q.includes('optimize')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `Your profile completeness is **92%**, and your profile strength is **82/100**. Here are high-impact enhancements:`,
        why: [
          'High Impact: Renew your Tahsildar Income Certificate (unlocks Tata & Reliance eligibility).',
          'Medium Impact: Add national co-curricular leadership achievements to compete for Aditya Birla Fellowship (₹1.5L).',
          'Medium Impact: Upload a standardized English Statement of Purpose draft.'
        ],
        nextAction: {
          text: 'Go to Profile Optimizer',
          actionType: 'view_pipeline'
        }
      };
    }

    // 7. "Show urgent deadlines"
    if (q.includes('deadline') || q.includes('urgent') || q.includes('closing')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'scholar_ai',
        timestamp,
        content: `You have **2 deadlines closing in the next 7 days**:`,
        why: [
          'CRITICAL: Tata Merit Endowment closes in 48 hours (₹1,00,000 funding).',
          'URGENT: Reliance Foundation Undergraduate closes in 5 days (₹2,00,000 funding).',
          'UPCOMING: HDFC Badhte Kadam closes in 9 days (₹75,000 funding).'
        ],
        nextAction: {
          text: 'Open Deadline Command Center',
          actionType: 'view_deadlines'
        }
      };
    }

    // Fallback general response
    return {
      id: `ai-${Date.now()}`,
      sender: 'scholar_ai',
      timestamp,
      content: `I analyzed your query: "${query}". Based on your 2nd Year B.Com Hons profile at St. Xavier's Mumbai, ScholarAI recommends prioritizing your 48-hour deadline for Tata Merit Endowment (₹1.0L) while preparing Reliance Foundation (₹2.0L).`,
      why: [
        'Total potential funding pool: ₹4,85,000 across 28 opportunities.',
        'Current readiness score: 86% across active applications.'
      ],
      nextAction: {
        text: 'Review Highest Priority Application',
        actionType: 'view_scholarship',
        targetId: 'sch-tata-merit'
      }
    };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner with AI Orb */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-[#8B5CF6]/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <AIOrb size="hero" interactive />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#22D3EE]">
                ScholarAI Strategy Assistant
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              AI Scholarship Advisor
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B0C0] mt-1 max-w-xl">
              An embedded intelligence center providing transparent, explainable recommendations on what you should pursue, why you match, what is blocking you, and what to do next.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 text-xs text-[#A7B0C0] bg-white/5 p-3 rounded-2xl border border-white/10 self-stretch md:self-auto">
          <span>Student Context: <strong className="text-white">Aarav Sharma</strong></span>
          <span>Discipline: <strong className="text-[#22D3EE]">B.Com Hons (86%)</strong></span>
          <span>Strategy Status: <strong className="text-[#34D399]">Active</strong></span>
        </div>
      </div>

      {/* Quick Action Prompt Chips */}
      <div className="glass-card p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-[#A7B0C0] uppercase tracking-wider mb-2.5">
          <Sparkles size={13} className="text-[#8B5CF6]" />
          <span>Select an AI Strategy Query:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/10 hover:border-[#8B5CF6]/40 text-xs font-semibold text-[#F8FAFC] transition-all hover:scale-[1.02]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 min-h-[460px] max-h-[600px] overflow-y-auto space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'scholar_ai' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                <Bot size={17} />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white self-end shadow-md'
                  : 'bg-[#10172A]/90 border border-white/15 text-[#F8FAFC] shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] text-[#A7B0C0] pb-1 border-b border-white/10">
                <span className="font-bold uppercase tracking-wider text-white">
                  {msg.sender === 'user' ? 'You' : 'ScholarAI Strategy Engine'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Main Content */}
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                {msg.content}
              </p>

              {/* Structured Explainable AI "Why" Breakdown */}
              {msg.why && msg.why.length > 0 && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#22D3EE] tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-[#34D399]" />
                    <span>Transparent AI Reasoning (Why):</span>
                  </span>
                  <ul className="space-y-1 text-xs text-[#A7B0C0]">
                    {msg.why.map((reason, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0 mt-1.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Blocker Alert Box */}
              {msg.blockerAlert && (
                <div className="p-3 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/30 text-xs text-[#FBBF24] flex items-start gap-2">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold block">Action Blocker Detected:</span>
                    <span>{msg.blockerAlert}</span>
                  </div>
                </div>
              )}

              {/* Recommended Next Action CTA */}
              {msg.nextAction && (
                <div className="pt-1">
                  <button
                    onClick={() => {
                      if (msg.nextAction?.actionType === 'view_scholarship' && msg.nextAction.targetId) {
                        const targetSch = scholarships.find((s) => s.id === msg.nextAction?.targetId);
                        if (targetSch) onViewDossier(targetSch);
                      } else if (msg.nextAction?.actionType === 'view_documents') {
                        onFixBlockers();
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center justify-between gap-2 shadow-md hover:opacity-95 transition-opacity"
                  >
                    <span>Next Action: {msg.nextAction.text}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#A7B0C0] shrink-0">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask ScholarAI: e.g., 'What should I do next?' or 'Check my documents'..."
          className="flex-1 pl-4 pr-12 py-3.5 rounded-2xl glass-input text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:border-[#8B5CF6]"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className={`p-3.5 rounded-2xl transition-all ${
            inputQuery.trim()
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white shadow-md'
              : 'bg-white/5 text-[#64748B] cursor-not-allowed'
          }`}
          title="Send query"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
