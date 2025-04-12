// This script sets important environment variables for GitHub Pages deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getRepoName() {
  try {
    // Try to get the repository name from Git
    const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
    
    if (remoteUrl) {
      // Extract repo name from git URL
      // Format could be: https://github.com/username/repo.git or git@github.com:username/repo.git
      let repoName = '';
      
      if (remoteUrl.includes('github.com')) {
        if (remoteUrl.includes(':')) {
          // SSH format
          repoName = remoteUrl.split(':')[1].split('.git')[0].split('/').pop();
        } else {
          // HTTPS format
          repoName = remoteUrl.split('/').pop().replace('.git', '');
        }
        
        return repoName;
      }
    }
  } catch (error) {
    console.warn('Could not get repository name from Git:', error.message);
  }
  
  // Fallback: use the current directory name
  return path.basename(__dirname);
}

function createEnvFile() {
  const repoName = getRepoName();
  console.log(`Repository name detected: ${repoName}`);
  
  // Create .env file with GitHub Pages specific variables
  const envContent = `# GitHub Pages configuration
# This file is generated automatically by set-github-vars.js
# Do not edit manually

# The base path for GitHub Pages deployment
VITE_BASE_PATH="/${repoName}/"

# The repository name (used for constructing GitHub Pages URLs)
VITE_REPO_NAME="${repoName}"

# Enable GitHub Pages compatibility mode
VITE_GITHUB_PAGES="true"
`;

  fs.writeFileSync(path.join(__dirname, '.env'), envContent);
  console.log('.env file created with GitHub Pages variables');
  
  // Also write a .env.production file that will be used during the build
  fs.writeFileSync(path.join(__dirname, '.env.production'), envContent);
  console.log('.env.production file created with GitHub Pages variables');
  
  console.log('\nGitHub Pages environment variables are now set.');
  console.log('You can now build your application for GitHub Pages deployment.');
}

// Run the function to create the environment file
createEnvFile();