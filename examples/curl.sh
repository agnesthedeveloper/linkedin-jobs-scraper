#!/usr/bin/env bash
# LinkedIn Jobs Scraper - curl example
# Requires: APIFY_TOKEN env var, jq

set -euo pipefail

if [ -z "${APIFY_TOKEN:-}" ]; then
    echo "Set APIFY_TOKEN env var first. Get one at https://console.apify.com/account/integrations"
    exit 1
fi

KEYWORDS="${1:-software engineer}"
LOCATION="${2:-United States}"
MAX_JOBS="${3:-25}"

# run-sync-get-dataset-items waits for the run (up to 300 s) and returns the dataset.
# For larger maxJobs values start the run asynchronously and poll instead.
curl -s -X POST \
    "https://api.apify.com/v2/acts/agnes.developer.queen~linkedin-jobs-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"keywords\": \"${KEYWORDS}\", \"location\": \"${LOCATION}\", \"maxJobs\": ${MAX_JOBS}}" \
    | jq '.[] | {jobId, title, companyName, location, postedAt, url}'
