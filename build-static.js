// build-static.js
// This script builds a static version of the application for GitHub Pages deployment

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Building static version of the Therapeutic AI Assistant for GitHub Pages...');

try {
  // Build the application
  console.log('\n1. Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Run GitHub Pages script
  console.log('\n2. Creating GitHub Pages files...');
  execSync('node github-pages.js', { stdio: 'inherit' });
  
  const distDir = path.join(__dirname, 'dist', 'public');
  
  // Check if build was successful
  if (fs.existsSync(distDir)) {
    console.log(`\n✅ Build completed successfully!`);
    console.log(`\nThe static version of your application is now available in the '${distDir}' directory.`);
    console.log('\nTo deploy to GitHub Pages:');
    console.log('1. Push your code to GitHub');
    console.log('2. The GitHub Actions workflow will automatically deploy your site.');
    console.log('\nOr follow the manual steps in GITHUB_PAGES.md');
  } else {
    console.error('\n❌ Build failed. The dist/public directory was not created.');
    process.exit(1);
  }
} catch (error) {
  console.error(`\n❌ Build process failed with error: ${error.message}`);
  process.exit(1);
}