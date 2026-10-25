// ===== غيّر السطرين التاليين فقط =====
// اسم حسابك واسم المستودع على GitHub، واسم ملف APK كما سيكون في Releases.
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || 'ahmedhatem00/AL-Mudabber';
const APK_FILE = process.env.NEXT_PUBLIC_APK_FILE || 'al_mudabber.apk';

// الرابط "latest/download" يفتح دائمًا آخر إصدار (Release)، فلا يتغيّر الرابط مع كل إصدار جديد
// (بشرط أن يبقى اسم الملف كما هو). وهو رابط مباشر: يبدأ المتصفح التنزيل فورًا.
export const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL || `https://github.com/${GITHUB_REPO}/releases/latest/download/${APK_FILE}`;

if (process.env.NODE_ENV === 'production' && DOWNLOAD_URL.includes('YOUR_USERNAME')) {
  console.warn('[config] Download link still has the YOUR_USERNAME/YOUR_REPO placeholder: set NEXT_PUBLIC_GITHUB_REPO (or edit lib/config.js).');
}

// الرابط الذي تستخدمه الأزرار في الصفحة: ثابت دائمًا، ويحوّل (بدون كاش) إلى DOWNLOAD_URL أعلاه. انظر app/download/route.js
export const DOWNLOAD_PATH = '/download';