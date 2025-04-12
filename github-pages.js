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
  <title>Page Not Found</title>
  <script>
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current URL and converts the path and query string into just a query string,
    // and then redirects the browser to the new URL with only a query string.
    // If you're creating a Project Pages site and NOT using a custom domain,
    // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
    var pathSegmentsToKeep = 1;

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
  </script>
  <!-- End Single Page Apps for GitHub Pages -->\n`;

    // Insert script right before the closing </head> tag
    indexHtml = indexHtml.replace('</head>', scriptToAdd + '</head>');
    fs.writeFileSync(indexPath, indexHtml);
    console.log('Updated index.html with GitHub Pages SPA routing script');
  } else {
    console.log('index.html already has GitHub Pages SPA routing script');
  }

  // Create .nojekyll file to prevent GitHub Pages from using Jekyll
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
  console.log('Created .nojekyll file to disable Jekyll processing');

  console.log('GitHub Pages files created successfully in dist/public');
}

// Run the function to create GitHub Pages files
createGitHubPagesFiles();