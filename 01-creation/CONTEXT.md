# 01 — Performance Review + Title Creation

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Reference | [analysis.md](analysis.md) | Last Updated date, then patterns | Performance patterns to ground titles in |
| Reference | [carousels.json](carousels.json) | `status: "reported"` entries (via `jq`), and pending entries | Past performance, and what still needs metrics |
| Reference | [schema.md](schema.md) | Full file | Column/type map of `carousels.json` |
| User | Views, saves, and likes for pending carousels | Per title | Recorded via [report-performance.js](report-performance.js) |

## Process

1. Check `analysis.md`'s Last Updated date:
   - If it falls within the current calendar month, read `analysis.md` directly for performance patterns — skip the query below.
   - If it's stale (a prior month, or missing), query past performance for patterns, don't read the full file:
     ```bash
     jq '[.carousels[] | select(.status=="reported") | {title, plays, saves, likes}]' carousels.json
     ```
     Regenerate `analysis.md`'s pattern write-up from the result, present it to the user, and discuss before moving to title creation. Stamp today's date into its Last Updated line.
2. Run the performance review (see below).
3. Run title creation (see below).
4. **[Checkpoint]** Present the 3 candidate titles and wait for sign-off.
5. Run the audit below, then move to [../02-pipeline/](../02-pipeline/).

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 1 (stale analysis only) | The regenerated `analysis.md` pattern write-up | Whether to discuss before moving to title creation |
| 2 | "Insert the views, saves, and likes and I'll update the records." | The metrics for each pending title |
| 4 | 3 candidate titles | Confirm as-is, edit any, or swap in their own |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Performance recorded | Every pending carousel the user gave metrics for has been run through `report-performance.js` |
| Analysis fresh | `analysis.md`'s Last Updated date falls within the current calendar month |
| Titles signed off | The user has actually confirmed 3 titles, not merely been shown them |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Updated performance records | [carousels.json](carousels.json) | JSON; written by `report-performance.js`, not hand-edited |
| Performance write-up | [analysis.md](analysis.md) | Markdown; regenerated when stale |
| 3 confirmed titles | Stated to the user, handed to [../02-pipeline/](../02-pipeline/) | Plain text |

## Performance review details

Once the user responds, for each title run [report-performance.js](report-performance.js) instead of hand-editing the JSON:
```bash
node report-performance.js --title "Title" --plays N --saves N --likes N
node report-performance.js --title "Title"   # flopped, or no metrics given at all
```

- Check `carousels.json` for pending carousels (`status: "pending"`, see [schema.md](schema.md)).
- If any exist, list the titles and ask: "Insert the views, saves, and likes and I'll update the records."
- If none, skip silently.

## Title creation details

- Back-and-forth phase — stay here until the user has actually signed off on 3 titles, not something merely proposed.
- Propose 3 candidate titles grounded in the performance patterns above.
- Present them and wait — the user may confirm as-is, edit any of them, or swap in titles of their own.
- Once confirmed, state the 3 final titles, then move to [../02-pipeline/](../02-pipeline/).

# Last Updated

- 2026-11-02 — update this date whenever this file is edited.
