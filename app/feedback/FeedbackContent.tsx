'use client';

import { useState, useEffect } from 'react';
import FeedbackOverviewCard from '@/components/feedback/FeedbackOverviewCard';
import TranscriptWithHighlights, { Highlight, HighlightType } from '@/components/feedback/TranscriptWithHighlights';
import FeedbackChart from '@/components/feedback/FeedbackChart';
import ImprovementTipsList from '@/components/feedback/ImprovementTipsList';

// Sample data for the components
const sampleTranscript = [
  { text: "So", start: 0.5, end: 0.7, confidence: 0.98 },
  { text: "um", start: 1.0, end: 1.2, confidence: 0.95 },
  { text: "I", start: 1.5, end: 1.6, confidence: 0.99 },
  { text: "think", start: 1.6, end: 1.8, confidence: 0.99 },
  { text: "that", start: 1.8, end: 2.0, confidence: 0.99 },
  { text: "the", start: 2.0, end: 2.1, confidence: 0.99 },
  { text: "main", start: 2.1, end: 2.3, confidence: 0.99 },
  { text: "point", start: 2.3, end: 2.6, confidence: 0.99 },
  { text: "is", start: 2.6, end: 2.7, confidence: 0.99 },
  { text: "to", start: 2.7, end: 2.8, confidence: 0.99 },
  { text: "be", start: 2.8, end: 3.0, confidence: 0.99 },
  { text: "clear", start: 3.0, end: 3.4, confidence: 0.99 },
  { text: "and", start: 3.4, end: 3.5, confidence: 0.99 },
  { text: "concise", start: 3.5, end: 4.0, confidence: 0.99 },
  { text: "in", start: 4.0, end: 4.1, confidence: 0.99 },
  { text: "your", start: 4.1, end: 4.3, confidence: 0.99 },
  { text: "communication", start: 4.3, end: 5.0, confidence: 0.99 },
];

const sampleHighlights: Highlight[] = [
  { start: 1.0, end: 1.2, type: 'filler' as HighlightType, note: 'Filler word' },
  { start: 3.0, end: 5.0, type: 'strength' as HighlightType, note: 'Clear communication' },
];

// This is a Client Component
const FeedbackContent = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Interview Feedback Analysis
        </h1>
        <p className="mt-2 text-gray-400">
          Detailed insights and recommendations to improve your interview performance
        </p>
      </div>

      {/* Overview Cards */}
      <div className="mb-8">
        <FeedbackOverviewCard 
          confidence={85.5}
          speakingTime={245}
          fillerWordCount={12}
          questionsAnswered={5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Transcript */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-pink-500 rounded-full"></span>
            Transcript Analysis
          </h2>
          <TranscriptWithHighlights 
            transcript={sampleTranscript} 
            highlights={sampleHighlights} 
          />
        </div>

        {/* Right Column - Tips */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
            Improvement Tips
          </h2>
          <ImprovementTipsList />
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
          Performance Metrics
        </h2>
        <FeedbackChart />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <button 
          onClick={() => setIsAnalyzing(!isAnalyzing)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isAnalyzing 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20'
          }`}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Another Interview'}
        </button>
        <button className="px-6 py-3 rounded-lg font-medium bg-gray-800 text-white border border-gray-700 hover:border-pink-500/50 hover:bg-gray-700/50 transition-colors">
          Download Full Report
        </button>
      </div>
    </div>
  );
};

export default FeedbackContent;
