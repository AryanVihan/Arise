const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'app');
const pages = [
  'dashboard',
  'interview',
  'feedback',
  'chat-agent',
  'resume-analyzer',
  'roadmap',
  'cover-letter',
  'courses',
  'portfolio-generator'
];

pages.forEach(page => {
  const pagePath = path.join(pagesDir, page, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    content = content.replace(
      /from ["']@\/utils\/page-utils["']/g,
      'from "@/utils/page-utils"'
    );
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Updated imports in ${pagePath}`);
  } else {
    console.log(`Page not found: ${pagePath}`);
  }
});

// Update the original page-utils.ts to .tsx
const oldUtilsPath = path.join(__dirname, 'utils', 'page-utils.ts');
const newUtilsPath = path.join(__dirname, 'utils', 'page-utils.tsx');

if (fs.existsSync(oldUtilsPath)) {
  fs.renameSync(oldUtilsPath, newUtilsPath);
  console.log('Renamed page-utils.ts to page-utils.tsx');
}
