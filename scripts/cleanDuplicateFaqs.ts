import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'initialData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Target string to find: `\n\n---\n\n## Frequently Asked Questions (AEO & Devotee FAQ)`
// or `\n\n## Frequently Asked Questions (AEO & Devotee FAQ)`
const searchPatterns = [
  '\\n\\n---\\n\\n## Frequently Asked Questions (AEO & Devotee FAQ)',
  '\\n\\n## Frequently Asked Questions (AEO & Devotee FAQ)',
];

let replacedCount = 0;

for (const pattern of searchPatterns) {
  let idx = content.indexOf(pattern);
  while (idx !== -1) {
    // Find the ending of this content string: `",\n    "createdAt"` or `",\r\n    "createdAt"`
    const endQuotes = content.indexOf('",', idx);
    if (endQuotes !== -1 && endQuotes - idx < 5000) {
      // Replace the section from idx to endQuotes with empty string
      content = content.slice(0, idx) + content.slice(endQuotes);
      replacedCount++;
      // Search again
      idx = content.indexOf(pattern);
    } else {
      break;
    }
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Successfully stripped ${replacedCount} duplicate markdown FAQ sections from initialData.ts!`);
