import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Lock, Mail, User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('aarav.sharma@xaviers.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Aarav Sharma');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    onLoginSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        authMode === 'login'
          ? 'Sign in to ScholarAI'
          : authMode === 'register'
          ? 'Create Your Scholar Account'
          : 'Reset Your Password'
      }
      subtitle="Access your personal scholarship strategy and document vault"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {authMode === 'register' && (
          <div>
            <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-[#A7B0C0] block mb-1.5">
            Student Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@college.edu"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white"
            />
          </div>
        </div>

        {authMode !== 'forgot' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#A7B0C0]">Password</label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="text-[11px] text-[#22D3EE] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* Demo Credentials Quick Fill Banner */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-[#A7B0C0] flex items-center justify-between">
          <span>Demo Account: Aarav Sharma (2nd Yr B.Com)</span>
          <span className="text-[#34D399] font-bold">Pre-configured</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity mt-2"
        >
          <span>
            {authMode === 'login'
              ? 'Sign In & Launch Strategy'
              : authMode === 'register'
              ? 'Create Account'
              : 'Send Reset Link'}
          </span>
          <ArrowRight size={14} />
        </button>

        {/* Auth mode toggle */}
        <div className="pt-2 text-center text-xs text-[#A7B0C0]">
          {authMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#8B5CF6] hover:underline font-bold"
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#8B5CF6] hover:underline font-bold"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
};
