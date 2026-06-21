# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

**Folder layout**
- `checkpoint/` — the only folder the user needs to look at: `images.md`, `output.md`, `ideas.md`, and exported carousels in `1/`, `2/`, `3/`.
- `pipeline/` — backend the agent reads and runs: `pipeline/scripts/` (Stage 1 data + instructions), `pipeline/slides/` (Stage 2 generation/export), `pipeline/images/` (image download/normalization).

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start:

1. Read `pipeline/scripts/data/performance.json`. If `pending` has any titles, list them and ask:
   "How did these perform? Tell me the view counts (or just say 'flopped') and I'll update the records."

2. Once the user responds:
   - Move titles with strong performance into `winners` (include plays and a note on why it worked)
   - Move titles that flopped into `failures` (include plays and why it failed)
   - Remove reviewed titles from `pending`
   - Save all changes back to `pipeline/scripts/data/performance.json`

3. Check `checkpoint/ideas.md` "To Try" section:
   - **If it has entries** → use as many ideas as are listed (up to 3) as the direct script formats; fill remaining slots from `winners`/`patterns` in `pipeline/scripts/data/performance.json`.
   - **If it's empty** → skip it entirely and proceed straight to standard generation from `winners`/`patterns` (no ideas used, no need to ask).

4. Proceed immediately to Stage 1.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

See `pipeline/scripts/CLAUDE.md` for instructions.

After writing scripts to `output.md`, append the 3 new script titles to `pending` in `pipeline/scripts/data/performance.json`.

After Stage 1: review `checkpoint/output.md`, tweak any slide copy as needed.

---

## Stage 2 — Slide creation

**Trigger:** User says "done with images.md" (or equivalent like "images are ready", "ready to build").

**Pre-flight check:** Before doing anything in Stage 2, read `checkpoint/output.md`. If it contains no scripts (only the blank header), stop and run Stage 1 first. Do not proceed to slide creation until `output.md` has 3 complete scripts.

File: `pipeline/slides/CLAUDE.md` — full context and slide creation instructions

**When triggered:**
1. Run `node pipeline/images/process-images.js` — downloads Pinterest backgrounds, converts non-jpg backgrounds to `.jpg`, and normalizes Fragrantica card images to `cN-sN-card.jpg`
2. Run `node pipeline/slides/generate.js` — generates `c1-slides.jsx`/`c2-slides.jsx`/`c3-slides.jsx` from `checkpoint/output.md` and exports all 3 carousels to PNGs. If any image is missing it aborts with a list of what's missing — fix `pipeline/images/` and re-run.
3. Report: "All 3 carousels are in checkpoint/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

After Stage 2: PNGs appear in `checkpoint/1/`, `checkpoint/2/`, `checkpoint/3/` — 11 slides each, named `01-slide.png` through `11-slide.png`.

---

## Flow

```
"let's start"
      ↓
Stage 0 — review pending titles → update pipeline/scripts/data/performance.json
      ↓
ideas.md has entries? → use them; else → winners/failures only
      ↓
Stage 1 — generate 3 scripts → append titles to pipeline/scripts/data/performance.json pending
      ↓
checkpoint/output.md  →  (tweak if needed)
      ↓
fill checkpoint/images.md with Pinterest URLs
save Fragrantica card screenshots into pipeline/images/ (referenced via images.md)
say "done with images.md"
      ↓
node pipeline/images/process-images.js → backgrounds + cN-sN-card.jpg ready
node pipeline/slides/generate.js → builds Design B slides + exports
      ↓
checkpoint/1/, 2/, 3/ — 11 PNGs each (01-slide.png through 11-slide.png)
      ↓
(optional) tweak a slide's <br/> in cN-slides.jsx, re-run "node export.js cN"
```
