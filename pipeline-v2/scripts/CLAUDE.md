# Stage 1 — Script Generation (pipeline-v2, Design v2)

Follow [pipeline-v1/scripts/CLAUDE.md](../../pipeline-v1/scripts/CLAUDE.md) for shared generation rules — fragrance exclusions, niche tier taxonomy, niche mix logic, and performance.json update format. Apply these v2-specific differences:

- **Step 1:** filter performance signals by `"design": "v2"` entries (v1 entries are also valid context until v2 builds its own history)
- **Step 3:** also confirm **gender audience** (men / women / unisex) for each fragrance
- **Step 5 (v2 only):** after writing all files, ask the user: "3 titles ready. Drop 3 Pinterest URLs for the title backgrounds (one per line, carousel order) and I'll build immediately."
- **Step 4 path:** write [fragrantica-links.md](../images/fragrantica-links.md) instead of pipeline-v1's path
- **Step 6:** append to [fragrance-picks.json](../../pipeline-v1/scripts/data/fragrance-picks.json) `already_used`
- **Step 7:** append to [performance.json](../../pipeline-v1/scripts/data/performance.json) `pending` with `"design": "v2"`

---

## [pipeline-v2/images/fragrantica-links.md](../images/fragrantica-links.md) format

Write fragrantica links here — `process-images.js` reads it to auto-download both bottle images and card images.

```
c1-s1: https://www.fragrantica.com/perfume/Brand/Fragrance-Name-12345.html
c1-s2: https://www.fragrantica.com/perfume/Brand/Fragrance-Name-12345.html
c1-s3: ...
c1-s4: ...
c1-s5: ...
c2-s1: ...
...
c3-s5: ...
```

Capture these during step 3's verification search. The numeric ID suffix (e.g. `-46038.html`) is required — never leave a line blank.
