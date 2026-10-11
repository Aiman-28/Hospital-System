import { useEffect } from 'react';
export default function Modal({ title, onClose, children, width = 440 }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="card" role="dialog" aria-modal="true" aria-label={title} style={{ width: `min(${width}px,100%)` }}>{children}</div>
    </div>
  );
}
