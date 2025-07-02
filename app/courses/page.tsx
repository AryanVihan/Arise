import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Courses");

export default function CoursesPage() {
  return <PageContent title="Courses" />;
}
