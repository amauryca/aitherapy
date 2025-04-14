/**
 * Helper functions for asset path handling
 * Ensures assets work correctly both in development and Glitch.com deployment
 */

/**
 * Get the correct path for an asset based on current environment
 * @param path The relative path to the asset (should start with '/')
 * @returns The correct path for the current environment
 */
export function getAssetPath(path: string): string {
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Glitch.com serves assets directly from the root, so no prefix needed
  return normalizedPath;
}

/**
 * Get the base URL for the application
 * @returns The base URL with trailing slash
 */
export function getBaseUrl(): string {
  // Glitch.com uses root URLs
  return '/';
}

/**
 * Generate a complete URL including domain and path
 * @param path The relative path to add to the base URL
 * @returns Full URL including domain
 */
export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In browser environment
  if (typeof window !== 'undefined') {
    const domain = `${window.location.protocol}//${window.location.host}`;
    return `${domain}${baseUrl}${normalizedPath}`;
  }
  
  // Fallback for server environment
  return `${baseUrl}${normalizedPath}`;
}