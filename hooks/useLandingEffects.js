'use client';
import { useEffect } from 'react';

// Scroll progress bar + hero parallax + "solid" nav. Writes straight to the elements (no CSS variables on
// the root, which would invalidate the style of the whole page on every scroll). The page height is measured
// only when the size changes, not on every frame.
export function useScrollEffects({ progressRef, stageRef, onSolid }) {
  useEffect(() => {
    let raf = 0, max = 0, solidNow = false;
    const measure = () => { max = document.documentElement.scrollHeight - innerHeight; };
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      if (stageRef.current && y < innerHeight * 1.2) stageRef.current.style.transform = `translate3d(0,${(-y * 0.12).toFixed(1)}px,0)`;
      const s = y > 20;
      if (s !== solidNow) { solidNow = s; onSolid(s); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure(); update();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null;
    ro?.observe(document.body); // page height changes (fonts, FAQ opening, language switch)
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    return () => { ro?.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, [progressRef, stageRef, onSolid]);
}

// 3D tilt of the logo: only on devices with a real mouse, only while the hero is on screen.
export function useLogoTilt(logoRef) {
  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    let raf = 0, ex = 0, ey = 0;
    const onMove = (e) => {
      ex = e.clientX; ey = e.clientY;
      if (raf || !logoRef.current || window.scrollY > innerHeight) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = ex / innerWidth - 0.5, y = ey / innerHeight - 0.5;
        logoRef.current.style.transform = `perspective(900px) rotateX(${(-y * 14).toFixed(1)}deg) rotateY(${(x * 14).toFixed(1)}deg)`;
      });
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, [logoRef]);
}

// Reveal-on-scroll. Re-runs when `dep` (the language) changes because translated blocks are new DOM nodes.
// Never put a changing className on an element that has `.rv`: React would wipe the `.in` class added here.
export function useReveal(dep) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { nodes.forEach((n) => n.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [dep]);
}

// Highlights the tour step in the middle of the screen.
export function useActiveStep(setActive) {
  useEffect(() => {
    const so = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(+e.target.dataset.i)), { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('.step').forEach((n) => so.observe(n));
    return () => so.disconnect();
  }, [setActive]);
}

// Pause endless animations of sections that are off screen (saves CPU/GPU, especially on phones).
export function usePauseOffscreen() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-pause]');
    // Without IntersectionObserver nothing may stay paused: animations always run.
    if (!('IntersectionObserver' in window)) { nodes.forEach((n) => n.classList.remove('paused')); return; }
    const po = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('paused', !e.isIntersecting)), { rootMargin: '80px' });
    nodes.forEach((n) => po.observe(n));
    return () => po.disconnect();
  }, []);
}
