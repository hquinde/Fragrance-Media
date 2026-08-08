# Fragrance Collective — MWP Workspace

A pipeline for creating Fragrance Collective carousels. A single AI agent works through it in order, one phase at a time — no complex orchestration needed.

**Folder layout**
- `01-creation/` — performance review + title creation, the one part of the pipeline that's a real back-and-forth with the user. Self-contained `CLAUDE.md`.
- `02-pipeline/` — everything after titles are confirmed: picking fragrances, copy, assets, render, cleanup. No phase-per-folder here — it's one folder of scripts plus two docs, split by concern: [scripts.md](02-pipeline/scripts.md) (run order + what each script does), [workflow.md](02-pipeline/workflow.md) (the judgment calls that have no script — fragrance selection, copy, format specs). Start there at [scripts.md](02-pipeline/scripts.md).
- `only-for-user.md` — user's personal notes.
- `.claude/` — [.claude/CLAUDE.md](.claude/CLAUDE.md) — Claude Code configuration: skills, hooks, and settings.

---

Start at [01-creation/CLAUDE.md](01-creation/CLAUDE.md); once titles are confirmed, move to [02-pipeline/scripts.md](02-pipeline/scripts.md).

## Output discipline

Produce user-facing text **only** at the moments explicitly called out in `01-creation/CLAUDE.md` or `02-pipeline/scripts.md` (the performance question, the title proposal, the Pinterest URL request, the closing message). Everything else is silent — no selection reasoning, no confirmation tables, no file-write acknowledgements, no search narration.

# Last Updated

- 2026-08-08 — update this date whenever this file is edited.
