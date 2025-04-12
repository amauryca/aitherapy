# Deploying to GitHub Pages

This guide explains how to deploy this therapeutic AI assistant application to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your machine
- Node.js (v18+) installed on your machine

## Setup Process

### 1. Create a GitHub Repository

1. Log in to your GitHub account
2. Create a new repository
3. Note your repository name (you'll need it later)

### 2. Update Environment Variables (Optional)

For local testing of GitHub Pages configuration:

```bash
node set-github-vars.js
```

This will create a `.env.local` file with the necessary GitHub Pages variables.

### 3. Configure the Project

The project is already configured for GitHub Pages with:

- Client-side routing support for GitHub Pages
- The `homepage` field in `package.json` pointing to the correct URL pattern
- A 404.html redirect that preserves deep-linking in the SPA

### 4. Build the Project

```bash
npm run build
```

This will create a production-ready build in the `dist/public` directory.

### 5. Generate GitHub Pages Specific Files

```bash
node github-pages.js
```

This adds the necessary 404.html page and other GitHub Pages-specific files.

### 6. Deploy to GitHub Pages

#### Option A: Manual Deployment

1. Commit and push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

2. In GitHub, go to your repository settings, then to "Pages".
3. In the "Source" section, select "GitHub Actions".
4. GitHub Actions will automatically deploy your site when you push to the main branch.

#### Option B: Automatic Deployment via GitHub Actions

A GitHub Actions workflow file is included in `.github/workflows/deploy.yml`. 
This workflow automatically:

1. Builds the project
2. Deploys it to GitHub Pages
3. Updates on every push to the main branch

## Testing Your Deployment

After deployment, your site will be available at:

```
https://[your-username].github.io/[your-repository-name]/
```

## Troubleshooting

- **Blank page after deployment**: Make sure your repository name is correctly set in the `homepage` field in `package.json`.
- **404 errors on navigation**: Verify the 404.html redirect is properly set up by running `node github-pages.js` before deployment.
- **Resources not loading**: Check that all resource paths are relative (starting with `./`) or using the import syntax for assets.

## Special Considerations

1. **API Endpoints**: Since GitHub Pages only hosts static files, any API endpoints will not work. Make sure your application can function without backend API calls.

2. **External Services**: If your application relies on external services (like OpenAI), ensure you have proper error handling when these services are unavailable.

3. **Environment Variables**: Any environment variables used in the application need to be set in the GitHub repository settings if they're required for the build process.