import { StudentProfile, Scholarship, Application, StudentDocument, MatchResult } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionLinks?: { label: string; url: string; actionType?: string }[];
  highlightItems?: string[];
}

export function generateAdvisorResponse(
  query: string,
  student: StudentProfile,
  scholarships: Scholarship[],
  applications: Application[],
  documents: StudentDocument[],
  matches: Map<string, MatchResult>
): ChatMessage {
  const clean = query.toLowerCase().trim();
  const id = `msg_${Date.now()}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. "Which scholarships should I prioritize?"
  if (clean.includes('prioritize') || clean.includes('priority') || clean.includes('recommend')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      content: `### 🎯 ScholarAI Priority Recommendation for ${student.name}

Based on multi-dimensional eligibility and deadline proximity:

1. **Tata Trusts Individual Grants for Undergraduate Studies (₹1,00,000 / year)**
   - **Urgency**: 🔴 Critical — Closes in less than 48 hours.
   - **Readiness**: 95% complete in your 'Ready to Apply' queue.
   - **Match Score**: 96% Strong Match (Your 86.4% exceeds the 75% cutoff).
   - **Action Needed**: Upload the updated Tahsildar Income Certificate renewal receipt before final submission.

2. **Central Sector Scheme of Scholarship (PM-USP CSSS) (₹20,000 / year)**
   - **Urgency**: 🟡 Closes in 6 days on National Scholarship Portal (NSP).
   - **Match Score**: 98% Strong Match. Full Commerce honors alignment and >80th percentile.

3. **Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (MahaDBT) (₹48,000 / year)**
   - **Status**: Already submitted! Under college nodal scrutiny.`,
      actionLinks: [
        { label: 'View Application Pipeline', url: '/applications' },
        { label: 'Inspect Tata Trusts Grant Details', url: '/scholarships/sch_tata_merit_endowment' },
      ],
    };
  }

  // 2. "Why am I not eligible for this scholarship?" / L'Oréal / STEM
  if (clean.includes('not eligible') || clean.includes('ineligible') || clean.includes('loreal') || clean.includes('stem')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      content: `### 🔍 Transparent Exclusion Breakdown

ScholarAI uses explicit, non-black-box exclusion logic. When you are flagged as ineligible for opportunities like the **L'Oréal India For Young Women in Science Scholarship (FYWIS)**, the decision is governed by hard disqualifiers:

1. **Gender Eligibility Constraint**:
   - **Requirement**: Restricted exclusively to female applicants.
   - **Your Profile**: Registered as Male.

2. **Discipline Taxonomy Constraint**:
   - **Requirement**: Mandatory enrollment in Pure Science, B.Tech, or MBBS programs.
   - **Your Profile**: Enrolled in Commerce (${student.degree}).

**Need a human review?** If your course includes accredited STEM coursework or minor programs, you can submit an appeal through the **Request Manual Review** button for admin consideration.`,
      actionLinks: [
        { label: 'Request Manual Review', url: '/discover?tab=ineligible', actionType: 'manual_review' },
      ],
    };
  }

  // 3. "What documents am I missing?" / Document questions
  if (clean.includes('document') || clean.includes('missing') || clean.includes('certificate') || clean.includes('expired')) {
    const expiredDocs = documents.filter(d => d.is_expired || d.status === 'expired');
    const pendingDocs = documents.filter(d => d.status === 'pending_verification');

    return {
      id,
      sender: 'assistant',
      timestamp,
      content: `### 📑 Document Audit Summary (${documents.filter(d => d.status === 'verified').length}/${documents.length} Verified)

Here is your current documentation readiness status:

- ⚠️ **CRITICAL ACTION REQUIRED: Income Certificate**
  - **Status**: Expired on 31-March-2026 (Valid for FY 2024-25 only).
  - **Impact**: It is blocking 3 verified high-value applications (Tata Merit, National Commerce, and Aditya Birla).
  - **Remedy**: Obtain the FY 2025-26 renewal receipt from the Tahsildar / Sub-Divisional Magistrate office.

- ⏳ **PENDING VERIFICATION: Bank Account / DBT Information**
  - **Account**: State Bank of India
  - **Status**: Aadhaar-seeded NPCI mapper confirmation in progress.

- ✅ **READY & VERIFIED**:
  - Class XII Board Marksheet (86.4%)
  - St. Xavier's Academic Bonafide Letter
  - UIDAI Masked Aadhaar Identity`,
      actionLinks: [
        { label: 'Update Documents in Profile', url: '/profile' },
      ],
    };
  }

  // 4. "Show scholarships closing this week." / Deadlines
  if (clean.includes('closing this week') || clean.includes('closing soon') || clean.includes('this week') || clean.includes('deadline')) {
    const closingWeek = scholarships.filter(s => s.days_remaining <= 7);
    const list = closingWeek
      .map(s => `- **${s.title}**: ${s.funding_formatted} | Deadline: **${s.days_remaining <= 2 ? 'Under 48 hours remaining' : `${s.days_remaining} days left`}**`)
      .join('\n');

    return {
      id,
      sender: 'assistant',
      timestamp,
      content: `### ⏳ Opportunities Closing Within 7 Days

We found ${closingWeek.length} urgent opportunities closing soon:

${list}

*Recommendation: Submit the Tata Trusts Individual Grants first as it is closest to deadline and your application checklist is 95% complete.*`,
      actionLinks: [
        { label: 'Open Deadline Calendar', url: '/calendar' },
        { label: 'Open Application Pipeline', url: '/applications' },
      ],
    };
  }

  // 5. "Find scholarships with high funding." / Funding
  if (clean.includes('high funding') || clean.includes('1 lakh') || clean.includes('maximum funding') || clean.includes('amount')) {
    const highFunding = scholarships
      .filter(s => s.funding_amount >= 75000)
      .sort((a, b) => b.funding_amount - a.funding_amount);

    const items = highFunding
      .map(s => `- **${s.title}** (${s.funding_formatted}) — Provider: ${s.provider} | Deadline in ${s.days_remaining} days`)
      .join('\n');

    return {
      id,
      sender: 'assistant',
      timestamp,
      content: `### 💰 Top High-Value Funding Opportunities for ${student.degree}

Here are the highest award grants you qualify for:

${items}

*Note: All funding figures represent potential opportunity values and are disbursed via Direct Benefit Transfer (DBT) subject to final selection and document verification.*`,
      actionLinks: [
        { label: 'Explore High Funding Grants', url: '/discover?minFunding=75000' },
      ],
    };
  }

  // 6. "What can I improve in my profile?" / Profile strength
  if (clean.includes('improve') || clean.includes('profile strength') || clean.includes('strength') || clean.includes('score')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      content: `### 📈 Profile Strength Assessment (Current: ${student.profile_strength_score}%)

To elevate your profile strength to **95%+** and unlock higher automated match confidence:

1. **Update Income Certificate (+5% boost)**
   - Upload the fresh FY 2025-26 certificate or official renewal application acknowledgment.
2. **Complete DBT Bank Account NPCI Verification (+4% boost)**
   - Submit the verified bank passbook showing active Aadhaar linkage for Direct Benefit Transfer.
3. **Add Standardized Skill Badges (+3% boost)**
   - Add your certifications (e.g. Tally ERP, Financial Modeling, NISM) to improve scoring in corporate CSR opportunities.`,
      actionLinks: [
        { label: 'Optimize Profile Now', url: '/profile' },
      ],
    };
  }

  // Default fallback grounded in data
  return {
    id,
    sender: 'assistant',
    timestamp,
    content: `I analyzed your inquiry against verified scholarship criteria for **${student.name}** (${student.degree}, ${student.institution}, GPA ${student.GPA}, ${student.category}).

Currently, you have **28 qualified opportunities** representing **₹4,85,000** in potential annual funding. 

I can help you with:
- Evaluating why you match specific schemes
- Explaining document blockers and renewal steps
- Listing urgent deadlines for this week
- Formulating an application priority strategy

If you need details about a scheme not in our verified registry, please note: *I don't have enough verified information to determine that without official source confirmation.*`,
    actionLinks: [
      { label: 'Explore All Matches', url: '/discover' },
      { label: 'View Pipeline', url: '/applications' },
    ],
  };
}
