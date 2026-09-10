import { StudentProfile, Scholarship, MatchResult, DimensionScore, StudentDocument } from '../types';

export interface MatchingWeights {
  academic: number;
  degree: number;
  financial: number;
  geographic: number;
  category: number;
}

export const DEFAULT_WEIGHTS: MatchingWeights = {
  academic: 0.25,
  degree: 0.25,
  financial: 0.20,
  geographic: 0.15,
  category: 0.15,
};

export function evaluateScholarshipMatch(
  student: StudentProfile,
  scholarship: Scholarship,
  documents: StudentDocument[] = [],
  weights: MatchingWeights = DEFAULT_WEIGHTS
): MatchResult {
  const criteria = scholarship.criteria;
  const disqualifiers: string[] = [];
  const whyYouQualify: string[] = [];
  const missingRequirements: string[] = [];

  // --- HARD DISQUALIFIER 1: Gender Requirement ---
  if (criteria.gender_requirement && criteria.gender_requirement !== 'All') {
    if (student.gender !== criteria.gender_requirement) {
      disqualifiers.push(
        `Gender eligibility requirement not satisfied (Requires: ${criteria.gender_requirement} applicants, student profile is ${student.gender})`
      );
    }
  }

  // --- HARD DISQUALIFIER 2: Degree Level (Undergrad vs Postgrad) ---
  if (criteria.degree_level && criteria.degree_level.length > 0) {
    const levelMatch = criteria.degree_level.some(lvl => 
      lvl.toLowerCase() === student.degree_level.toLowerCase() || lvl.toLowerCase() === 'all'
    );
    if (!levelMatch) {
      disqualifiers.push(
        `Academic degree level does not match (Requires: ${criteria.degree_level.join(', ')}, student is in ${student.degree_level})`
      );
    }
  }

  // --- HARD DISQUALIFIER 3: Strict Field / Degree Taxonomy ---
  const allowsAll = criteria.allowed_degrees.some(d => d.toLowerCase() === 'all');
  const degreeMatched = allowsAll || criteria.allowed_degrees.some(d => {
    const cleanD = d.toLowerCase();
    const cleanStudentDegree = student.degree.toLowerCase();
    return cleanStudentDegree.includes(cleanD) || cleanD.includes(cleanStudentDegree) ||
      (cleanStudentDegree.includes('commerce') && cleanD.includes('commerce'));
  });

  const isStemExclusive = criteria.allowed_degrees.some(d => 
    d.toLowerCase().includes('stem') || d.toLowerCase().includes('b.tech') || d.toLowerCase().includes('data science')
  );
  if (!degreeMatched && isStemExclusive) {
    disqualifiers.push(
      `Program discipline does not match (Scholarship is restricted to STEM / Technical disciplines; student is enrolled in ${student.degree})`
    );
  } else if (!degreeMatched) {
    disqualifiers.push(
      `Degree discipline not aligned with eligible courses (${criteria.allowed_degrees.join(', ')})`
    );
  }

  // --- HARD DISQUALIFIER 4: Geographic / State Domicile ---
  const stateAllowsAll = criteria.allowed_states.some(s => s.toLowerCase() === 'all-india' || s.toLowerCase() === 'all');
  const stateMatched = stateAllowsAll || criteria.allowed_states.some(s => s.toLowerCase() === student.state.toLowerCase());
  if (!stateMatched) {
    disqualifiers.push(
      `State domicile requirement not satisfied (Requires permanent domicile of ${criteria.allowed_states.join(', ')}; student domicile is ${student.domicile})`
    );
  }

  // --- Check Required Documents & Expiries ---
  const incomeDoc = documents.find(d => d.document_type.toLowerCase().includes('income'));
  const isIncomeCertExpired = incomeDoc?.is_expired || incomeDoc?.status === 'expired';

  criteria.required_documents.forEach(reqDoc => {
    const existing = documents.find(d => 
      d.document_type.toLowerCase().includes(reqDoc.toLowerCase()) || 
      reqDoc.toLowerCase().includes(d.document_type.toLowerCase())
    );
    if (!existing) {
      missingRequirements.push(`${reqDoc} not uploaded`);
    } else if (existing.is_expired || existing.status === 'expired') {
      missingRequirements.push(`${reqDoc} has expired and requires renewal`);
    }
  });

  // Calculate 5 Dimensions
  // 1. Academic Rigor Score
  let academicScore = 80;
  if (criteria.min_percentage) {
    const diff = student.percentage - criteria.min_percentage;
    if (diff >= 10) {
      academicScore = 95;
      whyYouQualify.push(`Your Class XII score (${student.percentage}%) exceeds the minimum threshold (${criteria.min_percentage}%) by ${diff.toFixed(1)} percentage points.`);
    } else if (diff >= 0) {
      academicScore = 85 + (diff / 10) * 10;
      whyYouQualify.push(`Your academic score of ${student.percentage}% comfortably meets the published minimum requirement of ${criteria.min_percentage}%.`);
    } else {
      academicScore = Math.max(30, 80 + diff * 3);
      disqualifiers.push(`Academic score (${student.percentage}%) is below minimum requirement (${criteria.min_percentage}%)`);
    }
  } else {
    academicScore = 90;
    whyYouQualify.push(`Academic credentials satisfy broad qualification standards.`);
  }

  // 2. Degree Alignment Score
  let degreeScore = 0;
  if (degreeMatched) {
    degreeScore = 100;
    whyYouQualify.push(`Degree in ${student.degree} directly satisfies the eligible discipline taxonomy.`);
  } else {
    degreeScore = 20;
  }

  // 3. Geographic Score
  let geographicScore = 0;
  if (stateMatched) {
    geographicScore = 100;
    whyYouQualify.push(`Domicile in ${student.domicile} aligns with eligibility area.`);
  } else {
    geographicScore = 0;
  }

  // 4. Financial Need Score
  let financialScore = 85;
  if (criteria.max_annual_income) {
    if (student.annual_income_inr <= criteria.max_annual_income) {
      const margin = criteria.max_annual_income - student.annual_income_inr;
      financialScore = 88;
      if (isIncomeCertExpired) {
        whyYouQualify.push(`Annual income of ₹${student.annual_income_inr.toLocaleString('en-IN')} appears to satisfy the published ceiling of ₹${criteria.max_annual_income.toLocaleString('en-IN')}, but income documentation still requires verification.`);
      } else {
        whyYouQualify.push(`Household income (₹${student.annual_income_inr.toLocaleString('en-IN')}) is within the permissible limit of ₹${criteria.max_annual_income.toLocaleString('en-IN')}.`);
      }
    } else {
      financialScore = 30;
      disqualifiers.push(`Household income (₹${student.annual_income_inr.toLocaleString('en-IN')}) exceeds maximum limit (₹${criteria.max_annual_income.toLocaleString('en-IN')})`);
    }
  } else {
    financialScore = 85;
    whyYouQualify.push(`Demonstrated financial need category applies.`);
  }

  // 5. Category / Demographic Score
  let categoryScore = 80;
  const categoryAllowsAll = criteria.allowed_categories.some(c => c.toLowerCase() === 'all');
  const categoryMatched = categoryAllowsAll || criteria.allowed_categories.some(c => 
    c.toLowerCase() === student.category.toLowerCase() || 
    (student.category.includes('EWS') && c.includes('EWS'))
  );
  if (categoryMatched) {
    categoryScore = 90;
    whyYouQualify.push(`Category affiliation (${student.category}) matches priority target group.`);
  } else {
    categoryScore = 40;
    disqualifiers.push(`Category (${student.category}) not listed in eligible target groups (${criteria.allowed_categories.join(', ')})`);
  }

  // Check overall eligibility
  const isEligible = disqualifiers.length === 0;

  // Compute Overall Weighted Score
  let overallScore = 0;
  if (isEligible) {
    overallScore = Math.round(
      academicScore * weights.academic +
      degreeScore * weights.degree +
      financialScore * weights.financial +
      geographicScore * weights.geographic +
      categoryScore * weights.category
    );
  } else {
    overallScore = Math.min(42, Math.round(
      (academicScore + degreeScore + financialScore) / 4
    ));
  }

  // Determine Status
  let status: MatchResult['status'] = 'Currently Ineligible';
  if (isEligible) {
    if (isIncomeCertExpired || missingRequirements.length > 0) {
      status = 'Needs Verification';
    } else if (overallScore >= 90) {
      status = 'Strong Match';
    } else if (overallScore >= 75) {
      status = 'Likely Eligible';
    } else {
      status = 'Missing Requirement';
    }
  }

  const dimensionScores: DimensionScore[] = [
    {
      name: 'Academic Rigor',
      key: 'academic',
      score: academicScore,
      weight: weights.academic,
      student_value: `${student.percentage}% (GPA ${student.GPA})`,
      requirement_value: criteria.min_percentage ? `>= ${criteria.min_percentage}%` : 'Standard qualification',
      status: academicScore >= 80 ? 'Meets requirement' : 'Not satisfied',
      explanation: `Student score of ${student.percentage}% vs required minimum of ${criteria.min_percentage || 75}%.`,
    },
    {
      name: 'Degree Alignment',
      key: 'degree',
      score: degreeScore,
      weight: weights.degree,
      student_value: student.degree,
      requirement_value: criteria.allowed_degrees.join(', '),
      status: degreeScore === 100 ? 'Meets requirement' : 'Not satisfied',
      explanation: degreeMatched ? `Discipline ${student.degree} is recognized.` : `Discipline mismatch.`,
    },
    {
      name: 'State Domicile',
      key: 'geographic',
      score: geographicScore,
      weight: weights.geographic,
      student_value: student.domicile,
      requirement_value: criteria.allowed_states.join(', '),
      status: stateMatched ? 'Meets requirement' : 'Not satisfied',
      explanation: stateMatched ? `State domicile (${student.domicile}) satisfies geographic requirements.` : `Outside target state jurisdiction.`,
    },
    {
      name: 'Financial Need',
      key: 'financial',
      score: financialScore,
      weight: weights.financial,
      student_value: `₹${student.annual_income_inr.toLocaleString('en-IN')} / yr`,
      requirement_value: criteria.max_annual_income ? `<= ₹${criteria.max_annual_income.toLocaleString('en-IN')}` : 'General need criteria',
      status: isIncomeCertExpired ? 'Verification required' : (financialScore >= 80 ? 'Meets requirement' : 'Not satisfied'),
      explanation: isIncomeCertExpired 
        ? 'Annual income satisfies ceiling, but latest income certificate is expired and requires Tahsildar renewal.'
        : `Verified family income below stated threshold.`,
    },
    {
      name: 'Cohort Category',
      key: 'category',
      score: categoryScore,
      weight: weights.category,
      student_value: student.category,
      requirement_value: criteria.allowed_categories.join(', '),
      status: categoryMatched ? 'Meets requirement' : 'Not satisfied',
      explanation: categoryMatched ? `Affiliated category satisfies cohort selection criteria.` : `Not in primary quota.`,
    },
  ];

  let summaryExplanation = '';
  if (isEligible) {
    summaryExplanation = `Your academic performance (${student.percentage}%) and degree (${student.degree}) meet the stated criteria. Your financial profile appears to satisfy the published income requirement (≤ ₹${criteria.max_annual_income ? criteria.max_annual_income.toLocaleString('en-IN') : '5,00,000'}), but income documentation still requires verification.`;
  } else {
    summaryExplanation = `Currently ineligible based on non-negotiable eligibility criteria: ${disqualifiers.join('; ')}.`;
  }

  return {
    student_id: student.user_id,
    scholarship_id: scholarship.id,
    overall_score: overallScore,
    status,
    is_eligible: isEligible,
    academic_score: academicScore,
    degree_score: degreeScore,
    geographic_score: geographicScore,
    financial_score: financialScore,
    category_score: categoryScore,
    dimension_scores: dimensionScores,
    why_you_qualify: whyYouQualify,
    missing_requirements: missingRequirements,
    disqualifiers,
    summary_explanation: summaryExplanation,
    generated_at: new Date().toISOString(),
  };
}
