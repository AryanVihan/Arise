import { generatePageMetadata } from "@/utils/page-utils";
import { Suspense } from 'react';
import ResumeAnalyzerContent from "@/components/resume-analyzer/ResumeAnalyzerContent";

// This export is required for static generation
export const metadata = generatePageMetadata("Resume Analyzer");

export default function ResumeAnalyzerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Resume Analyzer
        </h1>
        <p className="text-gray-400">
          Upload your resume to get instant feedback and improvement suggestions
        </p>
      </div>

      <Suspense fallback={
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-400">Loading analyzer...</p>
        </div>
      }>
        <ResumeAnalyzerContent />
      </Suspense>
    </div>
  );
}
