# MediCare HMS (React)

Hospital Management System demo built with React 18, Vite and React Router v6.

## Setup
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in dist/

## Demo credentials
| Role      | Email                  | Password      |
|-----------|------------------------|---------------|
| Admin     | admin@hospital.com     | Admin@123     |
| Doctor    | doctor@hospital.com    | Doctor@123    |
| Reception | reception@hospital.com | Reception@123 |
| Patient   | patient@hospital.com   | Patient@123   |

## Structure
    src/
      components/  Layout, Modal, Icon, Avatar, BookingModal, PatientForm, PatientProfile, CommandPalette, Reveal, Counter
      pages/       Home, Login, Dashboard, Patients, Doctors, Appointments, Billing, Pharmacy
      context/     Auth, Data (mock data persisted in localStorage), Toast
      data/        seed.js, doctors.js, patients.js
      hooks/       useCountUp, useInView
      config/      nav.js (role-based menu)
      utils/       face.js (SVG portraits), storage.js
      index.css    design system, animations, layout

## Notes
- Auth and data are mock; everything is stored in localStorage (clear site data to reset).
- Role-based routes: patients see only Doctors, Appointments and Billing.
- Portraits are generated SVG illustrations; replace `src/utils/face.js` / `Avatar.jsx` to use real photos.
- Animations respect `prefers-reduced-motion`.
- Deploy: Vercel and Netlify configs (SPA fallback) are included.
