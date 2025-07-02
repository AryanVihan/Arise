import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Roadmap");

export default function RoadmapPage() {
  return <PageContent title="Roadmap" />;
}
