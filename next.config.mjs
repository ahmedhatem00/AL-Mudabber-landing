/** @type {import('next').NextConfig} */
const cache = (value) => [{ key: 'Cache-Control', value }];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // The site uses plain <img>, not next/image: switch the image optimizer off (several advisories target it).
  images: { unoptimized: true },
  async headers() {
    return [
      { source: '/download', headers: cache('no-store, no-cache, must-revalidate, max-age=0') },
      // Files in /public are served with max-age=0 by default, so the logo was re-checked on every visit.
      { source: '/:file(logo.*\\.webp)', headers: cache('public, max-age=604800, stale-while-revalidate=2592000') },
      { source: '/legal/:file*', headers: cache('public, max-age=3600, stale-while-revalidate=86400') },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
          // HSTS: يتجاهله المتصفح على http://localhost، ويُفعَّل على النطاق الحقيقي عبر HTTPS.
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // سياسة محتوى محافظة لا تكسر Next.js (لا تقيّد السكربتات): تمنع التضمين داخل إطارات وتقيّد base/form/object.
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        ],
      },
    ];
  },
};
export default nextConfig;
