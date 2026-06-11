# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start:

1. Read `01_scripts/data/performance.json`. If `pending` has any titles, list them and ask:
   "How did these perform? Tell me the view counts (or just say 'flopped') and I'll update the records."

2. Once the user responds:
   - Move titles with strong performance into `winners` (include plays and a note on why it worked)
   - Move titles that flopped into `failures` (include plays and why it failed)
   - Remove reviewed titles from `pending`
   - Save all changes back to `01_scripts/data/performance.json`

3. Then ask: "Want to pull from your **ideas list** this batch, or generate based on what's worked before?"
   - **Ideas list** → read `01_scripts/ideas.md` "To Try" section; use as many ideas as are listed (up to 3) as the direct script formats; fill remaining slots from `winners`/`patterns` in `01_scripts/data/performance.json`. If ideas fills all 3 slots, skip reading it entirely.
   - **Winners/Failures** → standard generation, no ideas used

4. Proceed immediately to Stage 1.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

See `01_scripts/CLAUDE.md` for instructions.

After writing scripts to `output.md`, append the 3 new script titles to `pending` in `01_scripts/data/performance.json`.

After Stage 1: review `01_scripts/output.md`, tweak any slide copy as needed.

---

## Stage 2 — Slide creation

**Trigger:** User says "done with images.md" (or equivalent like "images are ready", "ready to build").

**Pre-flight check:** Before doing anything in Stage 2, read `01_scripts/output.md`. If it contains no scripts (only the blank header), stop and run Stage 1 first. Do not proceed to slide creation until `output.md` has 3 complete scripts.

File: `02_slides/CLAUDE.md` — full context and slide creation instructions

**When triggered:**
1. Run `node images/process-images.js` — downloads Pinterest backgrounds, converts non-jpg backgrounds to `.jpg`, and normalizes Fragrantica card images to `cN-sN-card.jpg`
2. Run `node 02_slides/generate.js` — generates `c1-slides.jsx`/`c2-slides.jsx`/`c3-slides.jsx` from `01_scripts/output.md` and exports all 3 carousels to PNGs. If any image is missing it aborts with a list of what's missing — fix `images/` and re-run.
3. Report: "All 3 carousels are in outputs/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

After Stage 2: PNGs for each carousel appear in `outputs/N/` (one folder per carousel — see `02_slides/export.js`).

---

## Flow

```
"let's start"
      ↓
Stage 0 — review pending titles → update 01_scripts/data/performance.json
      ↓
Choose: ideas list or winners/failures?
      ↓
Stage 1 — generate 3 scripts → append titles to 01_scripts/data/performance.json pending
      ↓
01_scripts/output.md  →  (tweak if needed)
      ↓
fill images/images.md with Pinterest URLs
save Fragrantica card screenshots into images/ (referenced via images.md)
say "done with images.md"
      ↓
node images/process-images.js → backgrounds + cN-sN-card.jpg ready
node 02_slides/generate.js → builds Design B slides + exports
      ↓
outputs/N/ for each carousel
      ↓
(optional) tweak a slide's <br/> in cN-slides.jsx, re-run "node export.js cN"
```
