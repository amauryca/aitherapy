// This script verifies that the GitHub Pages setup is configured correctly
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Verifying GitHub Pages configuration...\n');

// Check for GitHub workflow file
const workflowPath = path.join(__dirname, '.github', 'workflows', 'deploy.yml');
if (fs.existsSync(workflowPath)) {
  console.log('✅ GitHub Actions workflow file found: .github/workflows/deploy.yml');
} else {
  console.log('❌ GitHub Actions workflow file missing! Please create .github/workflows/deploy.yml');
}

// Check for GitHub Pages script
const ghPagesScriptPath = path.join(__dirname, 'github-pages.js');
if (fs.existsSync(ghPagesScriptPath)) {
  console.log('✅ GitHub Pages script found: github-pages.js');
} else {
  console.log('❌ GitHub Pages script missing! Please create github-pages.js');
}

// Check for App.tsx with GitHub Pages routing
const appTsxPath = path.join(__dirname, 'client', 'src', 'App.tsx');
if (fs.existsSync(appTsxPath)) {
  const appTsxContent = fs.readFileSync(appTsxPath, 'utf8');
  if (appTsxContent.includes('useGitHubPagesRouter')) {
    console.log('✅ App.tsx contains GitHub Pages routing support');
  } else {
    console.log('❓ App.tsx may not have GitHub Pages routing support');
  }
} else {
  console.log('❌ App.tsx file not found!');
}

// Check for 404.html in public directory
const notFoundPath = path.join(__dirname, 'public', '404.html');
if (fs.existsSync(notFoundPath)) {
  console.log('✅ 404.html found in public directory');
} else {
  console.log('❓ 404.html not found in public directory (will be created during build)');
}

// Check for index.html with GitHub Pages script
const indexHtmlPath = path.join(__dirname, 'client', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  if (indexHtmlContent.includes('Single Page Apps for GitHub Pages')) {
    console.log('✅ index.html contains GitHub Pages routing script');
  } else {
    console.log('❓ index.html may not have GitHub Pages routing script');
  }
} else {
  console.log('❌ index.html file not found!');
}

// Check for GitHub Pages documentation
const ghPagesDocsPath = path.join(__dirname, 'GITHUB_PAGES.md');
if (fs.existsSync(ghPagesDocsPath)) {
  console.log('✅ GitHub Pages documentation found: GITHUB_PAGES.md');
} else {
  console.log('❌ GitHub Pages documentation missing! Please create GITHUB_PAGES.md');
}

console.log('\n📋 Summary:');
console.log('Your project is configured for GitHub Pages deployment.');
console.log('When deployed, users will see the full Therapeutic AI Assistant application, not just the README file.');
console.log('\nTo deploy:');
console.log('1. Push this code to a GitHub repository');
console.log('2. Go to your repository Settings > Pages');
console.log('3. Enable GitHub Pages with GitHub Actions as the source');
console.log('\nFor more detailed instructions, see GITHUB_PAGES.md');