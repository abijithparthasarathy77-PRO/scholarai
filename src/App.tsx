import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserRole, 
  Scholarship, 
  StudentProfile, 
  Application, 
  StudentDocument, 
  NotificationItem, 
  ManualReviewRequest, 
  EligibilityRule,
  MatchResult,
  ApplicationStage,
  ThemeMode
} from './types';
import { StorageService } from './services/storageService';
import { evaluateScholarshipMatch } from './services/matchingEngine';
import { Navigation } from './components/Navigation';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AIChatDrawer } from './components/AIChatDrawer';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { ManualReviewModal } from './components/ManualReviewModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LandingPage } from './views/LandingPage';
import { LoginPage } from './views/LoginPage';
import { OnboardingWizard } from './views/OnboardingWizard';
import { StudentDashboard } from './views/StudentDashboard';
import { DiscoveryView } from './views/DiscoveryView';
import { ApplicationPipelineView } from './views/ApplicationPipelineView';
import { CalendarView } from './views/CalendarView';
import { ProfileView } from './views/ProfileView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { DEMO_USER_STUDENT, DEMO_USER_ADMIN } from './data/mockData';
import confetti from 'canvas-confetti';
import { Shield, KeyRound, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(StorageService.getTheme());
  const [loginInitialRole, setLoginInitialRole] = useState<UserRole>('student');
  const [adminSubTab, setAdminSubTab] = useState<'overview' | 'scholarships' | 'rules' | 'reviews'>('overview');
  
  // Data States
  const [student, setStudent] = useState<StudentProfile>(StorageService.getStudentProfile());
  const [scholarships, setScholarships] = useState<Scholarship[]>(StorageService.getScholarships());
  const [applications, setApplications] = useState<Application[]>(StorageService.getApplications());
  const [documents, setDocuments] = useState<StudentDocument[]>(StorageService.getDocuments());
  const [notifications, setNotifications] = useState<NotificationItem[]>(StorageService.getNotifications());
  const [manualReviews, setManualReviews] = useState<ManualReviewRequest[]>(StorageService.getManualReviews());
  const [rules, setRules] = useState<EligibilityRule[]>(StorageService.getRules());

  // Modal / Drawer States
  const [selectedScholarshipForDossier, setSelectedScholarshipForDossier] = useState<Scholarship | null>(null);
  const [selectedScholarshipForReview, setSelectedScholarshipForReview] = useState<Scholarship | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize role
  useEffect(() => {
    const savedRole = StorageService.getCurrentRole();
    setCurrentRole(savedRole);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Evaluate matches across all scholarships for the current student & documents
  const matchResults = useMemo(() => {
    const map = new Map<string, MatchResult>();
    scholarships.forEach(s => {
      const match = evaluateScholarshipMatch(student, s, documents);
      map.set(s.id, match);
    });
    return map;
  }, [student, scholarships, documents]);

  // Handlers
  const handleToggleRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    StorageService.setCurrentRole(newRole);
    if (newRole === 'admin') {
      setCurrentTab('admin');
      showToast('Switched to Administrative Scrutiny View');
    } else {
      setCurrentTab('dashboard');
      showToast("Switched to Aarav Sharma's Student View");
    }
  };

  const handleResetDemo = () => {
    StorageService.resetToDemo();
    setStudent(StorageService.getStudentProfile());
    setScholarships(StorageService.getScholarships());
    setApplications(StorageService.getApplications());
    setDocuments(StorageService.getDocuments());
    setNotifications(StorageService.getNotifications());
    setManualReviews(StorageService.getManualReviews());
    setRules(StorageService.getRules());
    setCurrentRole('student');
    setCurrentTab('dashboard');
    showToast('ScholarAI reset to initial Aarav Sharma demonstration state');
  };

  const handleApplyOrSave = (sch: Scholarship) => {
    const exists = applications.some(a => a.scholarship_id === sch.id);
    if (exists) {
      showToast(`"${sch.title}" is already in your Application Pipeline`);
      setCurrentTab('applications');
      return;
    }

    const newApp: Application = {
      id: `app_${Date.now()}`,
      student_id: student.user_id,
      scholarship_id: sch.id,
      scholarship_title: sch.title,
      provider: sch.provider,
      funding_formatted: sch.funding_formatted,
      deadline: sch.deadline,
      stage: 'interested',
      progress_percentage: 20,
      priority: sch.days_remaining <= 3 ? 'Critical' : sch.days_remaining <= 10 ? 'High' : 'Normal',
      checklist: [
        { item: 'Eligibility verification', completed: true },
        { item: 'Statement of Purpose', completed: false },
        { item: 'Nodal verification stamp', completed: false },
      ],
      updated_at: new Date().toISOString(),
    };

    StorageService.addApplication(newApp);
    setApplications(StorageService.getApplications());
    showToast(`Added "${sch.title}" to Application Pipeline`);
  };

  const handleStageChange = (appId: string, newStage: ApplicationStage) => {
    StorageService.updateApplicationStage(appId, newStage);
    setApplications(StorageService.getApplications());
  };

  const handleRenewDocument = (docId: string) => {
    StorageService.renewDocument(docId);
    const updatedDocs = StorageService.getDocuments();
    setDocuments(updatedDocs);
    showToast('Tahsildar Income Certificate renewed! Profile strength boosted to 95%');
  };

  const handleMarkNotificationRead = (id: string) => {
    StorageService.markNotificationRead(id);
    setNotifications(StorageService.getNotifications());
  };

  const handleSaveRule = (rule: EligibilityRule) => {
    StorageService.addRule(rule);
    setRules(StorageService.getRules());
    showToast(`Eligibility rule "${rule.name}" compiled and saved`);
  };

  const handleUpdateScholarship = (updated: Scholarship) => {
    StorageService.updateScholarship(updated);
    setScholarships(StorageService.getScholarships());
    showToast(`Updated "${updated.title}" parameters`);
  };

  const handleUpdateManualReview = (reviewId: string, status: ManualReviewRequest['status'], notes?: string) => {
    StorageService.updateManualReviewStatus(reviewId, status, notes);
    setManualReviews(StorageService.getManualReviews());
    showToast(`Manual review status updated to "${status}"`);
  };

  const handleSelectTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    StorageService.setTheme(theme);
    const themeNames: Record<ThemeMode, string> = {
      aurora: 'Radiant Aurora',
      midnight: 'Midnight Cyber',
      sunset: 'Sunset Glow',
      emerald: 'Emerald Oceanic',
    };
    showToast(`Background palette updated: ${themeNames[theme]}`);
  };

  const currentUser = currentRole === 'admin' ? DEMO_USER_ADMIN : DEMO_USER_STUDENT;

  return (
    <div className={`min-h-screen relative flex flex-col font-sans selection:bg-indigo-600 selection:text-white pb-16 md:pb-0 transition-colors duration-500 ${
      currentTheme === 'midnight' ? 'text-slate-100 theme-dark-surface' : 'text-slate-900'
    }`}>
      {/* Dynamic Animated Ambient Background with floating orbs and particle drift */}
      <AnimatedBackground theme={currentTheme} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center space-x-2 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar (hidden on landing, onboarding, login, and admin) */}
      {currentTab !== 'landing' && currentTab !== 'onboarding' && currentTab !== 'login' && currentTab !== 'admin' && (
        <Navigation
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currentRole={currentRole}
          onToggleRole={handleToggleRole}
          currentUser={currentUser}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onResetDemo={handleResetDemo}
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
          onSignOut={handleSignOut}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          adminSubTab={adminSubTab}
          onSelectAdminSubTab={setAdminSubTab}
        />
      )}

      {/* Main View Switcher */}
      <main className={`flex-1 relative z-10 ${currentTab !== 'landing' && currentTab !== 'login' && currentTab !== 'onboarding' && currentTab !== 'admin' ? 'pt-20 sm:pt-24' : 'pt-4 sm:pt-6'}`}>
        {currentTab === 'login' && (
          <LoginPage
            onLoginSuccess={(role) => {
              handleToggleRole(role);
              if (role === 'admin') {
                setCurrentTab('admin');
                showToast('Welcome Dr. Meenakshi Sundaram! Institutional Suite unlocked.');
              } else {
                setCurrentTab('dashboard');
                showToast('Welcome back Aarav Sharma! 28 qualified opportunities ready.');
              }
            }}
            onNavigateToLanding={() => setCurrentTab('landing')}
            onNavigateToRegister={() => setCurrentTab('onboarding')}
            currentTheme={currentTheme}
            onSelectTheme={handleSelectTheme}
            initialRole={loginInitialRole}
          />
        )}

        {currentTab === 'landing' && (
          <LandingPage
            onStartOnboarding={() => setCurrentTab('onboarding')}
            onExploreDashboard={() => setCurrentTab('dashboard')}
            onExploreCatalog={() => setCurrentTab('discover')}
            onNavigateToLogin={() => setCurrentTab('login')}
            currentTheme={currentTheme}
            onSelectTheme={handleSelectTheme}
          />
        )}

        {currentTab === 'onboarding' && (
          <OnboardingWizard
            onComplete={() => {
              setStudent(StorageService.getStudentProfile());
              setCurrentTab('dashboard');
              showToast('Onboarding complete! Your 5D match score is ready.');
            }}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'dashboard' && (
          <StudentDashboard
            student={student}
            scholarships={scholarships}
            matchResults={matchResults}
            documents={documents}
            onViewScholarship={sch => setSelectedScholarshipForDossier(sch)}
            onApplyOrSave={handleApplyOrSave}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onNavigateTab={setCurrentTab}
            onRenewDocument={handleRenewDocument}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoveryView
            scholarships={scholarships}
            matchResults={matchResults}
            student={student}
            onViewDetails={sch => setSelectedScholarshipForDossier(sch)}
            onApplyOrSave={handleApplyOrSave}
            onRequestManualReview={sch => setSelectedScholarshipForReview(sch)}
          />
        )}

        {currentTab === 'applications' && (
          <ApplicationPipelineView
            applications={applications}
            onStageChange={handleStageChange}
            onOpenScholarship={id => {
              const target = scholarships.find(s => s.id === id);
              if (target) setSelectedScholarshipForDossier(target);
            }}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarView
            scholarships={scholarships}
            onViewScholarship={sch => setSelectedScholarshipForDossier(sch)}
            onApplyOrSave={handleApplyOrSave}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            student={student}
            documents={documents}
            onRenewDocument={handleRenewDocument}
            onUpdateStudent={updated => {
              StorageService.setStudentProfile(updated);
              setStudent(updated);
            }}
          />
        )}

        {currentTab === 'admin' && (
          currentRole === 'admin' ? (
            <AdminDashboardView
              adminUser={DEMO_USER_ADMIN}
              scholarships={scholarships}
              manualReviews={manualReviews}
              rules={rules}
              onSaveRule={handleSaveRule}
              onUpdateScholarship={handleUpdateScholarship}
              onUpdateManualReview={handleUpdateManualReview}
              activeSubTab={adminSubTab}
              onSelectSubTab={setAdminSubTab}
              onSignOut={handleSignOut}
              onNavigateHome={() => setCurrentTab('landing')}
              currentTheme={currentTheme}
              onSelectTheme={handleSelectTheme}
            />
          ) : (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-2xl backdrop-blur-xl">
                <Shield className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
                  Restricted Institutional Portal
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Institutional Admin Sign-In Required
                </h2>
                <p className="text-xs sm:text-sm opacity-70 max-w-md mx-auto leading-relaxed">
                  The Institutional Admin Suite is strictly reserved for verified university administrators, nodal scrutiny officers, and scholarship evaluators. Student accounts do not have access to institutional settings or audit queues.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setLoginInitialRole('admin');
                    setCurrentTab('login');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer hover:scale-105"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In as Institutional Admin</span>
                </button>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-inherit/20 hover:bg-slate-500/10 font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to Student Dashboard
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Embedded ScholarAI Advisor Drawer - Student Only */}
      {currentRole === 'student' && (
        <AIChatDrawer
          isOpen={isAdvisorOpen}
          onClose={() => setIsAdvisorOpen(false)}
          student={student}
          scholarships={scholarships}
          applications={applications}
          documents={documents}
          matches={matchResults}
          onNavigate={url => {
            const tab = url.replace('/', '').split('?')[0];
            if (tab) setCurrentTab(tab);
          }}
        />
      )}

      {/* Global Command Palette Search Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        scholarships={scholarships}
        onSelectScholarship={(s) => {
          setSelectedScholarshipForDossier(s);
          setIsCommandPaletteOpen(false);
        }}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          setIsCommandPaletteOpen(false);
        }}
        onOpenAdvisor={() => {
          setIsAdvisorOpen(true);
          setIsCommandPaletteOpen(false);
        }}
        onToggleRole={handleToggleRole}
        currentRole={currentRole}
        onResetDemo={handleResetDemo}
        onSelectTheme={handleSelectTheme}
        currentTheme={currentTheme}
        adminSubTab={adminSubTab}
        onSelectAdminSubTab={setAdminSubTab}
        onSignOut={handleSignOut}
      />

      {/* Scholarship Detail Dossier Modal */}
      {selectedScholarshipForDossier && (
        <ScholarshipDetailModal
          scholarship={selectedScholarshipForDossier}
          matchResult={matchResults.get(selectedScholarshipForDossier.id) || evaluateScholarshipMatch(student, selectedScholarshipForDossier, documents)}
          documents={documents}
          onClose={() => setSelectedScholarshipForDossier(null)}
          onApplyOrSave={handleApplyOrSave}
          onRenewDocument={handleRenewDocument}
          isInPipeline={applications.some(a => a.scholarship_id === selectedScholarshipForDossier.id)}
        />
      )}

      {/* Manual Review Request Modal */}
      {selectedScholarshipForReview && (
        <ManualReviewModal
          scholarship={selectedScholarshipForReview}
          student={student}
          onClose={() => setSelectedScholarshipForReview(null)}
          onSubmitSuccess={() => {
            setManualReviews(StorageService.getManualReviews());
            showToast('Manual Review appeal submitted for administrative review');
          }}
        />
      )}

      {/* Mobile Bottom Navigation - Student Only */}
      {currentRole === 'student' && currentTab !== 'landing' && currentTab !== 'onboarding' && currentTab !== 'login' && (
        <MobileBottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          currentRole={currentRole}
          adminSubTab={adminSubTab}
          onSelectAdminSubTab={setAdminSubTab}
        />
      )}
    </div>
  );
};

export default App;
