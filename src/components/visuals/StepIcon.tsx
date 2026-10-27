export type StepIconKind = 'lens' | 'cut' | 'link' | 'gear'

/** Ícones de 24x24 de traço fino para os passos do método. */
export function StepIcon({ kind }: { kind: StepIconKind }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'lens' && (
        <>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5.5 5.5" />
        </>
      )}
      {kind === 'cut' && (
        <>
          <circle cx="6.5" cy="18" r="2.6" />
          <circle cx="17.5" cy="18" r="2.6" />
          <path d="M8.2 16L18 4.5M15.8 16L6 4.5" />
        </>
      )}
      {kind === 'link' && (
        <>
          <circle cx="5.5" cy="12" r="2.8" />
          <circle cx="18.5" cy="12" r="2.8" />
          <path d="M8.3 12h7.4" />
        </>
      )}
      {kind === 'gear' && (
        <>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </>
      )}
    </svg>
  )
}
