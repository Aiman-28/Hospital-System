import { useState } from 'react';
import Modal from './Modal';
import Avatar from './Avatar';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
export default function BookingModal({ doctorId = 1, onClose }) {
  const { db, set } = useData(); const toast = useToast();
  const [s, setS] = useState(0); const [dir, setDir] = useState(1); const [err, setErr] = useState('');
  const [d, setD] = useState({ doc: doctorId, date: '', time: '', name: '', phone: '' });
  const [bid] = useState(() => 'MC-' + String(Date.now()).slice(-6));
  const doc = db.doc.find((x) => x.id === d.doc) || db.doc[0];
  const days = Array.from({ length: 14 }, (_, i) => new Date(Date.now() + (i + 1) * 864e5));
  const isBooked = (t, i) => (+d.date.slice(-2) + i + d.doc) % 4 === 0 || db.apt.some((a) => a.doctor === doc.name && a.date === d.date && a.time === t);
  const nameOk = d.name.trim().length >= 3, phoneOk = d.phone.replace(/\D/g, '').length >= 10;

  const next = () => {
    const e = [null, !d.date && 'Please choose a date', !d.time && 'Please choose a time slot', !nameOk ? 'Enter your full name' : !phoneOk ? 'Enter a valid phone number' : null][s];
    if (e) return setErr(e);
    if (s === 3) {
      set('apt', (a) => [...a, { id: Date.now() % 100000, patient: d.name.trim(), doctor: doc.name, date: d.date, time: d.time, status: 'Pending' }]);
      toast('Appointment booked');
    }
    setErr(''); setDir(1); setS(s + 1);
  };
  const back = () => { setErr(''); setDir(-1); setS(s - 1); };

  return (
    <Modal title="Book appointment" onClose={onClose} width={540}>
      <div className="pr"><i style={{ transform: `scaleX(${(s + 1) / 5})` }} /></div>
      <div className="stp">{[1, 2, 3, 4, 5].map((n, i) => <span key={n} className={i <= s ? 'on' : ''}>{i < s ? '✓' : n}</span>)}</div>
      <div key={s} className={'bs ' + (dir > 0 ? 'r' : 'l')}>
        {s === 0 && <>
          <h3>Choose a doctor</h3>
          <div className="hs">{db.doc.map((x) => (
            <button key={x.id} type="button" className={'pc' + (x.id === d.doc ? ' sel' : '')} onClick={() => setD({ ...d, doc: x.id, date: '', time: '' })}>
              <Avatar name={x.name} /><span><b>{x.name}</b><br /><span style={{ color: 'var(--muted)' }}>{x.spec}</span></span>
            </button>))}</div>
        </>}
        {s === 1 && <>
          <h3>Pick a date</h3>
          <div className="gd">{days.map((x) => { const iso = x.toISOString().slice(0, 10); return (
            <button key={iso} type="button" className={'dt' + (d.date === iso ? ' sel' : '')} disabled={x.getDay() === 0} onClick={() => setD({ ...d, date: iso, time: '' })}>
              {x.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</button>); })}</div>
        </>}
        {s === 2 && <>
          <h3>Pick a time</h3>
          <div className="gd">{TIMES.map((t, i) => (
            <button key={t} type="button" className={'sl' + (d.time === t ? ' sel' : '')} style={{ '--i': i }} disabled={isBooked(t, i)} onClick={() => setD({ ...d, time: t })}>{t}</button>))}</div>
        </>}
        {s === 3 && <>
          <h3>Your details</h3>
          <label htmlFor="bn">Full name</label>
          <input id="bn" className={d.name ? (nameOk ? 'v-ok' : 'v-no') : ''} value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
          <label htmlFor="bp">Phone</label>
          <input id="bp" inputMode="tel" className={d.phone ? (phoneOk ? 'v-ok' : 'v-no') : ''} value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} />
        </>}
        {s === 4 && <div style={{ textAlign: 'center' }}>
          <svg viewBox="0 0 24 24" width="64" height="64" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="#10B981" strokeWidth="2" /><path className="ck" pathLength="1" d="M7 12.5l3 3 7-7" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" /></svg>
          <h3>Appointment confirmed</h3>
          <p>Booking ID <span className="tyw">{bid}</span></p>
          <p style={{ color: 'var(--muted)' }}>{doc.name} · {d.date} · {d.time}</p>
          {Array.from({ length: 24 }, (_, i) => <i key={i} className="cf" style={{ '--x': `${(i * 37) % 240 - 120}px`, '--r': `${i * 53}deg`, background: `hsl(${(i * 47) % 360} 80% 55%)`, animationDelay: `${(i % 5) * 40}ms` }} />)}
        </div>}
      </div>
      <p key={err} role="alert" style={{ color: 'var(--bad)', minHeight: 20, margin: '6px 0 0', animation: err ? 'shake .4s' : undefined }}>{err}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {s > 0 && s < 4 ? <button className="btn g" onClick={back}>Back</button> : <span />}
        {s < 4 ? <button className="btn" onClick={next}>{s === 3 ? 'Confirm' : 'Next'}</button> : <button className="btn" onClick={onClose}>Done</button>}
      </div>
    </Modal>
  );
}
