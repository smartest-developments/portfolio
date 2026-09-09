#!/usr/bin/env python3
"""Produce a local editorial queue from private GitHub repository metadata.

The report is intentionally not part of the public website. It helps a daily
curation run decide which new projects deserve a private README review.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OWNER = os.environ.get("PORTFOLIO_GITHUB_OWNER", "smartest-developments")
EXCLUDED = re.compile(
    r"tinder|fitness|bike|speech|bootcamp|avatar|tesi|mole|flutter|java|secret|"
    r"chat.?export|garage|moto|cantiere|valet|parking",
    re.IGNORECASE,
)
RELEVANT = re.compile(
    r"ai|agent|assistant|manager|operations|outreach|legal|cost|prompt|job|"
    r"calendar|mail|whatsapp|buyer|score|think|alteryx|migration",
    re.IGNORECASE,
)


def github_cli() -> str:
    for candidate in ("/opt/homebrew/bin/gh", "gh"):
        if candidate == "gh" or Path(candidate).exists():
            return candidate
    return "gh"


def read_repositories() -> list[dict]:
    command = [
        github_cli(),
        "repo",
        "list",
        OWNER,
        "--limit",
        "200",
        "--json",
        "name,description,updatedAt,isPrivate,isArchived,primaryLanguage,url",
    ]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode:
        raise RuntimeError("Could not read the GitHub project inventory. Ensure the GitHub CLI is authenticated.")
    return json.loads(result.stdout)


def score_repository(repository: dict) -> dict:
    text = f"{repository['name']} {repository.get('description') or ''}"
    excluded = bool(EXCLUDED.search(text))
    score = (2 if RELEVANT.search(text) else 0) + (1 if repository.get("primaryLanguage") else 0) - (5 if excluded else 0)
    return {
        "name": repository["name"],
        "language": (repository.get("primaryLanguage") or {}).get("name"),
        "updated_at": repository["updatedAt"],
        "score": score,
        "recommended_for_review": score >= 2,
        "excluded_by_default": excluded,
    }


def main() -> None:
    repositories = read_repositories()
    candidates = [
        score_repository(repository)
        for repository in repositories
        if repository.get("isPrivate") and not repository.get("isArchived")
    ]
    candidates.sort(key=lambda candidate: candidate["updated_at"], reverse=True)

    recommended = [candidate for candidate in candidates if candidate["recommended_for_review"]]
    excluded = [candidate for candidate in candidates if candidate["excluded_by_default"]]
    report = [
        "# Portfolio discovery report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        f"Owner: {OWNER}",
        "",
        "## Recommended for editorial review",
        "",
        "| Project | Language | Updated | Why it was flagged |",
        "| --- | --- | --- | --- |",
        *[
            f"| {candidate['name']} | {candidate['language'] or '—'} | {candidate['updated_at'][:10]} | Product/operations naming and an active private repository |"
            for candidate in recommended
        ],
        "",
        "## Excluded by default",
        "",
        *[f"- {candidate['name']}" for candidate in excluded],
    ]
    output = ROOT / "reports" / "portfolio-discovery.md"
    output.parent.mkdir(exist_ok=True)
    output.write_text("\n".join(report) + "\n", encoding="utf-8")
    print(f"Wrote {output}")


if __name__ == "__main__":
    main()
