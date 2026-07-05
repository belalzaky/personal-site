---
title: "EHR Survival Analysis in R"
summary: "A time-to-hypertension survival analysis on Synthea EHR data — Kaplan-Meier curves, a Cox proportional-hazards model, and an honest limitations write-up. Diabetic patients develop hypertension ~2.4× faster; the model's apparently-null age effect turned out to be time-varying."
tags: ["R", "survival", "Cox regression", "Synthea"]
date: 2026-07-06
featured: true
github: "https://github.com/belalzaky/ehr-survival-r"
image: "/projects/ehr-survival-r.png"
---

## What I did

My first R project — a four-lap survival analysis on the same Synthea synthetic EHR data used in [Synthea EHR](/projects/synthea-ehr) and [EHR ML Risk Model](/projects/ehr-ml), asking a different question than either: not "does this patient have hypertension?" but "how long does it take?" I built a one-row-per-patient time-to-event dataset (1,171 patients: 302 diagnosed, 869 censored), fit Kaplan-Meier curves split by diabetes status with a log-rank test, then a Cox proportional-hazards model adjusting for age, sex, diabetes, and obesity together, and checked whether the model's core assumption actually held.

## Key finding

Diabetic patients have roughly **2.4× the hazard** of a hypertension diagnosis at any given moment, even after adjusting for age, sex, and obesity — diabetes isn't just riding along with being older or heavier, it carries its own independent signal (obesity holds up too, at ~1.4×).

The more interesting result was a mistake I almost made: age's adjusted hazard ratio looked completely null (HR 1.00, p = 0.4). Checking the model's proportional-hazards assumption (`cox.zph`) showed why — age's effect on hypertension risk isn't constant over time at all, it drifts across the follow-up period, and averaging a time-varying effect into one static coefficient had quietly washed it out. A flat, non-significant number isn't automatically "no effect."

## Honest limitations

`diabetes` and `obesity` are "ever diagnosed, at any point in the record" flags rather than baseline measurements, which risks reverse time-ordering (crediting diabetes for predicting hypertension when, for some patients, hypertension came first). The proportional-hazards assumption failed globally, not just for age, so several of these hazard ratios are time-averaged summaries of effects that actually change shape. The diabetic stratum is small (76 patients). There's no competing-risks handling for death as an alternative reason a patient stops being observed, and no external validation against a different cohort. And — being Synthea data — any relationship this recovers is designed into the simulator, not discovered in the world, so this is a methods exercise in survival analysis, not a clinical finding.

## Stack

R · survival package (base R otherwise: `read.csv`, `aggregate`, `merge`) · Synthea synthetic EHR
