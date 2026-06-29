---
title: "FAERS Signal Detection"
summary: "A pharmacovigilance disproportionality analysis — PRR, ROR, chi-squared, and Evans criteria — over the full FAERS database via the openFDA API, validated on the known warfarin-haemorrhage signal (PRR ~5) and checked against negative controls."
tags: ["Python", "pandas", "openFDA API"]
date: 2025-09-01
featured: true
github: "https://github.com/belalzaky/faers-signal"
image: "/projects/faers-signal.png"
---

## What it does

Takes a drug–event pair, queries the openFDA API across the full FAERS database, and computes:

- **Proportional Reporting Ratio (PRR)**
- **Reporting Odds Ratio (ROR)**
- **Chi-squared statistic**
- **Evans criteria** (the standard threshold combination: PRR ≥ 2, n ≥ 3, chi-squared ≥ 4)

## Validation

I validated the method on warfarin and haemorrhage — a well-established signal in the pharmacovigilance literature. The analysis returned a PRR of approximately 5, consistent with published estimates.

From there I stress-tested it: running the same signal across different seriousness filters (all reports, hospitalisation only, death only) and across multiple years, to see how the estimate moved. I also ran it against negative controls — drug–event pairs with no known association — to check the false-positive rate.

## Stack

Python · pandas · openFDA API
