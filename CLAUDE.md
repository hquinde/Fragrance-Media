# Fragrance Collective — MWP Workspace

Three-stage pipeline for creating Fragrance Collective carousels.
A single AI agent reads context, runs the skill, and outputs slides — no complex orchestration needed.

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start, ask:
"Before we write new scripts — how did the last batch perform? Share any titles and their view counts and I'll update the winners and failures list before we generate."

Once the user shares results:
- Add titles with strong performance to `01_scripts/winners.md` (include plays, source "Fragrance Collective", and a note on why it worked)
- Add titles that flopped to `01_scripts/failures.md` (include plays and why it failed)
- Then proceed immediately to Stage 1 — no need to ask.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

See `01_scripts/CLAUDE.md` for instructions.

After Stage 1: review `01_scripts/output.md`, tweak any slide copy as needed.

---

## Stage 2 — Slide creation

**Trigger:** tell Claude to run Stage 2. It reads all 3 scripts directly from `01_scripts/output.md`.

**Pre-flight check:** Before doing anything in Stage 2, read `01_scripts/output.md`. If it contains no scripts (only the blank header), stop and run Stage 1 first. Do not proceed to slide creation until `output.md` has 3 complete scripts.

File: `02_slides/CLAUDE.md` — full context and slide creation instructions

Before running: fill in `images/images.md` with 15 Pinterest URLs (5 per carousel). When you tell Claude "images.md is filled", Claude runs `node images/download-images.js` automatically.

After Stage 2: PNGs for each carousel appear in `outputs/1/`, `outputs/2/`, `outputs/3/`.

---

## Flow

```
"let's start"
      ↓
Stage 0 — performance review → update Winners/Failures
      ↓
Stage 1 — generate 3 scripts
      ↓
01_scripts/output.md  →  (tweak if needed)
      ↓
fill images/images.md with 15 Pinterest URLs
      ↓
tell Claude "images.md is filled"
      ↓
Claude runs node images/download-images.js automatically
      ↓
run Stage 2  (all 3 carousels at once)
      ↓
outputs/1/  outputs/2/  outputs/3/
```
