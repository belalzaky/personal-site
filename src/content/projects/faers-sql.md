---
title: "FAERS in SQL"
summary: "Loaded ~3,000 FAERS reports from the openFDA API into a SQLite database (one row per drug-reaction pair) and queried it with SQL — GROUP BY, WHERE, COUNT(DISTINCT). Key lesson: how sampling choices shape conclusions."
tags: ["Python", "SQL", "SQLite", "openFDA API"]
date: 2025-08-01
featured: true
github: "https://github.com/belalzaky/faers-sql"
image: "/projects/faers-sql.png"
---

## What I did

I pulled approximately 3,000 adverse event reports from the openFDA API and loaded them into a SQLite database, structured so each row is one drug–reaction pair for one report. Then I queried it with SQL.

The queries were standard analytical patterns — `GROUP BY`, `WHERE`, `COUNT(DISTINCT)` — applied to pharmacovigilance questions: which drugs had the most reported reactions, which reactions appeared across the most distinct drugs, how results changed when filtering by seriousness or patient age.

## The important lesson

The lesson wasn't about SQL syntax; it was about sampling.

My first reports-per-year chart was a lie: the naive fetch (skip=0,100…, no filter) pulled one consecutive block from openFDA's storage, so almost every report landed in 2014 — a slice, not a sample. I fixed it by taking 300 reports per year — but that made the trend dead flat, hiding the fact that real FAERS volume roughly doubles across the decade. Only counting every report with no cap shows the true rising trend. How you collect the data decides what you're allowed to conclude from it — the query was never the hard part.

## Stack

Python · SQL · SQLite · openFDA API
