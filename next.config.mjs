import withPWAInit from "@ducanh2912/next-pwa";

/* @type {import('next').NextConfig} */

const withPWA = withPWAInit({
  dest: 'public',

  register: true, // Register service worker
  skipWaiting: true, // Activate service worker immediately
  clientsClaim: true, // Take control of clients as soon as the service worker is available
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development

  runtimeCaching: [
    {
      urlPattern: new RegExp('/'), // Cache all routes (adjust as needed)
      handler: 'NetworkFirst', // Prioritize fresh content, but use cache if offline
      options: {
        cacheName: 'nextjs-app',
        expiration: {
          maxEntries: 30,
        },
      },
    },
    // ... (other caching rules for external resources)
  ],
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
};

export default withPWA({
  ...nextConfig
})