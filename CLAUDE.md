# Fragrance Collective Media

A pipeline for creating Fragrance Collective carousels. A single AI agent works through it in order, one phase at a time — no complex orchestration needed.

**Folder layout**
- `01-creation/` — performance review + title creation, the one part of the pipeline that's a real back-and-forth with the user.
- `02-pipeline/` — everything after titles are confirmed: picking fragrances, copy, assets, render, cleanup. Self-contained `CLAUDE.md`.
- `design/` — the carousel design system, isolated from pipeline logic/data so template work doesn't need pipeline context. Not currently wired into `02-pipeline/`.
- `.claude/` — [.claude/CLAUDE.md](.claude/CLAUDE.md) — Claude Code configuration: skills, hooks, and settings.

---

Start at `01-creation/`; once titles are confirmed, move to `02-pipeline/`.

## Output discipline

Produce user-facing text **only** at the moments explicitly called out in `01-creation/` or `02-pipeline/` (the performance question, the title proposal, the regenerated monthly analysis, the Pinterest URL request, the closing message). Everything else is silent — no selection reasoning, no confirmation tables, no file-write acknowledgements, no search narration.

## Rules

- Don't delegate pipeline research (fragrance verification, etc.) to subagents — this is a single-agent pipeline (see the top line of this file). Run `WebSearch` directly in the main conversation. If some items fail to verify, retry with a follow-up scoped only to the failed item(s), not the whole batch.
- When `02-pipeline/check-fragrances.js` flags a conflict caused by a shared generic/descriptor word (not the same fragrance), add that word to `GENERIC_DESCRIPTORS` in `check-fragrances.js` as part of resolving it — don't just swap the pick and move on.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
