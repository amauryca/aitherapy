// This script creates necessary files for GitHub Pages deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createGitHubPagesFiles() {
  const publicDir = path.join(__dirname, 'dist', 'public');
  
  // Check if the public directory exists
  if (!fs.existsSync(publicDir)) {
    console.error('Error: dist/public directory not found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  // Create 404.html file for GitHub Pages SPA routing
  const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Therapeutic AI Assistant - Page Not Found</title>
  <script>
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current URL and converts the path and query string into just a query string,
    // and then redirects the browser to the new URL with only a query string.
    // For amauryca.github.io/Emotional-Therapy, we need to keep 2 segments (username and repo name)
    var pathSegmentsToKeep = 2;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  <h1>Page Not Found</h1>
  <p>Redirecting to home page...</p>
</body>
</html>
`;

  // Create the 404.html file
  fs.writeFileSync(path.join(publicDir, '404.html'), notFoundHtml);
  console.log('Created 404.html for GitHub Pages SPA routing');

  // Update index.html to handle GitHub Pages SPA routing
  const indexPath = path.join(publicDir, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  // Check if the GitHub Pages redirect script is already in the file
  if (!indexHtml.includes('Single Page Apps for GitHub Pages')) {
    // Add the GitHub Pages redirect script
    const scriptToAdd = `
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
    
    // Set a global variable for the Emotional-Therapy repository path
    window.REPO_PATH = '/Emotional-Therapy';
    
    // Add a meta tag for the repository path
    document.head.innerHTML += '<meta name="github-repo" content="Emotional-Therapy">';
  </script>
  <!-- End Single Page Apps for GitHub Pages -->\n`;

    // Insert script right before the closing </head> tag
    indexHtml = indexHtml.replace('</head>', scriptToAdd + '</head>');
    
    // Ensure base path is set for GitHub Pages
    if (!indexHtml.includes('<base href=')) {
      indexHtml = indexHtml.replace('<head>', '<head>\n  <base href="./" />');
    }
    
    fs.writeFileSync(indexPath, indexHtml);
    console.log('Updated index.html with GitHub Pages SPA routing script and base href');
  } else {
    console.log('index.html already has GitHub Pages SPA routing script');
  }

  // Create .nojekyll file to prevent GitHub Pages from using Jekyll
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
  console.log('Created .nojekyll file to disable Jekyll processing');
  
  // Create _config.yml to ensure proper rendering
  const configYml = `theme: ""
baseurl: "/Emotional-Therapy"
repository: "amauryca/Emotional-Therapy"`;
  fs.writeFileSync(path.join(publicDir, '_config.yml'), configYml);
  console.log('Created _config.yml to ensure index.html is used as the default page');
  
  // Remove any README.md files to prevent them from taking precedence over index.html
  const readmePath = path.join(publicDir, 'README.md');
  const readmePathLower = path.join(publicDir, 'readme.md');
  
  if (fs.existsSync(readmePath)) {
    fs.unlinkSync(readmePath);
    console.log('Removed README.md to ensure index.html is used as the default page');
  }
  
  if (fs.existsSync(readmePathLower)) {
    fs.unlinkSync(readmePathLower);
    console.log('Removed readme.md to ensure index.html is used as the default page');
  }
  
  // Fix asset paths in HTML and CSS files to use relative paths
  fixAssetPaths(publicDir);
  
  // Ensure Face API and other scripts are included
  includeExternalScripts(indexPath);
  
  console.log('GitHub Pages files created successfully in dist/public');
}

// Helper function to fix asset paths in built files
function fixAssetPaths(directory) {
  // Process all HTML and CSS files
  const processFiles = (dir) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        processFiles(filePath);
      } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
        // Fix paths in HTML, CSS, and JS files
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Convert absolute paths to relative paths
        // This is a simplistic approach - in a real app you might need more sophisticated regex
        content = content.replace(/src="\//g, 'src="./');
        content = content.replace(/href="\//g, 'href="./');
        content = content.replace(/url\(\//g, 'url(./');
        
        // Save the updated content
        fs.writeFileSync(filePath, content);
      }
    }
  };
  
  processFiles(directory);
  console.log('Fixed asset paths to use relative URLs');
}

// Helper function to include external scripts
function includeExternalScripts(indexPath) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  // Add Face API script if not already present
  if (!indexHtml.includes('face-api.js')) {
    indexHtml = indexHtml.replace('</head>', 
      '  <script src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"></script>\n</head>');
  }
  
  // Add Puter.js script if not already present
  if (!indexHtml.includes('puter.com')) {
    indexHtml = indexHtml.replace('</head>', 
      '  <script src="https://js.puter.com/v2/"></script>\n</head>');
  }
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Added external scripts to index.html');
}

// Run the function to create GitHub Pages files
createGitHubPagesFiles();