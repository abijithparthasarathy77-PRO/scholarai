import { Scholarship, StudentProfile, StudentDocument, PriorityLevel, UrgencyLevel } from '../types';

/**
 * Calculates deadline urgency score:
 * <= 3 days (CRITICAL): 100
 * <= 7 days (URGENT): 75
 * <= 15 days (UPCOMING): 50
 * > 15 days: 30
 */
export function calculateUrgencyScore(daysLeft: number): number {
  if (daysLeft <= 3) return 100;
  if (daysLeft <= 7) return 75;
  if (daysLeft <= 15) return 50;
  return 30;
}

/**
 * Calculates application readiness given student's active documents
 */
export function calculateScholarshipReadiness(
  scholarship: Scholarship,
  documents: StudentDocument[]
): { readinessScore: number; blockers: string[]; readyCount: number; totalRequired: number } {
  const reqDocs = scholarship.requiredDocuments || [];
  if (reqDocs.length === 0) {
    return { readinessScore: 100, blockers: [], readyCount: 0, totalRequired: 0 };
  }

  let readyCount = 0;
  const blockers: string[] = [];

  reqDocs.forEach((docName) => {
    // Find matching document by name or partial match
    const doc = documents.find(
      (d) => d.name.toLowerCase().includes(docName.toLowerCase()) || docName.toLowerCase().includes(d.name.toLowerCase())
    );

    if (!doc || doc.status === 'MISSING') {
      blockers.push(`Missing required document: ${docName}`);
    } else if (doc.status === 'EXPIRED') {
      blockers.push(`Expired document requires renewal: ${docName}`);
    } else if (doc.status === 'NEEDS_REVIEW') {
      blockers.push(`Document pending review: ${docName}`);
    } else {
      readyCount += 1;
    }
  });

  // Base readiness from documents (60% weight) + profile eligibility completeness (40% weight)
  const docReadinessRatio = readyCount / reqDocs.length;
  const rawReadiness = Math.round(docReadinessRatio * 60 + (scholarship.matchScore / 100) * 40);
  const readinessScore = Math.min(100, Math.max(20, rawReadiness));

  return { readinessScore, blockers, readyCount, totalRequired: reqDocs.length };
}

/**
 * Computes the ScholarAI Priority Score (0 - 100)
 * Priority = (Match * 0.35) + (Urgency * 0.25) + (Readiness * 0.20) + (FundingWeight * 0.10) + (EffortEase * 0.10)
 * NOTE: Priority Score is strictly separate from Match Score and Readiness.
 * Never claims guaranteed win probabilities.
 */
export function calculatePriorityScore(
  matchScore: number,
  daysLeft: number,
  readinessScore: number,
  fundingAmount: number
): { priorityScore: number; priorityLabel: PriorityLevel; urgency: UrgencyLevel } {
  const urgencyScore = calculateUrgencyScore(daysLeft);

  // Normalize funding: up to ₹2,00,000 maps to 100
  const fundingScore = Math.min(100, Math.round((fundingAmount / 200000) * 100));

  // High readiness means less effort required (ease score)
  const effortEaseScore = readinessScore;

  const priorityScore = Math.round(
    matchScore * 0.35 +
    urgencyScore * 0.25 +
    readinessScore * 0.20 +
    fundingScore * 0.10 +
    effortEaseScore * 0.10
  );

  let priorityLabel: PriorityLevel = 'RECOMMENDED';
  if (priorityScore >= 90) {
    priorityLabel = 'CRITICAL PRIORITY';
  } else if (priorityScore >= 80) {
    priorityLabel = 'HIGH PRIORITY';
  } else if (priorityScore < 50) {
    priorityLabel = 'BACKUP';
  }

  let urgency: UrgencyLevel = 'UPCOMING';
  if (daysLeft <= 3) urgency = 'CRITICAL';
  else if (daysLeft <= 7) urgency = 'URGENT';

  return { priorityScore, priorityLabel, urgency };
}

/**
 * Re-evaluates all scholarships against updated student profile and documents
 */
export function recalculateAllScholarships(
  scholarships: Scholarship[],
  _student: StudentProfile,
  documents: StudentDocument[]
): Scholarship[] {
  return scholarships.map((sch) => {
    const { readinessScore, blockers } = calculateScholarshipReadiness(sch, documents);
    const { priorityScore, priorityLabel, urgency } = calculatePriorityScore(
      sch.matchScore,
      sch.daysLeft,
      readinessScore,
      sch.fundingAmount
    );

    // Update next action dynamically based on remaining blockers
    let nextAction = sch.nextAction;
    if (blockers.length > 0) {
      if (blockers.some((b) => b.toLowerCase().includes('dean'))) {
        nextAction = 'Obtain Dean / HOD endorsement signature';
      } else if (blockers.some((b) => b.toLowerCase().includes('income'))) {
        nextAction = 'Renew Tahsildar Income Certificate';
      } else {
        nextAction = `Resolve blocker: ${blockers[0]}`;
      }
    } else {
      nextAction = 'All blockers cleared! Final review & submit';
    }

    return {
      ...sch,
      readinessScore,
      priorityScore,
      priorityRankLabel: priorityLabel,
      urgency,
      blockers,
      nextAction
    };
  });
}
