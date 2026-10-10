import { Phone, Mail } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import ContactForm from './ContactForm'

export default function CTA() {
  const { tree } = useI18n()
  const c = tree.cta
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'contact@etsintegrity-maritime.com'
  const phone = import.meta.env.VITE_CONTACT_PHONE || '+237 622 332 485'

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 w-full overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-ocean-400/30
                        bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950
                        p-5 sm:p-8 md:p-12 lg:p-14">
          <div className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 bg-ocean-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 sm:w-80 h-60 sm:h-80 bg-gold-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* grid-cols-1 par défaut, 2 colonnes à partir de lg */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start w-full min-w-0">
            {/* Colonne gauche */}
            <div className="w-full min-w-0">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white
                             leading-tight mb-4 sm:mb-5 break-words">
                {c.title1} <span className="gradient-text">{c.titleBrand}</span>{c.title2}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-8 break-words">{c.desc}</p>

              <div className="space-y-3">
                <a href={`mailto:${email}`}
                   className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white transition w-full min-w-0">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl glass flex items-center justify-center">
                    <Mail className="w-4 h-4 text-ocean-400" />
                  </span>
                  <span className="truncate min-w-0">{email}</span>
                </a>
                <a href={`tel:${phone.replace(/\s/g, '')}`}
                   className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white transition w-full min-w-0">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl glass flex items-center justify-center">
                    <Phone className="w-4 h-4 text-ocean-400" />
                  </span>
                  <span className="truncate min-w-0">{phone}</span>
                </a>
              </div>
            </div>

            {/* Colonne droite — formulaire */}
            <div className="w-full min-w-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}