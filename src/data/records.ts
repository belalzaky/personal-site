// Everything on the all-projects page: data projects, apps, roles, Year 2 coursework,
// the Instagram page, and five ideas that are not built (the hollow dots). Data projects
// take their year from their own page. Coursework shows a title and a status only: no marks,
// dates or names (18 Nov content plan).

export type Kind = 'data' | 'build' | 'role' | 'coursework' | 'page' | 'idea';
export interface Rec { no: string; name: string; what: string; out: string; kind: Kind; year?: number; slug?: string; href?: string; areas: string[] }

export const areaHub: Record<string, string> = {
  'pharmacology': 'Health', 'lifting': 'Health', 'year 2 coursework': 'Health',
  'drug-safety data': 'Tech', 'clinical records': 'Tech', 'language models': 'Tech',
  'building': 'Build',
  'people': 'Lifestyle', 'photography': 'Lifestyle',
};

export const kinds: [Kind, string][] = [
  ['data', 'data projects'], ['build', 'builds'], ['role', 'roles'], ['coursework', 'year 2 coursework'], ['page', 'pages'], ['idea', 'ideas, not built yet'],
];

export const records: Rec[] = [
  { no: '09', name: 'PV Intake Assistant', what: 'triage, extraction, coding', out: 'cli + repo', kind: 'data', slug: 'pv-intake', areas: ['drug-safety data', 'language models'] },
  { no: '08', name: 'RWE Causal Safety', what: 'propensity scores, sccs', out: 'causal estimate', kind: 'data', slug: 'rwe-causal', areas: ['drug-safety data', 'pharmacology'] },
  { no: '07', name: 'ADR Reader', what: 'nlp, 4 models', out: 'benchmark', kind: 'data', slug: 'adr-reader', areas: ['drug-safety data', 'language models'] },
  { no: '06', name: 'EHR Survival Analysis', what: 'r, kaplan-meier, cox', out: 'survival curves', kind: 'data', slug: 'ehr-survival-r', areas: ['clinical records'] },
  { no: '05', name: 'EHR Risk Model', what: 'logistic regression, forest', out: 'risk model', kind: 'data', slug: 'ehr-ml', areas: ['clinical records'] },
  { no: '04', name: 'FAERS Signal Detection', what: 'prr, ror', out: 'signal table', kind: 'data', slug: 'faers-signal', areas: ['drug-safety data', 'pharmacology'] },
  { no: '03', name: 'Synthea EHR', what: 'sqlite, joins', out: 'cohort tables', kind: 'data', slug: 'synthea-ehr', areas: ['clinical records'] },
  { no: '02', name: 'FAERS in SQL', what: 'sqlite, sql', out: 'queries', kind: 'data', slug: 'faers-sql', areas: ['drug-safety data'] },
  { no: '01', name: 'FAERS Explorer', what: 'streamlit, openfda', out: 'dashboard', kind: 'data', slug: 'faers-explorer', areas: ['drug-safety data'] },
  { no: 'b2', name: 'Notch', what: 'swift, macos', out: 'notch app', kind: 'build', year: 2026, href: '/builds#notch', areas: ['building'] },
  { no: 'b1', name: 'Mission Control', what: 'electron, node', out: 'desktop app', kind: 'build', year: 2026, href: '/builds#mission-control', areas: ['building'] },
  { no: 'b3', name: 'Feedback tool', what: 'for the cohort, as course rep', out: 'in progress', kind: 'build', year: 2026, areas: ['building', 'people'] },
  { no: 'r4', name: 'Student Ambassador', what: 'brand and marketing, faculty subject', out: 'king’s', kind: 'role', year: 2026, areas: ['people'] },
  { no: 'r3', name: 'King’s Sport', what: 'front of house, since 5 oct', out: 'new malden', kind: 'role', year: 2026, areas: ['lifting', 'people'] },
  { no: 'r2', name: 'Course rep', what: 'pharmacology, year 2', out: 'king’s', kind: 'role', year: 2026, areas: ['people', 'year 2 coursework'] },
  { no: 'r1', name: 'LIFTKCL', what: 'founder, beginner-friendly gym society', out: 'launches feb 2027', kind: 'role', year: 2026, areas: ['lifting', 'people'] },
  { no: 'c6', name: 'Epidemiology poster', what: 'group poster on a paper', out: 'upcoming', kind: 'coursework', year: 2027, areas: ['year 2 coursework'] },
  { no: 'c5', name: 'Drug CV', what: 'a known drug, from the literature', out: 'upcoming', kind: 'coursework', year: 2027, areas: ['year 2 coursework', 'pharmacology'] },
  { no: 'c4', name: 'Statins debate', what: 'for statins in the over-40s', out: 'in progress', kind: 'coursework', year: 2026, areas: ['year 2 coursework', 'pharmacology'] },
  { no: 'c3', name: 'Lay article', what: 'science for a non-scientist, 500 words', out: 'done', kind: 'coursework', year: 2026, areas: ['year 2 coursework'] },
  { no: 'c2', name: 'Vas deferens mini-project', what: 'lab project, oral and manuscript', out: 'in progress', kind: 'coursework', year: 2026, areas: ['year 2 coursework', 'pharmacology'] },
  { no: 'c1', name: 'Blood-glucose practical', what: 'oral glucose tolerance test', out: 'in progress', kind: 'coursework', year: 2026, areas: ['year 2 coursework', 'pharmacology'] },
  { no: 'p1', name: '@belalzakyuk', what: 'photos, a recap each sunday', out: 'instagram', kind: 'page', year: 2026, href: 'https://instagram.com/belalzakyuk', areas: ['photography'] },
  { no: 'i1', name: 'Dose–response fitter', what: 'paste lab readings, get a fitted curve and EC50', out: 'idea', kind: 'idea', areas: ['pharmacology', 'building'] },
  { no: 'i2', name: 'Statins, in numbers', what: 'the debate evidence as one page anyone can read', out: 'idea', kind: 'idea', areas: ['pharmacology', 'year 2 coursework'] },
  { no: 'i3', name: 'Training log as charts', what: 'my own lifting data, charted', out: 'idea', kind: 'idea', areas: ['lifting', 'building'] },
  { no: 'i4', name: 'Boxed-warning reader', what: 'drug label warnings in plain English', out: 'idea', kind: 'idea', areas: ['drug-safety data', 'language models'] },
  { no: 'i5', name: 'LIFTKCL first month', what: 'a four-week plan for new members', out: 'idea', kind: 'idea', areas: ['lifting', 'people'] },
];
