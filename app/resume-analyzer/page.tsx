import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Resume Analyzer");

export default function ResumeAnalyzerPage() {
  return <PageContent title="Resume Analyzer" />;
}
