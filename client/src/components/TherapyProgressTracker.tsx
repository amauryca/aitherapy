import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle2, HeartPulse, MessageSquare, Mic } from "lucide-react";

interface TherapyProgressTrackerProps {
  /** The current session number (starts from 1) */
  sessionNumber?: number;
  /** The total number of recommended sessions */
  totalSessions?: number;
  /** Therapy type - affects the UI theme */
  therapyType?: 'text' | 'voice' | 'combined';
  /** The current emotional state if available */
  currentEmotion?: string;
  /** Any achievements unlocked in the therapy */
  achievements?: string[];
}

/**
 * TherapyProgressTracker Component
 * Shows users their progress through therapy sessions with themed visuals
 */
export default function TherapyProgressTracker({
  sessionNumber = 1,
  totalSessions = 8,
  therapyType = 'combined',
  currentEmotion = undefined,
  achievements = []
}: TherapyProgressTrackerProps) {
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.floor((sessionNumber / totalSessions) * 100), 100);
  
  // Track animation state
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Animate the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress(prev => {
        if (prev < progressPercentage) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 15);
    
    return () => clearInterval(interval);
  }, [progressPercentage]);
  
  // Color theme based on therapy type
  const getThemeColors = () => {
    switch (therapyType) {
      case 'text':
        return {
          cardBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          progressBg: 'bg-blue-100',
          progressFill: 'bg-blue-500',
          icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
          title: 'Text Therapy Progress'
        };
      case 'voice':
        return {
          cardBg: 'bg-gradient-to-br from-purple-50 to-purple-100', 
          progressBg: 'bg-purple-100',
          progressFill: 'bg-purple-500',
          icon: <Mic className="w-5 h-5 text-purple-500" />,
          title: 'Voice Therapy Progress'
        };
      default:
        return {
          cardBg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
          progressBg: 'bg-indigo-100',
          progressFill: 'bg-indigo-500',
          icon: <Brain className="w-5 h-5 text-indigo-500" />,
          title: 'Therapy Progress'
        };
    }
  };
  
  const theme = getThemeColors();
  
  // Helper to get emoji based on progress
  const getProgressEmoji = () => {
    if (progressPercentage < 25) return '🌱';
    if (progressPercentage < 50) return '🌿';
    if (progressPercentage < 75) return '🌻';
    if (progressPercentage < 100) return '🌺';
    return '🎉';
  };
  
  return (
    <Card className={`${theme.cardBg} border-none shadow-md mb-6`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {theme.icon}
          {theme.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-gray-600" />
              <span>Session {sessionNumber} of {totalSessions}</span>
            </div>
            <div className="font-medium">
              {getProgressEmoji()} {animatedProgress}% Complete
            </div>
          </div>
          
          <Progress 
            value={animatedProgress} 
            className={theme.progressBg}
            indicatorClassName={`${theme.progressFill} transition-all duration-500`}
          />
          
          {/* Show emotional state if available */}
          {currentEmotion && (
            <div className="flex items-center gap-2 mt-3 text-sm">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Current emotional state: <strong>{currentEmotion}</strong></span>
            </div>
          )}
          
          {/* Show achievements if available */}
          {achievements.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="font-medium">Recent achievements:</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                {achievements.slice(0, 3).map((achievement, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-green-700">✓</span> {achievement}
                  </li>
                ))}
                {achievements.length > 3 && (
                  <li className="text-xs text-gray-500 italic">
                    + {achievements.length - 3} more achievements
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}