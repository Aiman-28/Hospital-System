import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import CommandPalette from './CommandPalette';
import { useAuth } from '../context/AuthContext';
import { NAV } from '../config/nav';

function toggleTheme() {
  const r = document.documentElement;
  const dark = getComputedStyle(r).getPropertyValue('--bg').trim() === '#0b1220';
  const apply = () => { r.dataset.theme = dark ? 'light' : 'dark'; };
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion:reduce)').matches) document.startViewTransition(apply); else apply();
}

export default function Layout() {
  const { user, logout } = useAuth(); const nav = useNavigate(); const loc = useLocation();
  const [pal, setPal] = useState(false);
  const items = NAV.filter((n) => n.roles.includes(user.role));
  useEffect(() => {
    const k = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setPal((p) => !p); } };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  const page = loc.pathname.split('/')[2] || 'dashboard';
  return (
    <div id="app">
      <aside>
        <h1><Icon n="hosp" /> MediCare</h1>
        {items.map((n, i) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'nav' + (isActive ? ' on' : '')} style={{ '--i': i }}>
            <Icon n={n.icon} /> {n.label}
          </NavLink>
        ))}
      </aside>
      <main>
        <div className="top">
          <div><b>{user.name}</b> <span className="badge" style={{ background: 'var(--teal)' }}>{user.role}</span></div>
          <div>
            <Link className="btn g s" to="/"><Icon n="home" /> Home</Link>{' '}
            <button className="btn g s" onClick={() => setPal(true)} title="Command palette">Ctrl+K</button>{' '}
            <button className="btn g s" onClick={toggleTheme} aria-label="Toggle dark mode"><Icon n="moon" /></button>{' '}
            <button className="btn g s" onClick={() => { logout(); nav('/login'); }}>Logout</button>
          </div>
        </div>
        <div id="v" key={loc.pathname} className="pg" data-pg={page}><Outlet /></div>
      </main>
      {pal && <CommandPalette items={items} onClose={() => setPal(false)} />}
    </div>
  );
}
