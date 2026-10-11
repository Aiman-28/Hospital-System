const ALL = ['admin', 'doctor', 'reception', 'patient'];
export const NAV = [
  { to: '/app', label: 'Dashboard', icon: 'dash', roles: ['admin', 'doctor', 'reception'], end: true },
  { to: '/app/patients', label: 'Patients', icon: 'user', roles: ['admin', 'doctor', 'reception'] },
  { to: '/app/doctors', label: 'Doctors', icon: 'doc', roles: ALL },
  { to: '/app/appointments', label: 'Appointments', icon: 'cal', roles: ALL },
  { to: '/app/billing', label: 'Billing', icon: 'card', roles: ['admin', 'reception', 'patient'] },
  { to: '/app/pharmacy', label: 'Pharmacy', icon: 'pill', roles: ['admin', 'doctor'] },
];
