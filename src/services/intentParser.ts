export interface ParsedSearchFilters {
  degree?: string;
  financialNeedOnly?: boolean;
  minFunding?: number;
  deadlineFilter?: 'this_week' | 'this_month' | 'all';
  categoryType?: string;
  state?: string;
  minMatchScore?: number;
  extractedTags: { label: string; key: string; value: string }[];
}

export function parseNaturalLanguageQuery(query: string): ParsedSearchFilters {
  const clean = query.trim().toLowerCase();
  const filters: ParsedSearchFilters = {
    extractedTags: [],
  };

  if (!clean) return filters;

  // 1. Degree detection
  if (clean.includes('b.com') || clean.includes('bcom') || clean.includes('commerce')) {
    filters.degree = 'B.Com';
    filters.extractedTags.push({ label: 'Discipline', key: 'degree', value: 'B.Com / Commerce' });
  } else if (clean.includes('bba') || clean.includes('management') || clean.includes('bms')) {
    filters.degree = 'BBA';
    filters.extractedTags.push({ label: 'Discipline', key: 'degree', value: 'BBA / Management' });
  } else if (clean.includes('stem') || clean.includes('engineering') || clean.includes('b.tech') || clean.includes('btech')) {
    filters.degree = 'STEM';
    filters.extractedTags.push({ label: 'Discipline', key: 'degree', value: 'STEM / Engineering' });
  } else if (clean.includes('b.sc') || clean.includes('bsc') || clean.includes('science')) {
    filters.degree = 'B.Sc';
    filters.extractedTags.push({ label: 'Discipline', key: 'degree', value: 'B.Sc' });
  } else if (clean.includes('arts') || clean.includes('ba')) {
    filters.degree = 'BA';
    filters.extractedTags.push({ label: 'Discipline', key: 'degree', value: 'BA / Arts' });
  }

  // 2. Financial Need / Low income
  if (
    clean.includes('financial need') || 
    clean.includes('need-based') || 
    clean.includes('low income') || 
    clean.includes('ews') ||
    clean.includes('economically')
  ) {
    filters.financialNeedOnly = true;
    filters.extractedTags.push({ label: 'Criteria', key: 'financialNeedOnly', value: 'Financial Need Required' });
  }

  // 3. Deadline intent
  if (clean.includes('this week') || clean.includes('closing soon') || clean.includes('urgent') || clean.includes('48 hours')) {
    filters.deadlineFilter = 'this_week';
    filters.extractedTags.push({ label: 'Deadline', key: 'deadlineFilter', value: 'Closing this week (< 7 days)' });
  } else if (clean.includes('this month') || clean.includes('closing this month') || clean.includes('october') || clean.includes('september')) {
    filters.deadlineFilter = 'this_month';
    filters.extractedTags.push({ label: 'Deadline', key: 'deadlineFilter', value: 'Closing this month (<= 30 days)' });
  }

  // 4. Funding amount
  if (clean.includes('1 lakh') || clean.includes('1,00,000') || clean.includes('100000') || clean.includes('high funding')) {
    filters.minFunding = 100000;
    filters.extractedTags.push({ label: 'Min Funding', key: 'minFunding', value: '≥ ₹1,00,000' });
  } else if (clean.includes('50,000') || clean.includes('50000') || clean.includes('50k')) {
    filters.minFunding = 50000;
    filters.extractedTags.push({ label: 'Min Funding', key: 'minFunding', value: '≥ ₹50,000' });
  } else if (clean.includes('25,000') || clean.includes('25000') || clean.includes('25k')) {
    filters.minFunding = 25000;
    filters.extractedTags.push({ label: 'Min Funding', key: 'minFunding', value: '≥ ₹25,000' });
  }

  // 5. Match Score
  if (clean.includes('90%') || clean.includes('strong match') || clean.includes('top match')) {
    filters.minMatchScore = 90;
    filters.extractedTags.push({ label: 'Match Score', key: 'minMatchScore', value: '90%+ Match' });
  } else if (clean.includes('80%') || clean.includes('likely eligible')) {
    filters.minMatchScore = 80;
    filters.extractedTags.push({ label: 'Match Score', key: 'minMatchScore', value: '80%+ Match' });
  }

  // 6. Geography
  if (clean.includes('maharashtra') || clean.includes('mumbai')) {
    filters.state = 'Maharashtra';
    filters.extractedTags.push({ label: 'State', key: 'state', value: 'Maharashtra' });
  } else if (clean.includes('karnataka')) {
    filters.state = 'Karnataka';
    filters.extractedTags.push({ label: 'State', key: 'state', value: 'Karnataka' });
  }

  // 7. Category Type
  if (clean.includes('merit') && !clean.includes('need')) {
    filters.categoryType = 'Merit';
    filters.extractedTags.push({ label: 'Scheme Type', key: 'categoryType', value: 'Merit-Based' });
  } else if (clean.includes('government') || clean.includes('govt') || clean.includes('state')) {
    filters.categoryType = 'Government';
    filters.extractedTags.push({ label: 'Scheme Type', key: 'categoryType', value: 'Government Scheme' });
  }

  return filters;
}
