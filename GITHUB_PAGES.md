# Deploying the Therapeutic AI Assistant to GitHub Pages

This guide explains how to deploy the Therapeutic AI Assistant application to GitHub Pages.

## Overview

GitHub Pages allows you to host static websites directly from a GitHub repository. This application has been configured to work with GitHub Pages through:

1. Special routing handling for single-page applications (SPAs)
2. GitHub Actions workflow for automated deployments
3. Client-side only operation for static hosting

## Setup Instructions

### 1. Create a GitHub Repository

If you haven't already:

1. Create a new repository on GitHub
2. Push this code to the repository

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Source", select "GitHub Actions"

### 3. Automatic Deployment

The repository is configured with a GitHub Actions workflow file (`.github/workflows/deploy.yml`) that automatically:

1. Builds the application
2. Prepares it for GitHub Pages
3. Deploys it to GitHub Pages

Each time you push to the `main` branch, the workflow will run automatically.

## How It Works

### SPA Routing for GitHub Pages

GitHub Pages doesn't natively support single-page application routing. To make it work:

1. We use a 404.html page with a special script that redirects to the main page with the proper route in the URL query
2. The main page has JavaScript that reads this query and converts it back to a proper route

### Built Files Structure

When deployed, the application structure is:

```
/
├── index.html         # Main entry point
├── 404.html           # SPA redirect handler
├── assets/            # Built JavaScript, CSS, images
├── .nojekyll          # Prevents GitHub's Jekyll processing
└── other static files
```

## Testing Locally

Before deploying, you can test the GitHub Pages build locally:

```bash
# Build the application for GitHub Pages
node build-static.js

# The built files will be in dist/public
# You can serve them with any static file server
```

## Troubleshooting

### Page Not Found Errors

If you get 404 errors when navigating:

1. Make sure your repository is configured to use GitHub Pages
2. Check that the GitHub Actions workflow ran successfully
3. Ensure you're using the correct URL format (usually `https://username.github.io/repo-name/`)

### Blank Page / JavaScript Errors

If the page loads but is blank:

1. Open browser developer tools to check for JavaScript errors
2. Ensure all paths in the built files are relative, not absolute
3. Check if any API calls are failing due to CORS restrictions

## Limitations on GitHub Pages

1. No server-side processing (all functionality must be client-side)
2. Limited to static content
3. No direct database connections (must use client-side APIs)

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Single Page Apps on GitHub Pages](https://github.com/rafgraph/spa-github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)