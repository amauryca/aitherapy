import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation, useRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { createLazyPage } from "@/lib/pageLoader";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageFavicon from "@/components/PageFavicon";
import PageOptimizer from "@/components/layout/PageOptimizer";
import { loadFaceApiScript } from "@/lib/faceApiLoader";
import { getBaseUrl } from "@/lib/assetHelper";

// Lazy load page components for better performance
const HomePage = createLazyPage(() => import("@/pages/home"));
const VoiceTherapy = createLazyPage(() => import("@/pages/voice"));
const TextTherapy = createLazyPage(() => import("@/pages/text"));
const StatsPage = createLazyPage(() => import("@/pages/stats"));
const AboutPage = createLazyPage(() => import("@/pages/about"));
const ModulesPage = createLazyPage(() => import("@/pages/modules"));
const NotFound = createLazyPage(() => import("@/pages/not-found"));

// Router helper for Glitch.com deployment
const useGlitchRouter = () => {
  return useRouter();
};

function Router() {
  // Use the Glitch.com compatible router
  useGlitchRouter();
  const [location] = useLocation();
  
  // Get current page from location path
  const currentPath = location.split('/')[1] || 'home';
  
  // Apply a dynamic theme class based on current page
  const pageThemeClass = `page-${currentPath}`;
  
  // Import Breadcrumbs component
  const Breadcrumbs = lazy(() => import('@/components/layout/Breadcrumbs'));
  
  // Check if running on Glitch.com
  const isGlitch = typeof window !== 'undefined' && 
    (window.location.hostname.includes('.glitch.me') || 
    window.location.hostname === 'glitch.com' ||
    window.location.hostname.includes('.glitch.com'));
  
  // Add Glitch-specific class if needed
  const glitchClass = isGlitch ? 'glitch-environment' : '';
  
  return (
    <div className={`min-h-screen flex flex-col ${pageThemeClass} ${glitchClass} glitch-container`}>
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Suspense fallback={null}>
          <Breadcrumbs />
        </Suspense>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/voice" component={VoiceTherapy} />
          <Route path="/text" component={TextTherapy} />
          <Route path="/stats" component={StatsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/modules" component={ModulesPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // Preload the Face API script when the app starts
  useEffect(() => {
    // Load the Face API script in the background
    loadFaceApiScript().catch(error => {
      console.warn('Could not preload Face API script:', error);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageFavicon />
      <PageOptimizer />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
