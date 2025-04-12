import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getPageTheme } from '@/lib/theme';

/**
 * PageFavicon Component
 * Dynamically changes the favicon based on the current page
 */
export default function PageFavicon() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Get current page from location path
    const path = location.split('/')[1] || 'home';
    let favicon = '/favicon.svg'; // Default favicon
    
    // Set appropriate favicon based on current path
    switch(path) {
      case 'text':
        favicon = '/favicon-text.svg';
        break;
      case 'voice':
        favicon = '/favicon-voice.svg';
        break;
      case 'modules':
        favicon = '/favicon-modules.svg';
        break;
      case 'stats':
        favicon = '/favicon-stats.svg';
        break;
      case 'about':
        favicon = '/favicon-about.svg';
        break;
      default:
        favicon = '/favicon.svg'; // Home or any other page
    }
    
    // Update page title based on current path with proper formatting
    let pageTitle = 'Therapeutic AI';
    if (path !== 'home') {
      const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);
      pageTitle = `${formattedPath} | Therapeutic AI`;
    }
    
    // Update document title
    document.title = pageTitle;
    
    // Update favicon link element
    const linkElement = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (linkElement) {
      linkElement.href = favicon;
    } else {
      // Create new favicon link if it doesn't exist
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = favicon;
      document.head.appendChild(newLink);
    }
  }, [location]);
  
  // This component doesn't render anything visible
  return null;
}