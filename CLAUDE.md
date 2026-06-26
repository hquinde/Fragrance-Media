# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

**Active pipeline: `pipeline-v2`**
> Throughout this document, `{pipeline}` means the active pipeline above. To switch designs, change this line to `pipeline-v1`.
> `performance.json` and `fragrance-picks.json` are always at `pipeline-v1/scripts/data/` regardless of active pipeline.

**Folder layout**
- `checkpoint/` — the only folder the user needs to look at: `images.md`, `ideas.md`, and exported carousels in `v1/1/`, `v1/2/`, `v1/3/` or `v2/1/`, `v2/2/`, `v2/3/`.
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

3. Check [ideas.md](checkpoint/ideas.md) "To Try" section:
   - **If it has entries** → use as many ideas as are listed (up to 3) as the direct script formats; fill remaining slots from `winners`/`patterns` in [performance.json](pipeline-v1/scripts/data/performance.json).
   - **If it's empty** → skip it entirely and proceed straight to standard generation from `winners`/`patterns` (no ideas used, no need to ask).

4. Proceed immediately to Stage 1.

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

After Stage 1: tell the user the 3 titles are ready. Then follow the pipeline-specific prompt in [{pipeline}/slides/CLAUDE.md](pipeline-v2/slides/CLAUDE.md) for what comes next:
- **pipeline-v1:** fill [images.md](checkpoint/images.md) with Pinterest URLs for all slides → say "build"
- **pipeline-v2:** ask user to drop 3 Pinterest title URLs in chat → build starts immediately on paste

---

## Stage 2 — Slide creation

**Trigger:** User says "build" (or equivalent like "generate", "ready", "go"). For pipeline-v1, [images.md](checkpoint/images.md) must be filled first. For pipeline-v2, the agent must have the 3 Pinterest title URLs from the user's chat messages.

**Pre-flight check:** Before doing anything in Stage 2, read `{pipeline}/scripts/data/scripts.json`. If it is missing or has no carousels, stop and run Stage 1 first.

See [{pipeline}/slides/CLAUDE.md](pipeline-v2/slides/CLAUDE.md) for full steps.

After Stage 2: PNGs appear in `checkpoint/v1/` or `checkpoint/v2/` (matching the active pipeline), in subfolders `1/`, `2/`, `3/`, named `01-slide.png` through `NN-slide.png`.

---

## Flow

```
"let's start"
      ↓
Stage 0 — review pending titles → update pipeline-v1/scripts/data/performance.json
      ↓
ideas.md has entries? → use them; else → winners/failures only
      ↓
Stage 1 — generate 3 scripts → write {pipeline}/scripts/data/scripts.json + update performance.json pending
      ↓
pipeline-v1: fill checkpoint/images.md with Pinterest URLs → say "build"
pipeline-v2: drop 3 Pinterest title URLs in chat → build starts automatically
      ↓
node {pipeline}/images/process-images.js → images ready
node {pipeline}/slides/generate.js → builds slides + exports
      ↓
checkpoint/1/, 2/, 3/ — PNGs named 01-slide.png through NN-slide.png
      ↓
(optional) tweak a slide's <br/> in cN-slides.jsx, re-run "node export.js cN"
```
