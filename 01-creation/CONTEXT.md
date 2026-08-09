# 01 — Performance Review + Title Creation

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

## Data

Check `analysis.md`'s Last Updated date:
- If it falls within the current calendar month, read `analysis.md` directly for performance patterns — skip the query below.
- If it's stale (a prior month, or missing), query past performance for patterns, don't read the full file:
  ```bash
  jq '[.carousels[] | select(.status=="reported") | {title, plays, saves, likes}]' carousels.json
  ```
  Regenerate `analysis.md`'s pattern write-up from the result, present it to the user, and discuss before moving to title creation. Stamp today's date into its Last Updated line.

Once the user responds, for each title run [report-performance.js](report-performance.js) instead of hand-editing the JSON:
```bash
node report-performance.js --title "Title" --plays N --saves N --likes N
node report-performance.js --title "Title"   # flopped, or no metrics given at all
```

## Performance review

- Check `carousels.json` for pending carousels (`status: "pending"`, see [schema.md](schema.md)).
- If any exist, list the titles and ask: "Insert the views, saves, and likes and I'll update the records."
- If none, skip silently.

## Title creation

- Back-and-forth phase — stay here until the user has actually signed off on 3 titles, not something merely proposed.
- Propose 3 candidate titles grounded in the performance patterns above.
- Present them and wait — the user may confirm as-is, edit any of them, or swap in titles of their own.
- Once confirmed, state the 3 final titles, then move to `../02-pipeline/`.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
