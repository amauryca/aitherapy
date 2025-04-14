import { Home, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'wouter';

/**
 * Breadcrumbs Component
 * Shows users their current location in the application
 */
export default function Breadcrumbs() {
  const [location] = useLocation();
  
  // Get page name from URL path
  const getPathSegments = () => {
    const segments = location.split('/').filter(Boolean);
    
    if (segments.length === 0) {
      return [{ name: 'Home', path: '/' }];
    }
    
    return [
      { name: 'Home', path: '/' },
      ...segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        return {
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          path
        };
      })
    ];
  };
  
  const pathSegments = getPathSegments();
  
  // Don't show breadcrumbs on homepage
  if (location === '/') {
    return null;
  }
  
  return (
    <nav className="flex items-center text-sm py-3 px-4 mb-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm">
      <ol className="flex items-center space-x-1 flex-wrap">
        {pathSegments.map((segment, index) => (
          <li key={segment.path} className="flex items-center">
            {index === 0 ? (
              <Link href={segment.path} className="flex items-center text-gray-500 hover:text-primary">
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            ) : (
              <Link 
                href={segment.path} 
                className={`flex items-center ${
                  index === pathSegments.length - 1 
                    ? 'font-medium text-gray-900' 
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                <span>{segment.name}</span>
              </Link>
            )}
            
            {index < pathSegments.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}