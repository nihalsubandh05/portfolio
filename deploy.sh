#!/usr/bin/env bash
# One-shot deploy to GitHub Pages. Run after: gh auth login
set -euo pipefail

REPO_NAME="portfolio"
USER=$(gh api user --jq .login)

echo "→ Creating repo $USER/$REPO_NAME (public) and pushing..."
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

echo "→ Enabling GitHub Pages (GitHub Actions source)..."
gh api -X POST "repos/$USER/$REPO_NAME/pages" \
  -f "build_type=workflow" 2>/dev/null || \
  echo "  (Pages may already be enabling via the workflow run)"

echo "→ Triggering deploy workflow..."
gh workflow run deploy.yml 2>/dev/null || true

echo ""
echo "Done. Your site will be live in ~1–2 minutes at:"
echo "    https://$USER.github.io/$REPO_NAME/"
echo "Watch the build:  gh run watch"
