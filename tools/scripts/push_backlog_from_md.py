#!/usr/bin/env python3
"""
Parse docs/BACKLOG.md and create GitHub issues via `gh issue create`.

Story blocks are detected as Markdown headings:

    ### GEN-1 · Title here

followed by bullet content until the next ### or ## heading.

Optional: --include-strategic turns bullets under "## 🚀 Missing Opportunities"
into issues titled [STRAT-N] ...

Requirements: Python 3.9+, GitHub CLI (`gh`) authenticated.

Usage:
  ./tools/scripts/push_backlog_from_md.py --dry-run
  ./tools/scripts/push_backlog_from_md.py
  REPO=owner/repo ./tools/scripts/push_backlog_from_md.py --include-strategic

  ./tools/scripts/push_backlog_from_md.py --parse-only   # JSON to stdout, no gh
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional

# ## 1. Scaffolding & Generators → area:scaffolding
SECTION_AREA: dict[str, str] = {
    "1": "area:scaffolding",
    "2": "area:ui",
    "3": "area:docs",
    "4": "area:ai",
    "5": "area:devops",
    "6": "area:testing",
    "7": "area:architecture",
}

STORY_HEADING_RE = re.compile(
    r"^###\s+(?P<id>[A-Z]{2,12}-\d+)\s*[·\.]\s*(?P<title>.+?)\s*$"
)
SECTION_NUMBERED_RE = re.compile(r"^##\s+(?P<num>\d+)\.\s+")
STRATEGIC_SECTION_RE = re.compile(r"^##\s*🚀\s*Missing Opportunities", re.UNICODE)
RISKS_SECTION_RE = re.compile(r"^##\s*⚠️", re.UNICODE)
PRIORITY_RE = re.compile(
    r"\*\*Priority\*\*:\s*\*\*(?P<p>P[0-2])\*\*", re.IGNORECASE
)
STRATEGIC_BULLET_RE = re.compile(
    r"^\s*-\s*\*\*(?P<title>.+?)\*\*\s*(?P<body>.*)$"
)


@dataclass
class ParsedIssue:
    issue_id: str  # e.g. GEN-1
    title_suffix: str
    body: str
    area_label: str
    extra_labels: List[str] = field(default_factory=list)

    @property
    def github_title(self) -> str:
        return f"[{self.issue_id}] {self.title_suffix.strip()}"


def _strip_trailing_separator(body: str) -> str:
    lines = body.rstrip().splitlines()
    while lines and lines[-1].strip() in ("---", ""):
        lines.pop()
    return "\n".join(lines).strip() + ("\n" if lines else "")


def _priority_label(body: str) -> Optional[str]:
    m = PRIORITY_RE.search(body)
    if not m:
        return None
    return f"priority:{m.group('p').lower()}"


def _extra_labels_generic(issue: ParsedIssue, body: str) -> List[str]:
    labels: List[str] = ["type:story"]
    p = _priority_label(body)
    if p:
        labels.append(p)
    if issue.area_label == "area:ui":
        labels.extend(["mobile-first", "a11y", "cross-framework"])
    elif "axe" in body.lower() or "**A11y**" in body or "accessib" in body.lower():
        labels.append("a11y")
    if "Mobile-first" in body or "**Mobile-first**" in body:
        if "mobile-first" not in labels:
            labels.append("mobile-first")
    if "**Cross-framework**" in body or "Angular + React" in body:
        if "cross-framework" not in labels:
            labels.append("cross-framework")
    return labels


def parse_backlog_md(content: str, *, include_strategic: bool) -> List[ParsedIssue]:
    lines = content.splitlines()
    issues: List[ParsedIssue] = []
    current_area = "area:architecture"
    in_strategic = False
    strategic_index = 0

    i = 0
    while i < len(lines):
        line = lines[i]

        if STRATEGIC_SECTION_RE.match(line):
            in_strategic = True
            i += 1
            continue

        # Must run before the strategic bullet fast-path, or we swallow section headings (e.g. Risks).
        if in_strategic and RISKS_SECTION_RE.match(line):
            in_strategic = False
            i += 1
            continue

        if in_strategic and include_strategic:
            mb = STRATEGIC_BULLET_RE.match(line)
            if mb:
                strategic_index += 1
                title_short = mb.group("title").strip().rstrip(".")
                body_rest = mb.group("body").strip()
                sid = f"STRAT-{strategic_index}"
                body = body_rest if body_rest else "(See backlog narrative in docs/BACKLOG.md.)"
                issues.append(
                    ParsedIssue(
                        issue_id=sid,
                        title_suffix=title_short,
                        body=f"**Source**: Strategic improvement from docs/BACKLOG.md\n\n{body}",
                        area_label="area:architecture",
                        extra_labels=["type:improvement", "priority:p1"],
                    )
                )
            i += 1
            continue

        sec = SECTION_NUMBERED_RE.match(line)
        if sec:
            num = sec.group("num")
            current_area = SECTION_AREA.get(num, "area:architecture")
            in_strategic = False

        mh = STORY_HEADING_RE.match(line)
        if mh:
            issue_id = mh.group("id")
            title_suffix = mh.group("title").strip()
            i += 1
            body_lines: List[str] = []
            while i < len(lines):
                nxt = lines[i]
                if STORY_HEADING_RE.match(nxt) or (
                    nxt.startswith("##") and not nxt.startswith("###")
                ):
                    break
                if STRATEGIC_SECTION_RE.match(nxt):
                    break
                body_lines.append(nxt)
                i += 1
            raw_body = "\n".join(body_lines)
            body = _strip_trailing_separator(raw_body)
            issue = ParsedIssue(
                issue_id=issue_id,
                title_suffix=title_suffix,
                body=body,
                area_label=current_area,
            )
            issue.extra_labels = _extra_labels_generic(issue, body)
            issues.append(issue)
            continue

        i += 1

    return issues


def _gh_repo_flag() -> List[str]:
    repo = os.environ.get("REPO")
    if repo:
        return ["--repo", repo]
    return []


def _ensure_labels(dry_run: bool) -> None:
    """Create common labels if missing (idempotent with gh label create || true)."""
    labels_def = [
        ("area:scaffolding", "1d76db", "Generators, schematics, app scaffolding"),
        ("area:ui", "5319e7", "UI components & design system"),
        ("area:docs", "0e8a16", "Documentation & discoverability"),
        ("area:ai", "fbca04", "AI tooling, MCP servers, prompts"),
        ("area:devops", "b60205", "CI/CD, Docker, environments"),
        ("area:testing", "c2e0c6", "Testing & quality"),
        ("area:architecture", "5319e7", "Architecture, governance, ADRs"),
        ("type:story", "bfd4f2", "User story"),
        ("type:improvement", "bfdadc", "Improvement / chore"),
        ("priority:p0", "b60205", "Do next"),
        ("priority:p1", "d93f0b", "Plan"),
        ("priority:p2", "fbca04", "Opportunistic"),
        ("mobile-first", "0e8a16", "Mobile-first behaviour mandatory"),
        ("a11y", "0e8a16", "Accessibility considerations"),
        ("cross-framework", "0e8a16", "Angular + React parity required"),
    ]
    repo = _gh_repo_flag()
    for name, color, desc in labels_def:
        if dry_run:
            print(
                "[dry-run] gh label create",
                name,
                "--color",
                color,
                "--description",
                desc,
                *repo,
            )
            continue
        r = subprocess.run(
            ["gh", "label", "create", name, "--color", color, "--description", desc, *repo],
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            subprocess.run(
                ["gh", "label", "edit", name, "--color", color, "--description", desc, *repo],
                capture_output=True,
            )


def _existing_titles() -> set[str]:
    repo = _gh_repo_flag()
    r = subprocess.run(
        ["gh", "issue", "list", "--state", "all", "--limit", "1000", "--json", "title", *repo],
        capture_output=True,
        text=True,
        check=True,
    )
    data = json.loads(r.stdout)
    return {item["title"] for item in data}


def create_issue(issue: ParsedIssue, *, dry_run: bool) -> None:
    repo = _gh_repo_flag()
    labels = [issue.area_label] + issue.extra_labels
    # Dedupe while preserving order
    seen = set()
    uniq_labels: List[str] = []
    for lb in labels:
        if lb not in seen:
            seen.add(lb)
            uniq_labels.append(lb)

    title = issue.github_title

    if dry_run:
        print(f"[dry-run] CREATE: {title}")
        print(f"          labels: {uniq_labels}")
        return

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".md", delete=False, encoding="utf-8"
    ) as tf:
        tf.write(issue.body)
        tmp_path = tf.name
    try:
        cmd: List[str] = [
            "gh",
            "issue",
            "create",
            *repo,
            "--title",
            title,
            "--body-file",
            tmp_path,
        ]
        for lb in uniq_labels:
            cmd.extend(["--label", lb])
        subprocess.run(cmd, check=True)
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass


def main() -> int:
    root = Path(__file__).resolve().parents[2]
    default_md = root / "docs" / "BACKLOG.md"

    ap = argparse.ArgumentParser(description="Push docs/BACKLOG.md stories to GitHub Issues.")
    ap.add_argument(
        "--file",
        type=Path,
        default=default_md,
        help=f"Path to BACKLOG.md (default: {default_md})",
    )
    ap.add_argument("--dry-run", action="store_true", help="Print actions only")
    ap.add_argument(
        "--parse-only",
        action="store_true",
        help="Print JSON of parsed issues and exit (no gh)",
    )
    ap.add_argument(
        "--include-strategic",
        action="store_true",
        help="Also create issues from '🚀 Missing Opportunities' bullet list",
    )
    ap.add_argument(
        "--skip-labels",
        action="store_true",
        help="Do not create/update gh labels before creating issues",
    )
    args = ap.parse_args()

    if not args.file.is_file():
        print(f"ERROR: File not found: {args.file}", file=sys.stderr)
        return 1

    text = args.file.read_text(encoding="utf-8")
    issues = parse_backlog_md(text, include_strategic=args.include_strategic)

    if args.parse_only:
        out = [
            {
                "id": i.issue_id,
                "title": i.github_title,
                "labels": [i.area_label] + i.extra_labels,
                "body": i.body,
            }
            for i in issues
        ]
        json.dump(out, sys.stdout, indent=2, ensure_ascii=False)
        sys.stdout.write("\n")
        return 0

    if not args.dry_run:
        chk = subprocess.run(["gh", "auth", "status"], capture_output=True)
        if chk.returncode != 0:
            print(
                "ERROR: GitHub CLI is not authenticated. Run: gh auth login",
                file=sys.stderr,
            )
            return 1

    if not args.skip_labels:
        _ensure_labels(args.dry_run)

    existing: set[str] = set()
    if not args.dry_run:
        existing = _existing_titles()

    created = 0
    skipped = 0
    for issue in issues:
        t = issue.github_title
        if t in existing:
            print(f"SKIP (exists): {t}")
            skipped += 1
            continue
        print(f"CREATE: {t}")
        create_issue(issue, dry_run=args.dry_run)
        created += 1
        if not args.dry_run:
            existing.add(t)

    print(f"Done. created={created} skipped={skipped} total_parsed={len(issues)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
