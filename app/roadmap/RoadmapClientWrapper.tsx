'use client';

import dynamic from 'next/dynamic';

// Dynamically import the RoadmapClient component with SSR disabled
const RoadmapClient = dynamic(
  () => import('./RoadmapClient'),
  { ssr: false }
);

export default function RoadmapClientWrapper() {
  return <RoadmapClient />;
}
