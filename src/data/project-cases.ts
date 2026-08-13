// Case framing for every project card — the single source of truth for both the homepage
// featured band and /projects. Keyed by project slug so the two can never drift.
//
// FOUR LAYERS, IN READING ORDER. The point is that a reader who stops at any layer still
// leaves impressed, and that no layer contradicts a deeper one:
//
//   stake    — plain English, no jargon, no unexplained numbers. Must contain a surprise.
//              This is the only line a 30-second visitor is guaranteed to read.
//   finding  — the number, now that it has a frame to land in.
//   method   — the named techniques, compressed. Rendered in a secondary treatment: a
//              specialist scans it to check the work is real, a non-specialist's eye passes over.
//   decision — therefore what. The line that turns a result into a judgement. This is the
//              layer that separates a research student from a consulting candidate.
//
// Rule when editing: the stake must be true at the same standard as the method. Simplifying
// the language is allowed; simplifying the claim is not.

export interface ProjectCase {
  stake: string;
  finding: string;
  method: string;
  decision: string;
}

export const projectCases: Record<string, ProjectCase> = {
  'rwe-causal': {
    stake:
      'Anti-inflammatory painkillers looked barely riskier for your kidneys than paracetamol. They were twice as risky.',
    finding:
      'Doctors were already steering the frailest patients away from them, which made the drug look safer than it was. Two independent methods recovered the real answer — 2.05 and 2.14, against a true value of 2.20 I had sealed before starting. The obvious comparison missed 46% of a real harm.',
    method:
      'New-user active-comparator design · propensity-score matching with covariate balance · self-controlled case series as an independent check · bootstrap intervals · negative-control outcome.',
    decision:
      'When treatment is not randomly assigned, the gap between the crude number and the truth is not noise you can average away with more data. It is structural, it has a direction, and it usually flatters the drug.',
  },

  'pv-intake': {
    stake:
      'A change to my own system raised its coverage from 52% to 80%. I threw it away.',
    finding:
      'Reading the output showed why: it had coded a skin lesion as “Feeling tense” and a nerve toxicity as “Poisoning”, matching on one incidental shared word. I reverted to 54% — every code left standing is one I would defend in a review.',
    method:
      'Three stages — triage (F1 0.79, recall 0.86), drug and effect extraction, then mapping to SNOMED CT across 461,000 terms. 32 unit tests, CI, Docker.',
    decision:
      'A wrong code and a missing code are not the same error. A gap gets caught by a human; a wrong one enters the database looking exactly like evidence. Any metric that scores them equally will recommend the wrong system.',
  },

  'adr-reader': {
    stake:
      'Four systems read the same medical notes looking for drug side effects. The most advanced one finished last.',
    finding:
      'A specialist medical model won (F1 0.83). A plain keyword matcher (0.79) beat a general-purpose AI model (0.73), and a general LLM given no training on the task came last (0.71) — while inventing details that were not in the text.',
    method:
      'One held-out test set across TF-IDF, MiniLM embeddings, PubMedBERT and a zero-shot LLM; hallucination rate measured rather than assumed.',
    decision:
      'Buying the newest model is not a strategy. Fit to the domain and the task beat sophistication here, and the only way to know that in advance is to measure it on your own data before committing to it.',
  },

  'faers-explorer': {
    stake:
      'Reports of harm for one heartburn drug exploded in 2020. Nothing about the drug had changed.',
    finding:
      'The spike tracked a wave of litigation, not new clinical harm. Report counts measure how much attention a drug is getting, not how dangerous it is.',
    method:
      'Live dashboard over the FDA adverse-event database via the openFDA API — per-drug reactions, reports per year, and reporter demographics, with the caveat built into the interface rather than the footnotes.',
    decision:
      'If you are valuing a drug, pricing litigation exposure, or reading a safety headline, a rise in reports is not evidence of a rise in harm. Treating the two as the same thing is how a molecule gets mispriced.',
  },

  'faers-signal': {
    stake:
      'How do you tell a real drug safety signal from a coincidence, in a database of twenty million reports?',
    finding:
      'Tested against warfarin and bleeding — a link established for decades — the detector returned the expected strength. Run against pairs with no known link, it stayed quiet.',
    method:
      'Proportional reporting ratio, reporting odds ratio, chi-squared and Evans criteria across the full FAERS database (warfarin–haemorrhage PRR ≈ 5), stress-tested across seriousness filters and years, with negative controls.',
    decision:
      'A detector nobody has tried to break is not evidence. Ask any screening method what it does on a case where the answer is already known — and on one where the answer should be nothing at all.',
  },

  'ehr-survival-r': {
    stake:
      'One risk factor looked like it did nothing at all. It was doing plenty — just not at a constant rate.',
    finding:
      'Age came back flat and statistically null. Testing the model’s core assumption showed why: its effect drifts across the follow-up period, and averaging it into a single number had erased it. Diabetes carried roughly 2.4× the hazard on its own.',
    method:
      'Kaplan–Meier curves with a log-rank test, Cox proportional hazards adjusted for age, sex, diabetes and obesity, and a formal check of the proportional-hazards assumption.',
    decision:
      'A non-significant result is not a finding of no effect until you have checked the assumption that produced it. Most of the cost of a wrong answer here is that it looks exactly like a right one.',
  },

  'ehr-ml': {
    stake:
      'A model that flags every patient as high risk catches every case. It is also useless.',
    finding:
      'The model scored 0.91 AUC, but the number that mattered was where you set the threshold — what it costs to miss a case, weighed against what it costs to raise a false alarm.',
    method:
      'Logistic regression and random forest on features derived from synthetic patient records, with deliberate control of temporal data leakage.',
    decision:
      'Headline accuracy is a marketing number. The operating point is the business decision, and it belongs to whoever carries the cost of each kind of error — not to the person who built the model.',
  },

  'faers-sql': {
    stake:
      'The same database, the same question, three ways of collecting the rows — and three different answers about whether drug harm is rising.',
    finding:
      'One sampling method flattened a real decade-long doubling in reports to a straight line. Another crammed almost everything into a single year. Only counting every report, uncapped, showed what was actually happening.',
    method:
      '~3,000 openFDA reports loaded into SQLite, one row per drug–reaction pair, queried with GROUP BY, WHERE and COUNT(DISTINCT).',
    decision:
      'Before trusting a trend, ask how the rows were chosen. A defensible number and a convenient number are often produced by the same query and a different sample — and the query is never the hard part.',
  },

  'synthea-ehr': {
    stake:
      'I pulled every patient with high blood pressure and asked what they were being treated with. The top answer was a painkiller.',
    finding:
      'Paracetamol outranked every actual blood-pressure drug. The real antihypertensives sat further down the list, behind ordinary background medication.',
    method:
      'Synthetic patient records in SQLite; JOINs across patients, conditions, medications and encounters, with cohorts defined by subquery.',
    decision:
      'You cannot read a treatment pattern off a ranked list without knowing which drug class is clinically relevant. Domain knowledge is not decoration on top of the analysis — without it, the analysis returns a confident wrong answer.',
  },
};
