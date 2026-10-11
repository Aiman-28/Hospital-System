import Modal from './Modal';
import Avatar from './Avatar';
import { useData } from '../context/DataContext';
export default function PatientProfile({ patient: p, onClose }) {
  const { db } = useData();
  const apts = db.apt.filter((a) => a.patient === p.name), bills = db.bill.filter((b) => b.patient === p.name);
  const none = <div className="ln" style={{ color: 'var(--muted)' }}>None yet</div>;
  return (
    <Modal title="Patient profile" onClose={onClose} width={480}>
      <div className="pn" style={{ gap: 14 }}>
        <Avatar name={p.name} style={{ width: 64, height: 64 }} />
        <div><h3 style={{ margin: 0 }}>{p.name}</h3><small>Patient #{p.id} · {p.gender}, {p.age} yrs</small></div>
      </div>
      <div className="grid" style={{ margin: '14px 0', gridTemplateColumns: '1fr 1fr' }}>
        {[['Condition', p.disease], ['Blood group', p.blood || '—'], ['Admitted', p.admitted], ['Phone', p.phone]].map(([k, v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}
      </div>
      <b>Appointments</b>
      {apts.length ? apts.map((a) => <div className="ln" key={a.id}>{a.date} {a.time} · {a.doctor} <span className={`badge ${a.status.replace('-', '')}`}>{a.status}</span></div>) : none}
      <b style={{ display: 'block', marginTop: 10 }}>Invoices</b>
      {bills.length ? bills.map((b) => <div className="ln" key={b.id}>INV-{1000 + b.id} · PKR {b.amount.toLocaleString()} <span className={`badge ${b.status}`}>{b.status}</span></div>) : none}
      <div style={{ marginTop: 14, textAlign: 'right' }}><button className="btn" onClick={onClose}>Close</button></div>
    </Modal>
  );
}
