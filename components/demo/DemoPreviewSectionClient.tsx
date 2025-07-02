'use client';

import dynamic from 'next/dynamic';

const DemoPreviewSection = dynamic(
  () => import('./DemoPreviewSection'),
  { ssr: false }
);

export default function DemoPreviewSectionClient() {
  return <DemoPreviewSection />;
}
