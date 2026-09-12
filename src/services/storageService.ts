import { StudentProfile, StudentDocument, ApplicationItem, Scholarship, EligibilityRule } from '../types';
import { initialStudent, initialDocuments, initialApplications } from '../data/initialStudent';
import { initialScholarships } from '../data/initialScholarships';
import { recalculateAllScholarships } from './matchingEngine';

const STORAGE_VERSION = 'v3';

const KEYS = {
  VERSION: 'scholarai_data_version',
  STUDENT: `scholarai_${STORAGE_VERSION}_student_profile`,
  DOCUMENTS: `scholarai_${STORAGE_VERSION}_documents`,
  APPLICATIONS: `scholarai_${STORAGE_VERSION}_applications`,
  SCHOLARSHIPS: `scholarai_${STORAGE_VERSION}_scholarships`,
  RULES: `scholarai_${STORAGE_VERSION}_rules`
};

// Legacy keys to clean up to prevent old schema conflicts
const LEGACY_KEYS = [
  'scholarai_student_profile',
  'scholarai_documents',
  'scholarai_applications',
  'scholarai_scholarships',
  'scholarai_rules',
  'scholarai_current_role',
  'scholarai_theme'
];

function sanitizeStorage() {
  try {
    const currentVersion = localStorage.getItem(KEYS.VERSION);
    if (currentVersion !== STORAGE_VERSION) {
      // Clear legacy keys from previous app schema
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(KEYS.VERSION, STORAGE_VERSION);
    }
  } catch {
    // localStorage might be unavailable
  }
}

// Run sanitation on module load
sanitizeStorage();

const initialRules: EligibilityRule[] = [
  {
    id: 'rule-01',
    name: 'Commerce & Finance Merit Grant Rule',
    targetScholarship: 'Tata Merit Endowment for Higher Education',
    conditions: [
      { field: 'degree', operator: '=', value: 'B.Com (Honours)' },
      { field: 'academicScore', operator: '>=', value: 75 },
      { field: 'familyIncome', operator: '<=', value: 600000 },
      { field: 'domicile', operator: '=', value: 'Maharashtra' }
    ],
    logicOperator: 'AND',
    outcome: 'Potentially Eligible',
    createdAt: '2026-09-01'
  },
  {
    id: 'rule-02',
    name: 'National UG Need-cum-Merit Rule',
    targetScholarship: 'Reliance Foundation Undergraduate Scholarship',
    conditions: [
      { field: 'academicScore', operator: '>=', value: 60 },
      { field: 'familyIncome', operator: '<=', value: 1500000 }
    ],
    logicOperator: 'AND',
    outcome: 'Potentially Eligible',
    createdAt: '2026-09-02'
  }
];

export const storageService = {
  getStudent(): StudentProfile {
    try {
      const data = localStorage.getItem(KEYS.STUDENT);
      if (data) {
        const parsed = JSON.parse(data);
        // Validate that parsed student has expected new schema fields
        if (parsed && typeof parsed.academicScore === 'number' && parsed.stateDomicile) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    this.saveStudent(initialStudent);
    return initialStudent;
  },

  saveStudent(student: StudentProfile): void {
    try {
      localStorage.setItem(KEYS.STUDENT, JSON.stringify(student));
    } catch {
      // ignore
    }
  },

  getDocuments(): StudentDocument[] {
    try {
      const data = localStorage.getItem(KEYS.DOCUMENTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].status) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    this.saveDocuments(initialDocuments);
    return initialDocuments;
  },

  saveDocuments(docs: StudentDocument[]): void {
    try {
      localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
    } catch {
      // ignore
    }
  },

  updateDocumentStatus(docId: string, newStatus: StudentDocument['status'], newNotes?: string): {
    documents: StudentDocument[];
    scholarships: Scholarship[];
    student: StudentProfile;
  } {
    const docs = this.getDocuments();
    const updatedDocs = docs.map((d) => {
      if (d.id === docId) {
        return {
          ...d,
          status: newStatus,
          aiCheckStatus: (newStatus === 'READY' ? 'Verified' : newStatus === 'EXPIRED' ? 'Expired' : 'Pending Review') as StudentDocument['aiCheckStatus'],
          aiCheckNotes: newNotes || (newStatus === 'READY' ? 'Document verified and active for application cycle.' : d.aiCheckNotes)
        };
      }
      return d;
    });

    this.saveDocuments(updatedDocs);

    const student = this.getStudent();
    const currentScholarships = this.getScholarships();
    const recalculated = recalculateAllScholarships(currentScholarships, student, updatedDocs);
    this.saveScholarships(recalculated);

    // Update applications readiness scores
    const apps = this.getApplications();
    const updatedApps = apps.map((app) => {
      const sch = recalculated.find((s) => s.id === app.scholarshipId);
      if (sch) {
        return {
          ...app,
          readinessScore: sch.readinessScore,
          priorityScore: sch.priorityScore,
          blockers: sch.blockers,
          nextAction: sch.nextAction
        };
      }
      return app;
    });
    this.saveApplications(updatedApps);

    return { documents: updatedDocs, scholarships: recalculated, student };
  },

  getScholarships(): Scholarship[] {
    try {
      const data = localStorage.getItem(KEYS.SCHOLARSHIPS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.fiveD && typeof parsed[0]?.priorityScore === 'number') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    const student = this.getStudent();
    const docs = this.getDocuments();
    const recalculated = recalculateAllScholarships(initialScholarships, student, docs);
    this.saveScholarships(recalculated);
    return recalculated;
  },

  saveScholarships(scholarships: Scholarship[]): void {
    try {
      localStorage.setItem(KEYS.SCHOLARSHIPS, JSON.stringify(scholarships));
    } catch {
      // ignore
    }
  },

  getApplications(): ApplicationItem[] {
    try {
      const data = localStorage.getItem(KEYS.APPLICATIONS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.status) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    this.saveApplications(initialApplications);
    return initialApplications;
  },

  saveApplications(apps: ApplicationItem[]): void {
    try {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch {
      // ignore
    }
  },

  updateApplicationStatus(appId: string, newStatus: ApplicationItem['status']): ApplicationItem[] {
    const apps = this.getApplications();
    const updated = apps.map((a) => (a.id === appId ? { ...a, status: newStatus, lastUpdated: 'Just now' } : a));
    this.saveApplications(updated);
    return updated;
  },

  addApplicationFromScholarship(scholarship: Scholarship): ApplicationItem[] {
    const apps = this.getApplications();
    const existing = apps.find((a) => a.scholarshipId === scholarship.id);
    if (existing) return apps;

    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.name,
      provider: scholarship.provider,
      fundingAmount: scholarship.fundingAmount,
      deadline: scholarship.deadline,
      daysLeft: scholarship.daysLeft,
      urgency: scholarship.urgency,
      status: 'Interested',
      matchScore: scholarship.matchScore,
      readinessScore: scholarship.readinessScore,
      priorityScore: scholarship.priorityScore,
      blockers: scholarship.blockers,
      nextAction: scholarship.nextAction,
      lastUpdated: 'Just now'
    };

    const updated = [newApp, ...apps];
    this.saveApplications(updated);
    return updated;
  },

  getRules(): EligibilityRule[] {
    try {
      const data = localStorage.getItem(KEYS.RULES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    this.saveRules(initialRules);
    return initialRules;
  },

  saveRules(rules: EligibilityRule[]): void {
    try {
      localStorage.setItem(KEYS.RULES, JSON.stringify(rules));
    } catch {
      // ignore
    }
  },

  resetAllToDefault(): void {
    try {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }
};
