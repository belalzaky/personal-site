---
title: "Synthea EHR"
summary: "Used Synthea synthetic patient records (CSV) loaded into SQLite to learn the relational structure of EHR data via JOINs and subquery cohorts — including building a hypertension cohort and examining its medications as a real-world-evidence exercise."
tags: ["Python", "SQL", "SQLite", "Synthea"]
date: 2025-07-01
featured: true
github: "https://github.com/belalzaky/synthea-ehr"
image: "/projects/synthea-ehr.png"
---

## What I did

Synthea generates synthetic patient records that mimic the structure of real electronic health records. I took the CSV outputs, loaded them into SQLite, and used SQL to explore how EHR data fits together relationally.

The practical work was: writing JOINs across patients, conditions, medications, and encounters tables; building cohort definitions using subqueries (e.g. patients with a hypertension diagnosis); then querying what medications those patients were on — as a way of practising the kind of cohort-and-exposure framing used in observational pharmacoepidemiology.

## Why synthetic data

Real EHR data requires governance approvals I don't yet have access to. Synthea's records are realistic enough in structure to practise the SQL and learn the data model, without the access barriers. The limitation is that the data is not real, so any findings are illustrative rather than meaningful.

## Stack

Python · SQL · SQLite · Synthea
