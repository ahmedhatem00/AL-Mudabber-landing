'use client';
import { useState } from 'react';

export default function Faq({ title, items }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <h2 className="rv">{title}</h2>
        {items.map(([q, a], i) => (
          // The reveal wrapper (.rv) has a constant className on purpose. The open state lives on the inner
          // element, otherwise React rewrites the class and the item loses its `.in` class (it used to vanish on click).
          <div key={i} className="rv">
            <div className={`q ${open === i ? 'open' : ''}`}>
              <h3><button id={`fq${i}`} aria-expanded={open === i} aria-controls={`fa${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<i /></button></h3>
              <div className="ans" id={`fa${i}`} role="region" aria-labelledby={`fq${i}`}><div><p>{a}</p></div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
