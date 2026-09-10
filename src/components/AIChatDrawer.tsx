import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, Scholarship, Application, StudentDocument, MatchResult } from '../types';
import { generateAdvisorResponse, ChatMessage } from '../services/aiAdvisorService';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  HelpCircle,
  Clock,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  scholarships: Scholarship[];
  applications: Application[];
  documents: StudentDocument[];
  matches: Map<string, MatchResult>;
  onNavigate?: (url: string) => void;
}

const PRESET_PROMPTS = [
  "Which scholarships should I prioritize?",
  "Why am I not eligible for this scholarship?",
  "What documents am I missing?",
  "Show scholarships closing this week.",
  "Find scholarships with high funding.",
  "What can I improve in my profile?",
  "Explain this eligibility requirement.",
];

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  student,
  scholarships,
  applications,
  documents,
  matches,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      content: `Hello ${student.name.split(' ')[0]}! I am your **ScholarAI Advisor**.\n\nI have evaluated your profile (**${student.degree}**, St. Xavier's, GPA ${student.GPA}, General-EWS) against all active scholarship schemes. How can I assist your financial journey today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAdvisorResponse(text, student, scholarships, applications, documents, matches);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-slideLeft">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-900 to-indigo-950 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-700/80 border border-indigo-500/50 shadow-xs">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-sm tracking-tight">ScholarAI Advisor</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-[11px] text-indigo-200/80">
              Grounded in {scholarships.length} verified scholarship registries
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-800/60 transition-colors"
          aria-label="Close Advisor"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Prompts Shelf */}
      <div className="p-3 bg-slate-50 border-b border-slate-200/80 overflow-x-auto">
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1.5 font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Suggested queries:</span>
        </div>
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 font-medium transition-colors shrink-0 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/40">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line prose-xs">
                {msg.content}
              </div>

              {msg.actionLinks && msg.actionLinks.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {msg.actionLinks.map((link, lidx) => (
                    <button
                      key={lidx}
                      onClick={() => {
                        if (onNavigate) onNavigate(link.url);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] flex items-center space-x-1 border border-indigo-200/60 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}

              <div
                className={`text-[9px] mt-1.5 text-right ${
                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="p-1.5 rounded-lg bg-slate-800 text-white shrink-0 mt-0.5 shadow-2xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>ScholarAI Advisor analyzing eligibility rules...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about scholarships, documents, eligibility..."
            className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-[10px] text-slate-400 text-center mt-1.5">
          Answers grounded strictly in verified scheme criteria. No fabricated facts.
        </div>
      </div>
    </div>
  );
};
