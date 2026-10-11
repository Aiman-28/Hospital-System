import { createContext, useCallback, useContext, useState } from 'react';
const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);
export function ToastProvider({ children }) {
  const [list, setList] = useState([]);
  const push = useCallback((m) => {
    const id = Math.random();
    setList((x) => [...x, { id, m }]);
    setTimeout(() => setList((x) => x.filter((t) => t.id !== id)), 2500);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div id="toast" role="status" aria-live="polite">{list.map((t) => <div key={t.id} className="t">{t.m}</div>)}</div>
    </Ctx.Provider>
  );
}
