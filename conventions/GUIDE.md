# Workspace Conventions Guide

How this workspace's `CLAUDE.md` tree, hooks, and skills fit together, and why. Read this before applying `templates/` or `hooks/` to another project.

## Why this exists

Two ideas borrowed from real methodologies, applied to a filesystem instead of a database or an AI pipeline:

- **OKF (Open Knowledge Format)** — mapping raw structure and terminology into an explicit schema so an agent can act on it accurately instead of inferring structure from raw data. Here, each `CLAUDE.md` is the schema.md for its directory: it names what's in the directory, types each entry, and states relationships (never re-derived by scanning files each session).
- **ICM (Interpretable Context Methodology)** — making an agent's understanding of a workspace checkable by a human, filesystem-based, no heavy framework. A `CLAUDE.md` tree is cheap for a human to open and verify against reality, and cheap for an agent to load only the directory it's working in.

## The conventions

1. **One `CLAUDE.md` per directory that needs one.** Not every directory needs one — only ones with enough distinct content to be worth mapping (a directory of dynamically-growing generated files, like tailored output, can just get a "grows over time, pattern documented, not itemized" note — or be itemized, if the owner wants per-item tracking; that's a judgment call, not a hard rule).

2. **Root stays a thin index.** Root `CLAUDE.md` = `# Purpose` (one line) + `# Project Map` (links to every subdirectory's `CLAUDE.md`). Nothing else lives there — Claude-Code-internal concerns (skills, hooks, settings) belong in `.claude/CLAUDE.md`, not root.

3. **Project Map format is exact:** `- [xxx/](xxx/) — <one-line description>`. Link to the folder, not its `CLAUDE.md` file — an agent working in that folder reads its `CLAUDE.md` automatically, so an explicit file link is redundant (this mirrors ICM: the root file gives global identity, routing itself is implicit in the folder structure, not a link map). No "see" before the link. The description is high-level only (what the directory is for) and never names specific files inside it — that's the subdirectory's own `CLAUDE.md`'s job, and repeating it at root creates two places that can drift out of sync. State this rule as a line of prose directly above the list in root `CLAUDE.md` — it's read every session, so it doesn't need a hook to enforce it.

4. **Every bullet links to the real file it describes.** Not just directories — files too. `- [fetch.py](fetch.py) — ...` not `- **fetch.py** — ...`. This includes cross-directory references (`[../tracker/jobs.json](../tracker/jobs.json)`), not just same-directory ones.

5. **Sections are typed.** Group bullets under named `#` headers by category (`# Scripts`, `# State`, `# Output`, `# Source Files`, `# Conventions`) instead of one flat list. The header names the *kind* of entity; each bullet is one instance with its link (key) and description (meaning) — same shape as an OKF schema table.

6. **`# Last Updated` on every file**, a `- YYYY-MM-DD` bullet, kept current by the `stamp-claude-md-date.sh` hook (deterministic, not agent-judgment — it fires on every `Edit`/`Write` to a `CLAUDE.md` that already has the section and rewrites the date).

7. **Moves get caught, not just writes.** `mv-reminder.sh` logs any `mv`/`git mv` Bash command; `check-pending-moves.py` (a `Stop` hook) greps the whole tree for the old basename and blocks the turn once if a stale reference survived the move. New-file creation gets a lighter nudge from `claude-md-reminder.sh` (`PostToolUse`/`Write`) pointing at the nearest `CLAUDE.md`.

8. **Static, session-invariant rules go in the doc, not a hook.** A hook is for things invisible from file content alone (a file moved, a file was created). A formatting rule you want followed every time is cheaper as one line of prose in the file that's already loaded into context every session — see rule 3. Don't build automation for something a sentence already solves.

9. **A directory's `# Purpose` is self-contained.** It states what the directory is, not why it's separate from some other directory (`- distinct from x/ and y/...`). Justifying a new directory against alternatives belongs in the conversation/decision that created it, not baked into the file itself — it's a stale-reference risk (drifts if the other directory's purpose changes, with no hook catching it) and it's not needed to understand the directory on its own terms.

10. **Bullet descriptions for growing/living files describe the pattern, not a snapshot.** A file expected to accumulate content over time (a running log, an ideas tracker, an append-only journal) gets a description of its role — never a reference to what's currently in it (`"starting with X"`, `"currently covers Y"`). That kind of detail is guaranteed to go stale the moment the file's content changes, with no hook to catch it — the same principle as rule 1's "grows over time, pattern documented, not itemized" note, applied at the bullet level instead of the directory level.

## Applying this to another project

1. Copy `hooks/*` into `<project>/.claude/hooks/`, `templates/settings.json.template` into `<project>/.claude/settings.json` (drop the `.template` suffix), and adapt `templates/CLAUDE.md.template` / `templates/dot-claude-CLAUDE.md.template` / `templates/subdir-CLAUDE.md.template` into the target project's actual root, `.claude/`, and per-directory `CLAUDE.md` files — filling in real directory names, files, and descriptions. Don't copy the templates verbatim; they're skeletons, not content.
2. Copy `skills/conventions-audit/` into `<project>/.claude/skills/conventions-audit/` if you want the audit checker available there too.
3. Run the `conventions-audit` skill once after bootstrapping to confirm the Project Map, links, and sections all check out.
4. This bundle is expected to grow — new hooks, template variants, or audit checks get added here first and only then rolled out to other projects that already adopted it.
