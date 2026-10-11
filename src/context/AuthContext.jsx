import { createContext, useContext, useState } from 'react';
import { load, save } from '../utils/storage';
const USERS = {
  'admin@hospital.com': ['Admin@123', 'admin', 'Admin'],
  'doctor@hospital.com': ['Doctor@123', 'doctor', 'Dr. Sarah Khan'],
  'reception@hospital.com': ['Reception@123', 'reception', 'Reception'],
  'patient@hospital.com': ['Patient@123', 'patient', 'Ali Raza'],
};
export const DEMO = Object.entries(USERS).map(([email, u]) => ({ email, pw: u[0], label: u[1] }));
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load('hms_user', null));
  const login = (email, pw) => {
    const u = USERS[email.trim().toLowerCase()];
    if (!u || u[0] !== pw) return false;
    const s = { email, role: u[1], name: u[2] }; setUser(s); save('hms_user', s); return true;
  };
  const logout = () => { setUser(null); save('hms_user', null); };
  return <Ctx.Provider value={{ user, login, logout, can: !!user && user.role !== 'patient' }}>{children}</Ctx.Provider>;
}
