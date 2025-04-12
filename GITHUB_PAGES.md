# Deploying to GitHub Pages

This guide explains how to deploy this React application to GitHub Pages.

## Prerequisites

1. Create a GitHub repository for your project
2. Push your code to the repository
3. Ensure you have the necessary permissions to deploy to GitHub Pages

## Deployment Process

The deployment is automated using GitHub Actions. When you push to the `main` branch, the following steps are executed:

1. Your code is built into static assets
2. Special files are created to support SPA routing on GitHub Pages
3. The assets are deployed to the `gh-pages` branch
4. Your site becomes available at `https://[username].github.io/[repository-name]/`

## How It Works

The deployment process is defined in `.github/workflows/deploy.yml` and uses:

- GitHub Actions to automate the build and deployment
- A helper script (`github-pages.js`) that adds GitHub Pages compatibility
- SPA routing support through a custom 404.html page

## Manual Deployment

If you prefer to deploy manually:

1. Build the project: `npm run build`
2. Run the GitHub Pages compatibility script: `node github-pages.js`
3. The static site will be available in the `dist/public` directory
4. Upload these files to your preferred static hosting service

## Troubleshooting

- If your site doesn't load, check that your repository settings have GitHub Pages enabled and pointing to the `gh-pages` branch
- If routing doesn't work correctly, ensure the 404.html file was created properly
- For CSS/JS loading issues, check the console for path-related errors

## Further Customization

- Update the `<title>` and metadata in `client/index.html`
- Add a custom domain in your GitHub repository settings