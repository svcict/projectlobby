#!/usr/bin/env node
// Stamps every local script and stylesheet in index.html and mobile.html with
// ?v=<fingerprint of that file's contents>. The fingerprint only changes when
// the file does, so a changed file always gets a new address (browsers fetch
// it fresh) and an unchanged one keeps its address (browsers keep it).
//
//   node tools/stamp.js          rewrite the stamps
//   node tools/stamp.js --check  exit 1 if any stamp is out of date
//
// The git hook in .githooks runs this on every commit.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'mobile.html'];
const check = process.argv.includes('--check');
const ref = /((?:src|href)=")([^"?#:]+\.(?:js|css))(?:\?v=[0-9a-z]+)?(")/g;

const fingerprint = (file) => crypto.createHash('sha1').update(fs.readFileSync(path.join(root, file))).digest('hex').slice(0, 10);

let stale = 0;
for (const page of pages) {
  const file = path.join(root, page);
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(ref, (all, pre, url, post) => {
    if (!fs.existsSync(path.join(root, url))) return all;
    return `${pre}${url}?v=${fingerprint(url)}${post}`;
  });
  if (after !== before) {
    stale += 1;
    if (check) console.log(`${page}: version stamps are out of date`);
    else { fs.writeFileSync(file, after); console.log(`${page}: stamped`); }
  }
}
if (check && stale) { console.log('Run: node tools/stamp.js'); process.exit(1); }
if (!check && !stale) console.log('Version stamps already up to date.');
