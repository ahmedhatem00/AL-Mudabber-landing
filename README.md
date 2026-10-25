# المُدبّر | Al Mudabbir — صفحة الهبوط (Next.js 15)

## التشغيل
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
(يلزم Node 20.9 أو أحدث واتصال بالإنترنت وقت البناء (build) لتنزيل خط Readex Pro من Google Fonts.)

## هيكل الملفات
```
app/[lang]/layout.jsx   وسم <html> والخط والـ metadata لكل لغة (ar / en)
app/[lang]/page.jsx     الصفحة الرئيسية
middleware.js           يحوّل "/" إلى النسخة العربية أو الإنجليزية بحسب الكوكي ثم لغة الجهاز
components/             Landing (التجميع) + Stat + Phone + Pricing + Faq
hooks/                  تأثيرات التمرير والظهور والإمالة
lib/i18n.js             كل النصوص والأسعار (عربي + إنجليزي)
lib/lang.js             اختيار اللغة
styles/                 ملفات CSS مقسّمة بحسب الأقسام (الألوان في أول base.css)
public/                 الشعار وصفحات الخصوصية والشروط وحذف البيانات
```

## ملاحظات مهمة
- **تُبنى الصفحتان /ar و /en مرة واحدة وقت البناء** (static) بدل أن يبنيهما الخادم مع كل زيارة. ولهذا لا يحتوي `lib/lang.js` على `cookies()` ولا `headers()`، ولو استُخدما في الصفحة لعادت بطيئة.
- **الحركات إجبارية**: لا يوجد `prefers-reduced-motion` في CSS ولا في JS. ولو أُضيف لتوقفت الحركات عند أي مستخدم عطّل «animation effects» في ويندوز أو أندرويد.
- أي عنصر عليه الصنف `.rv` يُمنع أن يتغير `className` الخاص به (مثل `open`)، لأن React سيمسح الصنف `in` فيختفي العنصر. ضع الحالة على عنصر داخلي (انظر `components/Faq.jsx`).

## قبل النشر
- **زر التنزيل:** كل أزرار التنزيل (الشريط العلوي، والواجهة الرئيسية، و«ابدأ مجانًا»، وآخر الصفحة) تنزّل الـ APK مباشرة من GitHub Releases. افتح `lib/config.js` وغيّر `GITHUB_REPO` (مثل `ahmed/al-mudabbir`) و`APK_FILE`، ثم ارفع الـ APK في Release على المستودع بالاسم نفسه. يستخدم الرابط `releases/latest/download/` فيجلب آخر إصدار تلقائيًا دون تغيير الموقع.
- عند نشر التطبيق على Google Play غيّر `DOWNLOAD_URL` في `lib/config.js`.
- ضع نطاق الموقع في `NEXT_PUBLIC_SITE_URL` (يعتمد عليه الرابط الأساسي (canonical) وخريطة الموقع وصورة المشاركة وبيانات JSON-LD)، ودونه ستظهر القيمة localhost.
- بعد النشر: سجّل الموقع في Google Search Console وأرسل `https://نطاقك/sitemap.xml`.
- النصوص والأسعار كلها في `lib/i18n.js`.

## النشر على Cloudflare (Workers + OpenNext)
الملفات جاهزة: `wrangler.jsonc` و`open-next.config.ts` و`public/_headers`، والمشروع على Next 15 لأن المهايئ (adapter) يتطلب Next 15.5.28 أو أحدث.

**من لوحة Cloudflare (الأسهل):**
1. ارفع المشروع على GitHub.
2. Workers & Pages ← Create ← Import a repository ← اختر المستودع.
3. يجب أن يكون اسم المشروع `al-mudabbir-landing` (وهو نفسه `name` في `wrangler.jsonc`).
4. Build command: `npx opennextjs-cloudflare build`
5. Deploy command: `npx opennextjs-cloudflare deploy`
6. Build variables and secrets (لازمة وقت البناء): `NEXT_PUBLIC_SITE_URL` و`NEXT_PUBLIC_GITHUB_REPO` و`NEXT_PUBLIC_APK_FILE`.
7. Settings ← Domains & Routes ← Add custom domain.

**من جهازك:** `npm install` ثم `npm run preview` (تجربة في بيئة Workers) ثم `npm run deploy` (يلزم `npx wrangler login` قبلها).

**ملاحظات:**
- يجعل `open-next.config.ts` الصفحتين `/ar` و`/en` تُقدَّمان من الأصول الثابتة (static assets)، ودونه ستعيدان 404.
- `html_handling: none` في `wrangler.jsonc` ليبقى `/legal/privacy.html` بالرابط نفسه دون إعادة توجيه.
- يعمل `next dev` عاديًا للتطوير. ويجب أن يبقى الـ middleware على Edge (وهو كذلك الآن)؛ فلو حُوِّل إلى Node runtime لن يعمل على Cloudflare.
- رؤوس الأمان (HSTS وCSP أساسية ومنع التضمين) معرّفة في `next.config.mjs` وفي `public/_headers`، ويجب إبقاؤهما متطابقين.
