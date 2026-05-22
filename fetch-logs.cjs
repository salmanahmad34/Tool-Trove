const fs = require('fs');
const https = require('https');

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      headers: { 'User-Agent': 'Node.js', ...options.headers }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location, options).then(resolve).catch(reject);
        }
        resolve({ statusCode: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log("Fetching runs...");
  const runsRes = await fetch('https://api.github.com/repos/salmanahmad34/Tool-Trove/actions/runs?per_page=5');
  const runs = JSON.parse(runsRes.data).workflow_runs;
  
  if (!runs || runs.length === 0) {
    console.log("No runs found.");
    return;
  }
  
  const latestRun = runs[0];
  console.log(`Latest run ID: ${latestRun.id}, status: ${latestRun.status}, conclusion: ${latestRun.conclusion}`);
  
  console.log(`Fetching jobs for run ${latestRun.id}...`);
  const jobsRes = await fetch(`https://api.github.com/repos/salmanahmad34/Tool-Trove/actions/runs/${latestRun.id}/jobs`);
  const jobs = JSON.parse(jobsRes.data).jobs;
  
  const failedJob = jobs.find(j => j.conclusion === 'failure');
  if (!failedJob) {
    console.log("No failed jobs found in the latest run.");
    return;
  }
  console.log(`Found failed job: ${failedJob.name} (ID: ${failedJob.id})`);
  
  console.log(`Fetching logs for job ${failedJob.id}...`);
  const logsRes = await fetch(`https://api.github.com/repos/salmanahmad34/Tool-Trove/actions/jobs/${failedJob.id}/logs`);
  console.log("==== LOGS START ====");
  const logs = logsRes.data.split('\n');
  const errorLines = logs.slice(Math.max(logs.length - 200, 0)); // Last 200 lines
  console.log(errorLines.join('\n'));
  console.log("==== LOGS END ====");
}

run().catch(console.error);
