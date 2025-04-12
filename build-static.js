// build-static.js
// A helper script to build the static site for GitHub Pages deployment
import { exec } from 'child_process';

console.log('Building static site for GitHub Pages...');
exec('npx vite build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during build: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
  }
  console.log(`Build completed: ${stdout}`);
  
  console.log('Static site built and ready for GitHub Pages!');
});