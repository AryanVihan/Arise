import { Metadata } from 'next';
import FeedbackContent from './FeedbackContent';

export const metadata: Metadata = {
  title: 'Feedback | Arise',
  description: 'Review your interview feedback and performance metrics',
};

export default function FeedbackPage() {
  return (
    <div suppressHydrationWarning>
      <FeedbackContent />
    </div>
  );
}
