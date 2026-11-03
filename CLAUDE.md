# Fragrance Collective Media

# Purpose

- A pipeline for creating Fragrance Collective carousels, worked through in order by a single AI agent.

# Folder Map

```
Fragrance-Media/                 (you are here)
├── 01-creation/
├── 02-pipeline/
├── 03-checkpoint/
├── design/
└── .claude/
```

Top-level folders only, one level deep, no filenames or comments. Adding a folder means updating this tree and the Project Map below.

# Project Map

Each subdirectory with its own `CLAUDE.md` is listed here as `- [xxx/](xxx/) — <one-line description>`, with no "see" before the link. Add new subdirectories in this exact format.

- [01-creation/](01-creation/) — performance review and title creation, the one part of the pipeline that's a real back-and-forth with the user.
- [02-pipeline/](02-pipeline/) — everything after titles are confirmed: picking fragrances, copy, assets, render, cleanup.
- [design/](design/) — the carousel design system, isolated from pipeline logic and data so template work doesn't need pipeline context.
- [.claude/](.claude/) — Claude Code configuration: skills, hooks, and settings.

[03-checkpoint/](03-checkpoint/) holds the exported carousel PNGs, one folder per weekday. It grows over time, has no `CLAUDE.md`, and is not itemized.

# Context

- [CONTEXT.md](CONTEXT.md) — how the pipeline runs end to end, the output discipline, and the rules that span both phases. Start here.

# Conventions

- This workspace follows `~/Workspaces/Conventions/GUIDE.md` (canonical repo: [hquinde/Conventions](https://github.com/hquinde/Conventions), cloned to `~/Workspaces/Conventions`), imported below so it is in context every session (skeletons in `~/Workspaces/Conventions/templates/`). When asked to add or change a convention, edit `~/Workspaces/Conventions` and log it in its `CHANGELOG.md`, never this workspace. Run `/conventions-audit` to check this workspace against it.

@~/Workspaces/Conventions/GUIDE.md

# Last Updated

- 2026-11-02 — update this date whenever this file is edited.
