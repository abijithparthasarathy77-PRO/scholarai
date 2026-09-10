import {
  StudentProfile,
  Scholarship,
  Application,
  StudentDocument,
  NotificationItem,
  ManualReviewRequest,
  EligibilityRule,
  User,
  UserRole,
} from '../types';
import {
  DEMO_USER_STUDENT,
  DEMO_USER_ADMIN,
  DEMO_STUDENT_PROFILE,
  INITIAL_DOCUMENTS,
  INITIAL_SCHOLARSHIPS,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MANUAL_REVIEWS,
  INITIAL_RULES,
} from '../data/mockData';

const KEYS = {
  CURRENT_ROLE: 'scholarai_current_role',
  STUDENT_PROFILE: 'scholarai_student_profile',
  SCHOLARSHIPS: 'scholarai_scholarships',
  APPLICATIONS: 'scholarai_applications',
  DOCUMENTS: 'scholarai_documents',
  NOTIFICATIONS: 'scholarai_notifications',
  MANUAL_REVIEWS: 'scholarai_manual_reviews',
  RULES: 'scholarai_rules',
};

export class StorageService {
  static getCurrentRole(): UserRole {
    const saved = localStorage.getItem(KEYS.CURRENT_ROLE);
    return (saved as UserRole) || 'student';
  }

  static setCurrentRole(role: UserRole): void {
    localStorage.setItem(KEYS.CURRENT_ROLE, role);
  }

  static getCurrentUser(): User {
    const role = this.getCurrentRole();
    return role === 'admin' ? DEMO_USER_ADMIN : DEMO_USER_STUDENT;
  }

  static getStudentProfile(): StudentProfile {
    const saved = localStorage.getItem(KEYS.STUDENT_PROFILE);
    if (!saved) {
      this.setStudentProfile(DEMO_STUDENT_PROFILE);
      return DEMO_STUDENT_PROFILE;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return DEMO_STUDENT_PROFILE;
    }
  }

  static setStudentProfile(profile: StudentProfile): void {
    localStorage.setItem(KEYS.STUDENT_PROFILE, JSON.stringify(profile));
  }

  static getScholarships(): Scholarship[] {
    const saved = localStorage.getItem(KEYS.SCHOLARSHIPS);
    if (!saved) {
      this.setScholarships(INITIAL_SCHOLARSHIPS);
      return INITIAL_SCHOLARSHIPS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_SCHOLARSHIPS;
    }
  }

  static setScholarships(scholarships: Scholarship[]): void {
    localStorage.setItem(KEYS.SCHOLARSHIPS, JSON.stringify(scholarships));
  }

  static updateScholarship(scholarship: Scholarship): void {
    const list = this.getScholarships();
    const idx = list.findIndex(s => s.id === scholarship.id);
    if (idx >= 0) {
      list[idx] = scholarship;
    } else {
      list.unshift(scholarship);
    }
    this.setScholarships(list);
  }

  static getApplications(): Application[] {
    const saved = localStorage.getItem(KEYS.APPLICATIONS);
    if (!saved) {
      this.setApplications(INITIAL_APPLICATIONS);
      return INITIAL_APPLICATIONS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  static setApplications(apps: Application[]): void {
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
  }

  static updateApplicationStage(appId: string, newStage: Application['stage']): void {
    const apps = this.getApplications();
    const target = apps.find(a => a.id === appId);
    if (target) {
      target.stage = newStage;
      target.updated_at = new Date().toISOString();
      if (newStage === 'applied' && !target.submitted_at) {
        target.submitted_at = new Date().toISOString();
        target.progress_percentage = 100;
      }
      this.setApplications(apps);
    }
  }

  static addApplication(app: Application): void {
    const apps = this.getApplications();
    const exists = apps.find(a => a.scholarship_id === app.scholarship_id);
    if (!exists) {
      apps.push(app);
      this.setApplications(apps);
    }
  }

  static getDocuments(): StudentDocument[] {
    const saved = localStorage.getItem(KEYS.DOCUMENTS);
    if (!saved) {
      this.setDocuments(INITIAL_DOCUMENTS);
      return INITIAL_DOCUMENTS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_DOCUMENTS;
    }
  }

  static setDocuments(docs: StudentDocument[]): void {
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
  }

  static renewDocument(docId: string): void {
    const docs = this.getDocuments();
    const doc = docs.find(d => d.id === docId);
    if (doc) {
      doc.status = 'verified';
      doc.is_expired = false;
      doc.issue_date = '2026-08-01';
      doc.expiry_date = '2027-03-31';
      doc.notes = 'Renewed and verified with Tahsildar Digital Certificate (FY 2026-27)';
      doc.action_label = undefined;
      this.setDocuments(docs);
    }
  }

  static getNotifications(): NotificationItem[] {
    const saved = localStorage.getItem(KEYS.NOTIFICATIONS);
    if (!saved) {
      this.setNotifications(INITIAL_NOTIFICATIONS);
      return INITIAL_NOTIFICATIONS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  static setNotifications(notifs: NotificationItem[]): void {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  static markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const target = notifs.find(n => n.id === id);
    if (target) {
      target.read = true;
      this.setNotifications(notifs);
    }
  }

  static getManualReviews(): ManualReviewRequest[] {
    const saved = localStorage.getItem(KEYS.MANUAL_REVIEWS);
    if (!saved) {
      this.setManualReviews(INITIAL_MANUAL_REVIEWS);
      return INITIAL_MANUAL_REVIEWS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_MANUAL_REVIEWS;
    }
  }

  static setManualReviews(reviews: ManualReviewRequest[]): void {
    localStorage.setItem(KEYS.MANUAL_REVIEWS, JSON.stringify(reviews));
  }

  static addManualReview(review: ManualReviewRequest): void {
    const reviews = this.getManualReviews();
    reviews.unshift(review);
    this.setManualReviews(reviews);
  }

  static updateManualReviewStatus(id: string, status: ManualReviewRequest['status'], adminNotes?: string): void {
    const reviews = this.getManualReviews();
    const target = reviews.find(r => r.id === id);
    if (target) {
      target.status = status;
      if (adminNotes) target.admin_notes = adminNotes;
      target.updated_at = new Date().toISOString();
      this.setManualReviews(reviews);
    }
  }

  static getRules(): EligibilityRule[] {
    const saved = localStorage.getItem(KEYS.RULES);
    if (!saved) {
      this.setRules(INITIAL_RULES);
      return INITIAL_RULES;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_RULES;
    }
  }

  static setRules(rules: EligibilityRule[]): void {
    localStorage.setItem(KEYS.RULES, JSON.stringify(rules));
  }

  static addRule(rule: EligibilityRule): void {
    const rules = this.getRules();
    rules.unshift(rule);
    this.setRules(rules);
  }

  static resetToDemo(): void {
    localStorage.removeItem(KEYS.CURRENT_ROLE);
    localStorage.removeItem(KEYS.STUDENT_PROFILE);
    localStorage.removeItem(KEYS.SCHOLARSHIPS);
    localStorage.removeItem(KEYS.APPLICATIONS);
    localStorage.removeItem(KEYS.DOCUMENTS);
    localStorage.removeItem(KEYS.NOTIFICATIONS);
    localStorage.removeItem(KEYS.MANUAL_REVIEWS);
    localStorage.removeItem(KEYS.RULES);
  }
}
