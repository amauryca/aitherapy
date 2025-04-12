// start-app.js
// This script launches the Therapeutic AI application

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting the Therapeutic AI Assistant...');

// Run the application
const child = exec('npm run dev');

// Forward stdout to console
child.stdout.on('data', (data) => {
  console.log(`${data.toString().trim()}`);
});

// Forward stderr to console
child.stderr.on('data', (data) => {
  console.error(`${data.toString().trim()}`);
});

// Handle process exit
child.on('close', (code) => {
  console.log(`Application process exited with code ${code}`);
});

console.log('Application starting, please wait...');
console.log('Once started, your application will be available at:');
console.log('https://[your-replit-url]');