# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

**Active pipeline: `pipeline-v2`**
> Throughout this document, `{pipeline}` means the active pipeline above. To switch designs, change this line to `pipeline-v1`.
> `performance.json` and `fragrance-picks.json` are always at `pipeline-v1/scripts/data/` regardless of active pipeline.

**Folder layout**
- `checkpoint/` — the only folder the user needs to look at: `images.md` and exported carousels in `v1/1/`, `v1/2/`, `v1/3/` or `v2/1/`, `v2/2/`, `v2/3/`.
- `pipeline-v1/` — dark Design B (photo backgrounds, Instrument Serif). Shared data lives here.
- `pipeline-v2/` — white design (Cormorant Garamond + IBM Plex Mono, bottle + card images). Title slides use a dark Pinterest photo background (same as v1); fragrance slides are white.

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start:

1. Read [performance.json](pipeline-v1/scripts/data/performance.json). If `pending` has any titles, list them and ask:
   "How did these perform? Tell me the views, saves, and likes (or just say 'flopped') and I'll update the records."

2. Once the user responds:
   - Move titles with strong performance into `winners` — take the existing pending object (which already has `fragrances`, `niche_mix`, `design`, and `date_posted`) and add `plays`, `saves`, `likes`, and `date_reported` (today's date, format `xx/xx/xx`)
   - Move titles that flopped into `failures` — take the existing pending object and add `plays`, `saves`, `likes`, `why`, and `date_reported`
   - Remove reviewed titles from `pending`
   - Save all changes back to [performance.json](pipeline-v1/scripts/data/performance.json)

3. Proceed immediately to Stage 1.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

See [{pipeline}/scripts/CLAUDE.md](pipeline-v2/scripts/CLAUDE.md) for instructions.

After generating scripts, write them to `{pipeline}/scripts/data/scripts.json` as structured JSON (see format below). Also append the 3 new entries to `pending` in [performance.json](pipeline-v1/scripts/data/performance.json).

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

After Stage 1: follow the pipeline-specific steps in [{pipeline}/scripts/CLAUDE.md](pipeline-v2/scripts/CLAUDE.md) — they handle everything through to slide export.

---

## Stage 2 — Slide creation

**pipeline-v1 only trigger:** User says "build" (or equivalent). [images.md](checkpoint/images.md) must be filled first.

**pipeline-v2:** Stage 2 runs automatically within Stage 1 — no separate trigger needed. See [{pipeline}/scripts/CLAUDE.md](pipeline-v2/scripts/CLAUDE.md) for the full sequence.

After Stage 2: PNGs appear in `checkpoint/v1/` or `checkpoint/v2/` (matching the active pipeline), in subfolders `1/`, `2/`, `3/`, named `01-slide.png` through `NN-slide.png`.

---

## Flow

```
"let's start"
      ↓
Stage 0 — review pending titles → update pipeline-v1/scripts/data/performance.json
      ↓
Stage 1 — pick fragrances → search URLs only → write fragrantica-links.md + draft scripts.json
      ↓
ask for 3 Pinterest title URLs → node process-images.js → read card images → write copy → finalize scripts.json
      ↓
node {pipeline}/slides/generate.js → builds slides + exports
      ↓
checkpoint/v1/ or v2/ — 1/, 2/, 3/ — PNGs named 01-slide.png through NN-slide.png
      ↓
(optional) tweak a slide's <br/> in cN-slides.jsx, re-run "node export.js cN"
```
