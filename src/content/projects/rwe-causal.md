---
title: "Causal Safety: Does an NSAID Cause Kidney Injury?"
summary: "Association isn't causation. Using a new-user active-comparator design with propensity-score matching and a self-controlled case series — on data with a sealed true effect — I show how a naive comparison understates a real harm by nearly half, and how two independent causal methods recover it."
tags: ["Python", "Causal inference", "Propensity scores", "SCCS"]
date: 2026-07-23
result: "Crude OR 1.19 → matched 2.05 → SCCS 2.14, against a sealed true OR of 2.20."
---

## The question

Do NSAIDs cause acute kidney injury (AKI) compared with acetaminophen? Every project before this one asked *is there a signal?* This one asks the harder question — *does the drug actually cause the harm?* — which means confronting confounding head-on.

## What I did

- **Design.** A new-user, active-comparator emulation (NSAID vs acetaminophen), the standard pharmacoepidemiology guard against confounding by indication.
- **Propensity-score matching** with a covariate-balance Love plot — the standard-mean-differences fell from ~0.14–0.27 to ~0.01, so the two groups became genuinely comparable.
- **A self-controlled case series (SCCS)** as an independent cross-check — each patient is their own control, so it has different blind spots to the matched cohort.
- **Robustness:** bootstrap confidence intervals, a window-sensitivity check, and a negative-control outcome (which correctly came back null).

## Key finding

The estimates are in the interactive above. The naive, crude comparison gave an odds ratio of **1.19** — it *understated a real harm by 46%*, because channeling (sicker patients steered toward acetaminophen) hid it. Propensity-score matching moved that to **2.05**, and the self-controlled series independently landed at **2.14**. Both causal methods converged on roughly a doubling of AKI risk.

## Why a sealed truth — and what this is not

This is a **simulation study**, and I want to be plain about that. The patient data is **synthetic**: I generated it with a **known** true odds ratio of **2.20** and kept that number sealed until the analysis was finished. So the finding here is *not* "NSAIDs cause AKI at OR 2.14" — that claim would need real claims or EHR data.

What it *does* demonstrate is the thing real data can never show you: whether your estimator recovers an effect you already know is there. Checking an estimator against a known answer is the standard way methods are validated, and it's the point of the exercise — the crude estimate missed by nearly half, and both causal designs recovered the truth to within a few percent. The next step is the same protocol on real data (MIMIC-IV, credentialing in progress).
