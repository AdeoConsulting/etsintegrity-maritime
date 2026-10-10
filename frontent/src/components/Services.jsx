import { Ship, FileText, Compass, Users, LifeBuoy, Briefcase } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

const ICONS = [Ship, FileText, Compass, Users, LifeBuoy, Briefcase]

export default function Services() {
  const { tree } = useI18n()
  const s = tree.services

  return (
    <section id="services" className="relative py-24 bg-navy-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-ocean-400 mb-3">
            {s.tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight mb-4">
            {s.title1} <span className="gradient-text">{s.titleBrand}</span>
          </h2>
          <p className="text-slate-400">{s.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={i}
                   className={`group rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1
                     ${item.featured
                       ? 'bg-gradient-to-br from-ocean-500/20 to-navy-800 border border-ocean-400/40 shadow-xl shadow-ocean-500/10'
                       : 'glass hover:border-white/20'}`}>
                {item.featured && (
                  <span className="inline-block mb-3 text-[11px] font-bold tracking-widest text-gold-400">
                    {s.featuredLabel}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-ocean-300" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}