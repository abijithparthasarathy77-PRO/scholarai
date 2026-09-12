import React, { useState } from 'react';
import { UserRole, ThemeMode } from '../types';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Building,
  User,
  ShieldAlert
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, email: string) => void;
  onNavigateToLanding: () => void;
  onNavigateToRegister: () => void;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToLanding,
  onNavigateToRegister,
  currentTheme,
  onSelectTheme,
  initialRole = 'student',
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState(initialRole === 'admin' ? 'admin.review@scholarai.edu.in' : 'aarav.sharma@xaviers.edu');
  const [password, setPassword] = useState(initialRole === 'admin' ? 'adminPass@2026' : '••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Switch role pre-fills demo credentials
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === 'student') {
      setEmail('aarav.sharma@xaviers.edu');
      setPassword('scholarship2026');
    } else {
      setEmail('admin.review@scholarai.edu.in');
      setPassword('adminPass@2026');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole, email);
    }, 600);
  };

  // Instant 1-Click Quick Demo logins
  const handleQuickDemoLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'student') {
        onLoginSuccess('student', 'aarav.sharma@xaviers.edu');
      } else {
        onLoginSuccess('admin', 'admin.review@scholarai.edu.in');
      }
    }, 400);
  };

  return (
    <div className={`min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-indigo-600 selection:text-white overflow-hidden z-10 ${
      currentTheme === 'midnight' ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Top Floating Controls */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeSwitcher 
          currentTheme={currentTheme} 
          onSelectTheme={onSelectTheme} 
          compact 
        />
      </div>

      {/* Top Header Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-3">
        <button
          onClick={onNavigateToLanding}
          className="inline-flex items-center space-x-2.5 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className={`text-2xl font-black tracking-tight font-sans ${
            currentTheme === 'midnight' ? 'text-white' : 'text-slate-950'
          }`}>
            SCHOLAR<span className="text-indigo-600">AI</span>
          </span>
        </button>

        <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
          currentTheme === 'midnight' ? 'text-white' : 'text-slate-900'
        }`}>
          Sign In to Your Account
        </h2>
        <p className="text-xs opacity-70">
          Access AI eligibility evaluation, deadline alerts, and application management.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className={`py-8 px-5 sm:px-8 rounded-3xl border shadow-2xl backdrop-blur-2xl space-y-6 ${
          currentTheme === 'midnight'
            ? 'bg-slate-950/80 border-slate-800 text-slate-100'
            : 'bg-white/85 border-slate-200/90 text-slate-900'
        }`}>
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-2.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                selectedRole === 'student'
                  ? 'bg-white text-indigo-600 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                selectedRole === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Institutional Admin</span>
            </button>
          </div>

          {/* Quick 1-Click Demo Access Banner */}
          <div className={`p-3.5 rounded-2xl border text-xs space-y-2 transition-colors ${
            selectedRole === 'student' 
              ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950' 
              : 'bg-purple-50/60 border-purple-200 text-purple-950'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Instant Demo Credentials</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/80 border border-slate-200">
                1-Click Sign In
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug">
              {selectedRole === 'student' 
                ? 'Pre-loaded demo student: Aarav Sharma (2nd Year B.Com Hons, St. Xavier\'s Mumbai, GPA 3.82, General-EWS).'
                : 'Pre-loaded evaluator: Dr. Meenakshi Sundaram (Chief Scholarship Evaluator & Nodal Officer).'}
            </p>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin(selectedRole)}
              className={`w-full py-2 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                selectedRole === 'student'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              <span>Launch Demo as {selectedRole === 'student' ? 'Aarav Sharma (Student)' : 'Dr. Meenakshi (Admin)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {selectedRole === 'student' ? 'Student Email / Roll ID' : 'Institutional Nodal Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={selectedRole === 'student' ? 'student@university.edu' : 'nodal.officer@portal.gov.in'}
                  className="w-full pl-10 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo mode: Please use the 1-click Instant Demo login above.'); }} className="text-[11px] font-semibold text-indigo-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden bg-white text-slate-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                <span className="text-slate-600">Keep me authenticated</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center space-x-2 ${
                selectedRole === 'student'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isLoading ? (
                <span>Authenticating with Nodal Database...</span>
              ) : (
                <>
                  <span>Sign In as {selectedRole === 'student' ? 'Student' : 'Administrator'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link to Onboarding / Registration */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs">
            <p className="text-slate-600">
              New to ScholarAI?{' '}
              <button
                onClick={onNavigateToRegister}
                className="font-bold text-indigo-600 hover:underline"
              >
                Create Student Profile & Match Now
              </button>
            </p>

            <button
              onClick={onNavigateToLanding}
              className="text-[11px] text-slate-400 hover:text-slate-600 block mx-auto pt-1"
            >
              ← Back to Homepage
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-400">
          Protected by institutional TLS encryption. Complies with Central Sector Scholarship Data Protection Guidelines.
        </div>
      </div>
    </div>
  );
};
