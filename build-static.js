// Build script for creating static GitHub Pages version
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Building Therapeutic AI Assistant for GitHub Pages deployment...');

// Function to execute commands with proper logging
const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`);
    
    const childProcess = exec(command);
    
    childProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    
    childProcess.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
};

// Main build process
async function buildForGitHubPages() {
  try {
    // 1. Build the application
    await execPromise('npm run build');
    
    // 2. Prepare the dist directory for GitHub Pages
    const publicDir = path.join(__dirname, 'dist', 'public');
    
    // 3. Create .nojekyll file
    fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
    console.log('Created .nojekyll file to disable Jekyll processing');
    
    // 4. Create CNAME file if needed (for custom domain)
    // fs.writeFileSync(path.join(publicDir, 'CNAME'), 'your-custom-domain.com');
    // console.log('Created CNAME file for custom domain');
    
    // 5. Run the GitHub Pages specific script
    await execPromise('node github-pages.js');
    
    console.log('\n✅ Build completed successfully!');
    console.log('The application is ready to be deployed to GitHub Pages.');
    console.log('Files are located in the dist/public directory.');
    console.log('\nTo deploy manually:');
    console.log('1. Push to your GitHub repository');
    console.log('2. Go to your repository Settings > Pages');
    console.log('3. Select the "GitHub Actions" source');
    console.log('\nOr let the GitHub Actions workflow handle it automatically.');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run the build process
buildForGitHubPages();