// github-pages.js
// This is a helper script that adds GitHub Pages compatibility
// without modifying the core configuration files

import fs from 'fs';
import path from 'path';

// Function to create a GitHub Pages-compatible index.html
function createGitHubPagesFiles() {
  console.log('Creating GitHub Pages compatibility files...');
  
  // Create a 404.html file that redirects to index.html for SPA routing
  const notFoundHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      // This script takes the current URL and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new URL with only a query string and hash fragment
      
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
    Redirecting...
  </body>
</html>
  `;

  // Make sure the dist/public directory exists
  if (!fs.existsSync('dist/public')) {
    fs.mkdirSync('dist/public', { recursive: true });
  }
  
  // Write the 404.html file
  fs.writeFileSync('dist/public/404.html', notFoundHtml);
  
  // Modify the index.html to handle GitHub Pages routing
  if (fs.existsSync('dist/public/index.html')) {
    let indexHtml = fs.readFileSync('dist/public/index.html', 'utf8');
    
    // Add GitHub Pages SPA redirect script
    const redirectScript = `
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
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
  </script>`;
    
    // Insert the redirect script right before the closing head tag
    indexHtml = indexHtml.replace('</head>', `${redirectScript}\n</head>`);
    
    // Write the modified index.html
    fs.writeFileSync('dist/public/index.html', indexHtml);
    console.log('Modified index.html for GitHub Pages SPA routing');
  } else {
    console.error('Error: dist/public/index.html not found!');
  }
  
  // Create a .nojekyll file to disable Jekyll processing
  fs.writeFileSync('dist/public/.nojekyll', '');
  console.log('Created .nojekyll file');
  
  console.log('GitHub Pages compatibility files created successfully!');
}

// Only run if executed directly
if (process.argv[1] === import.meta.url) {
  createGitHubPagesFiles();
}