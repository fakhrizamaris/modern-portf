import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: 'Fakhri Djamaris | Software Developer, iOS & Machine Learning',
    template: '%s | Fakhri Djamaris',
  },
  description: 'Portfolio of Fakhri Djamaris, Software Developer in iOS development and machine learning. Learner at Apple Developer Academy @ Infinite Learning, Batam, freelance web and ML developer, and Associate Degree graduate in Informatics Engineering from Universitas Sumatera Utara.',
  keywords: [
    'Fakhri Djamaris',
    'Fakhri',
    'Djamaris',
    'iOS Developer',
    'Apple Developer Academy',
    'Infinite Learning',
    'SwiftUI',
    'Machine Learning Engineer',
    'Data Scientist',
    'Web Developer',
    'ML Engineer Indonesia',
    'Bangkit Academy',
    'TensorFlow Developer',
    'USU',
    'Universitas Sumatera Utara',
    'Portfolio',
    'Batam',
    'Medan',
    'Indonesia',
  ],
  authors: [{ name: 'Fakhri Djamaris', url: 'https://fakhridjamaris.my.id' }],
  creator: 'Fakhri Djamaris',
  publisher: 'Fakhri Djamaris',

  // Canonical URL
  metadataBase: new URL('https://fakhridjamaris.my.id'),
  alternates: {
    canonical: '/',
  },

  // Open Graph for social sharing
  openGraph: {
    title: 'Fakhri Djamaris | Software Developer, iOS & Machine Learning',
    description: 'Software Developer in iOS development and machine learning. Building iOS apps at Apple Developer Academy @ Infinite Learning, Batam, and deploying web and ML services as a freelancer.',
    url: 'https://fakhridjamaris.my.id',
    siteName: 'Fakhri Djamaris Portfolio',
    images: [
      {
        url: '/images/favicon.png',
        width: 512,
        height: 512,
        alt: 'Fakhri Djamaris Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Fakhri Djamaris | Software Developer, iOS & Machine Learning',
    description: 'Software Developer in iOS development and machine learning, based in Batam.',
    images: ['/images/favicon.png'],
  },

  // Robots
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

  // Verification (add your codes after registering)
  verification: {
    google: 'your-google-verification-code', // Get from Google Search Console
  },

  // Category
  category: 'technology',
};

// JSON-LD Structured Data for better Google understanding
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fakhri Djamaris',
  url: 'https://fakhridjamaris.my.id',
  image: 'https://fakhridjamaris.my.id/images/hero-profile.webp',
  sameAs: ['https://github.com/fakhrizamaris', 'https://linkedin.com/in/fakhri-djamaris'],
  jobTitle: 'Software Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitas Sumatera Utara',
  },
  knowsAbout: ['iOS Development', 'Swift', 'SwiftUI', 'ARKit', 'Machine Learning', 'TensorFlow', 'Python', 'FastAPI', 'Laravel', 'Google Cloud Platform'],
  description: 'Learner at Apple Developer Academy @ Infinite Learning, Batam, and Associate Degree graduate in Informatics Engineering from USU (GPA 3.86/4.00). Builds iOS apps with SwiftUI in cross-functional teams, and builds and deploys web applications and machine learning services as a freelance developer.',
};

import { preconnect, prefetchDNS } from 'react-dom';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // rendering-resource-hints: preconnect to heavily used external domains
  preconnect('https://api.github.com');
  preconnect('https://cdn.jsdelivr.net'); // Devicons
  
  // prefetch DNS for domains that will be needed soon
  prefetchDNS('https://api.coingecko.com');
  prefetchDNS('https://api.open-meteo.com');
  prefetchDNS('https://avatars.githubusercontent.com');

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
