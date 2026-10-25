import { Readex_Pro } from 'next/font/google';
import '../../styles/base.css';
import '../../styles/hero.css';
import '../../styles/reveal-stats.css';
import '../../styles/story.css';
import '../../styles/sections.css';
import '../../styles/responsive.css';
import { T } from '../../lib/i18n';
import { LANGS } from '../../lib/lang';
import { SITE_URL } from '../../lib/site';

const font = Readex_Pro({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700'], display: 'swap' });

export const dynamicParams = false; // only /ar and /en exist
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

// params is awaited so the same code works on Next 14, 15 and 16 (where it became a Promise).
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = T[lang];
  const other = lang === 'ar' ? 'en' : 'ar';
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.desc,
    keywords: t.keywords,
    applicationName: t.brand,
    category: 'finance',
    // Each language page is its own canonical URL; "/" renders one of them, so it points at it too (no duplicate content).
    alternates: {
      canonical: `/${lang}`,
      languages: { ar: '/ar', en: '/en', 'x-default': '/en' },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title: t.title, description: t.desc, type: 'website', url: `/${lang}`, siteName: t.brand,
      locale: lang === 'ar' ? 'ar_EG' : 'en_US', alternateLocale: other === 'ar' ? 'ar_EG' : 'en_US',
      images: [{ url: '/opengraph-image.jpg', width: 800, height: 800, alt: t.ogAlt }],
    },
    twitter: { card: 'summary', title: t.title, description: t.desc, images: [{ url: '/opengraph-image.jpg', alt: t.ogAlt }] },
  };
}

export const viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#EEF2EF' }, { media: '(prefers-color-scheme: dark)', color: '#121C1A' }],
  colorScheme: 'light dark',
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={T[lang].dir}>
      <body className={font.className}>
        {/* Without JavaScript the reveal-on-scroll blocks would stay invisible. */}
        <noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript>
        {children}
      </body>
    </html>
  );
}
