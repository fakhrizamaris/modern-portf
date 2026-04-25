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
    default: 'Fakhri Djamaris | ML Engineer & Web Developer',
    template: '%s | Fakhri Djamaris',
  },
  description: 'Portfolio website of Fakhri Djamaris - Informatics Engineering Graduate, Machine Learning Engineer, Data Scientist, and Fullstack Web Developer based in Deli Serdang, Indonesia.',
  keywords: [
    'Fakhri Djamaris',
    'Fakhri',
    'Djamaris',
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
    title: 'Fakhri Djamaris | ML Engineer & Web Developer',
    description: 'Fresh graduate ML Engineer & Web Developer from Indonesia. Bangkit Academy 2024 graduate with expertise in TensorFlow, Python, and modern web technologies.',
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
    title: 'Fakhri Djamaris | ML Engineer & Web Developer',
    description: 'Fresh graduate ML Engineer & Web Developer from Indonesia. Bangkit Academy 2024 graduate.',
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
  image: 'https://fakhridjamaris.my.id/images/hero-profile.png',
  sameAs: ['https://github.com/fakhrizamaris', 'https://linkedin.com/in/fakhri-djamaris'],
  jobTitle: 'Machine Learning Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitas Sumatera Utara',
  },
  knowsAbout: ['Machine Learning', 'Data Science', 'Web Development', 'TensorFlow', 'Python', 'JavaScript', 'Next.js'],
  description: 'Fresh graduate in Informatics Engineering from USU. Machine Learning Engineer, Data Scientist, and Fullstack Web Developer. Bangkit Academy 2024 graduate.',
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
