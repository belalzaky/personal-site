---
title: "FAERS Explorer"
summary: "A live interactive Streamlit dashboard over the FDA Adverse Event Reporting System. Pick any drug and see its top reported reactions, reports per year, and age/sex demographics — with a built-in panel on why these counts measure attention, not harm."
tags: ["Python", "pandas", "matplotlib", "Streamlit", "openFDA API"]
date: 2025-10-01
featured: true
link: "https://belalzaky-faers.streamlit.app/"
github: "https://github.com/belalzaky/faers-explorer"
image: "/projects/zantac_trend.png"
---

## What it does

You pick a drug and the dashboard returns:

- Its top reported adverse reactions (by report count)
- Reports filed per year
- Age and sex breakdown of reporters

There is also a built-in panel explaining what these numbers actually measure. FAERS counts are driven by who files reports, not by how often an adverse event occurs in patients. More reports for a drug does not mean the drug is more dangerous — it can mean it is more widely used, more scrutinised, or that a safety signal has already been publicised. The dashboard makes that explicit.

## Why I built it

I kept reading pharmacovigilance literature that cited FAERS counts without that caveat. I wanted a tool that showed the data and the caveat together, so the interpretation is part of the interface.

## Stack

Python · pandas · matplotlib · Streamlit · openFDA API
