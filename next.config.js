/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Skip the Railway-hosted /_next/image round-trip. Unsplash already serves
    // AVIF/WebP via auto=format and supports per-request resizing via the `w`
    // query param. Going direct shaves ~1.2s on cold-cache image loads.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
