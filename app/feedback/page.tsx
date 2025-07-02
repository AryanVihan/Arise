import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Feedback");

export default function FeedbackPage() {
  return <PageContent title="Feedback" />;
}
