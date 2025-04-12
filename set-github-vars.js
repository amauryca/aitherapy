// set-github-vars.js
// This script sets up environment variables for local GitHub Pages testing

import { writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Get the repository name from git remote if available
function getRepoName() {
  try {
    // Try to get the GitHub repository URL from git config
    const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
    
    // Extract the repository name from the URL
    if (remoteUrl) {
      // Handle different URL formats
      let repoName;
      
      if (remoteUrl.includes('github.com')) {
        // HTTPS URL: https://github.com/username/repo.git
        // SSH URL: git@github.com:username/repo.git
        const urlParts = remoteUrl.split(/[/:]/);
        repoName = urlParts[urlParts.length - 1].replace('.git', '');
      }
      
      return repoName || 'my-github-pages-repo';
    }
  } catch (error) {
    console.log('Could not get repository name from git config');
  }
  
  return 'my-github-pages-repo';
}

// Create .env.local file with GitHub Pages variables
function createEnvFile() {
  const repoName = getRepoName();
  
  const envContent = `# GitHub Pages environment variables
GITHUB_ACTIONS=true
GITHUB_REPOSITORY=username/${repoName}
# Uncomment and adjust below if you know your GitHub username
# GITHUB_REPOSITORY=yourusername/${repoName}
`;

  try {
    writeFileSync('.env.local', envContent);
    console.log('Created .env.local with GitHub Pages variables');
    console.log(`Repository name set to: ${repoName}`);
    console.log('');
    console.log('To use your actual GitHub username:');
    console.log('1. Edit .env.local');
    console.log('2. Update GITHUB_REPOSITORY with your actual username');
    console.log('');
  } catch (error) {
    console.error('Error creating .env.local file:', error);
  }
}

// Main execution
console.log('Setting up environment for GitHub Pages local testing...');
createEnvFile();
console.log('Done! You can now test GitHub Pages deployment locally.');
console.log('Run: npm run build');