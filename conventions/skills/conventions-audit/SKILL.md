---
name: conventions-audit
description: Audit a workspace's CLAUDE.md tree against the conventions defined in this bundle (see ../../GUIDE.md). Use whenever asked to "check conventions", "verify CLAUDE.md consistency", "audit the docs", or after bootstrapping this bundle into a new project to confirm it applied cleanly.
---

# Conventions Audit

Checks a workspace's `CLAUDE.md` tree against the conventions documented in `GUIDE.md`. Read that file first if this is the first time auditing a given workspace — it explains the *why* behind each check below.

## 1. Discover the tree

Find every `CLAUDE.md` in the project (excluding `.git`, `node_modules`). Read the root one first.

## 2. Project Map completeness

For every directory that has its own `CLAUDE.md`, confirm its parent's `CLAUDE.md` lists it — in the exact format `- [xxx/](xxx/) — <one-line description>` (no bold, link to the folder itself not its `CLAUDE.md` file, no "see" before the link, and a trailing one-line, high-level description). Flag: missing entries, wrong relative path, format drift, a missing/empty description, or a description that names specific files inside the subdirectory (that belongs in the subdirectory's own `CLAUDE.md`, not the parent's).

## 3. Every bullet links to a real file

For each bullet across every `CLAUDE.md`, if it names a file or directory in this project, it should be a markdown link (`[name](path)`), and the path must resolve to a file that actually exists. Flag: bare `**bold**` filenames with no link, and links that 404.

## 4. Sections are typed, not flat

Each `CLAUDE.md` should group its bullets under named `#` sections (e.g. `# Scripts`, `# State`, `# Source Files`) rather than one undifferentiated list under the title. A `# Purpose` section should be first. Flag: flat bullet lists with no section headers.

## 5. Last Updated is present and plausible

Every `CLAUDE.md` should have a `# Last Updated` section with a `- YYYY-MM-DD` bullet. Flag: missing section, or a date that's stale relative to the file's actual last-edit time if that's knowable (e.g. via git log).

## 6. No stale references

Grep the whole tree for filenames that no longer exist at the path implied by their surrounding text (this catches moves that were never reflected in docs). Cross-check against any hook-move log if present (e.g. `.claude/hooks/.pending-moves.jsonl`).

## 7. Hooks wired correctly

If `.claude/hooks/` exists, confirm `.claude/settings.json` actually registers each script under the right event/matcher, and that `.claude/CLAUDE.md` documents each one with a working link.

## 8. Report

List findings grouped by file, each as `path:line — issue`. Don't silently fix anything unless asked — this skill is a checker, not an auto-fixer.
