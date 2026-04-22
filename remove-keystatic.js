const fs = require('fs');
const path = require('path');

const pathsToDelete = [
  'keystatic.config.ts',
  'src/app/keystatic',
  'src/app/api/keystatic'
];

pathsToDelete.forEach(p => {
  const fullPath = path.join(process.cwd(), p);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Deleted ${p}`);
  }
});

console.log('Keystatic files removed.');
