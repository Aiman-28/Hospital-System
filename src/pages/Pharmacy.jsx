import { useData } from '../context/DataContext';
export default function Pharmacy() {
  const { db } = useData();
  return (
    <div className="card tw"><table><thead><tr><th>Medicine</th><th>Stock</th><th>Min</th><th>Expiry</th><th>Alert</th></tr></thead>
      <tbody>{db.rx.map((m, i) => (
        <tr key={m.id} className="rise" style={{ '--i': i }}>
          <td>{m.name}</td><td>{m.stock}</td><td>{m.min}</td><td>{m.exp}</td>
          <td>{m.stock < m.min ? <span className="badge Low">Low stock</span> : <span className="badge Paid">OK</span>}</td>
        </tr>))}</tbody></table></div>
  );
}
