import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { NAV } from './config/nav';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Patients = lazy(() => import('./pages/Patients'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Billing = lazy(() => import('./pages/Billing'));
const Pharmacy = lazy(() => import('./pages/Pharmacy'));

function Protected() { const { user } = useAuth(); return user ? <Layout /> : <Navigate to="/login" replace />; }
function Guard({ to, children }) {
  const { user } = useAuth();
  return NAV.find((n) => n.to === to).roles.includes(user.role) ? children : <Navigate to="/app" replace />;
}
function Index() {
  const { user } = useAuth();
  const first = NAV.find((n) => n.roles.includes(user.role));
  return first.to === '/app' ? <Dashboard /> : <Navigate to={first.to} replace />;
}
export default function App() {
  return (
    <Suspense fallback={<div className="empty">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Protected />}>
          <Route index element={<Index />} />
          <Route path="patients" element={<Guard to="/app/patients"><Patients /></Guard>} />
          <Route path="doctors" element={<Guard to="/app/doctors"><Doctors /></Guard>} />
          <Route path="appointments" element={<Guard to="/app/appointments"><Appointments /></Guard>} />
          <Route path="billing" element={<Guard to="/app/billing"><Billing /></Guard>} />
          <Route path="pharmacy" element={<Guard to="/app/pharmacy"><Pharmacy /></Guard>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
