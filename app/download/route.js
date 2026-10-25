import { NextResponse } from 'next/server';
import { DOWNLOAD_URL } from '../../lib/config';

// كل أزرار التنزيل تشير إلى /download (رابط ثابت لا يتغيّر).
// هذا المسار يحوّل المتصفح إلى رابط الـ APK الحقيقي، ولا يُخزَّن أبدًا في أي كاش (متصفح / Cloudflare / وسيط).
// لتغيير الرابط بدون إعادة بناء: ضع المتغيّر DOWNLOAD_URL (بدون NEXT_PUBLIC_) في Cloudflare → Settings → Variables.
export const dynamic = 'force-dynamic';

export function GET() {
  const target = process.env.DOWNLOAD_URL || DOWNLOAD_URL;
  const res = NextResponse.redirect(target, 302);
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.headers.set('CDN-Cache-Control', 'no-store');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');
  return res;
}
