// Drapeaux SVG — rendu identique sur tous les OS (Windows inclus), plus fiable que les emojis.

const STYLE = 'inline-block rounded-[2px] overflow-hidden shrink-0'

/* ---------- Drapeaux inline (langues) ---------- */

export function CameroonFlag({ className = 'w-5 h-3.5' }) {
  return (
    <svg viewBox="0 0 30 20" className={`${STYLE} ${className}`} aria-hidden="true">
      <rect width="10" height="20" fill="#007a5e" />
      <rect x="10" width="10" height="20" fill="#ce1126" />
      <rect x="20" width="10" height="20" fill="#fcd116" />
      <polygon
        points="15,7 15.9,9.8 18.8,9.8 16.5,11.6 17.3,14.4 15,12.7 12.7,14.4 13.5,11.6 11.2,9.8 14.1,9.8"
        fill="#fcd116"
      />
    </svg>
  )
}

export function FranceFlag({ className = 'w-5 h-3.5' }) {
  return (
    <svg viewBox="0 0 30 20" className={`${STYLE} ${className}`} aria-hidden="true">
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#ffffff" />
      <rect x="20" width="10" height="20" fill="#ed2939" />
    </svg>
  )
}

export function UkFlag({ className = 'w-5 h-3.5' }) {
  return (
    <svg viewBox="0 0 60 30" className={`${STYLE} ${className}`} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  )
}

/* ---------- Registre pour les langues ---------- */

const LANG_FLAGS = {
  fr: FranceFlag,
  en: UkFlag,
}

export function LanguageFlag({ code, className }) {
  const Cmp = LANG_FLAGS[code]
  return Cmp ? <Cmp className={className} /> : null
}

/* ---------- Drapeaux pays via flagcdn (SVG) ---------- */

export function CountryFlag({ code, className = 'w-5 h-3.5' }) {
  const lower = (code || '').toLowerCase()
  if (!lower) return null
  return (
    <img
      src={`https://flagcdn.com/${lower}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`${STYLE} object-cover ${className}`}
    />
  )
}