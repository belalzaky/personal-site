// Per-project display data for the v2 Work list and case pages: the short name, the big
// number and the tools line, as on the V2-Projects board. The order is not set here: both
// pages sort the collection newest first, the order /projects has always used.
//
// Big numbers and their sources (build brief v4):
//   rwe-causal "46%"           project-cases (finding: "missed 46% of a real harm")
//   pv-intake "80→54%"         project-cases (stake + finding)
//   adr-reader "0.83 vs 0.71"  project-cases (finding)
//   faers-explorer "20M+"      /cv and the old About timeline ("20M+ adverse-event reports")
//   faers-signal "PRR ≈ 5"     project-cases (method) and /cv
//   ehr-survival-r "HR 2.4"    project-cases (finding: "roughly 2.4× the hazard")
//   faers-sql "3 answers"      project-cases (stake: "three different answers")
//   ehr-ml, synthea-ehr        none

export interface Stat {
  value: string;
  label: string;
  /** Accent only on a crude or wrong figure. */
  wrong?: boolean;
}

export interface ProjectDisplay {
  name: string;
  big?: string;
  tools: string;
  /** Case-page stat tiles, only where the repo has the numbers. */
  stats?: Stat[];
}

export const projectDisplay: Record<string, ProjectDisplay> = {
  'rwe-causal':     { name: 'Causal safety',          big: '46%',          tools: 'Python · Causal inference · SCCS',
    // rwe-causal.md result line; labels from the V2-Case board
    stats: [
      { value: '1.19', label: 'Crude odds ratio', wrong: true },
      { value: '2.05', label: 'Propensity-score matched' },
      { value: '2.14', label: 'Self-controlled case series' },
      { value: '2.20', label: 'True effect, sealed in advance' },
    ] },
  'pv-intake':      { name: 'PV Intake Assistant',    big: '80→54%',       tools: 'Python · NLP · SNOMED CT · Docker',
    // project-cases stake/finding/method and pv-intake.md result line
    stats: [
      { value: '80%', label: 'Coverage of the change I threw away', wrong: true },
      { value: '54%', label: 'SNOMED coding, kept' },
      { value: '0.79', label: 'Triage F1' },
      { value: '0.86', label: 'Triage recall' },
    ] },
  'adr-reader':     { name: 'ADR Reader',             big: '0.83 vs 0.71', tools: 'Python · NLP · PubMedBERT',
    // project-cases finding (F1 on one held-out test set)
    stats: [
      { value: '0.83', label: 'Specialist medical model' },
      { value: '0.79', label: 'Plain keyword matcher' },
      { value: '0.73', label: 'General-purpose AI model' },
      { value: '0.71', label: 'General LLM, no training on the task' },
    ] },
  'faers-explorer': { name: 'FAERS Explorer',         big: '20M+',         tools: 'Python · openFDA · Streamlit' },
  'faers-signal':   { name: 'FAERS Signal Detection', big: 'PRR ≈ 5',      tools: 'Python · Disproportionality' },
  'ehr-survival-r': { name: 'EHR Survival Analysis',  big: 'HR 2.4',       tools: 'R · Cox regression' },
  'ehr-ml':         { name: 'EHR ML Risk Model',                           tools: 'Python · scikit-learn' },
  'faers-sql':      { name: 'FAERS in SQL',           big: '3 answers',    tools: 'SQL · Python' },
  'synthea-ehr':    { name: 'Synthea EHR',                                 tools: 'Python · SQL · Synthea' },
};
