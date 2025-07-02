import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Cover Letter");

export default function CoverLetterPage() {
  return <PageContent title="Cover Letter" />;
}
