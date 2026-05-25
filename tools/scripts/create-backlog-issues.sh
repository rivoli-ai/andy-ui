#!/usr/bin/env bash
# create-backlog-issues.sh
#
# Creates labels and GitHub issues for the Omnifex UI backlog from
# tools/scripts/backlog-issues.json, using the GitHub CLI (`gh`).
#
# Usage:
#   tools/scripts/create-backlog-issues.sh                 # create labels + issues
#   tools/scripts/create-backlog-issues.sh --dry-run       # print what would happen
#   tools/scripts/create-backlog-issues.sh --labels-only   # only create/update labels
#   tools/scripts/create-backlog-issues.sh --issues-only   # skip label creation
#   REPO=owner/name tools/scripts/create-backlog-issues.sh # target a specific repo
#
# Requirements:
#   - gh CLI authenticated (`gh auth login`)
#   - jq installed
#
# Idempotency:
#   - Labels: created if missing, otherwise updated (color/description).
#   - Issues: skipped if an OPEN issue with the same exact title already exists.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JSON_FILE="${SCRIPT_DIR}/backlog-issues.json"

DRY_RUN=0
DO_LABELS=1
DO_ISSUES=1

for arg in "$@"; do
  case "$arg" in
    --dry-run)      DRY_RUN=1 ;;
    --labels-only)  DO_ISSUES=0 ;;
    --issues-only)  DO_LABELS=0 ;;
    -h|--help)
      sed -n '1,30p' "$0"; exit 0 ;;
    *) echo "Unknown arg: $arg" >&2; exit 2 ;;
  esac
done

command -v gh >/dev/null || { echo "ERROR: gh CLI not installed"; exit 1; }
command -v jq >/dev/null || { echo "ERROR: jq not installed"; exit 1; }
[[ -f "$JSON_FILE" ]] || { echo "ERROR: $JSON_FILE not found"; exit 1; }

if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: gh is not authenticated. Run: gh auth login"
  exit 1
fi

REPO_FLAG=()
if [[ -n "${REPO:-}" ]]; then REPO_FLAG=(--repo "$REPO"); fi

run() {
  if [[ $DRY_RUN -eq 1 ]]; then
    printf '[dry-run] '; printf '%q ' "$@"; printf '\n'
  else
    "$@"
  fi
}

# ---------- Labels ----------
if [[ $DO_LABELS -eq 1 ]]; then
  echo "==> Ensuring labels exist..."
  jq -c '.labels[]' "$JSON_FILE" | while read -r label; do
    name=$(jq -r '.name'        <<<"$label")
    color=$(jq -r '.color'       <<<"$label")
    desc=$(jq -r '.description'  <<<"$label")
    if gh label list "${REPO_FLAG[@]}" --limit 200 --json name -q '.[].name' | grep -Fxq "$name"; then
      echo "  - update: $name"
      run gh label edit "$name" --color "$color" --description "$desc" "${REPO_FLAG[@]}" || true
    else
      echo "  - create: $name"
      run gh label create "$name" --color "$color" --description "$desc" "${REPO_FLAG[@]}" || true
    fi
  done
fi

# ---------- Issues ----------
if [[ $DO_ISSUES -eq 1 ]]; then
  echo "==> Creating issues..."
  total=$(jq '.issues | length' "$JSON_FILE")
  echo "    $total issues defined in manifest"

  existing_titles=$(gh issue list "${REPO_FLAG[@]}" --state all --limit 500 --json title -q '.[].title' || true)

  i=0
  jq -c '.issues[]' "$JSON_FILE" | while read -r issue; do
    i=$((i+1))
    title=$(jq -r '.title' <<<"$issue")
    body=$(jq -r '.body'  <<<"$issue")
    labels=$(jq -r '.labels | join(",")' <<<"$issue")

    if grep -Fxq "$title" <<<"$existing_titles"; then
      echo "  [$i/$total] SKIP (exists): $title"
      continue
    fi

    echo "  [$i/$total] CREATE: $title  [$labels]"
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "[dry-run] gh issue create --title <title> --label \"$labels\" --body-file -"
    else
      gh issue create "${REPO_FLAG[@]}" \
        --title "$title" \
        --label "$labels" \
        --body "$body" >/dev/null
    fi
  done
fi

echo "==> Done."
