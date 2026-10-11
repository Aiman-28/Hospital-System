import { useState } from 'react';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';
import BookingModal from '../components/BookingModal';
import { useData } from '../context/DataContext';
export default function Doctors() {
  const { db } = useData(); const [spec, setSpec] = useState(''); const [book, setBook] = useState(null);
  const specs = [...new Set(db.doc.map((d) => d.spec))];
  return (
    <>
      <div className="top"><select aria-label="Specialty" style={{ maxWidth: 220 }} value={spec} onChange={(e) => setSpec(e.target.value)}><option value="">All specialties</option>{specs.map((s) => <option key={s}>{s}</option>)}</select></div>
      <div className="grid">{db.doc.filter((d) => !spec || d.spec === spec).map((d, i) => (
        <div key={d.id} className="card rise" style={{ '--i': i % 8 }}>
          <div className="pn"><Avatar name={d.name} /><div><b>{d.name}</b><small>{d.spec} · {d.exp} yrs</small></div></div>
          <div style={{ margin: '10px 0' }}><Icon n="star" /> {d.rating} · PKR {d.fee.toLocaleString()}</div>
          <button className="btn s" onClick={() => setBook(d.id)}>Book</button>
        </div>))}</div>
      {book && <BookingModal doctorId={book} onClose={() => setBook(null)} />}
    </>
  );
}
