# 01 — Performance Review + Title Creation

**Trigger:** "let's start" (or any equivalent like "let's go", "start", "new batch")

## Data

Query past performance for patterns, don't read the full file:
```bash
jq '[.carousels[] | select(.status=="reported") | {title, plays, saves, likes}]' carousels.json
```

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
- Once confirmed, state the 3 final titles, then move to [../02-pipeline/scripts.md](../02-pipeline/scripts.md).

# Last Updated

- 2026-08-08 — update this date whenever this file is edited.