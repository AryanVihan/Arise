import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Interview");

export default function InterviewPage() {
  return <PageContent title="Interview" />;
}
