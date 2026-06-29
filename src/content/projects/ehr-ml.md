---
title: "EHR ML Risk Model"
summary: "A machine-learning model predicting hypertension from Synthea EHR features — logistic regression and random forest, with honest treatment of data leakage, the precision/recall threshold trade-off, and the limits of synthetic-data performance."
tags: ["Python", "scikit-learn", "pandas"]
date: 2025-06-01
featured: true
github: "https://github.com/belalzaky/ehr-ml"
image: "/projects/ehr-ml.png"
---

## What it does

Takes features derived from Synthea patient records and predicts whether a patient has hypertension. I trained and compared two models — logistic regression and random forest — and evaluated them on held-out data.

## What I spent the most time on

Three things mattered more than model choice:

**Data leakage.** EHR data has a temporal dimension that's easy to ignore when working with CSVs. I had to be deliberate about which features were available before a diagnosis versus after. Getting this wrong produces an optimistic model that could not work in deployment.

**Precision/recall trade-off.** A model that calls every patient high-risk has perfect recall. I spent time understanding what different probability thresholds actually mean in a clinical framing — what it costs to miss a case versus to flag a false one — even though this is synthetic data with no real stakes.

**Synthetic-data performance.** Synthea data is generated from statistical distributions, not from real patients. A high AUROC on Synthea says something about the model fitting those distributions; it says very little about whether the model would transfer to real EHR data. I tried to be clear about that distinction throughout.

## Stack

Python · scikit-learn · pandas
