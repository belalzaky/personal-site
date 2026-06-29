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

The most useful thing I learned had nothing to do with SQL syntax. It was about sampling.

The openFDA API lets you request a balanced or unbalanced sample. I ran the same queries on both and got different answers. A "balanced" sample (equal records per drug) is not representative of the actual reporting distribution — it flattens out the drugs with few reports and compresses the ones with many. The choice of sampling method changes the conclusions, and it's easy to miss this if you treat the API's default response as ground truth.

## Stack

Python · SQL · SQLite · openFDA API
