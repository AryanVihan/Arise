import HeroSection from '@/components/hero/HeroSection';
import FeaturesSectionClient from '@/components/features/FeaturesSectionClient';
import TimelineSectionClient from '@/components/timeline/TimelineSectionClient';
import DemoPreviewSectionClient from '@/components/demo/DemoPreviewSectionClient';
import CallToActionSectionClient from '@/components/cta/CallToActionSectionClient';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSectionClient />
      <TimelineSectionClient />
      <DemoPreviewSectionClient />
      <CallToActionSectionClient />
    </main>
  );
}
