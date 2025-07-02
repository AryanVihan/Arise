import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for the application
export const metadata: Metadata = {
  title: {
    default: 'ARISE - Ascend Beyond',
    template: '%s | ARISE',
  },
  description: 'A divine interface for career ascension and personal growth. Transform your career with AI-powered interview preparation and skill development.',
  keywords: [
    'interview preparation',
    'career growth',
    'AI interview coach',
    'job interview practice',
    'career development',
    'skills assessment',
  ],
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARISE - Ascend Beyond',
    description: 'Transform your career with AI-powered interview preparation',
    creator: '@arise',
    images: ['/og-image.jpg'],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://arise.vercel.app',
    siteName: 'ARISE',
    title: 'ARISE - Ascend Beyond',
    description: 'Transform your career with AI-powered interview preparation and skill development',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ARISE - Ascend Beyond',
      },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arise.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  appleWebApp: {
    title: 'ARISE',
    statusBarStyle: 'default',
  },
  applicationName: 'ARISE',
  other: {
    'msapplication-TileColor': '#0f172a',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-900 text-gray-100 overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
