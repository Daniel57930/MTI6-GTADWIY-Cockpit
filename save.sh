#!/bin/bash
# MTI6-GTADWIY Instant Save
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
MESSAGE="${1:-Auto-save: cockpit update at $TIMESTAMP}"

echo "🚀 Saving everything to GitHub..."
git add -A && git commit -m "$MESSAGE" && git push origin main

if [ $? -eq 0 ]; then
  echo "✅ Complete - All changes synced to Daniel57930/MTI6-GTADWIY-COCKPIT"
else
  echo "❌ Push failed"
  exit 1
fi