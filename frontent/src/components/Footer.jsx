import { Anchor } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

export default function Footer() {
  const { t, tree } = useI18n()
  const f = tree.footer
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'contact@etsintegrity-maritime.com'
  const phone = import.meta.env.VITE_CONTACT_PHONE || '+237 622 332 485'

  return (
    <footer className="border-t border-white/5 pt-16 pb-8 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-navy-700 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-extrabold text-white">ETSINTEGRITY</p>
                <p className="text-[11px] text-ocean-400 font-semibold tracking-[0.2em]">MARITIME</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">{f.desc}</p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm">{f.navTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-ocean-400 transition">{t('nav.services')}</a></li>
              <li><a href="#pourquoi-nous" className="hover:text-ocean-400 transition">{t('nav.why')}</a></li>
              <li><a href="#processus" className="hover:text-ocean-400 transition">{t('nav.process')}</a></li>
              <li><a href="#contact" className="hover:text-ocean-400 transition">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm">{f.contactTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{email}</li>
              <li>{phone}</li>
              <li>Yaoundé — Cameroun</li>
              <li>Kribi — Cameroun</li>
              <li>RCCM : CM-NSI-01-2026-A10-00496</li>
              <li className="text-emerald-400">{f.available}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ETSINTEGRITY-MARITIME. {f.rights}</p>
          <p>{f.tagline}</p>
        </div>
      </div>
    </footer>
  )
}