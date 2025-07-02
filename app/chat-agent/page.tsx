import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Chat Agent");

export default function ChatAgentPage() {
  return <PageContent title="Chat Agent" />;
}
