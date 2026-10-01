"""LinkedIn Jobs Scraper - Python example.

Requires: requests, APIFY_TOKEN env var.
    pip install requests
"""

import json
import os
import sys

import requests

TOKEN = os.environ.get('APIFY_TOKEN')
if not TOKEN:
    print('Set APIFY_TOKEN env var. Get one at https://console.apify.com/account/integrations')
    sys.exit(1)

keywords = sys.argv[1] if len(sys.argv) > 1 else 'software engineer'
location = sys.argv[2] if len(sys.argv) > 2 else 'United States'
max_jobs = int(sys.argv[3]) if len(sys.argv) > 3 else 25

# run-sync-get-dataset-items waits for the run (up to 300 s) and returns the dataset.
# For larger max_jobs values start the run asynchronously and poll instead.
url = (
    'https://api.apify.com/v2/acts/agnes.developer.queen~linkedin-jobs-scraper'
    f'/run-sync-get-dataset-items?token={TOKEN}'
)

response = requests.post(
    url,
    json={'keywords': keywords, 'location': location, 'maxJobs': max_jobs},
    timeout=330,
)
response.raise_for_status()
jobs = response.json()
print(f'{len(jobs)} jobs')
for job in jobs:
    print(json.dumps({k: job.get(k) for k in ('jobId', 'title', 'companyName', 'location', 'postedAt', 'url')}))
