'use client';

import dynamic from 'next/dynamic';

// Dynamically import the form component with SSR disabled
const CoverLetterForm = dynamic(
  () => import('./CoverLetterForm'),
  { ssr: false }
);

export default function CoverLetterClient() {
  return <CoverLetterForm />;
}
