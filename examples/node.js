// LinkedIn Jobs Scraper - Node.js example
// Requires: Node 18+ (built-in fetch), APIFY_TOKEN env var

const TOKEN = process.env.APIFY_TOKEN;
if (!TOKEN) {
    console.error('Set APIFY_TOKEN env var. Get one at https://console.apify.com/account/integrations');
    process.exit(1);
}

const keywords = process.argv[2] || 'software engineer';
const location = process.argv[3] || 'United States';
const maxJobs = Number(process.argv[4] || 25);

// run-sync-get-dataset-items waits for the run (up to 300 s) and returns the dataset.
// For larger maxJobs values start the run asynchronously and poll instead.
const url = `https://api.apify.com/v2/acts/agnes.developer.queen~linkedin-jobs-scraper/run-sync-get-dataset-items?token=${TOKEN}`;

const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keywords, location, maxJobs }),
});

if (!response.ok) {
    console.error(`Apify API returned ${response.status}: ${await response.text()}`);
    process.exit(1);
}

const jobs = await response.json();
console.log(`${jobs.length} jobs`);
for (const job of jobs) {
    console.log(`${job.postedAt ?? '----------'}  ${job.title} - ${job.companyName} (${job.location ?? 'n/a'})  ${job.url}`);
}
