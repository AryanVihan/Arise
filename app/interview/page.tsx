'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Loading Components
const InterviewScreenSkeleton = () => (
  <div className="w-full max-w-2xl mx-auto bg-gray-800/50 rounded-xl p-6 h-64 flex flex-col justify-center">
    <motion.div 
      className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-3/4 mx-auto"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.div 
      className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-1/2 mx-auto mt-4"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    />
  </div>
);

const StartStopControlsSkeleton = () => (
  <div className="flex justify-center mt-12">
    <motion.div 
      className="h-14 w-14 rounded-full bg-gradient-to-r from-gray-700 to-gray-600"
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: [0.9, 1.1, 0.9],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  </div>
);

const ResponsePlayerSkeleton = () => (
  <div className="mt-8 w-full max-w-2xl mx-auto space-y-4">
    {[...Array(3)].map((_, i) => (
      <motion.div 
        key={i} 
        className="h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg overflow-hidden"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          delay: i * 0.2
        }}
      >
        <div className="h-full w-full bg-gray-800/30 backdrop-blur-sm" />
      </motion.div>
    ))}
  </div>
);

const LiveFeedbackPanelSkeleton = () => (
  <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-72 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50 h-64">
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i} 
          className="h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  </div>
);

// Dynamically import heavy components with no SSR
const DynamicInterviewScreen = dynamic<{
  question: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  isListening: boolean;
  volume: number;
}>(
  () => import('@/components/interview/InterviewScreen').then(mod => mod.default),
  { ssr: false, loading: () => <InterviewScreenSkeleton /> }
);

const DynamicStartStopControls = dynamic<{
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}>(
  () => import('@/components/interview/StartStopControls').then(mod => mod.default),
  { ssr: false, loading: () => <StartStopControlsSkeleton /> }
);

const DynamicResponsePlayer = dynamic<{
  responses: Array<{ text: string; timestamp: number }>;
  onPlayResponse: (index: number) => void;
  activeIndex: number | null;
  isPlaying: boolean;
  className?: string;
  isLoading?: boolean;
}>(
  () => import('@/components/interview/ResponsePlayer').then(mod => mod.default),
  { ssr: false, loading: () => <ResponsePlayerSkeleton /> }
);

const DynamicLiveFeedbackPanel = dynamic<{
  isActive: boolean;
  maxItems: number;
  className?: string;
  isLoading?: boolean;
}>(
  () => import('@/components/interview/LiveFeedbackPanel').then(mod => mod.default),
  { ssr: false, loading: () => <LiveFeedbackPanelSkeleton /> }
);

export default function InterviewPage() {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Array<{text: string; timestamp: number}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);
  const [isLoading, setIsLoading] = useState({
    interview: false,
    feedback: false,
    response: false
  });

  // Sample interview questions
  const questions = [
    'Tell me about yourself and your background.',
    'What interests you about this position?',
    'Describe a challenging project you\'ve worked on.',
    'How do you handle tight deadlines?',
    'Where do you see yourself in 5 years?'
  ];

  // Simulate volume changes when listening
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isListening) {
      interval = setInterval(() => {
        // Generate random volume between 0.1 and 1
        const newVolume = 0.1 + Math.random() * 0.9;
        setVolume(newVolume);
      }, 100);
    } else {
      setVolume(0);
      // When stopping, add a dummy response
      if (volume > 0.3) {
        const dummyResponses = [
          "I'd be happy to discuss my experience with React and TypeScript. I've been working with these technologies for about 3 years now.",
          "That's an interesting question. I believe my problem-solving skills and ability to learn quickly make me a strong candidate.",
          "In my previous role, I led a team that implemented a new feature that increased user engagement by 30%.",
          "I'm particularly excited about your company's focus on creating accessible web applications.",
          "I see myself growing into a senior developer role, mentoring others and contributing to architectural decisions."
        ];
        setResponses(prev => [...prev, {
          text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
          timestamp: Date.now()
        }]);
      }
    }

    return () => clearInterval(interval);
  }, [isListening, volume]);

  // Auto-advance questions every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (isListening) {
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [isListening, questions.length]);

  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Live Feedback Panel */}
      <Suspense fallback={<LiveFeedbackPanelSkeleton />}>
        <DynamicLiveFeedbackPanel 
          isActive={showFeedback && isListening} 
          maxItems={3}
          className="hidden md:block"
          isLoading={isLoading.feedback}
        />
      </Suspense>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          Interview Practice Session
        </h1>
        
        <div className="flex flex-col items-center">
          <Suspense fallback={<InterviewScreenSkeleton />}>
            <DynamicInterviewScreen
              question={questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              isListening={isListening}
              volume={volume}
            />
          </Suspense>
          
          <div className="mt-8">
            <Suspense fallback={<StartStopControlsSkeleton />}>
              <DynamicStartStopControls
                isRunning={isListening}
                onStart={() => {
                  setIsListening(true);
                  setIsLoading(prev => ({ ...prev, feedback: true }));
                  // Simulate loading
                  setTimeout(() => setIsLoading(prev => ({ ...prev, feedback: false })), 1500);
                }}
                onStop={() => {
                  setIsListening(false);
                  setIsLoading(prev => ({ ...prev, response: true }));
                  // Simulate processing
                  setTimeout(() => setIsLoading(prev => ({ ...prev, response: false })), 1000);
                }}
                className="mt-12"
                disabled={isProcessing}
                isLoading={isProcessing}
              />
            </Suspense>
            
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setIsListening(false);
                  setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
                }}
                disabled={isListening}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
              </button>
              
              <button
                onClick={() => setResponses([])}
                disabled={responses.length === 0}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Responses
              </button>
              
              <button
                onClick={() => setShowFeedback(!showFeedback)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                title={showFeedback ? 'Hide feedback' : 'Show feedback'}
              >
                <span>{showFeedback ? 'Hide' : 'Show'} Feedback</span>
                <span className={`inline-block w-2 h-2 rounded-full ${showFeedback ? 'bg-green-400' : 'bg-red-400'}`}></span>
              </button>
            </div>
            
            {/* Response Player */}
            <Suspense fallback={<ResponsePlayerSkeleton />}>
              <div className="mt-8 space-y-4 max-w-3xl mx-auto">
                <DynamicResponsePlayer
                  responses={responses}
                  onPlayResponse={(index) => {
                    setIsLoading(prev => ({ ...prev, response: true }));
                    // Simulate loading
                    setTimeout(() => setIsLoading(prev => ({ ...prev, response: false })), 800);
                  }}
                  activeIndex={null}
                  isPlaying={false}
                  className="w-full"
                  isLoading={isLoading.response}
                />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
