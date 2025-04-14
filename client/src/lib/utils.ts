import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and tailwind-merge
 * This allows for conditional classes and proper precedence of Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Delays execution for a specified time
 * Useful for adding artificial delays when needed
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Converts GitHub Pages URL format to standard SPA format
 * This helps with SPA routing on GitHub Pages
 */
export function convertGitHubPagesUrl(url: string): string {
  // Handle GitHub Pages ?/path format
  if (url.startsWith('?/')) {
    return url.substring(1) // Remove the ? character
  }
  return url
}

/**
 * Helper to get the base URL for assets in GitHub Pages environment
 */
export function getBaseUrl(): string {
  // In GitHub Pages, assets are served from the repository name path
  const isGitHubPages = window.location.hostname.includes('github.io')
  if (isGitHubPages) {
    const pathSegments = window.location.pathname.split('/')
    // If deployed to a project page (not user or organization page)
    if (pathSegments.length > 1) {
      return '/' + pathSegments[1] // Return /repo-name
    }
  }
  return '' // Default for local development
}

/**
 * Gets correct asset path regardless of deployment environment
 */
export function getAssetPath(path: string): string {
  const base = getBaseUrl()
  // Ensure path starts with a slash and doesn't duplicate slashes
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

/**
 * Gets page info based on route path
 */
export function getPageInfo(path: string) {
  const pageName = path.split('/')[1] || 'home'
  
  const pageInfo = {
    home: {
      title: 'Home',
      description: 'Welcome to the Therapeutic AI Assistant',
      color: 'blue',
      icon: 'brain',
    },
    text: {
      title: 'Text Therapy',
      description: 'Text-based therapeutic conversation',
      color: 'cyan',
      icon: 'message-square',
    },
    voice: {
      title: 'Voice Therapy',
      description: 'Voice-based therapeutic conversation',
      color: 'purple',
      icon: 'mic',
    },
    stats: {
      title: 'Stats',
      description: 'Your therapy progress and statistics',
      color: 'green',
      icon: 'bar-chart',
    },
    modules: {
      title: 'Modules',
      description: 'Therapeutic learning modules',
      color: 'amber',
      icon: 'layout-grid',
    },
    about: {
      title: 'About',
      description: 'About this therapeutic AI assistant',
      color: 'indigo',
      icon: 'info',
    },
  }
  
  // @ts-ignore - Dynamic access
  return pageInfo[pageName] || pageInfo.home
}