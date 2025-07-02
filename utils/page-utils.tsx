import React, { FC } from 'react';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug?: string[];
  };
}

export const generatePageMetadata = (title: string): Metadata => ({
  title: `${title} | ARISE`,
  description: `${title} page of ARISE - Your personal career development platform`,
  // Add any other metadata you need
  // A.R.I.S.E. => AI Recruitment & Interview Simulation Engine
});

interface PageContentProps {
  title: string;
}

export const PageContent: FC<PageContentProps> = ({ title }) => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
      {title}
    </h1>
    <p className="text-xl text-gray-300">
      This is the {title.toLowerCase()} page. Content will be added here soon.
    </p>
  </div>
);
