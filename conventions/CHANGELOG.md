# Changelog

## 2026-08-13

- Project Map format now links to the subdirectory folder (`[xxx/](xxx/)`) instead of its `CLAUDE.md` file — an agent working inside a folder reads its `CLAUDE.md` automatically, so an explicit file link was redundant, and folder-links match how ICM routing actually works (implicit via folder structure, not an explicit link map). Updated `GUIDE.md` (rules 2–3), `templates/CLAUDE.md.template`, and `skills/conventions-audit/SKILL.md`.

## 2026-07-09

- Initial bundle: `GUIDE.md`, four hooks (`claude-md-reminder.sh`, `mv-reminder.sh`, `check-pending-moves.py`, `stamp-claude-md-date.sh`), three templates (root `CLAUDE.md`, `.claude/CLAUDE.md`, generic subdirectory `CLAUDE.md`), and the `conventions-audit` skill. Extracted from this workspace's own `CLAUDE.md` tree after it was brought in line with these conventions.
