import Icon from '../components/Icon';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
export default function Billing() {
  const { db, set } = useData(); const { user, can } = useAuth(); const toast = useToast();
  const rows = db.bill.filter((b) => can || b.patient === user.name);
  const pay = (id) => { set('bill', (a) => a.map((b) => (b.id === id ? { ...b, status: 'Paid' } : b))); toast('Payment recorded'); };
  return (
    <div className="card tw">{rows.length ? (
      <table><thead><tr><th>Invoice</th><th>Patient</th><th>Amount</th><th>Method</th><th>Status</th><th className="no" /></tr></thead>
        <tbody>{rows.map((b, i) => (
          <tr key={b.id} className="rise" style={{ '--i': i }}>
            <td>INV-{1000 + b.id}</td><td>{b.patient}</td><td>PKR {b.amount.toLocaleString()}</td><td>{b.method}</td>
            <td><span className={`badge ${b.status}`}>{b.status}</span></td>
            <td className="no"><div className="acts">
              {b.status === 'Unpaid' && can && <button className="ib ok" title="Mark paid" aria-label="Mark paid" onClick={() => pay(b.id)}><Icon n="chk" /></button>}
              <button className="ib" title="Print" aria-label="Print" onClick={() => window.print()}><Icon n="print" /></button></div></td>
          </tr>))}</tbody></table>
    ) : <div className="empty"><Icon n="receipt" /> No invoices</div>}</div>
  );
}
