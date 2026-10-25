import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

// Both language pages, each pointing to the other with hreflang, plus the legal pages.
export default function sitemap() {
  const now = new Date();
  const languages = { ar: `${SITE_URL}/ar`, en: `${SITE_URL}/en`, 'x-default': `${SITE_URL}/en` };
  return [
    { url: `${SITE_URL}/ar`, lastModified: now, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    ...['privacy', 'terms', 'delete-data'].map((f) => ({ url: `${SITE_URL}/legal/${f}.html`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 })),
  ];
}
