// Case framing for every project card — the single source of truth for both the homepage
// featured band and /projects. Keyed by project slug so the two can never drift.
//
// THREE LAYERS, IN READING ORDER. The point is that a reader who stops at any layer still
// leaves impressed, and that no layer contradicts a deeper one:
//
//   stake    — plain English, no jargon, no unexplained numbers. Must contain a surprise.
//              This is the only line a 30-second visitor is guaranteed to read.
//   finding  — the number, now that it has a frame to land in.
//   method   — the named techniques, compressed. Rendered in a secondary treatment: a
//              specialist scans it to check the work is real, a non-specialist's eye passes over.
//
// Rule when editing: the stake must be true at the same standard as the method. Simplifying
// the language is allowed; simplifying the claim is not.

export interface ProjectCase {
  stake: string;
  finding: string;
  method: string;
}

export const projectCases: Record<string, ProjectCase> = {
  'rwe-causal': {
    stake:
      'On simulated data with the answer sealed in advance, anti-inflammatory painkillers looked barely riskier for your kidneys than paracetamol when they were actually twice as risky.',
    finding:
      'Doctors were already steering the frailest patients away from them, which made the drug look safer than it was. Two independent methods recovered the real answer — 2.05 and 2.14, against a true value of 2.20 I had sealed before starting. The obvious comparison missed 46% of a real harm.',
    method:
      'New-user active-comparator design · propensity-score matching with covariate balance · self-controlled case series as an independent check · bootstrap intervals · negative-control outcome.',
  },

  'pv-intake': {
    stake:
      'A change to my own system raised its coverage from 52% to 80%, and I threw it away.',
    finding:
      'Reading the output showed why: it had coded a skin lesion as “Feeling tense” and a nerve toxicity as “Poisoning”, matching on one incidental shared word. I reverted to 54% — every code left standing is one I would defend in a review.',
    method:
      'Three stages — triage (F1 0.79, recall 0.86), drug and effect extraction, then mapping to SNOMED CT across 461,000 terms. 32 unit tests, CI, Docker.',
  },

  'adr-reader': {
    stake:
      'Four systems read the same medical notes looking for drug side effects, and the most advanced one finished last.',
    finding:
      'A specialist medical model won (F1 0.83). A plain keyword matcher (0.79) beat a general-purpose AI model (0.73), and a general LLM given no training on the task came last (0.71) — while inventing details that were not in the text.',
    method:
      'One held-out test set across TF-IDF, MiniLM embeddings, PubMedBERT and a zero-shot LLM; hallucination rate measured rather than assumed.',
  },

  'faers-explorer': {
    stake:
      'Reports of harm for one heartburn drug exploded in 2020, and the spike followed a wave of lawsuits rather than any new evidence of harm.',
    finding:
      'The spike tracked a wave of litigation after the 2019 recall, which is when I understood that report counts measure how much attention a drug is getting rather than how dangerous it is.',
    method:
      'Live dashboard over the FDA adverse-event database via the openFDA API — per-drug reactions, reports per year, and reporter demographics, with the caveat built into the interface rather than the footnotes.',
  },

  'faers-signal': {
    stake:
      'I built a detector to tell a real drug safety signal from a coincidence in twenty million reports, and checked it on a link that has been known for decades.',
    finding:
      'Tested against warfarin and bleeding — a link established for decades — the detector returned the expected strength. Run against pairs with no known link, it stayed quiet.',
    method:
      'Proportional reporting ratio, reporting odds ratio, chi-squared and Evans criteria across the full FAERS database (warfarin–haemorrhage PRR ≈ 5), stress-tested across seriousness filters and years, with negative controls.',
  },

  'ehr-survival-r': {
    stake:
      'One risk factor looked like it did nothing at all, but its effect was changing over time and the model had averaged that away.',
    finding:
      'Age came back flat and statistically null. Testing the model’s core assumption showed why: its effect drifts across the follow-up period, and averaging it into a single number had erased it. Diabetes carried roughly 2.4× the hazard on its own.',
    method:
      'Kaplan–Meier curves with a log-rank test, Cox proportional hazards adjusted for age, sex, diabetes and obesity, and a formal check of the proportional-hazards assumption.',
  },

  'ehr-ml': {
    stake:
      'A model that flags every patient as high risk catches every case, which also makes it useless.',
    finding:
      'The model scored 0.91 AUC, but the number that mattered was where you set the threshold — what it costs to miss a case, weighed against what it costs to raise a false alarm.',
    method:
      'Logistic regression and random forest on features derived from synthetic patient records, with deliberate control of temporal data leakage.',
  },

  'faers-sql': {
    stake:
      'I asked the same database the same question three times, collecting the rows a different way each time, and got three different answers about whether reports are rising.',
    finding:
      'One sampling method flattened a real decade-long doubling in reports to a straight line. Another crammed almost everything into a single year. Only counting every report, uncapped, showed what was actually happening.',
    method:
      '~3,000 openFDA reports loaded into SQLite, one row per drug–reaction pair, queried with GROUP BY, WHERE and COUNT(DISTINCT).',
  },

  'synthea-ehr': {
    stake:
      'I pulled every patient with high blood pressure and asked what they were being treated with, and the top answer was a painkiller.',
    finding:
      'Paracetamol outranked every actual blood-pressure drug. The real antihypertensives sat further down the list, behind ordinary background medication.',
    method:
      'Synthetic patient records in SQLite; JOINs across patients, conditions, medications and encounters, with cohorts defined by subquery.',
  },
};
