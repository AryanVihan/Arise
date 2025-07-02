import { generatePageMetadata } from "@/utils/page-utils";
import RoadmapClientWrapper from "./RoadmapClientWrapper";

// This export is required for static generation
export const metadata = generatePageMetadata("Career Roadmap");

export default function RoadmapPage() {
  return <RoadmapClientWrapper />;
}
