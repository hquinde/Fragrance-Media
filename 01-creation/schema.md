---
type: JSON Table
title: Carousels
description: One row per Fragrance Collective carousel — its Pinterest performance and its 5 fragrances.
resource: 01-creation/carousels.json
tags: [pipeline, tracking]
timestamp: 2026-08-08
---

# Schema

| Column | Type | Description |
|---|---|---|
| `title` | STRING | Carousel title as posted. |
| `status` | STRING (`pending` \| `reported`) | Lifecycle state. |
| `date_posted` | STRING `MM/DD/YY` \| NULL | Date posted to Pinterest. |
| `date_reported` | STRING `MM/DD/YY` \| NULL | Date performance was recorded. |
| `plays` | INTEGER \| NULL | Video plays. |
| `saves` | INTEGER \| NULL | Saves. |
| `likes` | INTEGER \| NULL | Likes. |
| `fragrances` | RECORD, REPEATED (5, or 10 for a carousel comparing fragrance pairs — one record per side of each pair) | Nested fragrance rows — see [Fragrance](#fragrance). |

## Fragrance (nested under `fragrances`)

| Column | Type | Description |
|---|---|---|
| `fragrance` | STRING | Brand + product name combined, e.g. `"Tom Ford Noir EDP"`. |
| `tier` | STRING (`mainstream` \| `mid-niche` \| `deep-niche` \| `ultra-niche`) | Niche tier. |
| `gender` | STRING (`men` \| `women` \| `unisex` \| `unknown`) | Target audience. |

# Joins

None — `fragrances` is nested/repeated within each carousel row, not a separate table.