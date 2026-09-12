import React, { useState, useEffect } from 'react';
import {
  StudentProfile,
  Scholarship,
  StudentDocument,
  ApplicationItem,
  EligibilityRule,
  ApplicationStatus
} from './types';
import { storageService } from './services/storageService';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { DiscoverView } from './components/discover/DiscoverView';
import { StrategyView } from './components/strategy/StrategyView';
import { ApplicationKanban } from './components/pipeline/ApplicationKanban';
import { DeadlineCenter } from './components/deadlines/DeadlineCenter';
import { AIAdvisorView } from './components/advisor/AIAdvisorView';
import { DocumentCenter } from './components/documents/DocumentCenter';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ScholarshipDossier } from './components/discover/ScholarshipDossier';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AuthModal } from './components/auth/AuthModal';
import { CommandPaletteModal } from './components/layout/CommandPaletteModal';

export function App() {
  // Global State backed by LocalStorage
  const [student, setStudent] = useState<StudentProfile>(() => storageService.getStudent());
  const [documents, setDocuments] = useState<StudentDocument[]>(() => storageService.getDocuments());
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => storageService.getScholarships());
  const [applications, setApplications] = useState<ApplicationItem[]>(() => storageService.getApplications());
  const [rules, setRules] = useState<EligibilityRule[]>(() => storageService.getRules());

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [showLanding, setShowLanding] = useState<boolean>(false);

  // Modals & Contextual Triggers
  const [selectedDossier, setSelectedDossier] = useState<Scholarship | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [advisorPrompt, setAdvisorPrompt] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize scholarships & applications whenever documents or profile changes
  const handleUpdateDocumentStatus = (docId: string, newStatus: StudentDocument['status'], notes?: string) => {
    const res = storageService.updateDocumentStatus(docId, newStatus, notes);
    setDocuments(res.documents);
    setScholarships(res.scholarships);
    setApplications(storageService.getApplications());

    // Also update selected dossier if currently open
    if (selectedDossier) {
      const updatedDossier = res.scholarships.find((s) => s.id === selectedDossier.id);
      if (updatedDossier) setSelectedDossier(updatedDossier);
    }
  };

  const handleMoveKanbanStage = (appId: string, newStage: ApplicationStatus) => {
    const updated = storageService.updateApplicationStatus(appId, newStage);
    setApplications(updated);
  };

  const handleAddToStrategy = (scholarship: Scholarship) => {
    const updated = storageService.addApplicationFromScholarship(scholarship);
    setApplications(updated);
  };

  const handleSaveProfile = (updatedStudent: StudentProfile) => {
    storageService.saveStudent(updatedStudent);
    setStudent(updatedStudent);
    // Recalculate scholarships
    const refreshedScholarships = storageService.getScholarships();
    setScholarships(refreshedScholarships);
  };

  const handleSaveRule = (rule: EligibilityRule) => {
    const updatedRules = [rule, ...rules];
    storageService.saveRules(updatedRules);
    setRules(updatedRules);
  };

  const handleAddScholarship = (newSch: Scholarship) => {
    const updated = [newSch, ...scholarships];
    storageService.saveScholarships(updated);
    setScholarships(updated);
  };

  const handleDeleteScholarship = (id: string) => {
    const updated = scholarships.filter((s) => s.id !== id);
    storageService.saveScholarships(updated);
    setScholarships(updated);
  };

  const handleResetData = () => {
    storageService.resetAllToDefault();
    setStudent(storageService.getStudent());
    setDocuments(storageService.getDocuments());
    setScholarships(storageService.getScholarships());
    setApplications(storageService.getApplications());
    setRules(storageService.getRules());
  };

  const handleAskAIWithPrompt = (prompt: string) => {
    setAdvisorPrompt(prompt);
    setCurrentView('advisor');
  };

  const handleAskAIAboutScholarship = (sch: Scholarship) => {
    setAdvisorPrompt(`Why am I eligible for ${sch.name}? What are the blockers?`);
    setCurrentView('advisor');
  };

  const handleFixBlockers = () => {
    setCurrentView('documents');
  };

  // If user requested to view the Landing Page
  if (showLanding) {
    return (
      <LandingPage
        onLaunchApp={() => setShowLanding(false)}
        onOpenOnboarding={() => {
          setShowLanding(false);
          setIsOnboardingOpen(true);
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
        onExploreScholarships={() => {
          setShowLanding(false);
          setCurrentView('discover');
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#070B17] text-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentView={currentView}
          onNavigate={(viewId) => {
            if (viewId === 'documents') {
              setCurrentView('documents');
            } else {
              setCurrentView(viewId);
            }
          }}
          student={student}
          onResetData={handleResetData}
          onOpenLanding={() => setShowLanding(true)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <TopBar
          student={student}
          scholarships={scholarships}
          onNavigate={setCurrentView}
          onSearchFocus={() => setIsCommandPaletteOpen(true)}
          onViewDossier={(sch) => setSelectedDossier(sch)}
          onOpenLanding={() => setShowLanding(true)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* VIEW: DASHBOARD */}
          {currentView === 'dashboard' && (
            <DashboardView
              student={student}
              scholarships={scholarships}
              documents={documents}
              applications={applications}
              onNavigate={setCurrentView}
              onViewDossier={(sch) => setSelectedDossier(sch)}
              onAskAIWithPrompt={handleAskAIWithPrompt}
              onFixBlockers={handleFixBlockers}
            />
          )}

          {/* VIEW: DISCOVER */}
          {currentView === 'discover' && (
            <DiscoverView
              scholarships={scholarships}
              onViewDossier={(sch) => setSelectedDossier(sch)}
              onAddToStrategy={handleAddToStrategy}
              savedScholarshipIds={applications.map((a) => a.scholarshipId)}
            />
          )}

          {/* VIEW: STRATEGY */}
          {currentView === 'strategy' && (
            <StrategyView
              scholarships={scholarships}
              applications={applications}
              onViewDossier={(sch) => setSelectedDossier(sch)}
              onNavigate={setCurrentView}
              onFixBlockers={handleFixBlockers}
            />
          )}

          {/* VIEW: APPLICATION KANBAN PIPELINE */}
          {currentView === 'pipeline' && (
            <ApplicationKanban
              applications={applications}
              scholarships={scholarships}
              onMoveStage={handleMoveKanbanStage}
              onViewDossier={(sch) => setSelectedDossier(sch)}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          )}

          {/* VIEW: DEADLINE COMMAND CENTER & CALENDAR */}
          {currentView === 'deadlines' && (
            <DeadlineCenter
              scholarships={scholarships}
              onViewDossier={(sch) => setSelectedDossier(sch)}
              onNavigateStrategy={() => setCurrentView('strategy')}
            />
          )}

          {/* VIEW: AI SCHOLARSHIP ADVISOR */}
          {currentView === 'advisor' && (
            <AIAdvisorView
              student={student}
              scholarships={scholarships}
              documents={documents}
              onViewDossier={(sch) => setSelectedDossier(sch)}
              onFixBlockers={handleFixBlockers}
              initialPrompt={advisorPrompt}
            />
          )}

          {/* VIEW: DOCUMENT INTELLIGENCE CENTER */}
          {currentView === 'documents' && (
            <DocumentCenter
              documents={documents}
              onUpdateStatus={handleUpdateDocumentStatus}
              onNavigateDashboard={() => setCurrentView('dashboard')}
            />
          )}

          {/* VIEW: PROFILE */}
          {currentView === 'profile' && (
            <ProfileView
              student={student}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {/* VIEW: ADMIN CONSOLE */}
          {currentView === 'admin' && (
            <AdminDashboard
              scholarships={scholarships}
              student={student}
              rules={rules}
              onSaveRule={handleSaveRule}
              onAddScholarship={handleAddScholarship}
              onDeleteScholarship={handleDeleteScholarship}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentView={currentView} onNavigate={setCurrentView} />

      {/* Scholarship Dossier Deep-Dive Modal */}
      <ScholarshipDossier
        scholarship={selectedDossier}
        isOpen={Boolean(selectedDossier)}
        onClose={() => setSelectedDossier(null)}
        documents={documents}
        onAskAI={handleAskAIAboutScholarship}
        onAddToStrategy={handleAddToStrategy}
        onFixBlockers={handleFixBlockers}
        isSaved={Boolean(
          selectedDossier && applications.some((a) => a.scholarshipId === selectedDossier.id)
        )}
      />

      {/* 6-Step Guided Onboarding Strategy Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(newProfile) => {
          handleSaveProfile({ ...student, ...newProfile });
          setCurrentView('dashboard');
        }}
      />

      {/* Modern Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => setShowLanding(false)}
      />

      {/* Universal Command Palette (⌘K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        scholarships={scholarships}
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          setShowLanding(false);
        }}
        onViewDossier={(sch) => setSelectedDossier(sch)}
        onAskAIWithPrompt={(prompt) => {
          handleAskAIWithPrompt(prompt);
          setShowLanding(false);
        }}
        onFixBlockers={() => {
          handleFixBlockers();
          setShowLanding(false);
        }}
        onResetData={handleResetData}
      />
    </div>
  );
}

export default App;
