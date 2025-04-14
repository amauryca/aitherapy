import { lazy, Suspense, useEffect, useState } from 'react';
import { Loader2, Brain, Heart, MessageSquare, Mic, BarChart, LayoutGrid } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Create a lazy-loaded page component with loading indicator
 * @param importFn - Dynamic import function for the page
 * @returns Lazy-loaded component with Suspense wrapper
 */
export function createLazyPage(importFn: () => Promise<any>) {
  const LazyComponent = lazy(importFn);
  
  return (props: any) => (
    <Suspense fallback={<PageLoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

/**
 * Improved loading fallback component for lazy-loaded pages
 * Shows different loading indicators based on the current route
 */
export function PageLoadingFallback() {
  const [location] = useLocation();
  const [loadingTime, setLoadingTime] = useState(0);
  const currentPage = location.split('/')[1] || 'home';
  
  // Set up loading timer
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, []);
  
  // Get page-specific icon and color
  const getLoadingContent = () => {
    switch(currentPage) {
      case 'text':
        return {
          icon: <MessageSquare className="h-12 w-12 text-blue-500 animate-pulse" />,
          color: 'text-blue-600',
          gradient: 'from-blue-500 to-blue-300',
          message: 'Getting your text therapy session ready...'
        };
      case 'voice':
        return {
          icon: <Mic className="h-12 w-12 text-purple-500 animate-pulse" />,
          color: 'text-purple-600',
          gradient: 'from-purple-500 to-purple-300',
          message: 'Setting up voice recognition...'
        };
      case 'stats':
        return {
          icon: <BarChart className="h-12 w-12 text-green-500 animate-pulse" />,
          color: 'text-green-600',
          gradient: 'from-green-500 to-green-300',
          message: 'Analyzing your therapy data...'
        };
      case 'modules':
        return {
          icon: <LayoutGrid className="h-12 w-12 text-amber-500 animate-pulse" />,
          color: 'text-amber-600',
          gradient: 'from-amber-500 to-amber-300',
          message: 'Loading therapy modules...'
        };
      case 'about':
        return {
          icon: <Heart className="h-12 w-12 text-indigo-500 animate-pulse" />,
          color: 'text-indigo-600',
          gradient: 'from-indigo-500 to-indigo-300',
          message: 'Loading about page...'
        };
      default:
        return {
          icon: <Brain className="h-12 w-12 text-blue-500 animate-pulse" />,
          color: 'text-blue-600',
          gradient: 'from-blue-500 to-blue-300',
          message: 'Preparing your therapeutic experience...'
        };
    }
  };
  
  const content = getLoadingContent();
  
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 max-w-md text-center px-4">
        <div className="relative">
          {content.icon}
          <div className="absolute inset-0 -z-10 animate-ping opacity-20 rounded-full" 
               style={{ backgroundColor: `var(--page-primary, #4F46E5)` }}></div>
        </div>
        
        <div className="space-y-2">
          <p className={`text-lg font-medium ${content.color}`}>{content.message}</p>
          
          <div className="h-1.5 w-64 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${content.gradient} animate-pulse`} 
              style={{ width: `${Math.min(loadingTime * 20, 90)}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            {loadingTime > 3 ? "Almost there..." : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}