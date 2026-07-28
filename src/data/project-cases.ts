// Case-study framing (Problem → What I found) for the §2 project cards.
// Keyed by project slug so both the home section and /projects stay in sync.
export interface ProjectCase {
  problem: string;
  found: string;
}

export const projectCases: Record<string, ProjectCase> = {
  'faers-explorer': {
    problem: 'Do rising adverse-event reports mean a drug got more dangerous?',
    found: "Zantac's 2020–21 spike was litigation, not harm — attention ≠ risk.",
  },
  'faers-sql': {
    problem: 'Same query, different sampling — does the answer hold?',
    found: 'How you collect the data decides the story; only the uncapped full data tells the truth.',
  },
  'synthea-ehr': {
    problem: 'What is a group of patients actually prescribed?',
    found: 'Define a cohort, read its treatment — but the top drug is often a common background med, not the therapy.',
  },
  'faers-signal': {
    problem: 'Is a spike a real safety signal, or noise?',
    found: 'A disproportionality detector over 20M reports — validated on warfarin–haemorrhage (PRR 5.0); negative controls caught the confounders.',
  },
  'ehr-ml': {
    problem: 'Predict hypertension from records — and should you trust the model?',
    found: '0.91 AUC, but the real story was the precision/recall threshold, not the accuracy.',
  },
  'ehr-survival-r': {
    problem: 'How long until hypertension, and what changes that?',
    found: 'Diabetics ~2.4× faster; the "null" age effect was actually time-varying.',
  },
  'adr-reader': {
    problem: 'Which model actually catches a dangerous drug side effect buried in a note?',
    found: 'A domain-tuned model won; a plain keyword model beat a general-purpose transformer; a zero-shot LLM over-flagged and hallucinated details.',
  },
  'pv-intake': {
    problem: 'Can you triage, extract, and code a drug side effect from an abstract — end to end?',
    found: 'A three-stage pipeline (triage F1 0.79 → extract → SNOMED code), tested + containerised; a fuzzy "coverage mirage" taught precision over coverage.',
  },
  'rwe-causal': {
    problem: 'Does an NSAID actually cause kidney injury — or does it just look that way?',
    found: 'Crude OR 1.19 hid the harm; propensity matching (2.05) and a self-controlled series (2.14) both recovered the sealed true 2.20.',
  },
};
