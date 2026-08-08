# Title Pattern Notes

Merged recovered legacy data (pre-migration `performance.json` winners) with the current `reported` set in `carousels.json` — 75 unique titles total (up from 43).

**Data-quality caveats:**
- 6 old "winners" have `null` plays — dropped, no signal.
- 15 have exactly `1000` plays — suspiciously round and repeats too often to be real measurements. Looks like an old placeholder/floor value from the pre-migration schema, not actual counts. Treated as low-confidence, not zero-weight.

## Pattern

Seasonal is the single strongest signal in the whole dataset:

| Bucket | Range | Read |
|---|---|---|
| "Built for Summer" / "Built for the Heat" | 6,000 | Broad seasonal beats everything except the top 2 outcome titles |
| "That [X happens to you socially, active verb]" | 5,700–8,554 | Walk Into a Room, Turn Heads, Double Take, Stop People in Their Tracks, Feel Illegal to Wear — all direct, active social-effect claims |
| "That Smell Like [money/luxury metaphor]" | 1,100–2,169 | Passive comparison metaphors (Old Money, Pure Luxury, Five-Star Hotel) consistently underperform the active-verb version of the same idea |
| "Built for [narrow occasion]" | 1,000–1,800 | Road Trip, Rooftop, Gym, Beach, Ski Trip, Boardroom, etc. — the floor of the dataset, seasonal exceptions aside |
| "NEED a Fragrance for X?" | 1,000–3,000 | Mostly flat, except "Summer Nights" (3,000) — riding the same seasonal boost, not the question format |

## Takeaway

The strongest lever isn't "That vs. Built for" as a template — it's **universal/seasonal relevance** (Summer, Heat) or a **direct active-verb social-effect claim** (turn heads, stop people, walk into a room). Narrow occasions and passive luxury metaphors are the two things that reliably underperform, regardless of which template wraps them.

For the next batch, best bets:
- `"5 Fragrances Built for [Fall/Winter/current season]"`
- `"5 Fragrances That [Make/Stop/Turn — active verb about others noticing you]"`
