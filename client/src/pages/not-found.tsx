import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft, Mic, MessageSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  const [location] = useLocation();
  
  // Get the last valid segment from the URL if possible
  const getLastValidSegment = () => {
    const segments = location.split('/').filter(Boolean);
    if (segments.length === 0) return null;
    
    // Check if any segments match our known pages
    const knownPages = ['text', 'voice', 'stats', 'modules', 'about'];
    for (const segment of segments) {
      if (knownPages.includes(segment)) {
        return segment;
      }
    }
    return null;
  };
  
  const lastValidSegment = getLastValidSegment();
  
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-4 shadow-lg border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4 gap-3">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10 
                }}
              >
                <AlertCircle className="h-10 w-10 text-red-500" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We couldn't find the page you're looking for. The URL may be misspelled or the page you're looking for may have been moved or deleted.
            </p>
            
            <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-100">
              <p className="text-blue-700 text-sm">
                For the best experience, please use the navigation links to explore the Therapeutic AI Assistant.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-wrap gap-3 justify-center pt-2 pb-6">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            
            {lastValidSegment && (
              <Link href={`/${lastValidSegment}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to {lastValidSegment.charAt(0).toUpperCase() + lastValidSegment.slice(1)}
                </Button>
              </Link>
            )}
            
            <Link href="/text">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Text Therapy
              </Button>
            </Link>
            
            <Link href="/voice">
              <Button variant="outline" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Therapy
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
