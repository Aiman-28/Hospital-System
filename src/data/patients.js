import { seed } from './seed';
const FM = ['Ahmed', 'Bilal', 'Rajesh', 'Chen', 'Hamza'], FF = ['Fatima', 'Sarah', 'Emma', 'Ayesha', 'Zainab'];
const LN = ['Khan', 'Sheikh', 'Johnson', 'Patel', 'Wei', 'Brown', 'Malik', 'Raza', 'Bibi'];
const DS = ['Diabetes', 'Hypertension', 'Asthma', 'Migraine', 'Arthritis', 'Anemia', 'Fracture', 'Thyroid'];
const BG = ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-'];
export const makePatients = () => [
  ...seed.pat.map((p, i) => ({ ...p, blood: BG[i % 6] })),
  ...Array.from({ length: 45 }, (_, i) => ({
    id: 100 + i, name: (i % 2 ? FF : FM)[(i >> 1) % 5] + ' ' + LN[(i * 7 + (i >> 3)) % 9],
    age: 18 + ((i * 13) % 62), gender: i % 2 ? 'Female' : 'Male', disease: DS[i % 8],
    admitted: `2026-0${1 + (i % 9)}-${10 + (i % 18)}`, phone: `03${i % 5}${(i + 1) % 5}-${1000000 + ((i * 7919) % 9000000)}`, blood: BG[i % 6],
  })),
];
