import { generatePageMetadata } from "@/utils/page-utils";
import CoverLetterClient from "@/components/cover-letter/CoverLetterClient";

export const metadata = generatePageMetadata("Cover Letter Generator");

export default function CoverLetterPage() {
  return (
    <main className="min-h-screen">
      <CoverLetterClient />
    </main>
  );
}
