'use client';

import dynamic from 'next/dynamic';

const CallToActionSection = dynamic(
  () => import('./CallToActionSection'),
  { ssr: false }
);

export default function CallToActionSectionClient() {
  return <CallToActionSection />;
}
