import { createContext, useContext, useEffect, useState } from 'react';
import { seed } from '../data/seed';
import { DOCS } from '../data/doctors';
import { makePatients } from '../data/patients';
import { load, save } from '../utils/storage';
const Ctx = createContext(null);
export const useData = () => useContext(Ctx);
const init = () => load('hms_data', null) || {
  pat: makePatients(), doc: DOCS,
  apt: seed.apt.map((a, i) => ({ ...a, doctor: DOCS[i % DOCS.length].name })),
  bill: seed.bill, rx: seed.rx,
};
export function DataProvider({ children }) {
  const [db, setDb] = useState(init);
  useEffect(() => save('hms_data', db), [db]);
  const set = (k, fn) => setDb((d) => ({ ...d, [k]: fn(d[k]) }));
  return <Ctx.Provider value={{ db, set }}>{children}</Ctx.Provider>;
}
