import Landing from '../../components/Landing';
import { T } from '../../lib/i18n';
import { SITE_URL } from '../../lib/site';
import { DOWNLOAD_PATH } from '../../lib/config';

// Structured data (JSON-LD) so search engines understand this is an app, what it costs and what people ask about it.
function jsonLd(lang) {
  const t = T[lang];
  const url = `${SITE_URL}/${lang}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: `${T.ar.brand} | ${T.en.brand}`, inLanguage: ['ar', 'en'] },
      {
        '@type': 'MobileApplication', '@id': `${url}#app`, name: t.brand, alternateName: lang === 'ar' ? T.en.brand : T.ar.brand,
        url, description: t.desc, inLanguage: lang, applicationCategory: 'FinanceApplication', operatingSystem: 'Android',
        image: `${SITE_URL}/logo.webp`, downloadUrl: `${SITE_URL}${DOWNLOAD_PATH}`, isAccessibleForFree: true,
        featureList: t.steps.map((s) => s[1]),
        offers: [
          { '@type': 'Offer', name: t.freeName, price: '0', priceCurrency: 'EGP' },
          ...t.plans.map(([, label, price]) => ({ '@type': 'Offer', name: `${t.proName} (${label})`, price: String(price), priceCurrency: 'EGP' })),
        ],
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: lang,
        mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c') }} />
      <Landing initialLang={lang} />
    </>
  );
}
