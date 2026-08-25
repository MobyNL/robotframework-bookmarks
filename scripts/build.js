#!/usr/bin/env node
/*
 * Regenerates the default bookmarklet from data/links.js and writes it to
 * dist/default.bookmarklet.js, then updates the code block in README.md
 * between the BOOKMARKLET:START/END markers.
 *
 * Usage: node scripts/build.js  (or: npm run build)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const categories = require(path.join(ROOT, 'data', 'links.js'));
const buildBookmarklet = require(path.join(ROOT, 'scripts', 'lib.js'));

const bookmarklet = buildBookmarklet(categories, {
  title: 'RF Links',
  id: '__rfbm',
  storageKey: 'rf-bm-theme'
});

const distDir = path.join(ROOT, 'dist');
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'default.bookmarklet.js'), bookmarklet + '\n');

const readmePath = path.join(ROOT, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8');
const START = '<!-- BOOKMARKLET:START -->';
const END = '<!-- BOOKMARKLET:END -->';
const startIdx = readme.indexOf(START);
const endIdx = readme.indexOf(END);

if (startIdx === -1 || endIdx === -1) {
  console.error('README.md is missing BOOKMARKLET:START/END markers; skipping README update.');
} else {
  const before = readme.slice(0, startIdx + START.length);
  const after = readme.slice(endIdx);
  const block = '\n\n```\n' + bookmarklet + '\n```\n\n';
  fs.writeFileSync(readmePath, before + block + after);
}

console.log('Built ' + bookmarklet.length + '-char bookmarklet -> dist/default.bookmarklet.js');
