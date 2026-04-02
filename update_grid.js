const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/vikas/Desktop/Projects/medipredit-ai/frontend/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    if (['About.jsx', 'Home.jsx', 'LearnMore.jsx'].includes(file)) continue;

    const fullPath = path.join(dir, file);
    let text = fs.readFileSync(fullPath, 'utf8');

    // Replace the specific grid configuration
    const pattern = /className=\"grid grid-cols-1[^\"]*gap-5\"/g;
    const match = text.match(pattern);
    if (match) {
        text = text.replace(pattern, 'className=\"grid grid-cols-1 sm:grid-cols-2 gap-5\"');
        fs.writeFileSync(fullPath, text);
        console.log('Updated', file);
    }
}
