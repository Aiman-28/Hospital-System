import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
export default function CommandPalette({ items, onClose }) {
  const [q, setQ] = useState(''); const nav = useNavigate();
  const list = items.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()));
  const go = (to) => { nav(to); onClose(); };
  return (
    <div className="ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <div className="card" role="dialog" aria-label="Command palette">
        <input autoFocus placeholder="Jump to…" aria-label="Jump to" value={q} onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && list[0] && go(list[0].to)} />
        {list.map((n) => <button key={n.to} className="nav" onClick={() => go(n.to)}><Icon n={n.icon} /> {n.label}</button>)}
      </div>
    </div>
  );
}
