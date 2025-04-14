# Therapeutic AI Assistant - Glitch.com Version

This is the Glitch.com version of the Therapeutic AI Assistant, a supportive and interactive conversational web application focused on user mental wellness.

## Deployment on Glitch.com

This application has been configured to work on Glitch.com with the following features:

- Single-page application (SPA) with proper routing
- Dynamic page favicons and titles based on current section
- Voice and text therapy modules
- Statistics tracking
- Facial expression analysis

## How to Deploy on Glitch.com

1. Import this repository to Glitch.com
2. The application will automatically build and start
3. No additional configuration is needed

## File Structure

- `/client`: Frontend React application
- `/server`: Backend Express server
- `/server/glitch-server.js`: Specific server configuration for Glitch.com
- `glitch.json`: Glitch-specific configuration file
- `start.sh`: Bash script to build and start the application

## Customization

You can customize the application by modifying:

- `theme.json`: Changes the color scheme and appearance
- `client/src/components/PageFavicon.tsx`: Updates page-specific icons
- `client/src/lib/constants.ts`: Modifies therapy messages and instructions

## Troubleshooting

If you encounter issues:

1. Check the Glitch.com logs for error messages
2. Make sure all the necessary environment variables are set
3. Try restarting the application by clicking "Refresh" in the Glitch.com UI

## License

MIT