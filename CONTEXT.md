# Fragrance Collective Media: running the carousel pipeline

A single AI agent works through the pipeline in order, one phase at a time — no complex orchestration needed. Start at `01-creation/`; once titles are confirmed, move to `02-pipeline/`. The phase-specific rules live in each phase's own `CONTEXT.md`; this file holds only the rules that span both.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Phase | [01-creation/CONTEXT.md](01-creation/CONTEXT.md) | Full file | Performance review + title creation, the real back-and-forth with the user |
| Phase | [02-pipeline/CONTEXT.md](02-pipeline/CONTEXT.md) | Full file | Fragrance selection, copy, assets, render, cleanup, once titles are confirmed |
| Reference | [design/CONTEXT.md](design/CONTEXT.md) | Brand | Logo and color codes; only when doing template work |

## Process

1. Work through `01-creation/` until the user has signed off on the titles.
2. Move to `02-pipeline/` and run it in the order its `CONTEXT.md` gives.
3. Don't delegate pipeline research (fragrance verification, etc.) to subagents — this is a single-agent pipeline (see the top line of this file). Run `WebSearch` directly in the main conversation. If some items fail to verify, retry with a follow-up scoped only to the failed item(s), not the whole batch.
4. When [02-pipeline/check-fragrances.js](02-pipeline/check-fragrances.js) flags a conflict caused by a shared generic/descriptor word (not the same fragrance), add that word to `GENERIC_DESCRIPTORS` in `check-fragrances.js` as part of resolving it — don't just swap the pick and move on.

## Checkpoints

Produce user-facing text **only** at the moments explicitly called out in `01-creation/` or `02-pipeline/`. Everything else is silent — no selection reasoning, no confirmation tables, no file-write acknowledgements, no search narration.

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| Performance review (`01-creation/`) | The performance question | The views, saves, and likes to record |
| Monthly analysis (`01-creation/`) | The regenerated monthly analysis, when stale | Whether to discuss before moving on |
| Title creation (`01-creation/`) | The title proposal | Confirm, edit, or swap in their own titles |
| Assets (`02-pipeline/`) | The Pinterest URL request | The Pinterest URLs |
| Render (`02-pipeline/`) | The closing message | When posting is done and cleanup can run |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Output discipline | No user-facing text outside the checkpoints above |
| Subagents | No pipeline research delegated to a subagent |
| Descriptor conflicts | Any conflict from a shared generic word is resolved by updating `GENERIC_DESCRIPTORS`, not only by swapping the pick |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Carousel PNGs | `03-checkpoint/<Day>/` | PNGs, one folder per weekday; removed by cleanup after posting |
| Tracking data | [01-creation/carousels.json](01-creation/carousels.json) | JSON; updated by the phase scripts |
