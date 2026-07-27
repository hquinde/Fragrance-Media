#!/usr/bin/env bash
# PostToolUse hook (matcher: Edit|Write). Stamps today's date into the
# "# Last Updated" section of any CLAUDE.md that already has one.
set -euo pipefail

INPUT="$(cat)"
FILE_PATH="$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')"

[ -z "$FILE_PATH" ] && exit 0
[ "$(basename "$FILE_PATH")" = "CLAUDE.md" ] || exit 0
[ -f "$FILE_PATH" ] || exit 0

grep -q '^# Last Updated$' "$FILE_PATH" || exit 0

TODAY="$(date +%F)"
python3 - "$FILE_PATH" "$TODAY" <<'PYEOF'
import re
import sys

path, today = sys.argv[1], sys.argv[2]

with open(path) as f:
    text = f.read()

new_text = re.sub(
    r"(# Last Updated\n\n- )\d{4}-\d{2}-\d{2}",
    lambda m: m.group(1) + today,
    text,
    count=1,
)

if new_text != text:
    with open(path, "w") as f:
        f.write(new_text)
PYEOF
