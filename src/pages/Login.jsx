import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { DEMO, useAuth } from '../context/AuthContext';
const FLOAT = ['pill', 'doc', 'heart', 'dna', 'syringe', 'flask'];
const WORDS = ['Care', 'that', 'moves', 'with', 'you'];
export default function Login() {
  const { user, login } = useAuth(); const nav = useNavigate();
  const card = useRef(null); const busy = useRef(false);
  const [f, setF] = useState({ email: '', pw: '' }); const [show, setShow] = useState(false);
  const [st, setSt] = useState('idle'); const [err, setErr] = useState('');
  if (user && !busy.current) return <Navigate to="/app" replace />;

  const submit = (e) => {
    e.preventDefault(); if (st === 'load') return; setSt('load');
    setTimeout(() => {
      busy.current = true;
      if (login(f.email, f.pw)) {
        setSt('ok');
        setTimeout(() => {
          card.current.classList.add('out');
          const w = document.createElement('div'); w.className = 'wipe'; document.body.append(w);
          setTimeout(() => nav('/app', { replace: true }), 550); setTimeout(() => w.remove(), 1150);
        }, 600);
      } else {
        busy.current = false; setSt('idle'); setErr('Invalid email or password');
        const c = card.current; c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
      }
    }, 900);
  };
  const parallax = (e) => {
    const el = e.currentTarget, b = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - b.left) / b.width - 0.5) * 2); el.style.setProperty('--my', ((e.clientY - b.top) / b.height - 0.5) * 2);
  };
  return (
    <div id="app"><div className="split">
      <section className="hero" onMouseMove={parallax}>
        {FLOAT.map((n, i) => <span key={n} className="fi" style={{ '--p': (i % 3 + 1) * 8, '--dl': `${i * 0.5}s` }}><i><Icon n={n} /></i></span>)}
        <div className="copy">
          <div className="dr"><Icon n="md" /></div>
          <h1>{WORDS.map((w, i) => <span key={w} className="w" style={{ '--i': i }}>{w}{' '}</span>)}</h1>
          <p className="w" style={{ '--i': 6 }}>One calm, connected workspace for every ward, clinic and counter.</p>
        </div>
      </section>
      <section className="side">
        <form className="login card" ref={card} onSubmit={submit}>
          <h2 style={{ margin: 0, color: 'var(--pri)' }}><Icon n="hosp" /> MediCare HMS</h2>
          <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Welcome back — sign in to continue</p>
          <div className="f"><input id="em" type="email" placeholder=" " autoComplete="username" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /><label htmlFor="em">Email</label></div>
          <div className="f"><input id="pw" type={show ? 'text' : 'password'} placeholder=" " autoComplete="current-password" value={f.pw} onChange={(e) => setF({ ...f, pw: e.target.value })} /><label htmlFor="pw">Password</label>
            <button type="button" className="eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}><Icon n={show ? 'eyeoff' : 'eye'} /></button></div>
          <p role="alert" style={{ color: 'var(--bad)', margin: '8px 0 0', minHeight: 20 }}>{err}</p>
          <button className="btn big" type="submit">
            {st === 'load' ? <span className="spin" /> : st === 'ok'
              ? <svg viewBox="0 0 24 24" width="20" height="20" aria-label="Success"><path className="ck" pathLength="1" d="M5 13l4 4L19 7" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg> : 'Sign in'}
          </button>
          <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Demo accounts:</p>
          {DEMO.map((d) => <button key={d.email} type="button" className="chip" onClick={() => setF({ email: d.email, pw: d.pw })}>{d.label}</button>)}
          <p style={{ marginBottom: 0 }}><Link to="/">← Back to home</Link></p>
        </form>
      </section>
    </div></div>
  );
}
