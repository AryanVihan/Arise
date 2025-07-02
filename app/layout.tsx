import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARISE - Ascend Beyond",
  description: "A divine interface for career ascension and personal growth",
  themeColor: "#0f172a", // Dark theme color for mobile browsers
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'ARISE - Ascend Beyond',
    description: 'A divine interface for career ascension and personal growth',
    url: 'https://arise.vercel.app',
    siteName: 'ARISE',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARISE - Ascend Beyond',
    description: 'A divine interface for career ascension and personal growth',
    creator: '@arise',
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
