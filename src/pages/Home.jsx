import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import BookingModal from '../components/BookingModal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useInView } from '../hooks/useCountUp';

const DEPTS = [['Cardiology', 'heart'], ['Neurology', 'dna'], ['Pediatrics', 'user'], ['Orthopedics', 'syringe'], ['Oncology', 'flask'], ['Dermatology', 'doc'], ['Pharmacy', 'pill'], ['Emergency', 'hosp']];
const STATS = [['Specialist doctors', 50, '+'], ['Patients served', 120000, '+'], ['Years of care', 25, ''], ['Emergency hours', 24, '/7']];
const PKGS = [['Essential', 4999], ['Family', 9999, true], ['Premium', 19999]];

function Stat({ label, n, s }) {
  const [ref, on] = useInView();
  return <div><b ref={ref} className={'rv ' + (on ? 'in' : '')}>{on ? <Counter n={n} dur={1400} /> : 0}{s}</b>{label}</div>;
}

export default function Home() {
  const { db } = useData(); const { user } = useAuth(); const toast = useToast();
  const [q, setQ] = useState(''); const [dq, setDq] = useState(''); const [spec, setSpec] = useState('');
  const [yearly, setYearly] = useState(false); const [book, setBook] = useState(null); const [mail, setMail] = useState('');
  useEffect(() => { const t = setTimeout(() => setDq(q), 250); return () => clearTimeout(t); }, [q]);
  const specs = [...new Set(db.doc.map((d) => d.spec))];
  const docs = db.doc.filter((d) => (!spec || d.spec === spec) && (d.name + d.country).toLowerCase().includes(dq.toLowerCase()));
  const open = (id = 1) => setBook(id);
  return (
    <div style={{ width: '100%' }}>
      <nav className="hn">
        <span className="bn"><Icon n="hosp" /> MediCare</span>
        <div>
          <a href="#depts">Departments</a><a href="#doctors">Doctors</a><a href="#pkg">Packages</a>
          <Link className="btn g s" to={user ? '/app' : '/login'}>{user ? 'Dashboard' : 'Sign in'}</Link>{' '}
          <button className="btn s" onClick={() => open()}>Book appointment</button>
        </div>
      </nav>
      <header className="hh">
        <svg className="ecg" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M0 40h180l15-30 20 60 15-30h60l15-20 15 40 15-20h250" /></svg>
        <div className="hc">
          <span className="pl">24/7 Emergency · ISO 27001 · HIPAA</span>
          <h1>Your Health,<br />Our Priority</h1>
          <p style={{ fontSize: 18 }}>World-class care, digitally delivered — across Pakistan and beyond.</p>
          <button className="btn big" style={{ width: 'auto', padding: '12px 26px' }} onClick={() => open()}>Book appointment</button>{' '}
          <a className="btn g" style={{ color: '#fff', display: 'inline-block', textDecoration: 'none' }} href="#doctors">Find a doctor</a>
        </div>
      </header>
      <div className="stb">{STATS.map(([l, n, s]) => <Stat key={l} label={l} n={n} s={s} />)}</div>
      <section className="sec" id="depts"><h2>Departments</h2>
        <div className="dg">{DEPTS.map(([n, ic], i) => <Reveal key={n} i={i % 4} className="dp"><Icon n={ic} /><span>{n}</span></Reveal>)}</div></section>
      <section className="sec" id="doctors"><h2>Meet our doctors</h2>
        <div className="top">
          <input placeholder="Search name or country…" aria-label="Search" style={{ maxWidth: 260 }} value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Specialty" style={{ maxWidth: 220 }} value={spec} onChange={(e) => setSpec(e.target.value)}><option value="">All specialties</option>{specs.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <div className="dg">{docs.length ? docs.map((d, i) => (
          <Reveal key={d.id} i={i % 4} className="dc">
            <div className="pt" style={{ '--h': (d.id * 47) % 360 }}><Avatar name={d.name} className="" style={{ height: '100%' }} /></div>
            <h3>{d.name}</h3><p>{d.spec} · {d.country}</p>
            <p><Icon n="star" /> {d.rating} · {d.exp} yrs · PKR {d.fee.toLocaleString()}</p>
            <button className="btn s" style={{ marginTop: 8 }} onClick={() => open(d.id)}>Book appointment</button>
          </Reveal>)) : <div className="empty">No doctors match</div>}</div></section>
      <section className="sec" id="pkg"><h2>Health packages</h2>
        <div className="tgl">Monthly <button className={yearly ? 'y' : ''} onClick={() => setYearly(!yearly)} aria-label="Toggle yearly billing" /> Yearly</div>
        <div className="dg">{PKGS.map(([n, p, pop], i) => (
          <Reveal key={n} i={i} className={'pk' + (pop ? ' pop' : '')}>
            <h3>{n}</h3>{pop && <span className="tg">Most popular</span>}
            <div className="pp">PKR {(yearly ? p * 10 : p).toLocaleString()}{yearly ? '/yr' : '/mo'}</div>
            <div style={{ color: 'var(--muted)' }}>Annual check-up · Lab tests · Online consults</div>
          </Reveal>))}</div></section>
      <div className="cta"><h2 style={{ margin: '0 0 10px' }}>Book your appointment today</h2><button className="btn" style={{ background: '#fff', color: '#0369a1', padding: '12px 26px' }} onClick={() => open()}>Get started</button></div>
      <footer className="ft">
        <div><b className="bn">MediCare HMS</b><p>Digitising hospital care, from front desk to pharmacy.</p></div>
        <div><b>Newsletter</b><p style={{ display: 'flex', gap: 6 }}><input placeholder="you@email.com" aria-label="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
          <button className="btn" onClick={() => toast(mail.includes('@') ? 'Subscribed — thank you!' : 'Enter a valid email')}>Join</button></p></div>
        <div>Main Boulevard, Lahore<br />+92 42 000 0000<br />care@medicare.example</div>
      </footer>
      {book && <BookingModal doctorId={book} onClose={() => setBook(null)} />}
    </div>
  );
}
