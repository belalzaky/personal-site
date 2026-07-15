---
title: "ADR Reader"
summary: "Four different models — a keyword matcher, a general-purpose embedding model, a domain-tuned biomedical transformer, and a zero-shot LLM — read the same medical text and try to flag adverse drug events. Comparing where each one succeeds and fails is more revealing than any single accuracy number."
tags: ["Python", "PubMedBERT", "LLM eval"]
date: 2026-07-15
featured: true
---

## What I did

Adverse drug event (ADE) detection in free-text medical notes is a common pharmacovigilance task, so I ran the same test set through four models of increasing sophistication and watched where each one actually broke.

**Lap 1 — keyword matching.** A plain TF-IDF model, just matching vocabulary. No understanding of context, but it's a strong, cheap baseline that a lot of production systems still lean on.

**Lap 2 — general AI.** A general-purpose sentence embedding model (MiniLM), pretrained on ordinary web text. It understands meaning better than keyword matching, but has never specifically learned the vocabulary or framing of clinical writing.

**Lap 3 — domain AI.** A biomedical transformer (PubMedBERT), pretrained on millions of medical abstracts. It knows this exact register of language — how clinicians phrase harm, and how they phrase incidental findings.

**Lap 4 — the LLM.** A zero-shot general-purpose LLM, given no fine-tuning on this task at all, just a prompt asking it to judge each sentence and extract the drug and effect it found.

## Key finding

The domain-tuned model won overall, but the ranking beneath that is the interesting part: a simple keyword model beat the general-purpose transformer, and the zero-shot LLM came last — despite being the most sophisticated model on paper. See the leaderboard and worked examples below for exactly where each one broke.

## The zero-shot caveat

The LLM here was given **zero task-specific tuning** — no fine-tuning, no few-shot examples, just a prompt. That's the fairest comparison of "out of the box" capability, but it's also the LLM's worst-case setup: a few-shot or fine-tuned version would likely close some of this gap. The honest reading isn't "LLMs are bad at this" — it's that a zero-shot LLM is not a drop-in replacement for a model actually trained on the task, and deploying one without checking its failure modes first is a real risk in a domain where a missed or hallucinated harm has consequences.
