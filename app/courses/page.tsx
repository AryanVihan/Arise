import { generatePageMetadata } from "@/utils/page-utils";
import CoursesClient from "@/components/courses/CoursesClient";

export const metadata = generatePageMetadata("Courses");

export default function CoursesPage() {
  return <CoursesClient />;
}
