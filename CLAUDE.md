# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start:

1. Read `01_scripts/pending.md`. If it has any titles, list them and ask:
   "How did these perform? Tell me the view counts (or just say 'flopped') and I'll update the records."

2. Once the user responds:
   - Move titles with strong performance to `01_scripts/winners.md` (include plays, source "Fragrance Collective", and a note on why it worked)
   - Move titles that flopped to `01_scripts/failures.md` (include plays and why it failed)
   - Remove reviewed titles from `pending.md`

3. Then ask: "Want to pull from your **ideas list** this batch, or generate based on what's worked before?"
   - **Ideas list** → read `01_scripts/ideas.md` "To Try" section; use as many ideas as are listed (up to 3) as the direct script formats; fill remaining slots from winners/failures patterns. If ideas fills all 3 slots, skip reading winners.md and failures.md entirely.
   - **Winners/Failures** → standard generation, no ideas used

4. Proceed immediately to Stage 1.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

See `01_scripts/CLAUDE.md` for instructions.

After writing scripts to `output.md`, append the 3 new script titles to `01_scripts/pending.md`.

After Stage 1: review `01_scripts/output.md`, tweak any slide copy as needed.

---

## Stage 2 — Slide creation

**Trigger:** User says "done with images.md" (or equivalent like "images are ready", "ready to build").

**Pre-flight check:** Before doing anything in Stage 2, read `01_scripts/output.md`. If it contains no scripts (only the blank header), stop and run Stage 1 first. Do not proceed to slide creation until `output.md` has 3 complete scripts.

File: `02_slides/CLAUDE.md` — full context and slide creation instructions

**When triggered:**
1. Run `node images/download-images.js` to download Pinterest backgrounds
2. Confirm all card images (`cN-sN-card.jpg`) are present in `images/` — if any are missing, ask before continuing
3. Immediately proceed to full Stage 2 — build and export all 3 carousels
4. Report: "All 3 carousels are in outputs/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

After Stage 2: PNGs for each carousel appear in `outputs/1/`, `outputs/2/`, `outputs/3/`.

---

## Flow

```
"let's start"
      ↓
Stage 0 — review pending titles → move to winners/failures
      ↓
Choose: ideas list or winners/failures?
      ↓
Stage 1 — generate 3 scripts → append titles to pending.md
      ↓
01_scripts/output.md  →  (tweak if needed)
      ↓
fill images/images.md with Pinterest URLs
run fragrantica-cards.js → save cN-sN-card.jpg for each fragrance
say "done with images.md"
      ↓
Claude downloads backgrounds + builds Design B slides
      ↓
outputs/1/  outputs/2/  outputs/3/
```
