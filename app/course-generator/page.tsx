import { generatePageMetadata } from "@/utils/page-utils";
import CourseGeneratorClient from "./CourseGeneratorClient";

export const metadata = generatePageMetadata("Course Generator");

export default function CourseGeneratorPage() {
  return <CourseGeneratorClient />;
}
