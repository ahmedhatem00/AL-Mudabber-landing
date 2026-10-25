function Screen({ id, s }) {
  if (id === 'home')
    return (
      <div className="scr">
        <div className="tt">{s.cash}</div>
        <div className="card"><small>{s.avail}</small><strong>12,480 {s.egp}</strong></div>
        <div className="card">
          <div className="donut">
            <svg viewBox="0 0 100 100">
              {[[110, 0, 'var(--g2)'], [70, -110, 'var(--g3)'], [50, -180, 'var(--gold)'], [34, -230, 'var(--olive)']].map(([l, o, c], i) => (
                <circle key={i} cx="50" cy="50" r="42" style={{ '--l': l - 3, '--o': o, stroke: c, animationDelay: `${i * 0.15}s` }} />
              ))}
            </svg>
            <div className="leg">
              {[['var(--g2)', 42], ['var(--g3)', 26], ['var(--gold)', 19], ['var(--olive)', 13]].map(([c, p], i) => (
                <span key={i}><i style={{ background: c }} />{p}%</span>
              ))}
            </div>
          </div>
        </div>
        <div className="card"><div className="rowi"><small>{s.lim}</small><b>68%</b></div><div className="bar"><b style={{ '--w': '68%' }} /></div></div>
      </div>
    );
  if (id === 'hist') {
    const h = [40, 72, 28, 90, 55, 36, 64];
    return (
      <div className="scr">
        <div className="tabs"><span>{s.day}</span><span>{s.wk}</span><span className="a">{s.mo}</span></div>
        <div className="chart">
          {h.map((x, i) => (
            <div key={i}><b style={{ '--h': `${x}%`, '--dl': `${i * 0.07}s` }} /><b className="o" style={{ '--h': `${Math.max(14, 100 - x - 20)}%`, '--dl': `${i * 0.07 + 0.1}s` }} /></div>
          ))}
        </div>
        <div className="card rowi"><span>{s.inc}</span><b dir="ltr">+8,200</b></div>
        <div className="card rowi"><span>{s.out}</span><b dir="ltr">−3,740</b></div>
      </div>
    );
  }
  if (id === 'sav')
    return (
      <div className="scr">
        <div className="tt">{s.s1}</div>
        <div className="card"><div className="rowi"><strong>5,000</strong><span className="tag l">{s.locked}</span></div><div className="bar"><b style={{ '--w': '62%' }} /></div></div>
        <div className="card"><div className="rowi"><strong>2,000</strong><span className="tag">{s.open}</span></div><div className="bar"><b style={{ '--w': '100%' }} /></div><small style={{ marginTop: 6 }}>{s.s2}</small></div>
      </div>
    );
  return (
    <div className="scr">
      {[[s.d1, 3000, 40], [s.d2, 1800, 75]].map(([n, v, w], i) => (
        <div className="card" key={i}><div className="rowi"><b>{n}</b><span className="tag l">{s.rem}</span></div><strong>{v}</strong><div className="bar"><b style={{ '--w': `${w}%`, animationDelay: `${i * 0.2}s` }} /></div></div>
      ))}
    </div>
  );
}

const Phone = ({ id, s }) => <div className="phone"><div className="screen"><Screen key={id} id={id} s={s} /></div></div>;

export default Phone;
