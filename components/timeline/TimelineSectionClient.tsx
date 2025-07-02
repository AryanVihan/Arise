'use client';

import dynamic from 'next/dynamic';

const TimelineSection = dynamic(
  () => import('./TimelineSection'),
  { ssr: false }
);

export default function TimelineSectionClient() {
  return <TimelineSection />;
}
