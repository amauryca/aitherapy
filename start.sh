#!/bin/bash

# Start script for Glitch.com deployment
echo "Starting application on Glitch.com..."

# Build the application
echo "Building application..."
npm run build

# Start the server
echo "Starting server..."
node server/glitch-server.js