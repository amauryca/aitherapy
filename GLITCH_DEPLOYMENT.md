# Therapeutic AI Assistant - Glitch.com Deployment Guide

This guide explains how to deploy the Therapeutic AI Assistant application to Glitch.com.

## Pre-Deployment Checklist

1. Ensure all necessary files are committed
2. Make sure the application runs correctly locally
3. Confirm all third-party libraries are properly imported

## Deployment Steps

### Option 1: Direct Import from GitHub

1. Create a new project on Glitch.com
2. Click "Import from GitHub" 
3. Enter your repository URL
4. Glitch will automatically clone and deploy your application

### Option 2: Manual Deployment

1. Download your codebase as a ZIP file
2. Create a new project on Glitch.com
3. Click "Tools" > "Import and Export" > "Import from GitHub"
4. Upload your ZIP file
5. Once imported, Glitch will automatically start the deploy process

## Post-Deployment Configuration

After your project is imported to Glitch:

1. Check the application logs for any errors by clicking "Logs" in the Glitch editor
2. If needed, add any environment variables in the Glitch project settings

## Troubleshooting

If you encounter issues during deployment:

1. **Application not loading**: Check if all required dependencies are installed
2. **Missing models**: Ensure the models directory is correctly included 
3. **404 errors**: Confirm the server is properly configured to handle SPA routing
4. **Module not found errors**: Try running `refresh` in the Glitch terminal

## Testing Your Deployment

Once deployed, test the following features:

- Navigation between pages
- Text therapy conversations
- Voice therapy functionality (if microphone access is allowed)
- Facial expression detection
- Stats page visualization

## Keeping Your Application Up-to-Date

To update your Glitch.com deployment after making changes:

1. Push changes to your GitHub repository
2. In Glitch, navigate to "Tools" > "Import and Export" > "Import from GitHub"
3. Select your repository again to pull the latest changes

## Notes on Glitch.com Deployment

- Glitch apps go to sleep after 5 minutes of inactivity
- They automatically wake up when someone visits your site
- Glitch provides 4000 hours of project runtime per month for free projects
- Consider upgrading to a paid plan for production applications