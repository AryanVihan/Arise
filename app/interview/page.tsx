'use client';

import { useState, useEffect, useCallback } from 'react';
import InterviewScreen from '@/components/InterviewScreen';
import StartStopControls from '@/components/StartStopControls';
import ResponsePlayer from '@/components/ResponsePlayer';
import LiveFeedbackPanel from '@/components/LiveFeedbackPanel';

export default function InterviewPage() {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Array<{text: string; timestamp: number}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

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
      <LiveFeedbackPanel 
        isActive={showFeedback && isListening} 
        maxItems={3}
        className="hidden md:block"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          Interview Practice Session
        </h1>
        
        <div className="flex flex-col items-center">
          <InterviewScreen
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            isListening={isListening}
            volume={volume}
          />
          
          <div className="mt-8">
            <StartStopControls
              isRunning={isListening}
              onStart={() => setIsListening(true)}
              onStop={() => setIsListening(false)}
              className="mt-12"
            />
            
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
            <div className="mt-8 space-y-4 max-w-3xl mx-auto">
              {responses.map((response, index) => (
                <ResponsePlayer
                  key={response.timestamp}
                  text={response.text}
                  onReplay={() => {
                    // In a real app, this would replay the audio
                    console.log('Replaying response:', response.text);
                  }}
                  onDelete={() => {
                    setResponses(prev => prev.filter((_, i) => i !== index));
                  }}
                  onFeedback={(isPositive) => {
                    console.log(`Feedback: ${isPositive ? 'Positive' : 'Negative'} for response`, response.text);
                  }}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
