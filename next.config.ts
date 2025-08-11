import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});


const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'i.creativecommons.org',
            port: '',
            pathname: '/l/by-nc-sa/**',
         },
         {
            protocol: 'https',
            hostname: 'storage.ko-fi.com',
            port: '',
            pathname: '/cdn/brandasset/**',
         },
      ],
   },
};

export default withNextIntl(withPWA(nextConfig));
