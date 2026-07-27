# conventions/

# Purpose

- A self-contained, portable bundle of this workspace's `CLAUDE.md`/hooks/skill conventions, meant to be read by another agent and adapted into a different project. Isolated from this repo's live `.claude/` setup — nothing here is wired into this project's actual hooks or skills.

# Guide

- [GUIDE.md](GUIDE.md) — the conventions themselves and the reasoning behind them (OKF/ICM-inspired), plus steps for applying this bundle to another project.

# Templates

- [templates/CLAUDE.md.template](templates/CLAUDE.md.template) — root `CLAUDE.md` skeleton (Purpose + Project Map).
- [templates/dot-claude-CLAUDE.md.template](templates/dot-claude-CLAUDE.md.template) — `.claude/CLAUDE.md` skeleton (Skills, Hooks, Settings).
- [templates/subdir-CLAUDE.md.template](templates/subdir-CLAUDE.md.template) — generic per-directory `CLAUDE.md` skeleton (typed sections + linked bullets).
- [templates/settings.json.template](templates/settings.json.template) — hook wiring using `$CLAUDE_PROJECT_DIR`, portable across projects.

# Hooks

- [hooks/claude-md-reminder.sh](hooks/claude-md-reminder.sh) — portable copy of the `PostToolUse`/`Write` new-file-documentation reminder.
- [hooks/mv-reminder.sh](hooks/mv-reminder.sh) — portable copy of the `PostToolUse`/`Bash` move-tracking hook.
- [hooks/check-pending-moves.py](hooks/check-pending-moves.py) — portable copy of the `Stop` hook that verifies logged moves against `CLAUDE.md` files.
- [hooks/stamp-claude-md-date.sh](hooks/stamp-claude-md-date.sh) — portable copy of the `PostToolUse`/`Edit|Write` `# Last Updated` date-stamping hook.

# Skills

- [skills/conventions-audit/SKILL.md](skills/conventions-audit/SKILL.md) — audits a workspace's `CLAUDE.md` tree against this bundle's conventions (Project Map completeness, linked bullets, typed sections, `# Last Updated`, stale references, hook wiring).

# Changelog

- [CHANGELOG.md](CHANGELOG.md) — dated log of what's been added/changed in this bundle. Update it whenever this bundle's contents change, since it's expected to keep growing.

# Last Updated

- 2026-07-09 — update this date whenever this file is edited.
