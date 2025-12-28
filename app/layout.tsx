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
  title: 'Fakhri Djamaris | ML Engineer & Web Developer',
  description: 'Portfolio website of Fakhri Djamaris - Machine Learning Engineer, Data Scientist, and Fullstack Web Developer based in Indonesia.',
  keywords: ['Fakhri Djamaris', 'Machine Learning', 'Data Science', 'Web Developer', 'Portfolio', 'Indonesia'],
  authors: [{ name: 'Fakhri Djamaris' }],
  openGraph: {
    title: 'Fakhri Djamaris | ML Engineer & Web Developer',
    description: 'Machine Learning Engineer, Data Scientist, and Fullstack Web Developer based in Indonesia.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
