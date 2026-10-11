import { useState } from 'react';
import Icon from '../components/Icon';
import Counter from '../components/Counter';
import BookingModal from '../components/BookingModal';
import PatientForm from '../components/PatientForm';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
const COLS = ['#0EA5E9', '#14B8A6', '#f59e0b', '#8b5cf6'];
const MONTHLY = [42, 55, 48, 63, 71, 66, 80];
export default function Dashboard() {
  const { db, set } = useData(); const toast = useToast();
  const [m, setM] = useState(null);
  const revenue = db.bill.filter((b) => b.status === 'Paid').reduce((s, b) => s + b.amount, 0);
  const kpis = [['Total Patients', db.pat.length], ['Appointments', db.apt.length], ['Revenue (PKR)', revenue], ['Beds Available', Math.max(0, 120 - db.pat.length)]];
  const dep = db.doc.map((d) => [d.spec, db.apt.filter((a) => a.doctor === d.name).length]).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const tot = dep.reduce((s, e) => s + e[1], 0) || 1;
  let off = 0;
  const arcs = dep.map(([k, v], i) => { const l = (v / tot) * 100, o = off; off += l; return { k, v, l, o, c: COLS[i] }; });
  return (
    <>
      <div className="top" style={{ justifyContent: 'flex-end' }}>
        <button className="btn" onClick={() => setM('reg')}>Register patient</button>
        <button className="btn g" onClick={() => setM('book')}>Book appointment</button>
      </div>
      <div className="grid">{kpis.map(([k, n], i) => <div key={k} className="card kpi rise" style={{ '--i': i }}><span>{k}</span><b><Counter n={n} dur={900} /></b></div>)}</div>
      <div className="grid g2" style={{ marginTop: 14 }}>
        <div className="card rise" style={{ '--i': 4 }}><b>Monthly revenue (k PKR)</b>
          <svg viewBox="0 0 280 120" width="100%" role="img" aria-label="Revenue bar chart">{MONTHLY.map((v, i) => <rect key={i} x={i * 38 + 8} y={105 - v} width="26" height={v} rx="5" fill={COLS[i % 2]} style={{ '--i': i }}><title>{v}k</title></rect>)}</svg></div>
        <div className="card rise" style={{ '--i': 5 }}><b>Appointments by department</b>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <svg viewBox="0 0 42 42" width="130" aria-hidden="true">{arcs.map((a) => <circle key={a.k} r="15.9" cx="21" cy="21" fill="none" stroke={a.c} strokeWidth="6" strokeDasharray={`${a.l} ${100 - a.l}`} strokeDashoffset={-a.o} transform="rotate(-90 21 21)"><title>{a.k}: {a.v}</title></circle>)}</svg>
            <div>{arcs.map((a) => <div key={a.k}><span style={{ color: a.c }}>●</span> {a.k} ({a.v})</div>)}</div></div></div>
      </div>
      <div className="card rise" style={{ marginTop: 14, '--i': 6 }}><b>Recent activity</b>
        {db.apt.slice(-3).map((a) => <div key={a.id} style={{ padding: '6px 0' }}><Icon n="clock" /> {a.patient} — {a.doctor} <span className={`badge ${a.status.replace('-', '')}`}>{a.status}</span></div>)}</div>
      {m === 'book' && <BookingModal onClose={() => setM(null)} />}
      {m === 'reg' && <PatientForm onClose={() => setM(null)} onSave={(v) => { set('pat', (a) => [...a, { ...v, id: Date.now(), admitted: new Date().toISOString().slice(0, 10) }]); toast('Patient registered'); setM(null); }} />}
    </>
  );
}
