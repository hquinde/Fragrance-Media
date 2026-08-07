# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

**Folder layout**
- `checkpoint/` — the only folder the user needs to look at: exported carousels in `1/`, `2/`, `3/`.
- `pipeline/` — white design (Cormorant Garamond + IBM Plex Mono, bottle + card images). Title slides use a dark Pinterest photo background; fragrance slides are white. Shared tracking data (`carousels.json`) lives at `pipeline/scripts/data/`.

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start:

1. Run `jq '[.carousels[] | select(.status=="pending")]' pipeline/scripts/data/carousels.json`. If the array is non-empty, list the titles and ask:
   "How did these perform? Tell me the views, saves, and likes (or just say 'flopped') and I'll update the records."

2. Once the user responds, for each title run [report-performance.js](pipeline/scripts/report-performance.js) instead of hand-editing the JSON:
   ```bash
   node pipeline/scripts/report-performance.js --title "Title" --plays N --saves N --likes N
   # flopped, or no metrics given at all — the carousel is dropped outright, its fragrances become reusable
   node pipeline/scripts/report-performance.js --title "Title"
   ```
   A title reported with `plays` ≥ 1000 is marked `status: "reported"` with its real metrics and `date_reported` stamped. A title with no metrics, or with `plays` under 1000, is removed from `carousels.json` entirely — low/no-performance records aren't kept, and dropping the carousel immediately frees its fragrances for reuse.

3. Proceed immediately to Stage 1.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

See [pipeline/scripts/CLAUDE.md](pipeline/scripts/CLAUDE.md) for instructions.

After generating scripts, write them to `pipeline/scripts/data/scripts.json` as structured JSON (see format below). Also record the 3 new entries via [add-batch.js](pipeline/scripts/add-batch.js) — see Step 5 in [pipeline/scripts/CLAUDE.md](pipeline/scripts/CLAUDE.md) — which appends them to `carousels.json` as `status: "pending"` entries, fragrances excluded immediately.

**scripts.json format:**
```json
{
  "carousels": [
    {
      "num": 1,
      "title": "Title here",
      "slides": [
        { "num": 1, "name": "Fragrance Name", "brand": "Brand Name", "gender": "men", "copy": "Punchy line one. Punchy line two." },
        ...
      ]
    },
    ...
  ]
}
```
Optional per-carousel field: `"titleStyle": "minimal"` — renders that carousel's title slide as centered black text on white instead of the default dark-photo-with-scrim. Omit (or `"photo"`) for the default. See [pipeline/slides/CLAUDE.md](pipeline/slides/CLAUDE.md).

After Stage 1: follow the pipeline-specific steps in [pipeline/scripts/CLAUDE.md](pipeline/scripts/CLAUDE.md) — they handle everything through to slide export.

---

## Stage 2 — Slide creation

Stage 2 runs automatically within Stage 1 — no separate trigger needed. See [pipeline/scripts/CLAUDE.md](pipeline/scripts/CLAUDE.md) for the full sequence.

After Stage 2: PNGs appear in `checkpoint/`, in subfolders `1/`, `2/`, `3/`, named `01-slide.png` through `NN-slide.png`.

---

## Flow

```
"let's start"
      ↓
Stage 0 — review pending titles → update pipeline/scripts/data/carousels.json
      ↓
Stage 1 — pick fragrances → search URLs only → write fragrantica-links.md + draft scripts.json
      ↓
ask for Pinterest title URLs (one per non-minimal carousel) → node process-images.js → read card images → write copy → finalize scripts.json
      ↓
node pipeline/slides/generate.js → builds slides + exports
      ↓
checkpoint/ — 1/, 2/, 3/ — PNGs named 01-slide.png through NN-slide.png
      ↓
(optional) tweak a slide's <br/> in cN-slides.jsx, re-run "node export.js cN"
```

# Last Updated

- 2026-08-07 — update this date whenever this file is edited.
