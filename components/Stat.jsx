'use client';
import { useEffect, useRef, useState } from 'react';

const DIGITS = '01234567890123456789'.split('');

// One rolling digit: the column rolls through a full 0-9 cycle and lands on the target digit.
function Digit({ d, i, on }) {
  return (
    <span className="dg" aria-hidden="true">
      <span className="dgc" data-nosnippet style={{ '--d': on ? 10 + d : 0, transitionDelay: `${i * 0.12}s` }}>
        {DIGITS.map((x, k) => <i key={k}>{x}</i>)}
      </span>
    </span>
  );
}

function Stat({ n, pre, suf, label, i }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setOn(true);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const digits = String(n).split('').map(Number);
  return (
    <div ref={ref} className="rv" style={{ '--dl': `${i * 0.08}s` }}>
      <b dir="ltr" role="img" aria-label={`${pre}${n}${suf}`}>
        {pre && <span className="aff" aria-hidden="true">{pre}</span>}
        {digits.map((d, k) => <Digit key={k} d={d} i={k} on={on} />)}
        {suf && <span className="aff" aria-hidden="true">{suf}</span>}
      </b>
      <span>{label}</span>
    </div>
  );
}

export default Stat;
