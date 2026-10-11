import { useState } from 'react';
import Modal from './Modal';
const FIELDS = [
  ['name', 'Full name'], ['age', 'Age', 'number'], ['gender', 'Gender', ['Male', 'Female']],
  ['disease', 'Condition'], ['phone', 'Phone'], ['blood', 'Blood group', ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-', 'B-', 'AB-']],
];
export default function PatientForm({ patient, onSave, onClose }) {
  const [v, setV] = useState({ gender: 'Male', blood: 'A+', ...patient });
  const [err, setErr] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (FIELDS.some((f) => !String(v[f[0]] ?? '').trim())) return setErr('All fields are required');
    onSave({ ...v, age: +v.age });
  };
  return (
    <Modal title={patient ? 'Edit patient' : 'Register patient'} onClose={onClose}>
      <h3 style={{ marginTop: 0 }}>{patient ? 'Edit patient' : 'Register patient'}</h3>
      <form onSubmit={submit}>
        {FIELDS.map(([k, label, opt]) => (
          <div key={k}>
            <label htmlFor={`f_${k}`}>{label}</label>
            {Array.isArray(opt)
              ? <select id={`f_${k}`} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })}>{opt.map((o) => <option key={o}>{o}</option>)}</select>
              : <input id={`f_${k}`} type={opt || 'text'} value={v[k] ?? ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} />}
          </div>
        ))}
        <p role="alert" style={{ color: 'var(--bad)' }}>{err}</p>
        <button className="btn" type="submit">Save</button> <button className="btn g" type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
}
