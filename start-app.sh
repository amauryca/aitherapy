#!/bin/bash
# This script starts the Therapeutic AI application

echo "Starting the Therapeutic AI Assistant..."

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is required but not installed. Please install Node.js."
    exit 1
fi

# Run the application
npm run dev