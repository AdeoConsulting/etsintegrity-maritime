import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import { LANGUAGES } from '../i18n/translations'
import { LanguageFlag } from './Flag'

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/10 transition-colors text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-ocean-400 shrink-0" />
        <LanguageFlag code={current.code} className="w-5 h-3.5" />
        <span className="hidden sm:inline text-slate-200">{current.code.toUpperCase()}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 rounded-2xl glass shadow-xl overflow-hidden z-50 animate-fade-in-up"
        >
          {LANGUAGES.map(l => (
            <li key={l.code}>
              <button
                onClick={() => { setLang(l.code); setOpen(false) }}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <LanguageFlag code={l.code} className="w-5 h-3.5" />
                  {l.label}
                </span>
                {lang === l.code && <Check className="w-4 h-4 text-ocean-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}