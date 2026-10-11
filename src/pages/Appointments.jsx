import { useState } from 'react';
import Icon from '../components/Icon';
import BookingModal from '../components/BookingModal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
const STATUS = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-Show'];
export default function Appointments() {
  const { db, set } = useData(); const { user, can } = useAuth(); const toast = useToast();
  const [q, setQ] = useState(''); const [book, setBook] = useState(false);
  const rows = db.apt.filter((a) => (a.patient + a.doctor).toLowerCase().includes(q.toLowerCase()) && (can || a.patient === user.name));
  const change = (id, status) => { set('apt', (a) => a.map((x) => (x.id === id ? { ...x, status } : x))); toast('Status updated'); };
  return (
    <>
      <div className="top"><input placeholder="Search appointments…" aria-label="Search" style={{ maxWidth: 260 }} value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn" onClick={() => setBook(true)}>Book appointment</button></div>
      <div className="card tw">{rows.length ? (
        <table><thead><tr><th>Token</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
          <tbody>{rows.map((a, i) => (
            <tr key={a.id} className="rise" style={{ '--i': Math.min(i, 14) }}>
              <td>#{a.id}</td><td>{a.patient}</td><td>{a.doctor}</td><td>{a.date}</td><td>{a.time}</td>
              <td>{can
                ? <select aria-label="Change status" value={a.status} data-v={a.status.replace('-', '')} onChange={(e) => change(a.id, e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select>
                : <span className={`badge ${a.status.replace('-', '')}`}>{a.status}</span>}</td>
            </tr>))}</tbody></table>
      ) : <div className="empty"><Icon n="cal" /> No appointments</div>}</div>
      {book && <BookingModal onClose={() => setBook(false)} />}
    </>
  );
}
