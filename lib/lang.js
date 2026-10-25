// Language helpers. No next/headers here, so this file is safe to use in middleware and in client code.
export const LANGS = ['ar', 'en'];
export const isLang = (v) => v === 'ar' || v === 'en';

// A manual choice (cookie) wins, otherwise the device language from Accept-Language.
export function pickLang(cookieValue, acceptLanguage = '') {
  if (isLang(cookieValue)) return cookieValue;
  const first = acceptLanguage.split(',')[0].trim().toLowerCase();
  return first.startsWith('ar') ? 'ar' : 'en';
}
