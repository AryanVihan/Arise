'use client';

import { useState, useCallback } from 'react';
import { ResumeUploadBox } from "./ResumeUploadBox";
import ResumePreview from "./ResumePreview";
import ResumeSuggestionsList from "./ResumeSuggestionsList";
import MissingSectionsCard from "./MissingSectionsCard";

// Mock function to analyze resume text and return highlights
const analyzeResumeText = (text: string) => {
  // This is a mock implementation. In a real app, you would:
  // 1. Send the text to your backend for analysis
  // 2. Process the response to extract highlights
  // 3. Return the highlights in the expected format
  
  // Example highlights (mock data)
  return [
    {
      text: 'responsible for',
      type: 'issue' as const,
      message: 'Use action verbs instead of "responsible for" (e.g., "Managed", "Developed", "Led")',
      start: text.toLowerCase().indexOf('responsible for'),
      end: text.toLowerCase().indexOf('responsible for') + 'responsible for'.length
    },
    {
      text: 'a lot',
      type: 'suggestion' as const,
      message: 'Replace vague terms with specific metrics or numbers',
      start: text.toLowerCase().indexOf('a lot'),
      end: text.toLowerCase().indexOf('a lot') + 'a lot'.length
    },
    {
      text: 'etc.',
      type: 'warning' as const,
      message: 'Avoid using etc. - be specific about your achievements',
      start: text.toLowerCase().indexOf('etc.'),
      end: text.toLowerCase().indexOf('etc.') + 'etc.'.length
    }
  ].filter(h => h.start >= 0); // Only include highlights that were found in the text
};

export default function ResumeAnalyzerContent() {
  const [resumeText, setResumeText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [highlights, setHighlights] = useState<any[]>([]);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setIsAnalyzing(true);
      
      // In a real app, you would:
      // 1. Extract text from the uploaded file (PDF, DOCX, etc.)
      // 2. Send the text to your backend for analysis
      // 3. Process the response to get highlights
      
      // For demo purposes, we'll use a simple text extraction
      // This would need to be replaced with actual file parsing logic
      const text = await file.text();
      setResumeText(text);
      
      // Mock analysis
      const analysisResults = analyzeResumeText(text);
      setHighlights(analysisResults);
    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setResumeText('');
    setHighlights([]);
  }, []);

  const handleAutoFixSection = useCallback(async (sectionId: string) => {
    // In a real app, this would call an API to generate content for the missing section
    console.log(`Auto-fixing section: ${sectionId}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real implementation, you would update the resume content with the generated section
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {!resumeText ? (
            <ResumeUploadBox onFileUpload={handleFileUpload} />
          ) : (
            <ResumePreview 
              content={resumeText} 
              highlights={highlights} 
              onClose={handleClear}
            />
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-400">Analyzing your resume...</p>
            </div>
          )}
        </div>

        {!isAnalyzing && resumeText && (
          <div className="lg:col-span-1">
            <MissingSectionsCard 
              onAutoFix={handleAutoFixSection}
              className="sticky top-6"
            />
          </div>
        )}
      </div>

      {!isAnalyzing && resumeText && (
        <div className="mt-12">
          <ResumeSuggestionsList />
        </div>
      )}
    </div>
  );
}
