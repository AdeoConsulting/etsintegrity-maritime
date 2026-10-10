import { useState, useEffect } from 'react'
import { Anchor, Menu, X, Phone } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: t('nav.services') },
    { href: '#pourquoi-nous', label: t('nav.why') },
    { href: '#processus', label: t('nav.process') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    // Dans Header.jsx, remplace la classe du <header> par :
    <header
      className={`fixed top-[36px] sm:top-[34px] inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-950/90 backdrop-blur-lg border-b border-white/10 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ocean-500 to-navy-700 flex items-center justify-center shadow-lg shadow-ocean-500/30">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-display font-extrabold text-white text-sm tracking-wide">ETSINTEGRITY</p>
            <p className="text-[11px] text-ocean-400 font-semibold tracking-[0.2em]">MARITIME</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm text-slate-300 hover:text-white transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a href="tel:+237622332485" className="text-sm text-slate-300 hover:text-white flex items-center gap-2">
            <Phone className="w-4 h-4" /> +237 622 332 485
          </a>
          <a href="#contact" className="btn-primary text-sm py-2.5">{t('nav.start')}</a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button className="text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-6 rounded-2xl glass p-4 space-y-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="block py-2 text-slate-200 hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
             className="btn-primary w-full justify-center mt-2">
            {t('nav.start')}
          </a>
        </div>
      )}
    </header>
  )
}