export type GlyphKind = 'cart' | 'copy' | 'clipboard' | 'box' | 'doc' | 'chat' | 'sheet'

/** Traços de ícone em grade 24x24, para usar dentro de qualquer <svg>. */
export function GlyphPaths({ kind }: { kind: GlyphKind }) {
  switch (kind) {
    case 'cart':
      return (
        <>
          <path d="M3 4h2.2l2.3 11h10.3l2-8H6.3" />
          <circle cx="9.5" cy="19.5" r="1.4" />
          <circle cx="17" cy="19.5" r="1.4" />
        </>
      )
    case 'copy':
      return (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h8" />
        </>
      )
    case 'clipboard':
      return (
        <>
          <rect x="6" y="5" width="12" height="16" rx="2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </>
      )
    case 'box':
      return <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5zM3.5 7.5L12 12l8.5-4.5M12 12v9" />
    case 'doc':
      return <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />
    case 'chat':
      return <path d="M4 5h16v11H11l-4 4v-4H4z" />
    case 'sheet':
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 10h16M4 15h16M10 4v16" />
        </>
      )
  }
}

/** Ícone solto, para uso em HTML. */
export function Glyph({ kind, size = 22 }: { kind: GlyphKind; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <GlyphPaths kind={kind} />
    </svg>
  )
}
