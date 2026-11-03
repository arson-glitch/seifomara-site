// Fails the build if any unfinished [TO ADD] text made it into dist/.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const hits = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (/\.(html|xml|txt|json|js|css|svg)$/.test(entry.name) && readFileSync(path, 'utf8').includes('TO ADD')) hits.push(path);
  }
}
walk('dist');
if (hits.length) {
  console.error(`[TO ADD] found in:\n  ${hits.join('\n  ')}`);
  process.exit(1);
}
console.log('check-dist: no [TO ADD] in dist/');
