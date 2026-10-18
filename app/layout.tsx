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
    default: 'Fakhri Djamaris | iOS Developer & Machine Learning',
    template: '%s | Fakhri Djamaris',
  },
  description: 'Portfolio website of Fakhri Djamaris, iOS Developer and Machine Learning learner at Apple Developer Academy @ Infinite Learning, Batam, and D3 Informatics Engineering graduate from Universitas Sumatera Utara.',
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
    'Deli Serdang',
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
    title: 'Fakhri Djamaris | iOS Developer & Machine Learning',
    description: 'iOS Developer and Machine Learning learner at Apple Developer Academy @ Infinite Learning, Batam. Building iOS apps in cross-functional teams and training ML models that become useful apps.',
    url: 'https://fakhridjamaris.my.id',
    siteName: 'Fakhri Djamaris Portfolio',
    images: [
      {
        url: '/images/favicon.png',
        width: 800,
        height: 800,
        alt: 'Fakhri Djamaris Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Fakhri Djamaris | iOS Developer & Machine Learning',
    description: 'iOS Developer and Machine Learning learner at Apple Developer Academy @ Infinite Learning, Batam.',
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
  jobTitle: 'iOS Developer and Machine Learning Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitas Sumatera Utara',
  },
  knowsAbout: ['iOS Development', 'Swift', 'SwiftUI', 'ARKit', 'Machine Learning', 'NLP', 'TensorFlow', 'Python', 'FastAPI'],
  description: 'Learner at Apple Developer Academy @ Infinite Learning, Batam, and D3 Informatics Engineering graduate from USU (GPA 3.86). Builds iOS apps in cross-functional teams and trains and deploys machine learning models as a freelance developer.',
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
