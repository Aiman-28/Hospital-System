const P = {
  dash: '<path d="M3 3v18h18M7 15v3M12 9v9M17 5v13"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  doc: '<path d="M5 3v6a5 5 0 0010 0V3M10 14v2a4 4 0 008 0v-2"/><circle cx="18" cy="12" r="2"/>',
  md: '<circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 3-7 8-7s8 3 8 7M12 15v4M10 17h4"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  pill: '<path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7zM8.5 8.5l7 7"/>',
  hosp: '<path d="M3 21V7l9-4 9 4v14zM12 8v6M9 11h6"/>',
  heart: '<path d="M20.8 5.6a5.5 5.5 0 00-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 00-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 000-7.8z"/>',
  dna: '<path d="M5 3c0 8 14 10 14 18M19 3c0 8-14 10-14 18M8 7h8M8 17h8"/>',
  syringe: '<path d="M18 2l4 4M20 4l-9 9M11 13l-6 6M7 17l-3 3M14 6l4 4"/>',
  flask: '<path d="M9 3h6M10 3v6L4 20h16l-6-11V3"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M3 3l18 18M10.6 6.2A9 9 0 0112 6c6 0 10 6 10 6a17 17 0 01-3 3.6M6.3 6.3C3.7 8 2 12 2 12s4 7 10 7c1.7 0 3.2-.5 4.5-1.2"/>',
  folder: '<path d="M3 6a2 2 0 012-2h4l2 3h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  star: '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/>',
  pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
  bin: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6"/>',
  chk: '<path d="M5 13l4 4L19 7"/>',
  print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z"/>',
  userplus: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6M19 8v6M16 11h6"/>',
  calplus: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>',
  home: '<path d="M3 11l9-8 9 8v10H3z"/>',
  moon: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 000 18z" fill="currentColor"/>',
};
export default function Icon({ n }) {
  return <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: P[n] }} />;
}
