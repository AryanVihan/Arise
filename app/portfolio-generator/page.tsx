import { generatePageMetadata, PageContent } from "@/utils/page-utils";

export const metadata = generatePageMetadata("Portfolio Generator");

export default function PortfolioGeneratorPage() {
  return <PageContent title="Portfolio Generator" />;
}
