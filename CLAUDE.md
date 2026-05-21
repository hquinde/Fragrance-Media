# TrackAI — MWP Workspace

Three-stage pipeline for creating TrackAI carousels.
Each stage is a folder with a `context.md`, a `prompt.md`, and an output file.
A single AI agent reads the files sequentially — no complex orchestration needed.

---

## Stage 0 — Performance review

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

When the user says let's start, ask:
"Before we write new scripts — how did the last batch perform? Share any titles and their view counts and I'll update the winners and failures list before we generate."

If it's the first batch ever, skip straight to Stage 1.

Once the user shares results:
- Add titles with strong performance to `01_scripts/TrackAI-Winners.md` (include plays, source "TrackAI", and a note on why it worked)
- Add titles that flopped to `01_scripts/TrackAI-Failures.md` (include plays and why it failed)
- Then proceed immediately to Stage 1 — no need to ask.

---

## Stage 1 — Script generation

**Trigger:** runs automatically after Stage 0

Files:
- `01_scripts/context.md` — winners, failures, patterns
- `01_scripts/prompt.md` — generation rules and format
- `01_scripts/output.md` — **generated scripts land here**

After Stage 1: review `output.md`, tweak any slide copy as needed.

---

## Stage 2 — Slide creation

**Trigger:** tell Claude to run Stage 2. It reads all 3 scripts directly from `01_scripts/output.md`.

Files:
- `02_slides/context.md` — design system summary
- `02_slides/prompt.md` — slide creation instructions

Before running: fill in `images/images.md` with 15 Pinterest URLs (5 per carousel). When you tell Claude "images.md is filled", Claude runs `node images/download-images.js` automatically.

After Stage 2: 6 PNGs per carousel appear in `outputs/1/`, `outputs/2/`, `outputs/3/`.

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
