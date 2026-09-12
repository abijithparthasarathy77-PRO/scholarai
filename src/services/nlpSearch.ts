import { Scholarship } from '../types';

export interface NLPSearchResult {
  scholarships: Scholarship[];
  detectedIntent: string;
  matchedCriteria: {
    degrees?: string[];
    minFunding?: number;
    maxDaysLeft?: number;
    urgencyOnly?: boolean;
    readyOnly?: boolean;
    keywords?: string[];
  };
}

export function parseNaturalLanguageQuery(query: string, allScholarships: Scholarship[]): NLPSearchResult {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    return {
      scholarships: allScholarships,
      detectedIntent: 'All Qualified Opportunities',
      matchedCriteria: {}
    };
  }

  const matchedCriteria: NLPSearchResult['matchedCriteria'] = {};
  let detectedIntent = 'Filtered by smart query match';

  // 1. Check for funding patterns: e.g. "above 50000", "> 50k", "above ₹50,000", "1 lakh"
  const fundingMatch = cleanQuery.match(/(?:above|greater than|>|min|over)\s*(?:₹|rs\.?)?\s*([\d,]+)(?:\s*(k|thousand|lakh|lac|l))?/i);
  if (fundingMatch) {
    let rawAmount = parseFloat(fundingMatch[1].replace(/,/g, ''));
    const unit = fundingMatch[2]?.toLowerCase();
    if (unit === 'k' || unit === 'thousand') rawAmount *= 1000;
    if (unit === 'lakh' || unit === 'lac' || unit === 'l') rawAmount *= 100000;
    matchedCriteria.minFunding = rawAmount;
    detectedIntent = `Scholarships with funding >= ₹${rawAmount.toLocaleString('en-IN')}`;
  }

  // 2. Check for degree patterns: e.g. "b.com", "commerce", "engineering", "b.tech", "ug"
  if (cleanQuery.includes('b.com') || cleanQuery.includes('commerce')) {
    matchedCriteria.degrees = ['B.Com', 'Commerce'];
    detectedIntent = 'Opportunities tailored for Commerce / B.Com students';
  } else if (cleanQuery.includes('b.tech') || cleanQuery.includes('stem') || cleanQuery.includes('engineering')) {
    matchedCriteria.degrees = ['B.Tech', 'Engineering', 'STEM'];
    detectedIntent = 'Opportunities for STEM / Engineering disciplines';
  }

  // 3. Check for closing soon / urgent: "closing this week", "urgent", "soon", "48 hours", "closing"
  if (cleanQuery.includes('this week') || cleanQuery.includes('urgent') || cleanQuery.includes('closing soon') || cleanQuery.includes('closing')) {
    matchedCriteria.maxDaysLeft = 7;
    matchedCriteria.urgencyOnly = true;
    detectedIntent = 'Deadlines approaching within 7 days (Critical & Urgent)';
  }

  // 4. Check for "apply for now" / "ready to apply"
  if (cleanQuery.includes('apply for now') || cleanQuery.includes('ready') || cleanQuery.includes('no blockers')) {
    matchedCriteria.readyOnly = true;
    detectedIntent = 'Opportunities with high application readiness (>= 80%)';
  }

  // Filter based on matched criteria
  const filtered = allScholarships.filter((sch) => {
    // Degree filter
    if (matchedCriteria.degrees && matchedCriteria.degrees.length > 0) {
      const matchDegree = sch.eligibleDegrees.some((d) =>
        matchedCriteria.degrees!.some((cd) => d.toLowerCase().includes(cd.toLowerCase()))
      );
      if (!matchDegree) return false;
    }

    // Funding filter
    if (matchedCriteria.minFunding !== undefined) {
      if (sch.fundingAmount < matchedCriteria.minFunding) return false;
    }

    // Urgent deadline filter
    if (matchedCriteria.maxDaysLeft !== undefined) {
      if (sch.daysLeft > matchedCriteria.maxDaysLeft) return false;
    }

    // High readiness filter
    if (matchedCriteria.readyOnly) {
      if (sch.readinessScore < 80) return false;
    }

    // General keyword search fallback
    if (!matchedCriteria.minFunding && !matchedCriteria.degrees && !matchedCriteria.maxDaysLeft && !matchedCriteria.readyOnly) {
      const combined = `${sch.name} ${sch.provider} ${sch.description} ${sch.categoryTag} ${sch.eligibleDegrees.join(' ')}`.toLowerCase();
      const terms = cleanQuery.split(/\s+/).filter((t) => t.length > 2);
      const hasMatch = terms.some((term) => combined.includes(term));
      if (!hasMatch) return false;
    }

    return true;
  });

  return {
    scholarships: filtered,
    detectedIntent,
    matchedCriteria
  };
}
