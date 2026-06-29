// Plain inline SVGs used as icon content inside Andy-UI components.
// (Icons are content, not components — slotted into <Button>, <NavItem>, etc.)
type P = { className?: string };
const base = (p: P, d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden>
    {d}
  </svg>
);

export const AgentsIcon = (p: P) => base(p, <path d="M9.75 17 9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />);
export const SkillsIcon = (p: P) => base(p, <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>);
export const AdaptersIcon = (p: P) => base(p, <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />);
export const KeysIcon = (p: P) => base(p, <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3" />);
export const PlusIcon = (p: P) => base(p, <path d="M12 5v14M5 12h14" />);
export const LogoMark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden>
    <path d="M12 3 3.5 7.2 12 11.4l8.5-4.2L12 3Z" fill="currentColor" opacity=".95" />
    <path d="M3.5 12 12 16.2 20.5 12" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" opacity=".75" />
    <path d="M3.5 16.6 12 20.8l8.5-4.2" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" opacity=".5" />
  </svg>
);
