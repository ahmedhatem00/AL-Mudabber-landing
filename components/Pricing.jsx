'use client';
import { useState } from 'react';
import { DOWNLOAD_PATH } from '../lib/config';

export default function Pricing({ t }) {
  const [plan, setPlan] = useState(2);
  const p = t.plans[plan];
  const per = (p[2] / p[3]).toFixed(p[3] === 1 ? 0 : 1);
  return (
    <section className="price" id="pricing">
      <div className="wrap">
        <div className="head rv"><h2>{t.priceTitle}</h2><p>{t.priceSub}</p></div>
        <div className="seg rv" role="radiogroup" aria-label={t.priceSub} style={{ '--i': plan }}>
          <span className="pill" />
          {t.plans.map(([k, l], i) => <button key={k} role="radio" aria-checked={plan === i} className={plan === i ? 'on' : ''} onClick={() => setPlan(i)}>{l}</button>)}
        </div>
        <div className="plans">
          <div className="plan rv">
            <h3>{t.freeName}</h3>
            <div className="amt">0<small>{t.total}</small></div>
            <div className="sub2" />
            <ul>{t.free.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className="btn ghost" href={DOWNLOAD_PATH} rel="noopener">{t.getFree}</a>
          </div>
          <div className="plan pro rv" style={{ '--dl': '.12s' }}>
            <h3>{t.proName}<span>{p[1]}</span></h3>
            <div className="amt" key={plan}>{p[2]}<small>{t.total}</small></div>
            <div className="sub2">{p[3] > 1 ? `≈ ${per} ${t.perMonth}` : ''}</div>
            <ul>{t.pro.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className="btn" href="#download">{t.getPro}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
