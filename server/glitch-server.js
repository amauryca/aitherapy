const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: 'glitch' });
});

// Special handling for 404 errors
app.use((req, res, next) => {
  // If API request, return JSON 404
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For HTML requests, check if requesting a file with extension
  if (path.extname(req.path)) {
    return next();
  }
  
  // For all other routes, serve the SPA index.html
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Therapeutic AI Assistant running on Glitch.com - Port ${PORT}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Keep Glitch alive
setInterval(() => {
  console.log('Keeping application alive...');
}, 280000); // Ping every ~4.6 minutes to prevent sleep