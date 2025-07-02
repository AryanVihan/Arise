import { Metadata } from 'next';

interface PageProps {
  params: {
    slug?: string[];
  };
}

export function generatePageMetadata(title: string): Metadata {
  return {
    title: `${title} | ARISE`,
    description: `${title} page of ARISE - Your personal career development platform`,
  };
}

export function PageContent({ title }: { title: string }): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-300">
        This is the {title.toLowerCase()} page. Content will be added here soon.
      </p>
    </div>
  );
}
