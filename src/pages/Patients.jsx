import { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';
import BookingModal from '../components/BookingModal';
import PatientForm from '../components/PatientForm';
import PatientProfile from '../components/PatientProfile';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
const PER = 10;
export default function Patients() {
  const { db, set } = useData(); const { can } = useAuth(); const toast = useToast();
  const [q, setQ] = useState(''); const [dq, setDq] = useState(''); const [g, setG] = useState(''); const [page, setPage] = useState(1);
  const [m, setM] = useState(null); // { t: 'add' | 'edit' | 'view' | 'book', p? }
  useEffect(() => { const t = setTimeout(() => { setDq(q); setPage(1); }, 250); return () => clearTimeout(t); }, [q]);
  const rows = useMemo(() => db.pat.filter((p) => (p.name + p.disease).toLowerCase().includes(dq.toLowerCase()) && (!g || p.gender === g)), [db.pat, dq, g]);
  const pages = Math.max(1, Math.ceil(rows.length / PER)), cur = rows.slice((page - 1) * PER, page * PER);
  const exportCsv = () => {
    const t = 'Name,Age,Gender,Condition,Phone\n' + rows.map((p) => [p.name, p.age, p.gender, p.disease, p.phone].join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([t], { type: 'text/csv' })); a.download = 'patients.csv'; a.click(); URL.revokeObjectURL(a.href);
  };
  const remove = (p) => { if (confirm('Delete this patient?')) { set('pat', (a) => a.filter((x) => x.id !== p.id)); toast('Patient deleted'); } };
  return (
    <>
      <div className="top">
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Search patients…" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Gender" value={g} onChange={(e) => { setG(e.target.value); setPage(1); }}><option value="">All</option><option>Male</option><option>Female</option></select>
        </div>
        <div><button className="btn g" onClick={exportCsv}>Export CSV</button>{' '}
          {can && <button className="btn" onClick={() => setM({ t: 'add' })}>Register patient</button>}{' '}
          <button className="btn g" onClick={() => setM({ t: 'book' })}>Book appointment</button></div>
      </div>
      <div className="card tw">{cur.length ? (
        <table><thead><tr><th>Patient</th><th>Age</th><th>Gender</th><th>Condition</th><th>Admitted</th><th>Phone</th><th /></tr></thead>
          <tbody>{cur.map((p, i) => (
            <tr key={p.id} className="rise" style={{ '--i': i }}>
              <td><div className="pn"><Avatar name={p.name} /><div><b>{p.name}</b><small>Patient #{p.id}</small></div></div></td>
              <td>{p.age}</td><td>{p.gender}</td><td>{p.disease}</td><td>{p.admitted}</td><td>{p.phone}</td>
              <td><div className="acts">
                <button className="ib" title="View" aria-label={`View ${p.name}`} onClick={() => setM({ t: 'view', p })}><Icon n="eye" /></button>
                {can && <><button className="ib" title="Edit" aria-label={`Edit ${p.name}`} onClick={() => setM({ t: 'edit', p })}><Icon n="pen" /></button>
                  <button className="ib dn" title="Delete" aria-label={`Delete ${p.name}`} onClick={() => remove(p)}><Icon n="bin" /></button></>}
              </div></td>
            </tr>))}</tbody></table>
      ) : <div className="empty"><Icon n="folder" /> No patients match your search</div>}</div>
      {pages > 1 && <div className="pg-btns">
        <button className="btn g s" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ alignSelf: 'center', color: 'var(--muted)' }}>Page {page} of {pages}</span>
        <button className="btn g s" disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button></div>}
      {m?.t === 'view' && <PatientProfile patient={m.p} onClose={() => setM(null)} />}
      {m?.t === 'book' && <BookingModal onClose={() => setM(null)} />}
      {m?.t === 'add' && <PatientForm onClose={() => setM(null)} onSave={(v) => { set('pat', (a) => [...a, { ...v, id: Date.now(), admitted: new Date().toISOString().slice(0, 10) }]); toast('Patient registered'); setM(null); }} />}
      {m?.t === 'edit' && <PatientForm patient={m.p} onClose={() => setM(null)} onSave={(v) => { set('pat', (a) => a.map((x) => (x.id === m.p.id ? { ...x, ...v } : x))); toast('Patient updated'); setM(null); }} />}
    </>
  );
}
