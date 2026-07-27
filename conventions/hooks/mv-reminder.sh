#!/usr/bin/env bash
# PostToolUse hook (matcher: Bash). Reminds the agent to check/update the
# relevant CLAUDE.md files when a command moves or renames files, and logs
# the move so the Stop hook (check-pending-moves.py) can verify it later.
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
LOG="$ROOT/.claude/hooks/.pending-moves.jsonl"

INPUT="$(cat)"
CMD="$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')"

[ -z "$CMD" ] && exit 0

# Match `mv ...` or `git mv ...` as a standalone command (start of string,
# or after a shell separator like ; && ||), not as a substring of another
# word (e.g. "mvn", "expensive").
if printf '%s' "$CMD" | grep -qE '(^|[;&|]\s*)(git[[:space:]]+)?mv[[:space:]]'; then
  jq -nc --arg cmd "$CMD" '{command: $cmd, checked: 0}' >> "$LOG"

  MSG="This command appears to move/rename files: \`$CMD\`. If it relocates anything documented in a CLAUDE.md, update the old location's entry (remove/adjust it) and add an entry at the new location's nearest CLAUDE.md before finishing this task. This will also be auto-verified before the turn ends."
  jq -n --arg msg "$MSG" '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $msg}}'
fi
