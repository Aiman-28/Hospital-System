import { useEffect, useRef, useState } from 'react';
const RM = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches;
export function useCountUp(n, dur = 1000) {
  const [v, setV] = useState(RM ? n : 0);
  useEffect(() => {
    if (RM) { setV(n); return; }
    let r; const t0 = performance.now();
    const f = (t) => { const p = Math.min((t - t0) / dur, 1); setV(Math.round(n * (1 - Math.pow(1 - p, 4)))); if (p < 1) r = requestAnimationFrame(f); };
    r = requestAnimationFrame(f);
    return () => cancelAnimationFrame(r);
  }, [n, dur]);
  return v;
}
export function useInView() {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}
