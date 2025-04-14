import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getAssetPath } from '@/lib/assetHelper';

/**
 * PageFavicon Component
 * Dynamically changes the favicon based on the current page
 */
export default function PageFavicon() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Extract the page name from the URL
    const currentPage = location.split('/')[1] || 'home';
    
    // Update favicon based on current page
    updateFavicon(currentPage);
    
    // Clean up when component unmounts
    return () => {
      // Reset to default favicon when component unmounts
      resetFavicon();
    };
  }, [location]);
  
  // Function to update favicon based on current page
  const updateFavicon = (pageName: string) => {
    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!link) {
      // If favicon link doesn't exist, create it
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = 'image/svg+xml';
      document.head.appendChild(newLink);
      updateFavicon(pageName); // Call recursively once created
      return;
    }
    
    // Set the appropriate favicon based on page
    switch (pageName) {
      case 'text':
        link.href = getAssetPath('/favicon-text.svg');
        break;
      case 'voice':
        link.href = getAssetPath('/favicon-voice.svg');
        break;
      case 'stats':
        link.href = getAssetPath('/favicon-stats.svg');
        break;
      case 'modules':
        link.href = getAssetPath('/favicon-modules.svg');
        break;
      case 'about':
        link.href = getAssetPath('/favicon-about.svg');
        break;
      default:
        link.href = getAssetPath('/favicon.svg'); // Default favicon
    }
    
    // Update the page title as well
    updatePageTitle(pageName);
  };
  
  // Reset favicon to default
  const resetFavicon = () => {
    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (link) {
      link.href = getAssetPath('/favicon.svg');
    }
    document.title = 'Therapeutic AI Assistant';
  };
  
  // Update page title based on current page
  const updatePageTitle = (pageName: string) => {
    const baseTitle = 'Therapeutic AI Assistant';
    let pageTitle = '';
    
    switch (pageName) {
      case 'text':
        pageTitle = 'Text Therapy';
        break;
      case 'voice':
        pageTitle = 'Voice Therapy';
        break;
      case 'stats':
        pageTitle = 'Therapy Stats';
        break;
      case 'modules':
        pageTitle = 'Therapy Modules';
        break;
      case 'about':
        pageTitle = 'About';
        break;
      default:
        pageTitle = 'Home';
    }
    
    document.title = `${pageTitle} | ${baseTitle}`;
  };
  
  // This component doesn't render anything visible
  return null;
}