import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rvsgqzidyzgohmokogfu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // 1 week (default is 60s). Uploaded images always get a fresh
    // crypto.randomUUID() Storage path (see ImageUploadField.tsx), so
    // replacing an image never reuses an old URL — a long cache TTL
    // can't serve a stale image, it just avoids needlessly re-running
    // the same transformation and burning the Vercel Image Optimization
    // quota (see CHANGELOG.md).
    minimumCacheTTL: 604800,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
