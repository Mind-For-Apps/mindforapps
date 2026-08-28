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
    // Default Next.js deviceSizes also includes 2048/3840 — all page
    // content sits inside a max-w-300 (1200px) container, so nothing on
    // the site ever needs a responsive image wider than ~1920px. Fewer
    // widths means fewer distinct transformations per image.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
