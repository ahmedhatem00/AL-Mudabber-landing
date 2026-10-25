// Public address of the site. Set NEXT_PUBLIC_SITE_URL to your real domain (e.g. https://almudabbir.app).
// Vercel's production domain is picked up automatically if you do not set it.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || 'http://localhost:3000').replace(/\/+$/, '');

if (process.env.NODE_ENV === 'production' && SITE_URL.startsWith('http://localhost')) {
  console.warn('[site] NEXT_PUBLIC_SITE_URL is not set: canonical, sitemap and share-image URLs will point to localhost.');
}
