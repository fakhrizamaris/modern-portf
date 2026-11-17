import type { NextConfig } from 'next';

const CV_FILE = '/cv/Fakhri_Djamaris_CV.pdf';

const nextConfig: NextConfig = {
  // Short, stable URLs for the CV. Update the file in public/cv, the links keep working.
  async redirects() {
    return [
      { source: '/cv', destination: CV_FILE, permanent: false },
      { source: '/resume.pdf', destination: CV_FILE, permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.qwiklabs.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
};

export default nextConfig;
