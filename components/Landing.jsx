'use client';
import { useEffect, useRef, useState } from 'react';
import { T } from '../lib/i18n';
import { DOWNLOAD_PATH } from '../lib/config';
import { useScrollEffects, useLogoTilt, useReveal, useActiveStep, usePauseOffscreen } from '../hooks/useLandingEffects';
import Stat from './Stat';
import Phone from './Phone';
import Pricing from './Pricing';
import Faq from './Faq';

const BUILD_YEAR = new Date().getFullYear();

export default function Landing({ initialLang }) {
  const [lang, setLang] = useState(initialLang);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(0);
  const [year, setYear] = useState(BUILD_YEAR); // the page is built once, so refresh the year in the browser
  const progressRef = useRef(null);
  const stageRef = useRef(null);
  const logoRef = useRef(null);
  const t = T[lang];

  const next = lang === 'ar' ? 'en' : 'ar';
  // A real link (/en or /ar) so crawlers can follow it; for visitors it still switches instantly without reloading.
  const toggleLang = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let "open in new tab" work
    e.preventDefault();
    setLang(next);
    history.replaceState(null, '', `/${next}${location.hash}`);
    document.cookie = `lang=${next};path=/;max-age=31536000;samesite=lax${window.location.protocol === 'https:' ? ';secure' : ''}`;
    document.documentElement.lang = next;
    document.documentElement.dir = T[next].dir;
    document.title = T[next].title;
  };

  useEffect(() => setYear(new Date().getFullYear()), []);
  useScrollEffects({ progressRef, stageRef, onSolid: setSolid });
  useLogoTilt(logoRef);
  useReveal(lang);
  useActiveStep(setActive);
  usePauseOffscreen();

  return (
    <div>
      <div className="progress" ref={progressRef} />
      <header className={`nav ${solid ? 'solid' : ''}`}>
        <div className="wrap">
          <a className="brand" href="#top"><img src="/logo-96.webp" alt="" width="36" height="36" />{t.brand}</a>
          <nav className="links" aria-label={t.brand}>
            {['#story', '#security', '#pricing', '#faq'].map((h, i) => <a key={h} href={h}>{t.nav[i]}</a>)}
          </nav>
          <a className="lang" href={`/${next}`} hrefLang={next} lang={next} onClick={toggleLang}>{t.other}</a>
          <a className="btn primary" href={DOWNLOAD_PATH} rel="noopener">{t.cta}</a>
        </div>
      </header>

      <main id="top">
        <section className="hero" data-pause>
          <div className="coin" style={{ '--s': '26px', '--x': '8%', '--y': '24%', '--d': '7s', '--dl': '0s' }} />
          <div className="coin" style={{ '--s': '16px', '--x': '46%', '--y': '12%', '--d': '5s', '--dl': '-2s' }} />
          <div className="coin" style={{ '--s': '34px', '--x': '90%', '--y': '70%', '--d': '8s', '--dl': '-4s' }} />
          <div className="wrap">
            <div>
              <h1>{t.h1.map((line) => <span className="ln" key={line}>{line}</span>)}</h1>
              <p className="sub">{t.sub}</p>
              <div className="row">
                <a className="btn primary" href={DOWNLOAD_PATH} rel="noopener">{t.cta}</a>
                <a className="btn ghost" href="#story">{t.cta2}</a>
              </div>
            </div>
            <div className="stage" ref={stageRef}>
              <div className="ring" /><div className="ring r2" />
              <div className="logo" ref={logoRef}><img src="/logo.webp" srcSet="/logo-360.webp 360w, /logo-480.webp 480w, /logo.webp 720w" sizes="(max-width: 900px) 320px, 460px" alt={t.brand} width="720" height="720" fetchPriority="high" decoding="async" /><span className="shine" aria-hidden="true" /></div>
            </div>
          </div>
          <div className="hint"><i /></div>
        </section>

        <section className="stats">
          <div className="wrap">{t.stats.map(([n, pre, suf, l], i) => <Stat key={lang + i} i={i} n={n} pre={pre} suf={suf} label={l} />)}</div>
        </section>

        <section className="story" id="story">
          <div className="wrap" style={{ display: 'block' }}><h2 className="rv">{t.storyTitle}</h2></div>
          <div className="wrap">
            <div className="steps">
              {t.steps.map(([id, h, b], i) => (
                <div key={id} data-i={i} className={`step ${active === i ? 'on' : ''}`}>
                  <h3>{h}</h3><p>{b}</p>
                  <div className="inline-phone"><Phone id={id} s={t.scr} /></div>
                </div>
              ))}
            </div>
            <div className="sticky"><Phone id={t.steps[active][0]} s={t.scr} /></div>
          </div>
        </section>

        <section className="sec" id="security">
          <div className="wrap">
            <h2 className="rv">{t.secTitle}</h2>
            <ul>
              {t.sec.map(([h, b], i) => (
                <li key={i} className="rv" style={{ '--dl': `${i * 0.1}s` }}><em>{i + 1}</em><div><h3>{h}</h3><p>{b}</p></div></li>
              ))}
            </ul>
          </div>
        </section>

        <Pricing t={t} />

        <Faq title={t.faqTitle} items={t.faq} />

        <section className="end paused" id="download" data-pause>
          <div className="wrap">
            <h2 className="rv">{t.endTitle}</h2>
            <p className="rv">{t.endBody}</p>
            <a className="btn rv" href={DOWNLOAD_PATH} rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" /></svg>{t.gp}</a>
            <small className="note rv">{t.apkNote}</small>
          </div>
        </section>

      </main>

      <footer>
        <div className="wrap">
          <span suppressHydrationWarning>© {year} {t.brand}. {t.rights}</span>
          <nav>{['privacy', 'terms', 'delete-data'].map((f, i) => <a key={f} href={`/legal/${f}.html`}>{t.foot[i]}</a>)}</nav>
        </div>
      </footer>
    </div>
  );
}
