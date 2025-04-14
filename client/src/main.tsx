import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add script tag for Face API (emotion detection)
const faceApiScript = document.createElement('script');
faceApiScript.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
document.head.appendChild(faceApiScript);

// Add puter.js script
const puterScript = document.createElement('script');
puterScript.src = 'https://js.puter.com/v2/';
document.head.appendChild(puterScript);

// Set title and meta tags
document.title = "Therapeutic AI Assistant";

// Check if running on Glitch.com
const isOnGlitch = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('.glitch.me') || 
           window.location.hostname === 'glitch.com' ||
           window.location.hostname.includes('.glitch.com');
  }
  return false;
};

// Add Glitch-specific meta tags
if (isOnGlitch()) {
  // Add Glitch-specific metadata
  const glitchMeta = document.createElement('meta');
  glitchMeta.name = 'glitch-app-name';
  glitchMeta.content = 'therapeutic-ai-assistant';
  document.head.appendChild(glitchMeta);
  
  console.log('Running on Glitch.com environment');
}

createRoot(document.getElementById("root")!).render(<App />);
