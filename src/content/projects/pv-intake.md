---
title: "PV Intake Assistant"
summary: "The front half of a real pharmacovigilance workflow, end to end: read a medical abstract, decide whether it reports a possible adverse drug event, pull out the drug and the effect, and map that effect to a standard SNOMED CT code — a triaged, coded worksheet a safety team could review."
tags: ["Python", "NLP", "SNOMED CT", "Docker", "CI"]
date: 2026-07-28
featured: true
github: "https://github.com/belalzaky/pv-intake"
result: "Triage F1 0.79 · SNOMED coding 0.54 — precision over coverage."
---

## What I did

Pharmacovigilance intake — reading the literature, spotting possible drug harms, and coding them into a standard vocabulary — is slow, manual, and high-stakes. I built the front half of that workflow as one pipeline, and measured every stage honestly against held-out data.

**Stage 1 — Triage.** A keyword rule (F1 0.38, recall 0.27) gave the floor; a TF-IDF + logistic-regression classifier lifted it to **F1 0.79, recall 0.86**. Recall is the number that matters — a missed adverse event is the costly error — and accuracy is a trap on this imbalanced set (an always-"no" model scores 0.72).

**Stage 2 — Extract.** A dictionary (gazetteer) hit drug 0.77 / effect 0.47 on exact match. A biomedical NER model *detected* the right spans ~0.76–0.79 of the time — as often as the dictionary — but choosing which of several diseases is the drug-linked effect turned out to be a relation problem, not an NER one.

**Stage 3 — Code.** The extracted effect phrase is mapped to a standard **SNOMED CT** disorder concept (the public stand-in for the licensed MedDRA), loaded from the 461k-term NHS TRUD release.

## Key finding — the coverage mirage

The coding stage taught the sharpest lesson. A "smarter" fuzzy matcher lifted coverage from 52% to **80%** — and I almost shipped it. Then I read the output: it had coded *"tense bullae"* as **Feeling tense** and *"neurologic toxicity"* as **Poisoning**, matching on a single incidental word.

In drug safety a wrong code is worse than no code — a blank leaves a gap a human catches, but a wrong code plants a false signal that looks exactly like data. So I reverted to a conservative matcher: back to ~54% coverage, but every code left standing is one I'd defend in a review. **Precision over coverage.**

## Built as a system, not a notebook

Clean package layout, **32 unit tests**, GitHub Actions CI that runs the tests *and* builds the Docker image, a CLI, and a container. The interactive above is the pipeline and its honest per-stage numbers.
