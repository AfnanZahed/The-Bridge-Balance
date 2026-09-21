// Quick check to find what CSS rules apply to the sidebar wrapper
// in the current build.

const fs = require('fs');
const path = require('path');

// Read custom.css
const css = fs.readFileSync(
  path.join(__dirname, 'src/css/custom.css'),
  'utf8'
);

// Find any rule that might affect the docRoot / aside / sidebar-container
const lines = css.split('\n');
const patterns = /theme-doc-sidebar|docSidebarContainer|docRoot|docsWrapper|mainWrapper|sidebarViewport|sidebar\s*\{|sidebar\s*,/;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (patterns.test(line)) {
    console.log(`L${i + 1}: ${line.trim()}`);
  }
}
