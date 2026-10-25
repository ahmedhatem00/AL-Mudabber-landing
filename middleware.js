import { NextResponse } from 'next/server';
import { pickLang } from './lib/lang';

// "/" is rewritten (URL stays the same) to the pre-built static page of the visitor's language.
// Because of this the pages no longer call cookies()/headers() and are generated once at build time
// instead of being rendered on the server for every single visit.
export const config = { matcher: ['/'] };

export function middleware(req) {
  const lang = pickLang(req.cookies.get('lang')?.value, req.headers.get('accept-language') || '');
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}`;
  const res = NextResponse.rewrite(url);
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}
